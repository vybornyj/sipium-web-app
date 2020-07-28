import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface ResponseBody {
  userId?: dbUser['userId']
  isAdmin?: dbUser['isAdmin']
  email?: dbUser['email']
}

const apiRoute: ApiRoute<ResponseBody> = async (req, res) => {
  const { userId = null, isAdmin = null, email = null }: sessionUser = req?.session?.get('user') ?? {}

  await res.status(200).json({ userId, isAdmin, email })
}

export default withSession(apiRoute)
