import l from 'lodash'
import * as React from 'react'
import socketIo from 'socket.io-client'
import useAnimationForever from '../lib/useAnimationForever'
import css from './Game.module.scss'

const io = socketIo('http://localhost:3001')

io.on('connection', () => {
  console.log('connected')
})
io.on('chat', (msg: any) => {
  console.log('chat', 'msg', msg)
  state.chat.push(msg)
})

interface IState {
  chat: string[]
  chatMsg: string
}

let state: IState = {
  chat: [],
  chatMsg: '...',
}

export const Game = () => {
  let frame = useAnimationForever()

  return (
    <div className={css.game}>
      game goes here {frame}
      <div>
        <input
          value={state.chatMsg}
          onChange={(ev) => {
            state.chatMsg = ev.target.value
          }}
        />
        <button
          onClick={() => {
            io.emit('chat', state.chatMsg)
          }}
        >
          send
        </button>
      </div>
      <div>
        Messages:
        {l.map(state.chat, (c, cIdx) => (
          <div key={cIdx}>{c}</div>
        ))}
        <div></div>
      </div>
    </div>
  )
}
