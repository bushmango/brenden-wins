import l from 'lodash'
import * as React from 'react'
import io from 'socket.io-client'
import useAnimationForever from '../lib/useAnimationForever'
import css from './Game.module.scss'

const socket = io('http://localhost:3001')

const chat: string[] = []

socket.on('chat', (msg: any) => {
  console.log('chat', 'msg', msg)
  chat.push('a message')
})

export const Game = () => {
  let frame = useAnimationForever()

  return (
    <div className={css.game}>
      game goes here {frame}
      <div>
        <input value={'1234'} />
        <button
          onClick={() => {
            socket.emit('chat', 'hello')
          }}
        >
          send
        </button>
      </div>
      <div>
        Messages:
        {l.forEach(chat, (c, cIdx) => (
          <div key={cIdx}>{c}</div>
        ))}
        <div></div>
      </div>
    </div>
  )
}
