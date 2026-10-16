import express from 'express'
import formidable from 'formidable'
import sharp from 'sharp'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import * as fs from 'node:fs/promises'
import os from 'node:os'
import { randomUUID, timingSafeEqual } from 'node:crypto'
import { CROP_PRESETS, processAsset, validateAssetOptions } from './asset-pipeline.js'
import { connectStrapiGateway } from './strapi-gateway.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const app = express()
const port = Number(process.env.PORT || 3000)
const uploadsPath = path.join(__dirname, 'uploads')

let activeAssets = 0

// Credential-protected because this endpoint spends AI credits and writes to Strapi.
app.post('/api/assets', async (req, res, next) => {
  const token = process.env.ASSET_PIPELINE_TOKEN
  if (!token)
    return res
      .status(503)
      .json({ error: 'Asset pipeline is disabled: configure ASSET_PIPELINE_TOKEN' })
  const received = Buffer.from(req.headers.authorization || '')
  const expected = Buffer.from(`Bearer ${token}`)
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (activeAssets >= 2)
    return res.status(429).json({ error: 'Optimizer is busy; no upload was processed' })
  activeAssets++
  let directory
  try {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'villa-asset-'))
    const form = formidable({
      uploadDir: directory,
      keepExtensions: true,
      maxFiles: 1,
      maxFileSize: 50 * 1024 * 1024,
      maxTotalFileSize: 50 * 1024 * 1024,
      maxFieldsSize: 8192
    })
    const [fields, files] = await form.parse(req)
    const sources = files.files || []
    if (sources.length !== 1)
      return res.status(400).json({ error: 'Upload exactly one image in files' })
    let options
    try {
      options = validateAssetOptions(JSON.parse(fields.options?.[0] || '{}'))
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
    const result = await processAsset(sources[0].filepath, directory, options, {
      connect: connectStrapiGateway
    })
    res.json(result)
  } catch (error) {
    next(error)
  } finally {
    activeAssets--
    if (directory) await fs.rm(directory, { recursive: true, force: true })
  }
})

app.use('/uploads', express.static(uploadsPath, { fallthrough: false }))

app.get('/', (req, res) => {
  res.send(`
    <h2>Image Optimizer</h2>
    <form action="/optimize" enctype="multipart/form-data" method="post">
      <div>Images: <input type="file" name="files" accept="image/*" multiple required /></div>
      <fieldset>
        <legend>Crop formats (JPEG)</legend>
        <label><input type="checkbox" name="cropTypes" value="square" checked /> Square (1080×1080)</label><br />
        <label><input type="checkbox" name="cropTypes" value="tall" checked /> Tall (1080×1350)</label><br />
        <label><input type="checkbox" name="cropTypes" value="wide" checked /> Wide (1920×1080)</label>
      </fieldset>
      <input type="submit" value="Generate Crops" />
    </form>
  `)
})

async function handleCropRequest(req, res, next, htmlResponse = false) {
  const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'villa-image-optimizer-'))
  const form = formidable({
    uploadDir: tempDirectory,
    keepExtensions: true,
    multiples: true,
    maxFiles: 20,
    maxFileSize: 50 * 1024 * 1024
  })

  form.parse(req, async (error, fields, files) => {
    try {
      if (error) throw error

      const sourceFiles = files.files
        ? Array.isArray(files.files)
          ? files.files
          : [files.files]
        : []
      if (!sourceFiles.length) {
        res.status(400).json({ error: 'Upload at least one image in the files field.' })
        return
      }

      let requestedTypes = fields.cropTypes
        ? Array.isArray(fields.cropTypes)
          ? fields.cropTypes
          : [fields.cropTypes]
        : Object.keys(CROP_PRESETS)
      if (requestedTypes.length === 1 && String(requestedTypes[0]).startsWith('[')) {
        try {
          requestedTypes = JSON.parse(requestedTypes[0])
        } catch {
          requestedTypes = []
        }
      }
      if (!Array.isArray(requestedTypes)) requestedTypes = []
      const cropTypes = [...new Set(requestedTypes.map(String))]
      const invalidTypes = cropTypes.filter((type) => !Object.hasOwn(CROP_PRESETS, type))
      if (!cropTypes.length || invalidTypes.length) {
        res.status(400).json({
          error: `Select one or more crop types: ${Object.keys(CROP_PRESETS).join(', ')}.`
        })
        return
      }

      const jobId = randomUUID()
      const jobDirectory = path.join(uploadsPath, jobId)
      await fs.mkdir(jobDirectory, { recursive: true })
      const crops = []

      for (let fileIndex = 0; fileIndex < sourceFiles.length; fileIndex++) {
        const source = sourceFiles[fileIndex]
        const sourceStem =
          path
            .parse(source.originalFilename || `image-${fileIndex + 1}`)
            .name.replace(/[^a-zA-Z0-9_-]+/g, '-')
            .replace(/^-+|-+$/g, '') || `image-${fileIndex + 1}`

        for (const cropType of cropTypes) {
          const { width, height } = CROP_PRESETS[cropType]
          const filename = `${fileIndex + 1}-${sourceStem}-${cropType}.jpg`
          const outputPath = path.join(jobDirectory, filename)
          const result = await sharp(source.filepath)
            .rotate()
            .resize(width, height, { fit: 'cover', position: sharp.strategy.attention })
            .jpeg({ quality: 82, mozjpeg: true })
            .toFile(outputPath)

          crops.push({
            sourceName: source.originalFilename,
            cropType,
            filename,
            url: `/uploads/${jobId}/${filename}`,
            width: result.width,
            height: result.height,
            size: result.size,
            mime: 'image/jpeg'
          })
        }
      }

      if (htmlResponse) {
        res
          .type('html')
          .send(
            `Generated ${crops.length} JPEG crop(s):<ul>${crops
              .map(
                (crop) =>
                  `<li><a href="${crop.url}">${crop.filename}</a> (${crop.width}×${crop.height})</li>`
              )
              .join('')}</ul><p><a href="/">Generate more</a></p>`
          )
      } else {
        res.json({ crops })
      }
    } catch (requestError) {
      next(requestError)
    } finally {
      await fs.rm(tempDirectory, { recursive: true, force: true })
    }
  })
}

app.post('/api/crops', (req, res, next) => handleCropRequest(req, res, next))
app.post('/optimize', (req, res, next) => handleCropRequest(req, res, next, true))

app.use((error, req, res, next) => {
  console.error('Image optimization failed:', error)
  if (res.headersSent) return next(error)
  res.status(500).json({ error: error.message || 'Image optimization failed.' })
})

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  app.listen(port, process.env.HOST || '127.0.0.1', () => {
    console.log(`Image optimizer listening on http://localhost:${port}`)
  })
}
