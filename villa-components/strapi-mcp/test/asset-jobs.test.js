import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { AssetJobs, collectImages } from '../src/asset-jobs.js'
import { batchFolderName } from '../src/batch-folder.js'

async function mockOptimizer(t, respond = () => ({ status: 'dry-run' })) {
  const previousEndpoint = process.env.IMAGE_OPTIMIZER_ENDPOINT
  const previousToken = process.env.ASSET_PIPELINE_TOKEN
  const requests = []
  const server = createServer(async (request, response) => {
    const chunks = []
    for await (const chunk of request) chunks.push(chunk)
    const body = Buffer.concat(chunks)
    requests.push({ headers: request.headers, body: body.toString() })
    const result = await respond(request, body)
    response.writeHead(result.httpStatus ?? 200, { 'content-type': 'application/json' })
    response.end(JSON.stringify(result.body ?? result))
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  process.env.IMAGE_OPTIMIZER_ENDPOINT = `http://127.0.0.1:${server.address().port}`
  process.env.ASSET_PIPELINE_TOKEN = 'test-pipeline-token'
  t.after(() => {
    if (previousEndpoint === undefined) delete process.env.IMAGE_OPTIMIZER_ENDPOINT
    else process.env.IMAGE_OPTIMIZER_ENDPOINT = previousEndpoint
    if (previousToken === undefined) delete process.env.ASSET_PIPELINE_TOKEN
    else process.env.ASSET_PIPELINE_TOKEN = previousToken
  })
  t.after(() => new Promise((resolve) => server.close(resolve)))
  return requests
}

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'villa-job-test-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await mkdir(path.join(root, 'nested'))
  for (const name of ['b.JPG', 'a.png', '.hidden.jpg', 'notes.txt', 'nested/c.webp'])
    await writeFile(path.join(root, name), 'fixture')
  await symlink(path.join(root, 'a.png'), path.join(root, 'linked.png'))
  return root
}

test('directory scanning is deterministic, skips hidden files and symlinks, supports recursion and limits', async (t) => {
  const root = await fixture(t)
  assert.deepEqual(
    (await collectImages(root)).map((file) => path.basename(file)),
    ['a.png', 'b.JPG']
  )
  assert.equal((await collectImages(root, true)).length, 3)
  await assert.rejects(() => collectImages(root, true, 2), /exceeds/)
})

test('jobs default to dry run, process sequentially, retain individual failures and paginate', async (t) => {
  const root = await fixture(t)
  const requests = await mockOptimizer(t, (_request, body) => {
    if (body.toString().includes('filename="a.png"')) {
      return { httpStatus: 422, body: { error: 'Unsupported input' } }
    }
    return { status: 'dry-run', classification: { name: 'test' } }
  })
  const jobs = new AssetJobs(process.env.ASSET_PIPELINE_TOKEN)
  const started = await jobs.start({ directory: root, instructions: 'Project images' })
  assert.equal(started.total, 2)
  await jobs.jobs.get(started.jobId).done
  const status = jobs.status(started.jobId, 0, 1)
  assert.equal(status.status, 'completed-with-issues')
  assert.deepEqual(status.counts, { failed: 1, 'dry-run': 1 })
  assert.equal(status.nextOffset, 1)
  assert.equal(jobs.status(started.jobId, 1, 1).results[0].status, 'dry-run')
  assert.equal(requests.length, 2)
  assert.ok(requests.every((request) => request.body.includes('"dryRun":true')))
  assert.ok(
    requests.every((request) => request.body.includes(`"subfolderName":"${started.subfolderName}"`))
  )
  assert.equal(started.subfolderName, batchFolderName())
})

test('job validation requires destination IDs for real uploads and validates options', async (t) => {
  const directory = await fixture(t)
  await mockOptimizer(t)
  const jobs = new AssetJobs(process.env.ASSET_PIPELINE_TOKEN)
  for (const invalid of [
    { dryRun: false },
    { directory: 'relative' },
    { cropTypes: ['constructor'] },
    { minConfidence: 3 },
    { recursive: 'yes' },
    { subfolderName: '../escape' },
    { subfolderName: '' },
    { instructions: '' }
  ])
    await assert.rejects(() => jobs.start({ directory, instructions: 'Images', ...invalid }))
  assert.throws(() => jobs.status('missing'), /Unknown job/)
})

test('active jobs reject concurrent starts before traversal races', async (t) => {
  const directory = await fixture(t)
  let release
  const wait = new Promise((resolve) => {
    release = resolve
  })
  await mockOptimizer(t, async () => {
    await wait
    return { status: 'dry-run' }
  })
  const jobs = new AssetJobs(process.env.ASSET_PIPELINE_TOKEN)
  const first = jobs.start({ directory, instructions: 'Images' })
  await assert.rejects(() => jobs.start({ directory, instructions: 'Images' }), /already running/)
  const started = await first
  release()
  await jobs.jobs.get(started.jobId).done
  assert.equal(jobs.status(started.jobId).status, 'completed')
})

test('batch naming uses month and year by default and accepts prompt-inferred names', () => {
  assert.equal(batchFolderName(undefined, new Date(2026, 9, 15)), 'October 2026')
  assert.equal(batchFolderName('  Patio Renovation  '), 'Patio Renovation')
  for (const value of ['', 'a/b', 'a\\b', '.', '..', 'a\nb', 'x'.repeat(101), null]) {
    assert.throws(() => batchFolderName(value), /subfolderName/)
  }
})

test('every image receives the same explicit batch subfolder', async (t) => {
  const directory = await fixture(t)
  const requests = await mockOptimizer(t)
  const jobs = new AssetJobs(process.env.ASSET_PIPELINE_TOKEN)
  const started = await jobs.start({
    directory,
    instructions: 'Upload the backyard remodel',
    subfolderName: 'Backyard Remodel'
  })
  await jobs.jobs.get(started.jobId).done
  assert.equal(requests.length, 2)
  assert.ok(
    requests.every((request) => request.body.includes('"subfolderName":"Backyard Remodel"'))
  )
  assert.equal(jobs.status(started.jobId).subfolderName, 'Backyard Remodel')
})

test('jobs pass the configured pipeline token to every submission', async (t) => {
  const directory = await fixture(t)
  const requests = await mockOptimizer(t, (_request) => ({ status: 'completed' }))
  process.env.ASSET_PIPELINE_TOKEN = 'configured-token'
  const jobs = new AssetJobs(process.env.ASSET_PIPELINE_TOKEN)
  const started = await jobs.start({
    directory,
    instructions: 'Upload project images',
    dryRun: false,
    folderId: 26
  })
  await jobs.jobs.get(started.jobId).done
  assert.equal(requests.length, 2)
  assert.ok(
    requests.every((request) => request.headers.authorization === 'Bearer configured-token')
  )
})
