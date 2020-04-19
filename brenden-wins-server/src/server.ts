const log = (namespace: string, ...msg: any[]) => {
  console.log(namespace, ...msg)
}

import * as express from 'express'
import * as cors from 'cors'
const app = express()
app.use(cors())
import * as http from 'http'

// var http = require('http').createServer(app)
import * as socketIo from 'socket.io'

const server = http.createServer(app)
log('starting server')
server.listen(3001, () => {
  console.log('listening on *:3001')
  console.log('starting sockets')
  const io = socketIo(server, {
    handlePreflightRequest: (req, res) => {
      const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Origin': '*', //or the specific origin you want to give access to,
        'Access-Control-Allow-Credentials': true,
      }
      res.writeHead(200, headers)
      res.end()
    },
  })
  // Allow any origins (skip cors)
  // see: https://socket.io/docs/server-api/#server-origins-fn
  io.origins((origin, callback) => {
    callback(null, true)
  })
  io.on('connection', (socket) => {
    log('a user connected')

    socket.on('chat', (msg) => {
      log('chat', msg)
      io.emit('chat', msg)
    })

    socket.on('move', (name, x, y) => {
      log('move', name, x, y)
      io.emit('move', name, x, y)
    })
  })
  io.on('event', (data) => {
    log('a data event', data)
  })
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
