import test from 'node:test'
import assert from 'node:assert/strict'
import { app } from '../src/server.js'

test('asset endpoint rejects missing config, unauthorized callers and invalid options before AI work', async (t) => {
  const previous = process.env.ASSET_PIPELINE_TOKEN
  const server = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
  t.after(async () => {
    if (previous === undefined) delete process.env.ASSET_PIPELINE_TOKEN
    else process.env.ASSET_PIPELINE_TOKEN = previous
    await new Promise((resolve) => server.close(resolve))
  })
  const url = `http://127.0.0.1:${server.address().port}/api/assets`
  delete process.env.ASSET_PIPELINE_TOKEN
  assert.equal((await fetch(url, { method: 'POST' })).status, 503)
  process.env.ASSET_PIPELINE_TOKEN = 'test-secret'
  assert.equal((await fetch(url, { method: 'POST' })).status, 401)
  const form = new FormData()
  form.append('files', new Blob(['not-an-image']), 'image.jpg')
  form.append('options', JSON.stringify({ instructions: 'test', dryRun: false, folderId: 0 }))
  const response = await fetch(url, {
    method: 'POST',
    body: form,
    headers: { Authorization: 'Bearer test-secret' }
  })
  assert.equal(response.status, 400)
  assert.match((await response.json()).error, /folderId/)
})
