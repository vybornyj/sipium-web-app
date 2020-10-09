import { urlJoiner } from 'src/scripts-server/@vybornyj/input-to-utc/urlJoiner'
import { logger } from 'src/scripts-server/logger/logger'

type timezoneDbGetGmtOffset = (timezoneDbApiKey: string, coordinates: { lat: string; lng: string }, timestamp: number) => Promise<number | null>

export const timezoneDbGetGmtOffset: timezoneDbGetGmtOffset = async (timezoneDbApiKey, { lat, lng }, timeStamp) => {
  try {
    const response = await fetch(
      urlJoiner('https://api.timezonedb.com/v2.1/get-time-zone', [
        ['format', 'json'],
        ['by', 'position'],
        ['lat', lat],
        ['lng', lng],
        ['time', String(timeStamp)],
        ['key', timezoneDbApiKey],
      ]),
    )

    const responseJson: {
      status: string
      gmtOffset: number
    } = response ? await response.json() : {}

    if (responseJson.status === 'OK') {
      return responseJson.gmtOffset
    }
  } catch (err) {
    logger.error(`src/scripts-server/input-to-utc/timezoneDbGetGmtOffset.ts: ${err}`)
  }

  return null
}
