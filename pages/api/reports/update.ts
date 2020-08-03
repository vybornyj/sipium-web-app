import { getUtcDateParams } from 'deus-date'
import SQL from 'sql-template-strings'
import { calcDateUtc } from 'src/scripts-server/@vybornyj/input-to-utc/calcDateUtc'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  userReportId: dbUserReport['userReportId']
  birth: string
  name: dbUserReport['name']
  sex: dbUserReport['sex']
  physActivity: dbUserReport['physActivity']
  height: dbUserReport['height']
  weight: dbUserReport['weight']
}

interface ResponseBody {
  success?: true
}

const __path__ = 'pages/api/reports/update.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { userReportId, birth: newBirth, name, physActivity, height, weight } = req.body
  const { h: hours, mi: minutes } = getUtcDateParams(newBirth)

  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}

  const { err, rowCount, rows } = await pgQuery<dbUserReport>(SQL/* language=SQL */ `
    SELECT "birth", "cityId"
    FROM "userReports"
    WHERE  "userId" = ${userId} AND "userReportId" = ${userReportId}
    LIMIT 1
  `)

  if (!err) {
    if (rowCount) {
      // беру дату и время рождения из БД
      const birthDate = new Date(rows[0].birth)

      // устанавливаю время рождения из формы
      birthDate.setHours(Number(hours), Number(minutes))

      const birth = birthDate.toISOString()

      const personality = await calcDateUtc(process.env.API_KEY_GOOGLE, process.env.API_KEY_TIMEZONE_DB, rows[0].cityId, birth)

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
