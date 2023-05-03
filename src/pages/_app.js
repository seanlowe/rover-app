import { useReducer } from 'react'
import { roverReducer } from '@/utilities/reducers/roverReducer'
import RoverContext from '@/utilities/contexts/roverContext'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  const [ state, dispatch ] = useReducer( roverReducer, '' )

  return (
    <RoverContext.Provider value={{ state, dispatch }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </RoverContext.Provider>
  )
}
