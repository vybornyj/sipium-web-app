import SQL from 'sql-template-strings'
import { sipiumGates } from 'src/scripts-server/@vybornyj/human-design/sipiumGates'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { dbIdsAminoDeficit } from 'src/scripts/@sipium/enums/dbIdsAminoDeficit'
import { dbIdsAminoProducts } from 'src/scripts/@sipium/enums/dbIdsAminoProducts'
import { sipiumCalculation } from 'src/scripts/@sipium/sipiumCalculation'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  userReportId: number
  userId: number
  full: boolean
}

interface ResponseBody {
  sipiumCalc?: sipiumCalc
  aminoData?: dbReportDescriptions
  userReportDbData?: {
    cityName?: dbUserReport['cityName']
    birth?: dbUserReport['birth']
    personality?: dbUserReport['personality']
    name?: dbUserReport['name']
    sex?: dbUserReport['sex']
    physActivity?: dbUserReport['physActivity']
    height?: dbUserReport['height']
    weight?: dbUserReport['weight']
    hours?: number
    minutes?: number
  }
}

const __path__ = 'pages/api/hd/select.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { userReportId, userId, full } = req.body

  const { err, rows } = await pgQuery<dbUserReport>(SQL/* language=SQL */ `
    SELECT "personality", "cityName", "birth", "name", "sex", "physActivity", "height", "weight"
    FROM "userReports"
    WHERE "userId" = ${userId} AND "userReportId" = ${userReportId}
    LIMIT 1
  `)

  if (err) {
    logger.error(`${__path__}err: ${err}`)
    await res.status(200).end()
    return
  } else {
    const { personality, name, birth, sex, physActivity, height, weight } = rows[0] // todo: вывести на клиент: cityName, birth

    const day = personality.getDate()
    const month = personality.getMonth() + 1
    const year = personality.getFullYear()
    const hours = personality.getHours()
    const minutes = personality.getMinutes()

    const sipiumCalc = sipiumCalculation({
      designMandalaActivations: await sipiumGates({ day, month, year, hours, minutes }),
      reportData: {
        name,
        day,
        month,
        year,
        hours,
        minutes,
        sex,
        physActivity,
        height,
        weight
      }
    })

    let descriptionIds

    if (full) {
      descriptionIds = [...dbIdsAminoDeficit, ...dbIdsAminoProducts]
    } else {
      const { aminoacids } = sipiumCalc.food
      descriptionIds = [...aminoacids.map(el => `amino-products-${el}`), ...aminoacids.map(el => `amino-deficit-${el}`)]
    }

    const { err: err2, rows: aminoData } = await pgQuery<dbReportDescription>(SQL/* language=SQL */ `
      SELECT  "descriptionId", "descriptionEn", "descriptionRu"
      FROM    "reportDescriptions"
      WHERE   "descriptionId" = ANY(${descriptionIds})
    `)

    if (!err2) {
      res.status(200).json({
        sipiumCalc,
        aminoData,
        userReportDbData: {
          ...rows[0],
          hours: birth.getHours(),
          minutes: birth.getMinutes()
        }
      })
    } else {
      logger.error(`${__path__}err: ${err}`)
      await res.status(200).end()
    }
  }
}

export default withSession(apiRoute)
