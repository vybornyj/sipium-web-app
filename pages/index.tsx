import { NextPage } from 'next'
import { SipiumForm } from 'src/components/common/forms/SipiumForm'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

interface Props {
  email?: dbUser['email']
}

const Page: NextPage<Props> = ({ email }) => {
  return (
    <TemplateMain>
      <SipiumForm userEmail={email} />
    </TemplateMain>
  )
}

Page.getInitialProps = async () => {
  const { email } = await apiRequestClient<{ email: dbUser['email'] }>('/api/auth/get-session')
  return { email }
}

export default Page
