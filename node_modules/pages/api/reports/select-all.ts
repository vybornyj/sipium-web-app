import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  userId: number
}

interface ResponseBody {
  reports?: dbUserReports
}

const __path__ = 'pages/api/hd/select.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { userId } = req.body

  const { err, rows: reports } = await pgQuery<dbUserReport>(SQL/* language=SQL */ `
    SELECT "userReportId", "name", "birth", "cityName"
    FROM "userReports"
    WHERE "userId" = ${userId}
  `)

  if (!err) {
    res.status(200).json({ reports })
  } else {
    logger.error(`${__path__}err: ${err}`)
    await res.status(200).end()
  }
}

export default withSession(apiRoute)
