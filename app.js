const http = require('http')
const { nanoid } = require('nanoid')
const EventEmitter = require('events')
const myEmitter = new EventEmitter()
require('dotenv').config()

const DELAY = process.env.DELAY || 1000
const LIMIT = process.env.LIMIT || 10
const PORT = process.env.PORT || 3000

const connections = {}
const app = http.createServer((req, res) => {
  console.log(req.url)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Transfer-Encoding', 'chunked')
  const id = nanoid()
  const user = {
    id,
    res,
    tick: 0,
    intervalTime: function () {
      const currentTime = logger(this.id, this.tick)
      this.tick++
      if (this.tick > LIMIT) {
        myEmitter.emit('remove', this.id)
        res.end(`${currentTime}`)
      }
    },
  }
  connections[id] = user
})

const logger = (id, tick) => {
  const date = new Date()
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const currentTime = date.toLocaleString('ru', options)
  console.log(`User: ${id}: ${currentTime}, tick: ${tick}`)
  return currentTime
}

const run = () => {
  Object.values(connections).map((user) => {
    user.res.write(`Please wait you current tick: ${user.tick} <br>`)
    user.intervalTime()
  })
}

setInterval(run, DELAY)

myEmitter.on('remove', (id) => {
  delete connections[id]
})

app.listen(PORT, () => {
  console.log(`Server on running on port ${PORT}`)
})
