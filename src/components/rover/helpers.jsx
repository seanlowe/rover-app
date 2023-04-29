import { format } from 'date-fns'

const API_BASE = 'https://api.nasa.gov/mars-photos/api/v1/rovers'
// typically this would go in an env file but in the interest of making things work
// easily, I'll just leave it in here.
const apikey = '8hh5wY89tlwHL2OSLWKvzJl9bDvYtttryjzAmh08'

export const ROVERS_LIST_API = `${API_BASE}/?api_key=${apikey}`

/**
 * Retrieves photos from the NASA Rover API
 * 
 * @param {String} name - name of the rover we want to look up. Should be lowercase
 * @param {Date} date - the date that we want pictures from
 * @param {Int} page - the page number we're retrieving
 */
export const buildRoverDetailApi = ( name, date, page = null ) => {
  const formattedDate = format( date, 'yyyy-MM-dd' )
  let url = `${API_BASE}/${name}/photos?&api_key=${apikey}&earth_date=${formattedDate}`

  if ( page ) {
    url += `&page=${page}`
  }

  return url
}
