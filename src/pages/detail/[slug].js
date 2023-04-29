import Head from 'next/head'
import RoverDetail from '@/components/rover/detailView'
import { NoSsr } from '@mui/material'

export default function detailView() {
  return (
    <>
      <Head>
        <title>Rover Detail View</title>
      </Head>
      <main>
        <NoSsr>
          <RoverDetail />
        </NoSsr>
      </main>
    </>
  )
}
