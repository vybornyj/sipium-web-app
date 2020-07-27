import { NextPage } from 'next'
import Error from 'pages/404'
import { useEffect, useState } from 'react'
import { TemplateUserRedirectLoading } from 'src/components/templates/template-user/TemplateUserRedirectLoading'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

interface Props {
  id?: string | string[]
}

const Page: NextPage<Props> = ({ id }) => {
  if (id) {
    const [idNotFound, setIdNotFound] = useState(false)

    useEffect(() => {
      ;(async () => {
        const { success } = await apiRequestClient(`/api/payments/stripe-success`, { id })
        if (success) {
          // console.log('success', success)
        } else {
          setIdNotFound(true)
        }
      })()
    }, [])

    return idNotFound ? <Error /> : <TemplateUserRedirectLoading />
  }

  return <Error />
}

Page.getInitialProps = async ({ query: { id } }) => ({ id })

export default Page
