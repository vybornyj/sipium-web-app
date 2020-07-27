import { NextPage } from 'next'
import Error from 'pages/404'
import { SipiumReportAdmin } from 'src/components/main/SipiumReportAdmin'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  userReportId?: number
  sipiumCalc?: sipiumCalc
  aminoData?: dbReportDescriptions
}

const Page: NextPage<Props> = ({ error, userReportId, sipiumCalc, aminoData }) => {
  if (error) return <Error />

  return (
    <TemplateUser title={`Report: ${sipiumCalc.person.name}`} userReportId={userReportId}>
      <SipiumReportAdmin sipiumCalc={sipiumCalc} aminoData={aminoData} />
    </TemplateUser>
  )
}

export const getServerSideProps = withSspWrapper('admin', async ({ req, res, params }) => {
  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}
  const userReportId = params?.userReportId ? Number(params?.userReportId) : null

  if (userReportId) {
    const { sipiumCalc, aminoData } = await apiRequestServer(res, '/api/reports/select', { userId, userReportId })

    if (sipiumCalc) {
      return {
        props: {
          userReportId,
          sipiumCalc,
          aminoData
        }
      }
    }
  }

  return null
})

export default Page
