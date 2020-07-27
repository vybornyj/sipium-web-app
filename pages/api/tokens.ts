import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  token: string
}

interface ResponseBody {
  redirect?: string
  sessionDestroy?: true
}

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { token } = req.body

  const { err, rowCount, rows } = await pgQuery<dbToken>(SQL/* language=SQL */ `
    SELECT "tokenId", "email", "password", "type", "userId"
    FROM   "tokens"
    WHERE  "token" = ${token}
    LIMIT 1
  `)

  if (!err && rowCount) {
    if (rows[0].type === 'resetPassword') {
      const { err: err2 } = await pgQuery<dbUser>(SQL/* language=SQL */ `
        UPDATE "users"
        SET    "password" = ${null}
        WHERE  "email" = ${rows[0].email}
      `)
      const { err: err3 } = await pgQuery<dbToken>(SQL/* language=SQL */ `
        DELETE FROM "tokens"
        WHERE "token" = ${token}
      `)
      if (!err2 && !err3) {
        await res.status(200).json({ redirect: `/login?email=${rows[0].email}`, sessionDestroy: true })
      } else {
        await res.status(200).end()
      }
    } else {
      logger.error(`/api/tokens/select: unknown token type`)
      await res.status(200).end()
    }
  } else {
    logger.warn(`/api/tokens/select: token not found`)
    await res.status(200).end()
  }
}

export default withSession(apiRoute)
