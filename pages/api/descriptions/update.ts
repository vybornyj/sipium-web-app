import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  descriptions: dbReportDescriptions
}

interface ResponseBody {
  success?: true
}

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { descriptions } = req.body

  await descriptions.map(async ({ descriptionId, descriptionEn, descriptionRu }) => {
    await pgQuery<dbReportDescription>(SQL/* language=SQL */ `
      UPDATE "reportDescriptions"
      SET "descriptionRu" = ${descriptionRu},
          "descriptionEn" = ${descriptionEn}        
      WHERE "descriptionId" = ${descriptionId}
    `)
  })

  res.status(200).send({ success: true })
}

export default withSession(apiRoute)
