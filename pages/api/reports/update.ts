import SQL from 'sql-template-strings'
import { calcDateUtc } from 'src/scripts-server/@vybornyj/input-to-utc/calcDateUtc'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  userReportId: number
  day: number
  month: number
  year: number
  hours: number
  minutes: number
  name: string
  sex: dbUserReport['sex']
  physActivity: number
  height: string
  weight: string
}

interface ResponseBody {
  success?: true
}

const __path__ = 'pages/api/reports/update.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { userReportId, hours, minutes, name, physActivity, height, weight } = req.body
  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}

  const { err, rowCount, rows } = await pgQuery<dbUserReport>(SQL/* language=SQL */ `
    SELECT "birth", "cityId"
    FROM "userReports"
    WHERE  "userId" = ${userId} AND "userReportId" = ${userReportId}
    LIMIT 1
  `)

  if (!err) {
    if (rowCount) {
      const birth = new Date(rows[0].birth)
      birth.setHours(hours, minutes)

      const personality = await calcDateUtc(process.env.API_KEY_GOOGLE, process.env.API_KEY_TIMEZONE_DB, {
        cityId: rows[0].cityId,
        day: birth.getDate(),
        month: birth.getMonth() + 1,
        year: birth.getFullYear(),
        hours: birth.getHours(),
        minutes: birth.getMinutes()
      })

      if (personality) {
        // обновляю отчет в БД
        const { err: err2 } = await pgQuery<dbUserReport>(SQL/* language=SQL */ `
          UPDATE "userReports"
          SET    "birth" = ${birth},
                 "personality" = ${personality},
                 "name" = ${name},
                 "physActivity" = ${physActivity},
                 "height" = ${height},
                 "weight" = ${weight}
          WHERE  "userId" = ${userId} AND "userReportId" = ${userReportId}
        `)

        if (!err2) {
          await res.status(200).json({ success: true })
        } else {
          logger.error(`${__path__}err2: ${err2}`)
          await res.status(200).end()
        }
      } else {
        logger.error(`${__path__}!personality`)
        await res.status(200).end()
      }
    } else {
      logger.error(`${__path__}!rowCount`)
      await res.status(200).end()
    }
  } else {
    logger.error(`${__path__}err: ${err}`)
    await res.status(200).end()
  }
}

export default withSession(apiRoute)
