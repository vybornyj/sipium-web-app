import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { paymentStripe } from 'src/scripts-server/payments/paymentStripe'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { ApiRoute } from 'src/types/types-for-import'

interface RequestBody {
  email: dbUser['email']
  cityName: dbUserReport['cityName']
  cityId: dbUserReport['cityId']
  birth: string
  name: dbUserReport['name']
  sex: dbUserReport['sex']
  physActivity: dbUserReport['physActivity']
  height: dbUserReport['height']
  weight: dbUserReport['weight']
}

interface ResponseBody {
  stripeSessionId?: string
}

const __path__ = 'pages/api/payments/stripe.ts: '

const apiRoute: ApiRoute<ResponseBody, RequestBody> = async (req, res) => {
  const { email, cityName, cityId, birth, name, sex, physActivity, height, weight } = req.body

  const product = 'Sipium Report'
  const provider = 'stripe'
  const currency = 'usd'
  const price = 2799
  const purchaseData = {
    cityName,
    cityId,
    birth,
    name,
    sex,
    physActivity,
    height,
    weight,
  }

  const jcontainer = {
    purchasesData: [
      {
        purchaseName: product,
        purchaseData,
      },
    ],
  }

  const { rowCount, rows } = await pgQuery<dbPayment>(SQL/* language=SQL */ `
    INSERT INTO "payments"
           ("email", "provider", "currency", "price", "jcontainer")
    VALUES (${email}, ${provider}, ${currency}, ${price}, ${jcontainer})
    RETURNING "paymentId"
  `)

  if (rowCount) {
    const stripeSessionId = await paymentStripe({
      errorCallback: (err) => logger.error(`${__path__}paymentStripe: ${err}`),
      success_url: `${process.env.URL_APP}/payment/success?id=${rows[0].paymentId}`,
      cancel_url: `${process.env.URL_APP}/payment/cancel`,
      product,
      currency,
      price,
    })

    if (stripeSessionId) {
      await res.status(200).json({ stripeSessionId })
    } else {
      logger.error(`${__path__}!stripeSessionId`)
      await res.status(200).end()
    }
  } else {
    logger.error(`${__path__}!rowCount`)
    await res.status(200).end()
  }
}

export default withSession(apiRoute)
