import bcrypt from 'bcryptjs'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  email: dbUser['email']
  password: string
}

interface ResponseBody {
  isOk?: true
}

const __path__ = 'pages/api/auth/set-password.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    logger.warn(`${__path__}!email || !password`)
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
      if (!rows[0].password) {
        const hashedPassword = bcrypt.hashSync(password, 12)
        const { err: err2, rowCount: rowCount2, rows: rows2 } = await pgQuery<dbUser>(SQL/* language=SQL */ `
          UPDATE "users"
          SET    "password" = ${hashedPassword}
          WHERE  "email" = ${email}
          RETURNING "userId", "isAdmin"
        `)

        if (!err2 && rowCount2) {
          req.session.set('user', { userId: rows2[0].userId, isAdmin: rows2[0].isAdmin, email })
          await req.session.save()

          await res.status(200).json({ isOk: true })
        } else {
          logger.error(`${__path__}!rowCount2 || err2: ${err2}`)
          await res.status(200).end()
        }
      } else {
        logger.error(`${__path__}!!rows[0].password`)
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
