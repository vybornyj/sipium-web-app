import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'

type usersSelect = (email: dbUser['email']) => Promise<dbUser>

const __path__ = 'src/scripts-server/db/usersSelect.ts: '

export const usersSelect: usersSelect = async (email) => {
  const { err, rowCount, rows } = await pgQuery<dbUser>(SQL/* language=SQL */ `
    SELECT "userId", "password", "isAdmin"
    FROM "users"
    WHERE "email" = ${email}
    LIMIT 1
  `)

  if (err) {
    logger.error(`${__path__}err: ${err.toString()}`)
    return { userId: null, password: null, isAdmin: null }
  }

  if (!rowCount) {
    logger.error(`${__path__}!rowCount`)
    return { userId: null, password: null, isAdmin: null }
  }

  return rows[0]
}
