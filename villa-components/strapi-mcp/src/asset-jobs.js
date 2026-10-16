import { readdir, realpath } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import fetch from 'cross-fetch'
import FormData from 'form-data'

const IMAGE_EXTENSION = /\.(jpe?g|png|webp|avif|tiff?|heic|heif|gif)$/i

export async function collectImages(directory, recursive = false, limit = 1000) {
  const root = await realpath(directory)
  const result = []
  async function visit(current) {
    const entries = await readdir(current, { withFileTypes: true })
    entries.sort((a, b) => a.name.localeCompare(b.name))
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.isSymbolicLink()) continue
      const filePath = path.join(current, entry.name)
      if (entry.isDirectory() && recursive) await visit(filePath)
      if (entry.isFile() && IMAGE_EXTENSION.test(entry.name)) {
        result.push(filePath)
        if (result.length > limit)
          throw new Error(
            `Directory exceeds the ${limit}-image limit; split it into smaller batches`
          )
      }
    }
  }
  await visit(root)
  if (!result.length) throw new Error('No supported images found in the directory')
  return result
}

export async function submitAsset(filePath, options) {
  const token = process.env.ASSET_PIPELINE_TOKEN
  if (!token) throw new Error('Configure ASSET_PIPELINE_TOKEN in the Strapi MCP environment')
  const endpoint = new URL(process.env.IMAGE_OPTIMIZER_ENDPOINT || 'http://localhost:3000')
  if (
    endpoint.protocol !== 'https:' &&
    !(
      endpoint.protocol === 'http:' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(endpoint.hostname)
    )
  ) {
    throw new Error('Optimizer requires HTTPS except for literal loopback development URLs')
  }
  const form = new FormData()
  form.append('files', createReadStream(filePath), { filename: path.basename(filePath) })
  form.append('options', JSON.stringify(options))
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10 * 60 * 1000)
  try {
    const response = await fetch(`${endpoint.href.replace(/\/$/, '')}/api/assets`, {
      method: 'POST',
      headers: { ...form.getHeaders(), Authorization: `Bearer ${token}` },
      body: form,
      signal: controller.signal
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || `Optimizer returned HTTP ${response.status}`)
    if (!['completed', 'dry-run', 'needs-review', 'partial', 'failed'].includes(result.status)) {
      throw new Error('Optimizer returned an invalid asset status')
    }
    return result
  } finally {
    clearTimeout(timer)
    form.destroy()
  }
}

export class AssetJobs {
  constructor(submit = submitAsset) {
    this.jobs = new Map()
    this.submit = submit
  }

  async start(args) {
    if (!process.env.ASSET_PIPELINE_TOKEN && this.submit === submitAsset) {
      throw new Error('Configure ASSET_PIPELINE_TOKEN before starting an ingestion job')
    }
    if (typeof args.directory !== 'string' || !path.isAbsolute(args.directory))
      throw new Error('directory must be an absolute path')
    if (
      typeof args.instructions !== 'string' ||
      !args.instructions.trim() ||
      args.instructions.length > 2000
    )
      throw new Error('instructions must contain 1–2000 characters')
    if (args.dryRun !== undefined && typeof args.dryRun !== 'boolean')
      throw new Error('dryRun must be a boolean')
    if (args.recursive !== undefined && typeof args.recursive !== 'boolean')
      throw new Error('recursive must be a boolean')
    const dryRun = args.dryRun ?? true
    if (!dryRun && (!Number.isSafeInteger(args.folderId) || args.folderId < 1))
      throw new Error(
        'Resolve the requested destination to a numeric media folderId before uploading'
      )
    const cropTypes = args.cropTypes ?? ['square', 'tall', 'wide']
    if (
      !Array.isArray(cropTypes) ||
      !cropTypes.length ||
      cropTypes.some((type) => !['square', 'tall', 'wide'].includes(type))
    )
      throw new Error('Invalid cropTypes')
    const minConfidence = args.minConfidence ?? 0.8
    if (!Number.isFinite(minConfidence) || minConfidence < 0 || minConfidence > 1)
      throw new Error('Invalid minConfidence')
    // Reserve capacity before asynchronous directory traversal to avoid start races.
    if ([...this.jobs.values()].some((job) => job.status === 'running'))
      throw new Error('An ingestion job is already running in this MCP process')
    while (this.jobs.size >= 50) this.jobs.delete(this.jobs.keys().next().value)
    const job = {
      jobId: randomUUID(),
      status: 'running',
      total: 0,
      processed: 0,
      dryRun,
      startedAt: new Date().toISOString(),
      results: []
    }
    this.jobs.set(job.jobId, job)
    let sources
    try {
      sources = await collectImages(args.directory, args.recursive ?? false)
    } catch (error) {
      this.jobs.delete(job.jobId)
      throw error
    }
    job.total = sources.length
    const options = {
      instructions: args.instructions,
      folderId: args.folderId,
      dryRun,
      cropTypes,
      minConfidence
    }
    // Sequential per job limits subprocesses, image memory and request rate.
    job.done = this.run(job, sources, options)
    return this.status(job.jobId)
  }

  async run(job, sources, options) {
    for (const filePath of sources) {
      let result
      try {
        result = await this.submit(filePath, options)
      } catch (error) {
        result = {
          status: 'failed',
          error:
            error.name === 'AbortError'
              ? 'Optimizer timed out; outcome unknown. Inspect Strapi before retrying.'
              : error.message
        }
      }
      job.results.push({ source: path.basename(filePath), ...result })
      job.processed++
    }
    job.status = job.results.some((result) =>
      ['partial', 'failed', 'needs-review'].includes(result.status)
    )
      ? 'completed-with-issues'
      : 'completed'
    job.finishedAt = new Date().toISOString()
  }

  status(jobId, offset = 0, limit = 10) {
    const job = this.jobs.get(jobId)
    if (!job)
      throw new Error('Unknown job ID (jobs are local to this MCP process and expire on restart)')
    if (
      !Number.isSafeInteger(offset) ||
      offset < 0 ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 100
    )
      throw new Error('Invalid result pagination')
    const { results, done, ...summary } = job
    const counts = {}
    for (const result of results) counts[result.status] = (counts[result.status] || 0) + 1
    return {
      ...summary,
      counts,
      results: results.slice(offset, offset + limit),
      nextOffset: offset + limit < results.length ? offset + limit : null
    }
  }
}
