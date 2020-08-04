import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'

interface NextApiRequestWrapper<REQ = any> extends NextApiRequest {
  session: Session
  body: REQ
}

export type ApiRoute<RES = { [key: string]: any }, REQ = { [key: string]: any }> = (
  req: NextApiRequestWrapper<REQ>,
  res: NextApiResponse<RES>
) => Promise<void>
