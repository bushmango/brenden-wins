import { NextPage } from 'next'
import * as React from 'react'
import { Game } from '../components/Game'
import { Layout } from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout title='Brenden always wins! by Brenden and StevieBushman'>
      <Game />
    </Layout>
  )
}

export default IndexPage
