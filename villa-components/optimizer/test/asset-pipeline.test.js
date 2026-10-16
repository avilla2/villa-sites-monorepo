import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import { classifyImage, parseClassification, parseCLIOutput } from '../src/classifier.js'
import { CROP_PRESETS, processAsset, validateAssetOptions } from '../src/asset-pipeline.js'
import { decodeToolResult } from '../src/strapi-gateway.js'

const metadata = {
  name: 'blue-test-image',
  alternativeText: 'A solid blue rectangle.',
  confidence: 0.98
}
const options = { instructions: 'Construction portfolio', folderId: 42, dryRun: false }

async function fixture(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'villa-pipeline-test-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const source = path.join(directory, 'source.png')
  await sharp({ create: { width: 600, height: 400, channels: 3, background: '#2266cc' } })
    .png()
    .toFile(source)
  return { directory, source }
}

test('metadata parser accepts fenced JSON and rejects unsafe slugs and invalid fields', () => {
  assert.deepEqual(parseClassification('```json\n' + JSON.stringify(metadata) + '\n```'), metadata)
  for (const invalid of [
    { name: '../escape' },
    { name: 'A bad name' },
    { confidence: 1.2 },
    { alternativeText: '' },
    { alternativeText: 'x'.repeat(251) }
  ])
    assert.throws(() => parseClassification(JSON.stringify({ ...metadata, ...invalid })))
  assert.throws(() => parseClassification('not json'))
})

test('CLI JSONL parser ignores nonmessage events, preserving unwrapped JSON', () => {
  const stdout = [
    { type: 'session.start', data: {} },
    { type: 'assistant.message', data: { content: JSON.stringify(metadata) } },
    { type: 'result', exitCode: 0 }
  ]
    .map((value) => JSON.stringify(value))
    .join('\n')
  assert.deepEqual(parseCLIOutput(stdout), metadata)
  assert.throws(() => parseCLIOutput(stdout.replace('"exitCode":0', '"exitCode":1')))
  assert.throws(() => parseCLIOutput('{}'))
})

test('CLI invocation uses attachment, zero-tool filter, JSON events and bounded execution', async () => {
  const result = await classifyImage(
    '/tmp/image/preview.jpg',
    'Ignore irrelevant image text',
    async (command, args, config) => {
      assert.ok(command)
      assert.ok(args.includes('--attachment'))
      assert.ok(args.includes('--available-tools=image_catalog_no_tools'))
      assert.ok(args.includes('--output-format'))
      assert.equal(config.cwd, '/tmp/image')
      assert.equal(config.timeout, 120_000)
      assert.equal(config.env.STRAPI_API_TOKEN, undefined)
      assert.equal(config.env.STRAPI_OFFICIAL_MCP_TOKEN, undefined)
      return {
        stdout: [
          JSON.stringify({
            type: 'assistant.message',
            data: { content: JSON.stringify(metadata) }
          }),
          JSON.stringify({ type: 'result', exitCode: 0 })
        ].join('\n')
      }
    }
  )
  assert.deepEqual(result, metadata)
})

test('options reject prototype crop keys, invalid folders and thresholds', () => {
  for (const override of [
    { folderId: null },
    { folderId: 0 },
    { cropTypes: ['toString'] },
    { cropTypes: [] },
    { minConfidence: NaN },
    { dryRun: 'false' }
  ])
    assert.throws(() => validateAssetOptions({ ...options, ...override }))
})

test('dry run creates all named JPEG crop dimensions and never connects to Strapi', async (t) => {
  const { directory, source } = await fixture(t)
  const result = await processAsset(
    source,
    directory,
    { ...options, dryRun: true },
    {
      classify: async () => metadata,
      connect: () => assert.fail('Dry run must not connect')
    }
  )
  assert.equal(result.status, 'dry-run')
  assert.equal(result.crops.length, 3)
  for (const crop of result.crops) {
    assert.match(crop.filename, /^blue-test-image-[a-f0-9]{8}-(square|tall|wide)\.jpg$/)
    const actual = await sharp(path.join(directory, crop.filename)).metadata()
    assert.equal(actual.width, CROP_PRESETS[crop.cropType].width)
    assert.equal(actual.height, CROP_PRESETS[crop.cropType].height)
    assert.equal(actual.format, 'jpeg')
  }
})

test('uncertain images are held without any uploads', async (t) => {
  const { directory, source } = await fixture(t)
  const result = await processAsset(source, directory, options, {
    classify: async () => ({ ...metadata, confidence: 0.5 }),
    connect: () => assert.fail('Low-confidence image must not upload')
  })
  assert.equal(result.status, 'needs-review')
})

test('moves only exact upload-returned asset IDs, never destination folder ID', async (t) => {
  const { directory, source } = await fixture(t)
  const calls = []
  let id = 100
  const result = await processAsset(source, directory, options, {
    classify: async () => metadata,
    connect: async () => ({
      validateFolder: async (folder) => calls.push(['validate', folder]),
      upload: async (filePath, fileInfo) => {
        assert.equal(fileInfo.alternativeText, metadata.alternativeText)
        return [{ id: ++id }]
      },
      move: async (ids, folder) => {
        calls.push(['move', ids, folder])
        return { moved: ids, failed: [] }
      },
      close: async () => calls.push(['close'])
    })
  })
  assert.equal(result.status, 'completed')
  assert.deepEqual(calls, [['validate', 42], ['move', [101, 102, 103], 42], ['close']])
  assert.ok(result.assets.every((asset) => asset.moved))
})

test('partial move failures preserve IDs and moved state', async (t) => {
  const { directory, source } = await fixture(t)
  let id = 100
  const result = await processAsset(source, directory, options, {
    classify: async () => metadata,
    connect: async () => ({
      validateFolder: async () => {},
      upload: async () => [{ id: ++id }],
      move: async () => ({ moved: [{ id: 101 }], failed: [{ id: 102 }, { id: 103 }] }),
      close: async () => {}
    })
  })
  assert.equal(result.status, 'partial')
  assert.deepEqual(
    result.assets.map((asset) => asset.moved),
    [true, false, false]
  )
})

test('upload failure retains already uploaded IDs without automatic retries', async (t) => {
  const { directory, source } = await fixture(t)
  let uploads = 0
  let closed = false
  const result = await processAsset(source, directory, options, {
    classify: async () => metadata,
    connect: async () => ({
      validateFolder: async () => {},
      upload: async () => {
        if (++uploads === 2) throw new Error('Upload failed')
        return [{ id: 888 }]
      },
      move: async () => assert.fail('Incomplete uploads should not be silently moved'),
      close: async () => {
        closed = true
      }
    })
  })
  assert.equal(result.status, 'partial')
  assert.equal(result.assets[0].id, 888)
  assert.equal(uploads, 2)
  assert.ok(closed)
})

test('missing folder prevents uploads', async (t) => {
  const { directory, source } = await fixture(t)
  const result = await processAsset(source, directory, options, {
    classify: async () => metadata,
    connect: async () => ({
      validateFolder: async () => {
        throw new Error('Folder not found')
      },
      upload: async () => assert.fail('Must not upload'),
      close: async () => {}
    })
  })
  assert.equal(result.status, 'failed')
  assert.deepEqual(result.assets, [])
})

test('MCP result decoding supports structured/text data and rejects tool errors', () => {
  assert.deepEqual(decodeToolResult({ structuredContent: { moved: [1] } }), { moved: [1] })
  assert.deepEqual(decodeToolResult({ content: [{ type: 'text', text: '[{"id":1}]' }] }), [
    { id: 1 }
  ])
  assert.throws(
    () => decodeToolResult({ isError: true, content: [{ type: 'text', text: 'Denied' }] }),
    /Denied/
  )
})
