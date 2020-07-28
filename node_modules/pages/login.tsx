import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { LoginForm } from 'src/components/common/forms/LoginForm'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { TemplateUserRedirectLoading } from 'src/components/templates/template-user/TemplateUserRedirectLoading'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'

interface Props {
  target?: string
  email?: dbUser['email']
  userId?: dbUser['userId']
}

const Page: NextPage<Props> = ({ target, email, userId }) => {
  const router = useRouter()

  if (userId) {
    router.replace('/my')
    return <TemplateUserRedirectLoading />
  }

  return (
    <TemplateMain title='Login'>
      <LoginForm target={target} initialEmail={email} />
    </TemplateMain>
  )
}

export const getServerSideProps = withSspWrapper('public', async ({ req, query }) => {
  const { userId = null }: sessionUser = req?.session?.get('user') ?? {}
  const { email = null, target = null } = query

  return {
    props: {
      userId,
      email,
      target
    }
  }
})

export default Page
