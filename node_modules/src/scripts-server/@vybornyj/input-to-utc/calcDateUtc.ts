import { googleGetCoordinates } from 'src/scripts-server/@vybornyj/input-to-utc/googleGetCoordinates'
import { timezoneDbGetGmtOffset } from 'src/scripts-server/@vybornyj/input-to-utc/timezoneDbGetGmtOffset'
import { logger } from 'src/scripts-server/logger/logger'

type calcDateUtc = (
  googleApiKey: string,
  timezoneDbApiKey: string,
  date: {
    cityId: string
    year: number
    month: number
    day: number
    hours: number
    minutes: number
  }
) => Promise<Date | null>

export const calcDateUtc: calcDateUtc = async (googleApiKey, timezoneDbApiKey, { cityId, year, month, day, hours, minutes }) => {
  try {
    const coordinates = await googleGetCoordinates(googleApiKey, cityId)

    if (coordinates) {
      const timeStamp = new Date(Date.UTC(year, month - 1, day, hours, minutes)).getTime() / 1000

      const gmtOffset = await timezoneDbGetGmtOffset(timezoneDbApiKey, coordinates, timeStamp)

      if (gmtOffset) {
        const date = new Date((timeStamp - gmtOffset) * 1000)
        return new Date(
          Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
        )
      }
    }
  } catch (err) {
    logger.error(`src/scripts-server/input-to-utc/calcDateUtc.ts: ${err}`)
  }

  return null
}
