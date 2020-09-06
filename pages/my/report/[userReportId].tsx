import { NextPage } from 'next'
import Error from 'next/error'
import { SipiumForm } from 'src/components/common/forms/SipiumForm'
import { SipiumReportUser } from 'src/components/main/SipiumReportUser'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  userReportId: number
  sipiumCalc: sipiumCalc
  dbReportDescriptionData: dbReportDescriptions
  dbUserReportData?: dbUserReport
}

const Page: NextPage<Props> = ({ error, userReportId, sipiumCalc, dbReportDescriptionData, dbUserReportData }) => {
  if (error) return <Error statusCode={404} />

  return (
    <TemplateUser title={`Report: ${dbUserReportData.name}`} userReportId={userReportId}>
      <SipiumForm dbUserReportData={dbUserReportData} userReportId={userReportId} />
      <SipiumReportUser sipiumCalc={sipiumCalc} dbReportDescriptionData={dbReportDescriptionData} dbUserReportData={dbUserReportData} />
    </TemplateUser>
  )
}

export const getServerSideProps = withSspWrapper('user', async ({ req, res, params }) => {
  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}
  const userReportId = params?.userReportId ? Number(params?.userReportId) : null

  if (userId && userReportId) {
    const { sipiumCalc, dbReportDescriptionData, dbUserReportData } = await apiRequestServer(res, '/api/reports/select', { userId, userReportId })

    if (sipiumCalc) {
      return {
        props: {
          userReportId,
          sipiumCalc,
          dbReportDescriptionData,
          dbUserReportData
        }
      }
    }
  }

  return null
})

export default Page
