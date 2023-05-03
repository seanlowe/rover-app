import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { roverReducer } from '@/utilities/reducers/roverReducer'
import RoverContext from '@/utilities/contexts/roverContext'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  const [ state, dispatch ] = useReducer( roverReducer, '' )
  const router = useRouter()

  useEffect(() => {
    router.events.on( 'routeChangeError', () => {})

    return () => {
      router.events.off( 'routeChangeError', () => {})
    }
  }, [ router ] )

  return (
    <RoverContext.Provider value={{ state, dispatch }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </RoverContext.Provider>
  )
}
