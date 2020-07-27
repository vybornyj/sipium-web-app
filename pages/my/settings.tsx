import { NextPage } from 'next'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'

const Page: NextPage = () => (
  <TemplateUser title='Settings'>
    <h3 className='global'>Under Development</h3>
    <h4 className='global'>There will be a password change</h4>
  </TemplateUser>
)

export const getServerSideProps = withSspWrapper('user')

export default Page
