import { funcAddReport } from 'pages/api/payments/funcAddReport'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  email: dbUser['email']
  cityName: dbUserReport['cityName']
  cityId: dbUserReport['cityId']
  birth: string
  name: dbUserReport['name']
  sex: dbUserReport['sex']
  physActivity: dbUserReport['physActivity']
  height: dbUserReport['height']
  weight: dbUserReport['weight']
}

interface ResponseBody {
  userReportId?: number
}

const __path__ = 'pages/api/reports/insert.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const reportData = req.body
  const { email } = reportData

  const { userReportId, userId, isAdmin } = await funcAddReport(reportData)

  if (userReportId && userId) {
    req.session.set('user', { userId, isAdmin, email })
    await req.session.save()

    await res.status(200).json({ userReportId })
  } else {
    logger.error(`${__path__}!success`)
    await res.status(200).end()
  }
}

export default withSession(apiRoute)
