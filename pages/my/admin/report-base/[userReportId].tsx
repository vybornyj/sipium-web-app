import { NextPage } from 'next'
import Error from 'next/error'
import { SipiumReportAdmin } from 'src/components/main/SipiumReportAdmin'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  userReportId?: number
  sipiumCalc?: sipiumCalc
  dbReportDescriptionData?: dbReportDescriptions
  dbUserReportData?: dbUserReport
}

const Page: NextPage<Props> = ({ error, userReportId, sipiumCalc, dbReportDescriptionData, dbUserReportData }) => {
  if (error) return <Error statusCode={404} />

  return (
    <TemplateUser title={`Report: ${dbUserReportData.name}`} userReportId={userReportId}>
      <SipiumReportAdmin sipiumCalc={sipiumCalc} dbReportDescriptionData={dbReportDescriptionData} dbUserReportData={dbUserReportData} />
    </TemplateUser>
  )
}

export const getServerSideProps = withSspWrapper('admin', async ({ req, res, params }) => {
  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}
  const userReportId = params?.userReportId ? Number(params?.userReportId) : null

  if (userReportId) {
    const { sipiumCalc, dbReportDescriptionData, dbUserReportData } = await apiRequestServer(res, '/api/reports/select', {
      userId,
      userReportId,
      full: true,
    })

    if (sipiumCalc) {
      return {
        props: {
          userReportId,
          sipiumCalc,
          dbReportDescriptionData,
          dbUserReportData,
        },
      }
    }
  }

  return null
})

export default Page
