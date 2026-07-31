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
  try {
    // Chama a Netlify Function no backend do servidor para evitar erro de CORS
    const response = await fetch('/.netlify/functions/cakto-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalAmount,
        items,
        customer,
        paymentMethod,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.checkoutUrl) {
        return data
      }
    }

    throw new Error('Retorno sem URL de checkout')
  } catch (err) {
    console.warn('Alerta na requisição de checkout Cakto:', err)
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
