import { googleGetCoordinates } from 'src/scripts-server/@vybornyj/input-to-utc/googleGetCoordinates'
import { timezoneDbGetGmtOffset } from 'src/scripts-server/@vybornyj/input-to-utc/timezoneDbGetGmtOffset'
import { logger } from 'src/scripts-server/logger/logger'

type calcDateUtc = (googleApiKey: string, timezoneDbApiKey: string, cityId: string, dateIsoString: string) => Promise<string | null>

export const calcDateUtc: calcDateUtc = async (googleApiKey, timezoneDbApiKey, cityId, dateIsoString) => {
  try {
    const coordinates = await googleGetCoordinates(googleApiKey, cityId)

    if (coordinates) {
      const timeStamp = new Date(dateIsoString).getTime() / 1000
      const gmtOffset = await timezoneDbGetGmtOffset(timezoneDbApiKey, coordinates, timeStamp)
      if (gmtOffset) return new Date((timeStamp - gmtOffset) * 1000).toISOString()
    }
  } catch (err) {
    logger.error(`src/scripts-server/input-to-utc/calcDateUtc.ts: ${err}`)
  }

  return null
}
