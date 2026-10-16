import sharp from 'sharp'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { classifyImage } from './classifier.js'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { batchFolderName } from '../../strapi-mcp/src/batch-folder.js'

const execute = promisify(execFile)

export async function readableImage(sourcePath, directory, dependencies = {}) {
  try {
    // Force decoding: metadata alone does not detect missing HEVC codecs.
    await sharp(sourcePath).resize(1, 1).raw().toBuffer()
    return sourcePath
  } catch (error) {
    if ((dependencies.platform || process.platform) !== 'darwin' || !/\.hei[cf]$/i.test(sourcePath))
      throw error
    const converted = path.join(directory, 'decoded-source.png')
    await (dependencies.execute || execute)(
      '/usr/bin/sips',
      ['-s', 'format', 'png', sourcePath, '--out', converted],
      {
        timeout: 120_000,
        maxBuffer: 1024 * 1024
      }
    )
    return converted
  }
}

export const CROP_PRESETS = {
  square: { width: 1080, height: 1080 },
  tall: { width: 1080, height: 1350 },
  wide: { width: 1920, height: 1080 }
}

export function validateAssetOptions(options) {
  if (
    typeof options.instructions !== 'string' ||
    !options.instructions.trim() ||
    options.instructions.length > 2000
  ) {
    throw new Error('instructions must contain 1–2000 characters')
  }
  if (typeof options.dryRun !== 'boolean') throw new Error('dryRun must be a boolean')
  if (!options.dryRun && (!Number.isSafeInteger(options.folderId) || options.folderId < 1)) {
    throw new Error('An explicit destination media folderId is required for uploads')
  }
  const cropTypes = options.cropTypes ?? Object.keys(CROP_PRESETS)
  if (
    !Array.isArray(cropTypes) ||
    !cropTypes.length ||
    cropTypes.some((type) => !Object.hasOwn(CROP_PRESETS, type))
  ) {
    throw new Error('cropTypes must contain square, tall and/or wide')
  }
  const minConfidence = options.minConfidence ?? 0.8
  if (!Number.isFinite(minConfidence) || minConfidence < 0 || minConfidence > 1) {
    throw new Error('minConfidence must be between 0 and 1')
  }
  return {
    ...options,
    subfolderName: batchFolderName(options.subfolderName),
    cropTypes: [...new Set(cropTypes)],
    minConfidence
  }
}

export async function processAsset(sourcePath, directory, rawOptions, dependencies = {}) {
  const options = validateAssetOptions(rawOptions)
  const classify = dependencies.classify || classifyImage
  sourcePath = await readableImage(sourcePath, directory)
  // Normalize orientation and strip metadata; keep only a compact vision preview in context.
  const previewPath = path.join(directory, 'preview.jpg')
  await sharp(sourcePath)
    .rotate()
    .resize(1280, 1280, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(previewPath)
  const classification = await classify(previewPath, options.instructions)
  if (classification.confidence < options.minConfidence) {
    return {
      status: 'needs-review',
      classification,
      assets: [],
      message: 'Below the configured confidence threshold; nothing uploaded.'
    }
  }

  const crops = []
  const suffix = randomUUID().slice(0, 8)
  for (const cropType of options.cropTypes) {
    const filename = `${classification.name}-${suffix}-${cropType}.jpg`
    const filePath = path.join(directory, filename)
    const { width, height } = CROP_PRESETS[cropType]
    await sharp(sourcePath)
      .rotate()
      .resize(width, height, { fit: 'cover', position: sharp.strategy.attention })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(filePath)
    crops.push({ filename, filePath, cropType, width, height })
  }
  if (options.dryRun) {
    return {
      status: 'dry-run',
      parentFolderId: options.folderId,
      subfolderName: options.subfolderName,
      classification,
      crops: crops.map(({ filePath, ...crop }) => crop),
      assets: []
    }
  }

  const gateway = await dependencies.connect(directory)
  const assets = []
  let folderId
  const destination = () => ({
    parentFolderId: options.folderId,
    subfolderName: options.subfolderName,
    folderId
  })
  try {
    // Fail before upload if the official MCP server cannot validate the destination.
    folderId = await gateway.ensureSubfolder(options.folderId, options.subfolderName)
    for (const crop of crops) {
      const uploaded = await gateway.upload(crop.filePath, {
        name: crop.filename,
        alternativeText: classification.alternativeText
      })
      if (
        !Array.isArray(uploaded) ||
        uploaded.length !== 1 ||
        !Number.isSafeInteger(uploaded[0]?.id)
      ) {
        throw new Error(
          'Upload returned an invalid asset response; inspect the media library before retrying'
        )
      }
      assets.push({
        id: uploaded[0].id,
        cropType: crop.cropType,
        name: crop.filename,
        moved: false
      })
    }
    const movement = await gateway.move(
      assets.map((asset) => asset.id),
      folderId
    )
    const movedIds = new Set(
      (movement.moved || []).map((asset) => (typeof asset === 'number' ? asset : asset.id))
    )
    for (const asset of assets) asset.moved = movedIds.has(asset.id)
    if (assets.some((asset) => !asset.moved)) {
      return {
        status: 'partial',
        classification,
        assets,
        ...destination(),
        movement,
        message:
          'Some uploaded assets remain in the default folder. Retry ONLY their folder moves, not uploads.'
      }
    }
    return { status: 'completed', classification, assets, ...destination() }
  } catch (error) {
    return {
      status: assets.length ? 'partial' : 'failed',
      classification,
      assets,
      ...destination(),
      error: error.message,
      message:
        'Do not automatically retry uploads. Reconcile returned asset IDs and the media library first.'
    }
  } finally {
    await gateway.close()
  }
}
