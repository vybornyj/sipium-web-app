import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

const apiRoute: ApiRoute = async (req, res) => {
  await req.session.destroy()
  await res.status(200).end()
}

export default withSession(apiRoute)
