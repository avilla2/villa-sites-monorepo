import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import { fileURLToPath } from 'node:url'

export function decodeToolResult(result) {
  if (result.isError)
    throw new Error(
      result.content
        ?.filter((item) => item.type === 'text')
        .map((item) => item.text)
        .join('\n') || 'MCP tool failed'
    )
  if (result.structuredContent) return result.structuredContent
  const text = result.content
    ?.filter((item) => item.type === 'text')
    .map((item) => item.text)
    .join('\n')
  if (!text) throw new Error('MCP tool returned no JSON result')
  return JSON.parse(text)
}

function hasFolder(value, id) {
  if (!value || typeof value !== 'object') return false
  if (!Array.isArray(value) && value.id === id) return true
  return Object.values(value).some((child) => hasFolder(child, id))
}

function findFolder(value, id) {
  if (!value || typeof value !== 'object') return null
  if (!Array.isArray(value) && value.id === id) return value
  for (const child of Object.values(value)) {
    const found = findFolder(child, id)
    if (found) return found
  }
  return null
}

export async function ensureBatchFolder(call, parentId, name) {
  const lookup = async () => {
    const tree = await call('media_list_folders', {})
    const parent = findFolder(tree, parentId)
    if (!parent) throw new Error(`Destination project folder ${parentId} does not exist`)
    return (parent.children || []).find((folder) => folder.name === name)
  }
  const existing = await lookup()
  if (existing) return existing.id
  try {
    const response = await call('media_create_folder', { name, parent: parentId })
    const folder = response.data ?? response
    if (!Number.isSafeInteger(folder.id) || folder.id < 1)
      throw new Error('Folder creation returned an invalid ID')
    return folder.id
  } catch (error) {
    // Another batch may have created this same sibling, or the response may have been lost.
    const created = await lookup()
    if (created) return created.id
    throw error
  }
}

export async function connectStrapiGateway(directory) {
  const url = process.env.STRAPI_OFFICIAL_MCP_URL
  const token = process.env.STRAPI_OFFICIAL_MCP_TOKEN
  if (!url || !token || !process.env.STRAPI_API_TOKEN || !process.env.STRAPI_REST_ENDPOINT) {
    throw new Error(
      'Configure STRAPI_OFFICIAL_MCP_URL, STRAPI_OFFICIAL_MCP_TOKEN, STRAPI_REST_ENDPOINT and STRAPI_API_TOKEN in the optimizer environment'
    )
  }
  const endpoint = new URL(url)
  if (
    endpoint.protocol !== 'https:' &&
    !(
      endpoint.protocol === 'http:' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(endpoint.hostname)
    )
  ) {
    throw new Error('Official MCP requires HTTPS (except literal loopback development URLs)')
  }
  const official = new Client({ name: 'optimizer-folder-manager', version: '1.0.0' })
  const uploader = new Client({ name: 'optimizer-uploader', version: '1.0.0' })
  const officialTransport = new StreamableHTTPClientTransport(endpoint, {
    requestInit: { headers: { Authorization: `Bearer ${token}` } }
  })
  const uploadTransport = new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL('../../strapi-mcp/src/index.js', import.meta.url))],
    // Keep dotenv from discovering the optimizer's credential-bearing .env file.
    cwd: directory,
    env: {
      PATH: process.env.PATH || '',
      STRAPI_REST_ENDPOINT: process.env.STRAPI_REST_ENDPOINT,
      STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
      // Prevent dotenv from printing to the MCP stdio protocol stream.
      DOTENV_CONFIG_QUIET: 'true'
    },
    stderr: 'inherit'
  })
  const close = async () => {
    await Promise.allSettled([
      official.close(),
      uploader.close(),
      officialTransport.close(),
      uploadTransport.close()
    ])
  }
  try {
    await official.connect(officialTransport)
    await uploader.connect(uploadTransport)
  } catch (error) {
    await close()
    throw error
  }
  const call = async (client, name, args) =>
    decodeToolResult(
      await client.callTool({ name, arguments: args }, undefined, { timeout: 120_000 })
    )
  return {
    ensureSubfolder: (parentId, name) =>
      ensureBatchFolder((tool, args) => call(official, tool, args), parentId, name),
    async validateFolder(id) {
      const folders = await call(official, 'media_list_folders', {})
      if (!hasFolder(folders, id)) throw new Error(`Destination media folder ${id} does not exist`)
    },
    upload: (filePath, fileInfo) =>
      call(uploader, 'upload_media', { filePaths: [filePath], fileInfo }),
    async move(ids, folder) {
      const response = await call(official, 'media_move_assets', { ids, folder })
      return response.data ?? response
    },
    close
  }
}
