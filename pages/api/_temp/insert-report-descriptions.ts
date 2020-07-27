// import SQL from 'sql-template-strings'
// import { pgQuery } from 'src/scripts-server/db/pgQuery'

import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface ResponseBody {
  success: boolean
  isPassword?: boolean
}

const apiRoute: ApiRoute<ResponseBody> = async (_, res) => {
  let success = false

  // const productArr = [{id: '', ru: '', en:''}]
  // const toInsert = productArr.map(el => ({
  //   descriptionId: 'amino-products-' + el.id,
  //   descriptionEn: el.ru,
  //   descriptionRu: el.ru
  // }))

  // const deficitArr = [{id: '', ru: '', en:''}]
  // const toInsert = deficitArr.map(el => ({
  //   descriptionId: 'amino-deficit-' + el.id,
  //   descriptionEn: el.ru,
  //   descriptionRu: el.ru
  // }))

  // const toInsert = [
  //   {
  //     descriptionId: `gate${Math.random().toString(10).substr(2)}`,
  //     descriptionEn: Math.random().toString(36).substr(2),
  //     descriptionRu: Math.random().toString(36).substr(2)
  //   },
  //   {
  //     descriptionId: `gate${Math.random().toString(10).substr(2)}`,
  //     descriptionEn: Math.random().toString(36).substr(2),
  //     descriptionRu: Math.random().toString(36).substr(2)
  //   }
  // ]

  // toInsert.map(async ({ descriptionId, descriptionEn, descriptionRu }) => {
  //   await pgQuery(SQL/* language=SQL */ `
  //     INSERT INTO "reportDescriptions"
  //            ("descriptionId", "descriptionEn", "descriptionRu")
  //     VALUES (${descriptionId}, ${descriptionEn}, ${descriptionRu})
  //   `)
  // })

  success = true
  await res.status(200).json({ success })
}

export default withSession(apiRoute)
