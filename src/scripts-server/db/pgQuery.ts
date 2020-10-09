import { Pool } from 'pg'
import { SQLStatement } from 'sql-template-strings'
import { logger } from 'src/scripts-server/logger/logger'

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST,
  port: Number(process.env.POSTGRESQL_PORT),
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASS,
  database: process.env.POSTGRESQL_DB,
})

interface PgQueryResult<ROW = { [key: string]: any }> {
  command?: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | string
  rowCount?: number
  oid?: number
  rows?: ROW[]
  fields?: {
    name: string
    tableID: number
    columnID: number
    dataTypeID: number
    dataTypeSize: number
    dataTypeModifier: number
    format: string
  }[]
  rowAsArray?: boolean
  err?: Error
}

type PgQuery = <ROW = { [key: string]: any }>(query: SQLStatement, end?: boolean) => Promise<PgQueryResult<ROW>>

export const pgQuery: PgQuery = async (query, end = false) => {
  try {
    const result = await pool.query(query)
    if (end) await pool.end()
    return result
  } catch (err) {
    logger.error(`pgQuery: ${err}`)
    if (end) await pool.end()
    return { err }
  }
}
