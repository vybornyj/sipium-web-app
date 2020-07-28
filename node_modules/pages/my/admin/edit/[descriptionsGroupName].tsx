import { NextPage } from 'next'
import Error from 'pages/404'
import { AdminEdit } from 'src/components/AdminEdit'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  descriptions?: dbReportDescriptions
  descriptionsGroupName?: string
}

const Page: NextPage<Props> = ({ error, descriptions, descriptionsGroupName }) => {
  if (error) return <Error />

  return (
    <TemplateUser title={`Edit: ${descriptionsGroupName} (left: rus, right: eng)`}>
      <div className='root'>
        <AdminEdit initDescriptions={descriptions} descriptionsGroupName={descriptionsGroupName} key={descriptionsGroupName} />

        <style jsx>{
          /* language=CSS */ `
            .root {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
            }
          `
        }</style>
      </div>
    </TemplateUser>
  )
}

export const getServerSideProps = withSspWrapper('admin', async ({ res, params }) => {
  const descriptionsGroupNameVariants = ['amino-deficit', 'amino-products']
  const descriptionsGroupName = params?.descriptionsGroupName

  if (descriptionsGroupNameVariants.includes(descriptionsGroupName)) {
    const { descriptions } = await apiRequestServer(res, '/api/descriptions/select', { descriptionsGroupName })

    if (descriptions) {
      return {
        props: { descriptions, descriptionsGroupName }
      }
    }
  }

  return null
})

export default Page
