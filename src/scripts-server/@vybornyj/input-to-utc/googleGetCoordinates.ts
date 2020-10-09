import { urlJoiner } from 'src/scripts-server/@vybornyj/input-to-utc/urlJoiner'
import { logger } from 'src/scripts-server/logger/logger'

type googleGetCoordinates = (googleApiKey: string, place_id: string) => Promise<{ lat: string; lng: string } | null>

export const googleGetCoordinates: googleGetCoordinates = async (googleApiKey, place_id) => {
  try {
    const response = await fetch(
      urlJoiner('https://maps.googleapis.com/maps/api/geocode/json', [
        ['key', googleApiKey],
        ['place_id', place_id],
      ]),
    )

    const responseJson: {
      error_message?: string
      status: string
      results: {
        geometry: {
          location: {
            lat: string
            lng: string
          }
        }
      }[]
    } = response ? await response.json() : {}

    if (responseJson.status === 'OK') {
      return {
        lat: responseJson.results[0].geometry.location.lat,
        lng: responseJson.results[0].geometry.location.lng,
      }
    } else {
      logger.error(`src/scripts-server/input-to-utc/googleGetCoordinates.ts: ${responseJson.status}, ${responseJson.error_message}`)
      return null
    }
  } catch (err) {
    logger.error(`src/scripts-server/input-to-utc/googleGetCoordinates.ts: ${err}`)
    return null
  }
}
