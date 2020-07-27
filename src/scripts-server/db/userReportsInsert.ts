import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'

type userReportsInsert = (data: dbUserReport) => Promise<boolean>

const __path__ = 'src/scripts-server/db/userReportsInsert.ts: '

export const userReportsInsert: userReportsInsert = async data => {
  const { userReportId, userId, cityName, cityId, birth, personality, name, sex, physActivity, height, weight } = data

  const { err, rowCount } = await pgQuery<dbUserReport>(SQL/* language=SQL */ `
    INSERT INTO "userReports"
           ("userReportId", "userId", "cityName", "cityId", "birth", "personality", "name", "sex", "physActivity", "height", "weight")
    VALUES (${userReportId}, ${userId}, ${cityName}, ${cityId}, ${birth}, ${personality}, ${name}, ${sex}, ${physActivity}, ${height}, ${weight})
  `)

  if (err) {
    logger.error(`${__path__}err: ${err.toString()}`)
    return false
  }

  if (!rowCount) {
    logger.error(`${__path__}!rowCount`)
    return false
  }

  return true
}
