import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { format } from 'date-fns'
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { buildRoverDetailApi } from './helpers'
import RoverContext from '@/utilities/contexts/roverContext'

const RoverDetail = () => {
  const { state: roverState } = useContext( RoverContext )
  const router = useRouter()
  const [ photos, setPhotos ] = useState( [] )
  const [ page, setPage ] = useState( 1 )
  const [ totalPages, setTotalPages ] = useState(
    Math.floor( roverState?.total_photos / 25 )
  )
  const [ isLoading, setIsLoading ] = useState( false )
  const [ error, setError ] = useState( null )
  const [ selectedDate, setSelectedDate ] = useState( new Date())
  const [ currentApiUrl, setCurrentApiUrl ] = useState(
    buildRoverDetailApi( roverState?.name?.toLowerCase(), selectedDate, page )
  )

  useEffect(() => {
    if ( !roverState.name ) {
      // enhancement: add a toastr to notify the user why they were redirected.
      router.replace( '/' )
    }
  }, [] )

  useEffect(() => {
    if ( !roverState.name ) {
      return
    }

    axios.get( currentApiUrl )
      .then(( response ) => {
        const pictures = response.data.photos
        switch ( pictures.length ) {
        case 0:
          switch ( page ) {
          case 1:
            // we're on the first page and there are no results
            setPhotos( [] )
            setTotalPages( 1 )
            break
          default:
            break
          }
          break
        default:
          // we have results
          setPhotos( response.data.photos )
          break
        }
      })
      .catch(( error ) => {
        const apiErrorResponse = error?.response?.data?.errors
        if ( apiErrorResponse === 'Invalid Rover Name' ) {
          // this is first render and we may not have set a rover yet
          setError({ message: apiErrorResponse })
        } else {
          setError( error )
        }
      })
      .finally(() => {
        setIsLoading( false )
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentApiUrl ] )

  useEffect(() => {
    if ( !roverState.name ) {
      return
    }

    const apiUrl = buildRoverDetailApi( roverState?.name?.toLowerCase(), selectedDate, page )
    setCurrentApiUrl( apiUrl )
  }, [ selectedDate, page, roverState?.name ] )

  const handleDateChange = ( date ) => {
    // get total number of records on that date
    axios.get( buildRoverDetailApi( roverState?.name?.toLowerCase(), date ))
      .then(( response ) => {
        const pictures = response.data.photos
        setTotalPages( Math.floor( pictures.length / 25 ))
      })
      .catch(( error ) => {
        setError( error )
      })
      .finally(() => {
        setIsLoading( false )
      })

    // update the date
    setSelectedDate( date )
    setPage( 1 )
  }

  const renderError = () => {
    if ( error.message === 'Invalid Rover Name' ) {
      return null
    }
    return <p>Error: {error.message}</p>
  }

  const renderPhotos = () => {
    const formattedDate = format( selectedDate, 'yyyy-MM-dd' )
    if ( formattedDate > roverState?.max_date ) {
      return (
        <>
          <center className='no-photos'>
            Oops! It looks like there weren&apos;t any pictures taken after {roverState?.max_date}.
            Please pick another date.
          </center>
        </>
      )
    }

    if ( !photos.length && !isLoading ) {
      return (
        <>
          <center className='no-photos'>
            No photos to show from {selectedDate.toDateString()}. Please pick another date.
          </center>
        </>
      )
    }

    return (
      <>
        <Grid container spacing={3}>
          {photos.map(( photo ) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={photo.id}>
                <Card>
                  <CardMedia
                    component='img'
                    alt={photo.camera.full_name}
                    image={photo.img_src}
                  />
                  <CardContent>
                    <Typography variant='subtitle1' component='h2'>
                      {photo.camera.full_name}
                    </Typography>
                    <Typography color='textSecondary'>
                    Earth date: {photo.earth_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) 
          })}
        </Grid>
      </>
    )
  }
  
  return (
    <div>
      <Typography variant='h4' component='h1' gutterBottom>
        {roverState?.name} Photos
      </Typography>
      <div className='top-bar'>
        <Link href='/'>
          <Button 
            variant='outlined' 
            className='back-btn'
          >
            Back
          </Button>
        </Link>
        <DatePicker
          autoOk
          disableFuture
          variant='outlined'
          format='yyyy-MM-dd'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && renderError()}
      {renderPhotos()}
      <div className='pagination-bar'>
        <Button 
          variant='outlined'
          className='prev-btn'
          disabled={!!( isLoading || error || page === 1 )}
          onClick={() => {
            setPage(( page ) => {
              return page - 1
            })
          }}
        >
          Previous Page
        </Button>
        <Button 
          variant='outlined'
          className='next-btn'
          disabled={!!( isLoading || error || page > totalPages || !photos.length )}
          onClick={() => {
            setPage(( page ) => {
              return page + 1
            })
          }}
        >
          Next Page
        </Button>
      </div>
    </div>
  )
}

export default RoverDetail
