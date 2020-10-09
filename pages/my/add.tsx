import { NextPage } from 'next'
import { SipiumForm } from 'src/components/common/forms/SipiumForm'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'

interface Props {
  email: dbUser['email']
}

const Page: NextPage<Props> = ({ email }) => (
  <TemplateUser title='Add Report'>
    <SipiumForm userEmail={email} />
  </TemplateUser>
)

export const getServerSideProps = withSspWrapper('user', async ({ req }) => {
  const { email = null }: sessionUser = req?.session?.get('user') ?? {}

  return {
    props: { email },
  }
})

export default Page
