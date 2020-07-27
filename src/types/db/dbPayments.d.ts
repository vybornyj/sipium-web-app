interface dbPayment {
  id?: number
  paymentId?: string
  purchasesData?: { product: string; purchaseData: anyObject }[]
  email?: string
  added?: string
  provider?: 'stripe' | 'paypal' | 'paddle'
  currency?: 'usd' | 'eur' | 'rub'
  price?: number
}

type dbPayments = dbPayment[]
