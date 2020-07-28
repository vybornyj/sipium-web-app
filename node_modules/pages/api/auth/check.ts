import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  email: dbUser['email']
}

interface ResponseBody {
  isEmail?: boolean
  isPassword?: boolean
}

const __path__ = 'pages/api/auth/check.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { email } = req.body

  if (!email) {
    logger.warn(`${__path__}!email`)
    await res.status(200).end()
    return
  }

  const { err, rowCount, rows } = await pgQuery<dbUser>(SQL/* language=SQL */ `
    SELECT "password"
    FROM "users"
    WHERE "email" = ${email}
    LIMIT 1
  `)

  if (!err) {
    if (rowCount) {
      await res.status(200).json({ isEmail: true, isPassword: !!rows[0].password })
    } else {
      await res.status(200).json({ isEmail: false })
    }
  } else {
    logger.error(`${__path__}err: ${err}`)
    await res.status(200).end()
  }
}

export default withSession(apiRoute)
