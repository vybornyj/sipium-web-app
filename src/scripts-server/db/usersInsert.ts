import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'

type usersInsert = (email: dbUser['email']) => Promise<dbUser['userId'] | null>

const __path__ = 'src/scripts-server/db/usersInsert.ts: '

export const usersInsert: usersInsert = async (email) => {
  const { err, rowCount, rows } = await pgQuery<dbUser>(SQL/* language=SQL */ `
    INSERT INTO "users"
           ("email")
    VALUES (${email})
    RETURNING "userId"
  `)

  if (err) {
    logger.error(`${__path__}err: ${err.toString()}`)
    return null
  }

  if (!rowCount) {
    logger.error(`${__path__}!rowCount`)
    return null
  }

  if (!rows[0].userId) {
    logger.error(`${__path__}!rows[0].userId`)
    return null
  }

  return rows[0].userId
}
