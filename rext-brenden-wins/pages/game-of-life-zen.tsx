import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/ClientOnly'
import { GameOfLife } from '../components/GameOfLife'
import { ScreenCenter } from '../components/ScreenCenter'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <GameOfLife full={true} />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
