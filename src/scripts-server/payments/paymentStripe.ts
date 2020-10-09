import Stripe from 'stripe'

const stripe = new Stripe(process.env.API_KEY_STRIPE, {
  apiVersion: '2020-08-27',
  maxNetworkRetries: 2,
  timeout: 20000,
  protocol: 'https',
  telemetry: false,
})

interface paymentStripeData {
  product: string
  price: number
  currency: 'usd' | 'eur' | 'rub'
  success_url: string
  cancel_url: string
  errorCallback?: (err) => void
}

type paymentStripe = ({ product, price, currency, success_url, cancel_url, errorCallback }: paymentStripeData) => Promise<null | string>

export const paymentStripe: paymentStripe = async ({ product, price, currency, success_url, cancel_url, errorCallback = (_) => null }) => {
  // todo: ???
  let sessionId: null | string = null

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: product,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url,
      cancel_url,
    })
    sessionId = session.id
  } catch (err) {
    await errorCallback(err)
  }
  return sessionId
}
