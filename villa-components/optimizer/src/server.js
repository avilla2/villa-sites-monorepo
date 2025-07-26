import express from 'express'
import formidable from 'formidable'
import sharp from 'sharp'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import * as fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`
      <h2>Image Optimizer</h2>
      <form action="/optimize" enctype="multipart/form-data" method="post">
        <div>Output File Prefix: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
      </form>
    `)
})

app.post('/optimize', async (req, res, next) => {
  const form = formidable({})
  const basePath = path.join(__dirname, 'uploads')

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    const prefix = fields.title[0] || 'output'
    const validationsPromises = files.someExpressFiles.map(async (file, index) => {
      const fileName = `${basePath}/${prefix}_${index}.jpeg`
      try {
        const output = await sharp(file.filepath)
        .resize({ width: 1080 })
        .jpeg({
          quality: 100,
          chromaSubsampling: '4:4:4'
        })
        .toBuffer()
        fs.writeFile(fileName, output)
        return true
      } catch (e) {
        console.error('Failed to Optimize', fileName, e)
        return false;
      }
    })
    const validations = await Promise.all(validationsPromises)
    if (validations.some(val => val === false)) {
      res.send('Completed With Errors')
    } else {
      res.send('Successfully Optimized All Images')
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
