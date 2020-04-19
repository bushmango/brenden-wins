import l from 'lodash'
import * as React from 'react'
import socketIo from 'socket.io-client'
import useAnimationForever from '../lib/useAnimationForever'
import css from './Game.module.scss'

const io = socketIo('http://localhost:3001')

interface IPlayer {
  name: string
  x: number
  y: number
}
interface IState {
  chat: string[]
  chatMsg: string
  name: string
  players: IPlayer[]
}

let state: IState = {
  chat: [],
  chatMsg: '...',
  name: 'testo',
  players: [],
}

io.on('connection', () => {
  console.log('connected')
})
io.on('chat', (msg: any) => {
  console.log('chat', 'msg', msg)
  state.chat.push(msg)
})
io.on('move', (name: string, x: number, y: number) => {
  console.log('move', name, x, y)

  let player = l.find(state.players, (c) => c.name === name)
  if (!player) {
    player = {
      name,
      x,
      y,
    }
    state.players.push(player)
  }
  player.x = x
  player.y = y
})

export const Game = () => {
  let frame = useAnimationForever()

  let refBoard = React.useRef<HTMLDivElement>(null)

  const onMouseMove = (ev: React.MouseEvent<Element, MouseEvent>) => {
    // see: https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
    if (refBoard.current) {
      let rect = refBoard.current.getBoundingClientRect()
      let x = ev.clientX - rect.left //x position within the element.
      let y = ev.clientY - rect.top //y position within the element.
      io.emit('move', state.name, x, y)
    }
  }

  return (
    <div className={css.game}>
      <div>
        <input
          value={state.name}
          onChange={(ev) => {
            state.name = ev.target.value
          }}
        />
      </div>
      <div className={css.gameBoard} onMouseMove={onMouseMove} ref={refBoard}>
        <div className={css.gameBoardInner}>
          {l.map(state.players, (c, cIdx) => {
            return (
              <div
                key={cIdx}
                className={css.playerHand}
                style={{ left: c.x + 'px', top: c.y + 'px' }}
              >
                {c.name}
              </div>
            )
          })}
        </div>
      </div>

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

      <div>{frame}</div>
    </div>
  )
}
