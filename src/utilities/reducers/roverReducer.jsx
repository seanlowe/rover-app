let RoverState = {
  max_date: '',
  name: '',
  total_photos: '',
}

export const roverReducer = ( state, action ) => {
  switch ( action.type ) {
  case 'setRover':
    console.log({ payload: action.payload })
    RoverState = {
      ...action.payload
    }

    return RoverState
  default:
    throw new Error( `No matching action defined in roverReducer (${type})` )
  }
}
