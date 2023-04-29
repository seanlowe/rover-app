import Head from 'next/head'
import RoversList from '@/components/rover/list'

export default function Home() {
  return (
    <>
      <Head>
        <title>List of Rovers</title>
      </Head>
      <main className='rovers-list'>
        <RoversList />
      </main>
    </>
  )
}
