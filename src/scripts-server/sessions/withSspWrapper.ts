import { IncomingMessage, ServerResponse } from 'http'
import { Session } from 'next-iron-session'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface IncomingMessageWrapper extends IncomingMessage {
  session: Session
}

interface context {
  req: IncomingMessageWrapper
  res: ServerResponse
  params?: { [key: string]: string }
  query: { [key: string]: string }
}

type handler = (context: context) => Promise<{ props: { [key: string]: any } }>

type secure = 'public' | 'user' | 'admin'

// 1
type withSspWrapper = (secure: secure, handler?: handler) => any

export const withSspWrapper: withSspWrapper = (secure = 'admin', handler) =>
  handler ? withSession(withSspWrapper2(secure, handler)) : async () => ({ props: {} })

// 2
type withSspWrapper2 = (secure: secure, handler: handler) => any

const withSspWrapper2: withSspWrapper2 = (secure, handler: handler) => {
  return async function (context: context) {
    const { req, res } = context

    if (secure === 'admin' || secure === 'user') {
      const { userId = null, isAdmin = null }: sessionUser = req?.session?.get('user') ?? {}

      // если не авторизирован => переадресация на форму авторизации
      if (!userId) {
        res.setHeader('Location', `/login?target=${req?.url ?? ''}`)
        res.statusCode = 307
        return {
          props: { error: true },
        }
      }

      // если авторизирован, но не админ => 404
      if (secure === 'admin') {
        if (userId && !isAdmin) {
          res.setHeader('Location', `/404`)
          res.statusCode = 404
          return {
            props: { error: true },
          }
        }
      }
    }

    const serverSideProps = await handler(context)

    if (serverSideProps && typeof serverSideProps === 'object' && 'props' in serverSideProps) {
      return serverSideProps
    } else {
      res.statusCode = 404
      return {
        props: { error: true },
      }
    }
  }
}
