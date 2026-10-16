import test from 'node:test'
import assert from 'node:assert/strict'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { fileURLToPath } from 'node:url'

test('real stdio MCP server advertises both ingestion tools and validates calls', async (t) => {
  const client = new Client({ name: 'ingestion-test', version: '1.0.0' })
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL('../src/index.js', import.meta.url))],
    env: { ASSET_PIPELINE_TOKEN: 'test-only-secret', DOTENV_CONFIG_QUIET: 'true' },
    stderr: 'pipe'
  })
  t.after(async () => {
    await client.close()
    await transport.close()
  })
  await client.connect(transport)
  const { tools } = await client.listTools()
  const ingestion = tools.find((tool) => tool.name === 'ingest_asset_directory')
  assert.ok(ingestion)
  assert.equal(ingestion.inputSchema.properties.dryRun.default, true)
  assert.ok(tools.some((tool) => tool.name === 'get_asset_ingestion_job'))
  const response = await client.callTool({
    name: 'get_asset_ingestion_job',
    arguments: { jobId: 'not-a-job' }
  })
  assert.equal(response.isError, true)
  assert.match(response.content[0].text, /Unknown job ID/)
})
