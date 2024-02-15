const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
app.use(express.static('public'))
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  setInterval(() => socket.send(JSON.stringify({ message: Date.now() })), 1000)
  socket.on('message', (message) => page.dispatchEvent('output', message))
})

server.listen(80)
