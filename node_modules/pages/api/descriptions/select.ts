import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { dbIdsAminoDeficit } from 'src/scripts/@sipium/enums/dbIdsAminoDeficit'
import { dbIdsAminoProducts } from 'src/scripts/@sipium/enums/dbIdsAminoProducts'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  descriptionsGroupName: string
}

interface ResponseBody {
  success?: string
  descriptions?: dbReportDescriptions
}

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { descriptionsGroupName } = req.body

  let descriptionIds = []
  switch (descriptionsGroupName) {
    case 'amino-deficit':
      descriptionIds = dbIdsAminoDeficit
      break
    case 'amino-products':
      descriptionIds = dbIdsAminoProducts
      break
    default:
  }

  const { err, rowCount, rows: descriptions } = await pgQuery<dbReportDescription>(SQL/* language=SQL */ `
    SELECT  "descriptionId", "descriptionRu", "descriptionEn"
    FROM    "reportDescriptions"
    WHERE   "descriptionId" = ANY(${descriptionIds})
    ORDER BY "id"
    LIMIT ${descriptionIds.length}
  `)

  if (!err) {
    if (rowCount) {
      res.status(200).send({ descriptions })
    } else {
      res.status(200).send({})
    }
  } else {
    res.status(200).send({})
  }
}

export default withSession(apiRoute)
