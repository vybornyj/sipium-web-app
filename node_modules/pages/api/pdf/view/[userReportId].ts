import { pdfReport } from 'src/scripts-server/pdfs/pdfReport'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'
import { ApiRoute } from 'src/types/types-for-import'

const apiRoute: ApiRoute = async (req, res) => {
  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}

  const {
    query: { userReportId }
  } = req

  if (userReportId) {
    const { sipiumCalc, aminoData } = await apiRequestServer(res, '/api/reports/select', { userId, userReportId, full: true })

    const report = await pdfReport({ sipiumCalc, aminoData })

    res.setHeader('Content-Type', 'application/pdf')
    res.status(200).send(report)
  } else {
    res.status(500).end()
  }
}

export default withSession(apiRoute)
