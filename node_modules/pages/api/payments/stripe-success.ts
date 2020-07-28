import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  id: string
}

interface ResponseBody {
  success?: boolean
}

const __path__ = 'pages/api/payments/stripe-success.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { id } = req.body

  if (id) {
    const { rowCount } = await pgQuery<dbPayment>(SQL/* language=SQL */ `
      SELECT "email", "jcontainer"
      FROM "payments"
      WHERE "paymentId" = ${id} 
        AND "paid" = ${false}
      LIMIT 1
    `)

    if (rowCount) {
      const { rowCount: rowCount2 } = await pgQuery<dbPayment>(SQL/* language=SQL */ `
        UPDATE "payments"
        SET    "paid" = ${true}
        WHERE  "paymentId" = ${id}
      `)

      if (rowCount2) {
        await res.status(200).json({ success: true })
      }
    } else {
      await res.status(200).end()
      logger.warn(`${__path__}!rowCount`)
    }
  } else {
    await res.status(200).end()
    logger.warn(`${__path__}!id`)
  }
}

export default withSession(apiRoute)
