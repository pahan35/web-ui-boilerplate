const express = require('express')
const path = require('path')

const indexRouter = require('./routes/index')

const app = express()

app.set('trust proxy', true)
app.use(express.json({limit: '11MB'}))
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, '../dist')))
app.use(indexRouter)

const server = app.listen(process.env.PORT || '4235')

server.on('error', console.error)
server.on('listening', () => {
  const {port} = server.address()
  console.log(`Listening on ${port}. Use http://localhost:${port}/ to browse it`)
})
