import { funcAddReport } from 'pages/api/payments/funcAddReport'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  email: dbUser['email']
  cityName: dbUserReport['cityName']
  cityId: dbUserReport['cityId']
  selectedDate: Date
  selectedDateISO: Date
  day: number
  month: number
  year: number
  hours: number
  minutes: number
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
  const { email, ...addReportData } = req.body

  const { userReportId, userId, isAdmin } = await funcAddReport(email, addReportData)

  if (userReportId && userId) {
    req.session.set('user', { userId, isAdmin, email })
    await req.session.save()

    // отправляю
    await res.status(200).json({ userReportId })
  } else {
    logger.error(`${__path__}!success`)
    await res.status(200).end()
  }
}

export default withSession(apiRoute)
