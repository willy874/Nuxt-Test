const fs = require('fs').promises
const path = require('path')
const app = require('express')()
const Cookies = require('js-cookie')

const getJson = async (filename, ext) => {
  const data = await fs.readFile(
    path.join(__dirname, 'data', filename + '.json')
  )
  return JSON.parse(data.toString())
}

const writeJson = async (filename, write) => {
  await fs.writeFile(
    path.join(__dirname, 'data', filename + '.json'),
    JSON.stringify(write)
  )
  return 'OK'
}

fs.readdir(path.join(__dirname, 'data')).then((files) => {
  files.forEach((file) => {
    if (/\.json$/.test(file)) {
      const arrFilename = file.split('.')
      const ext = arrFilename.splice(arrFilename.length - 1, 1)[0]
      const name = arrFilename.join('')

      app.get(`/${name}`, async (req, res) => {
        const data = await getJson(name, ext)
        res.send(data)
      })

      app.get(`/${name}/:id?`, async (req, res) => {
        const { id } = req.params
        const data = await getJson(name, id)
        res.send(data.find((p) => Number(p.id) === Number(id)))
      })

      app.get(`/${name}/search`, async (req, res) => {
        const { type, keyword } = req.query
        const data = await getJson(name)
        res.send(data.filter((p) => p[type] === keyword))
      })

      app.post(`/${name}`, async (req, res) => {
        const body = req.body
        const data = await getJson(name)
        const createId = Math.max(...data.map((p) => Number(p.id))) + 1
        body.id = createId
        data.push(body)
        await writeJson(data)
        res.send(body)
      })

      app.put(`/${name}/:id?`, async (req, res) => {
        const body = req.body
        const { id } = req.params
        const data = await getJson(name)
        const target = data.find((p) => Number(p.id) === Number(id))
        Object.keys(body).forEach((key) => {
          target[key] = body[key]
        })
        await writeJson(data)
        res.send()
      })

      app.delete(`/${name}/:id?`, async (req, res) => {
        const { id } = req.params
        const data = await getJson(name)
        const index = data.map((p) => Number(p.id)).indexOf(id)
        data.splice(index, 1)
        await writeJson(data)
        res.send()
      })
    }
  })
})

app.post('/token', (req, res) => {
  Cookies.set(req.body)
})

module.exports = {
  path: 'api',
  handler: app,
}
