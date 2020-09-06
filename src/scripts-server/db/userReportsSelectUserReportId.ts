import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'

type userReportsSelectUserReportId = (userId: dbUserReport['userId']) => Promise<dbUserReport['userReportId'] | null>

const __path__ = 'src/scripts-server/db/userReportsSelectUserReportId.ts: '

export const userReportsSelectUserReportId: userReportsSelectUserReportId = async (userId) => {
  const { err, rowCount, rows } = await pgQuery<dbUserReport>(SQL/* language=SQL */ `
    SELECT "userReportId"
    FROM "userReports"
    WHERE "userId" = ${userId}
    ORDER BY "reportId" DESC
    LIMIT 1
  `)

  if (err) {
    logger.error(`${__path__}err: ${err.toString()}`)
    return null
  }

  if (!rowCount) {
    logger.error(`${__path__}!rowCount`)
    return null
  }

  if (!rows[0].userReportId) {
    logger.error(`${__path__}!rows[0].userReportId`)
    return null
  }

  return rows[0].userReportId
}
