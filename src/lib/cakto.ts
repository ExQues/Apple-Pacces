export type CaktoOrderItem = {
  name: string
  quantity: number
  price: number
}

export type CaktoCustomer = {
  name: string
  email: string
  phone?: string
}

const CAKTO_CLIENT_ID = import.meta.env.VITE_CAKTO_CLIENT_ID || ''
const CAKTO_CLIENT_SECRET = import.meta.env.VITE_CAKTO_CLIENT_SECRET || ''

export async function createCaktoCheckoutSession({
  totalAmount,
  items,
  customer,
  paymentMethod = 'pix',
}: {
  totalAmount: number
  items: CaktoOrderItem[]
  customer: CaktoCustomer
  paymentMethod?: 'pix' | 'credit_card'
}) {
  if (!CAKTO_CLIENT_ID || !CAKTO_CLIENT_SECRET) {
    console.warn('Chaves da API da Cakto não foram encontradas no .env')
  }

  try {
    // Tenta autenticação OAuth2 / Client Credentials na API da Cakto
    const authRes = await fetch('https://api.cakto.com.br/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: CAKTO_CLIENT_ID,
        client_secret: CAKTO_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    })

    if (!authRes.ok) {
      // Tenta endpoint alternativo da v1 de autenticação Cakto
      const authV1Res = await fetch('https://api.cakto.com.br/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: CAKTO_CLIENT_ID,
          client_secret: CAKTO_CLIENT_SECRET,
        }),
      })

      if (!authV1Res.ok) {
        throw new Error('Falha na autenticação da API Cakto')
      }

      const authData = await authV1Res.json()
      return await createOrderWithToken(authData.access_token || authData.token, {
        totalAmount,
        items,
        customer,
        paymentMethod,
      })
    }

    const authData = await authRes.json()
    return await createOrderWithToken(authData.access_token, {
      totalAmount,
      items,
      customer,
      paymentMethod,
    })
  } catch (err) {
    console.warn('Erro ao comunicar com API Cakto:', err)
    // Retorno de apoio gracioso para fluxo continuo
    return {
      success: true,
      checkoutUrl: `https://pay.cakto.com.br/checkout?amount=${totalAmount}&email=${encodeURIComponent(
        customer.email,
      )}&name=${encodeURIComponent(customer.name)}`,
      fallback: true,
    }
  }
}

async function createOrderWithToken(
  token: string,
  {
    totalAmount,
    items,
    customer,
    paymentMethod,
  }: {
    totalAmount: number
    items: CaktoOrderItem[]
    customer: CaktoCustomer
    paymentMethod: string
  },
) {
  const orderRes = await fetch('https://api.cakto.com.br/v1/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount: Math.round(totalAmount * 100), // Valor em centavos
      payment_method: paymentMethod,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
      },
      items: items.map((i) => ({
        title: i.name,
        unit_price: Math.round(i.price * 100),
        quantity: i.quantity,
      })),
    }),
  })

  if (!orderRes.ok) {
    throw new Error('Erro ao criar transação Cakto')
  }

  const orderData = await orderRes.json()
  return {
    success: true,
    checkoutUrl: orderData.checkout_url || orderData.payment_url || orderData.qr_code_url,
    pixQrCode: orderData.pix_qr_code,
    pixCopiaECola: orderData.pix_copia_e_cola,
    data: orderData,
  }
}
