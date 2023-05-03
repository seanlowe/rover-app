import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import { ROVERS_LIST_API as roverApi } from './helpers'
import RoverContext from '@/utilities/contexts/roverContext'

const RoversList = () => {
  const { state, dispatch } = useContext( RoverContext )
  const [ rovers, setRovers ] = useState( [] )
  const [ isLoading, setIsLoading ] = useState( false )
  const [ error, setError ] = useState( null )
  
  useEffect(() => {
    axios.get( roverApi )
      .then(( response ) => {
        setRovers( response.data.rovers )
      })
      .catch(( error ) => {
        setError( error )
      })
      .finally(() => {
        setIsLoading( false )
      })
  }, [] )

  const renderCamerasList = ( rover ) => {
    let cameras = rover.cameras
    let more = null
    if ( cameras.length > 5 ) {
      more = cameras.length - 5
      cameras = cameras.slice( 0, 5 )
    }

    let addOnMessage = ''
    if ( more ) {
      addOnMessage = ` ... plus ${more} more`
    }

    return (
      <Typography className='rover-info-item' color='textSecondary'>
        <strong>Cameras:</strong> {cameras.map(( camera ) => {
          return camera.full_name
        }).join( ', ' )}
        {addOnMessage}
      </Typography>
    )
  }
  
  return (
    <div>
      <Typography variant='h4' component='h1' gutterBottom>
        List of Rovers
      </Typography>
      <Typography variant='subtitle1' component='h4' gutterBottom>
        Click on a Rover&apos;s name to see pictures from it.
      </Typography>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <Grid container spacing={3}>
        {rovers.map(( rover ) => {
          const roverNamePath = `/detail/${rover.name.toLowerCase()}`
          const payload = {
            name: rover.name,
            max_date: rover.max_date,
            total_photos: rover.total_photos,
          }

          return (
            <Grid item xs={12} sm={6} md={4} key={rover.id}>
              <Card className='card'>
                <CardContent>
                  <Link
                    href={roverNamePath}
                    as={roverNamePath}
                    onClick={() => {
                      dispatch({ type: 'setRover', payload })
                    }}
                  >
                    <Typography className='rover-title' variant='h5' component='h2'>
                      {rover.name}
                    </Typography>
                  </Link>
                  <Typography className='rover-info-item' color='textSecondary'>
                    <strong>Landing date:</strong> {rover.landing_date}
                  </Typography>
                  <Typography className='rover-info-item' color='textSecondary'>
                    <strong>Launch date:</strong> {rover.launch_date}
                  </Typography>
                  <Typography className='rover-info-item' color='textSecondary'>
                    <strong>Total photos:</strong> {rover.total_photos}
                  </Typography>
                  {renderCamerasList( rover )}
                </CardContent>
              </Card>
            </Grid>
          ) 
        })}
      </Grid>
    </div>
  )
}

export default RoversList
