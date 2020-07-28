import { NextPage } from 'next'
import Error from 'pages/404'
import { SipiumForm } from 'src/components/common/forms/SipiumForm'
import { SipiumReportUser } from 'src/components/main/SipiumReportUser'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  userReportId: number
  sipiumCalc: sipiumCalc
  aminoData: dbReportDescriptions
  userReportDbData?: {
    cityName?: dbUserReport['cityName']
    birth?: dbUserReport['birth']
    personality?: dbUserReport['personality']
    name?: dbUserReport['name']
    sex?: dbUserReport['sex']
    physActivity?: dbUserReport['physActivity']
    height?: dbUserReport['height']
    weight?: dbUserReport['weight']
    hours?: number
    minutes?: number
  }
}

const Page: NextPage<Props> = ({ error, userReportId, sipiumCalc, aminoData, userReportDbData }) => {
  if (error) return <Error />

  return (
    <TemplateUser title={`Report: ${sipiumCalc.person.name}`} userReportId={userReportId}>
      <SipiumForm initialState={userReportDbData} userReportId={userReportId} />
      <SipiumReportUser sipiumCalc={sipiumCalc} aminoData={aminoData} />
    </TemplateUser>
  )
}

export const getServerSideProps = withSspWrapper('user', async ({ req, res, params }) => {
  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}
  const userReportId = params?.userReportId ? Number(params?.userReportId) : null

  if (userId && userReportId) {
    const { sipiumCalc, aminoData, userReportDbData } = await apiRequestServer(res, '/api/reports/select', { userId, userReportId })

    if (sipiumCalc) {
      return {
        props: {
          userReportId,
          sipiumCalc,
          aminoData,
          userReportDbData
        }
      }
    }
  }

  return null
})

export default Page
