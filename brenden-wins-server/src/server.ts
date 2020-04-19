const log = (namespace: string, ...msg: any[]) => {
  console.log(namespace, ...msg)
}

import * as express from 'express'
const app = express()

import * as http from 'http'

const server = http.createServer(app)
log('starting server')
server.listen(3001, () => {
  console.log('listening on *:3001')
})

// var http = require('http').createServer(app)
import * as socketIo from 'socket.io'
const io = socketIo(http)
io.on('connection', (socket) => {
  log('a user connected')
})

let state = {
  type: 'state',
  room: 'XYAB',
  another: 'thing',
}

app.get('/', (req, res) => {
  res.send('Brenden always wins server 1.0!')
})
app.get('/state', (req, res) => {
  res.json(state)
})
app.get('/state2', (req, res) => {
  res.send(`<pre>${JSON.stringify(state, null, 2)}</pre>`)
})
