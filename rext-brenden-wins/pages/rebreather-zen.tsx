import { NextPage } from 'next'
import * as React from 'react'
import { Rebreather } from '../components/Rebreather'
import { ScreenCenter } from '../components/ScreenCenter'
import { ClientOnly } from '../components/ClientOnly'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <Rebreather />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
