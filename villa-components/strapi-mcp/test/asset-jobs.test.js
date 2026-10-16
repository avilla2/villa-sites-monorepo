import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { AssetJobs, collectImages } from '../src/asset-jobs.js'
import { batchFolderName } from '../src/batch-folder.js'

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
  const calls = []
  const jobs = new AssetJobs(async (filePath, options) => {
    calls.push({ filePath, options })
    if (path.basename(filePath) === 'a.png') throw new Error('Unsupported input')
    return { status: 'dry-run', classification: { name: 'test' } }
  })
  const started = await jobs.start({ directory: root, instructions: 'Project images' })
  assert.equal(started.total, 2)
  await jobs.jobs.get(started.jobId).done
  const status = jobs.status(started.jobId, 0, 1)
  assert.equal(status.status, 'completed-with-issues')
  assert.deepEqual(status.counts, { failed: 1, 'dry-run': 1 })
  assert.equal(status.nextOffset, 1)
  assert.equal(jobs.status(started.jobId, 1, 1).results[0].status, 'dry-run')
  assert.ok(calls.every((call) => call.options.dryRun === true))
  assert.ok(calls.every((call) => call.options.subfolderName === started.subfolderName))
  assert.equal(started.subfolderName, batchFolderName())
})

test('job validation requires destination IDs for real uploads and validates options', async (t) => {
  const directory = await fixture(t)
  const jobs = new AssetJobs(async () => ({ status: 'completed' }))
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
  const jobs = new AssetJobs(async () => {
    await wait
    return { status: 'dry-run' }
  })
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
  const names = []
  const jobs = new AssetJobs(async (filePath, options) => {
    names.push(options.subfolderName)
    return { status: 'dry-run' }
  })
  const started = await jobs.start({
    directory,
    instructions: 'Upload the backyard remodel',
    subfolderName: 'Backyard Remodel'
  })
  await jobs.jobs.get(started.jobId).done
  assert.deepEqual(names, ['Backyard Remodel', 'Backyard Remodel'])
  assert.equal(jobs.status(started.jobId).subfolderName, 'Backyard Remodel')
})
