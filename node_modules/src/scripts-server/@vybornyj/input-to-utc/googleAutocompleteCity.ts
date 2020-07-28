import { urlJoiner } from 'src/scripts-server/@vybornyj/input-to-utc/urlJoiner'
import { logger } from 'src/scripts-server/logger/logger'

type googleAutocompleteCity = (googleApiKey: string, city: string, language?: string) => Promise<{ cityName: string; cityId: string }[]>

export const googleAutocompleteCity: googleAutocompleteCity = async (googleApiKey, city, language = 'ru') => {
  try {
    const response = await fetch(
      urlJoiner('https://maps.googleapis.com/maps/api/place/autocomplete/json', [
        ['types', '(cities)'],
        ['language', language],
        ['key', googleApiKey],
        ['input', encodeURIComponent(city)]
      ])
    )

    const responseJson: {
      error_message?: string
      status: string
      predictions: {
        description: string
        place_id: string
      }[]
    } = response ? await response.json() : {}

    if (responseJson.status === 'OK') {
      let cities: {
        cityName: string
        cityId: string
      }[] = []

      responseJson.predictions.map(({ description, place_id }) => {
        cities = [...cities, { cityName: description, cityId: place_id }]
      })

      return cities
    } else {
      logger.error(`src/scripts-server/input-to-utc/googleAutocompleteCity.ts: ${responseJson.status}, ${responseJson.error_message}`)
      return []
    }
  } catch (err) {
    logger.error(`src/scripts-server/input-to-utc/googleAutocompleteCity.ts: ${err}`)
    return []
  }
}
