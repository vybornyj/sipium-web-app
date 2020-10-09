import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  redirect: string
}
const Page: NextPage<Props> = ({ redirect }) => {
  const router = useRouter()

  if (redirect) {
    router.replace(redirect)
    return null
  }

  return (
    <TemplateMain title='Token'>
      <div className='global-box-1400 global-column'>
        <h3 className='global'>Token is not valid</h3>

        <h3 className='global'>Probable reasons:</h3>
        <h4 className='global'>You received an email with a token more than 48 hours ago.</h4>
        <h4 className='global'>You have already used this one-time token.</h4>

        <h3 className='global'>What to do?</h3>
        <h4 className='global'>You can repeat the procedure, and we will send you a new token.</h4>
      </div>
    </TemplateMain>
  )
}

export const getServerSideProps = withSspWrapper('public', async ({ params, req, res }) => {
  const { redirect = null, sessionDestroy } = await apiRequestServer(res, '/api/tokens', { token: params.token })
  if (sessionDestroy) await req.session.destroy()
  return {
    props: { redirect },
  }
})

export default Page
