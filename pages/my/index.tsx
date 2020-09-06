import { NextPage } from 'next'
import Error from 'next/error'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { ReportCard } from 'src/components/user/ReportCard'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  reports?: dbUserReports
}

const Page: NextPage<Props> = ({ error, reports }) => {
  if (error) return <Error statusCode={404} />

  return (
    <TemplateUser title='My Reports'>
      <div className='global-wrap'>
        {reports.map((report, key) => (
          <ReportCard key={key} report={report} />
        ))}
      </div>
    </TemplateUser>
  )
}

export const getServerSideProps = withSspWrapper('user', async ({ req, res }) => {
  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}

  if (userId) {
    const { reports }: { reports?: dbUserReports } = await apiRequestServer(res, '/api/reports/select-all', { userId })

    if (reports) {
      return { props: { reports } }
    }
  }

  return null
})

export default Page
