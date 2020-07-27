import { loadStripe } from '@stripe/stripe-js'
import { NextPage } from 'next'
import getConfig from 'next/config'
import { useState } from 'react'
import { AppButton } from 'src/components/common/buttons/AppButton'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

const {
  publicRuntimeConfig: { API_PUBLIC_KEY_STRIPE }
}: GetConfig = getConfig()

const stripePromise = loadStripe(API_PUBLIC_KEY_STRIPE)

interface Props {
  userId: dbUser['userId']
  isAdmin: dbUser['isAdmin']
  email: dbUser['email']
}

const Page: NextPage<Props> = ({ userId, email }) => {
  const [isOk, setIsOk] = useState(false)

  const handlerCheckoutStripe = async () => {
    const { error, sessionId } = await apiRequestClient('/api/payments/stripe', { email, userId })
    // console.log('log error:', error)
    // console.log('log sessionId:', sessionId)

    const stripe = await stripePromise
    const { error: errorStripeCheckout } = await stripe.redirectToCheckout({ sessionId })

    if (!error && !errorStripeCheckout) {
      setIsOk(true)
    }
    // console.log('errorStripeCheckout: ', errorStripeCheckout)
  }

  return (
    <TemplateUser title='Test Payments'>
      <div className='global-box-600'>
        <h3 className='global'>email: {email}</h3>
        <h3 className='global'>userId: {userId}</h3>
        <p>ok {isOk ? 'true' : 'false'}</p>
        <AppButton onClick={handlerCheckoutStripe}>Submit Stripe Payment Test</AppButton>
      </div>
    </TemplateUser>
  )
}

export const getServerSideProps = withSspWrapper('admin', async ({ req }) => {
  const { email = null }: sessionUser = req?.session?.get('user') ?? {}

  return {
    props: { email }
  }
})

export default Page
