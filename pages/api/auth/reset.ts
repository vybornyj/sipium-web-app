import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { sendMailResetPassword } from 'src/scripts-server/mails/sendMailResetPassword'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { generateToken } from 'src/scripts/helpers/generateToken'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  email: dbUser['email']
  password: string
}

interface ResponseBody {
  mailIsSend?: boolean
}

const __path__ = 'pages/api/auth/reset.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { email } = req.body

  if (!email) {
    logger.warn(`${__path__}!email`)
    await res.status(200).end()
    return
  }

  const { err, rowCount, rows } = await pgQuery<dbUser>(SQL/* language=SQL */ `
    SELECT "userId"
    FROM "users"
    WHERE "email" = ${email}
    LIMIT 1
  `)

  if (!err) {
    if (rowCount) {
      const token = generateToken()

      const { err: err2, rowCount: rowCount2 } = await pgQuery<dbToken>(SQL/* language=SQL */ `
        INSERT INTO "tokens"
               ("userId", "email", "token", "type")
        VALUES (${rows[0].userId}, ${email}, ${token}, ${'resetPassword'})
      `)

      if (!err2) {
        if (rowCount2) {
          const errorCallback = () => res.status(200).json({ mailIsSend: false })
          const successCallback = () => res.status(200).json({ mailIsSend: true })
          await sendMailResetPassword({ to: email, token, errorCallback, successCallback })
        } else {
          logger.error(`${__path__}!rowCount2`)
          await res.status(200).end()
        }
      } else {
        logger.error(`${__path__}err2: ${err2}`)
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
