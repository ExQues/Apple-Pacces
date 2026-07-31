const fetch = require('node-fetch') || globalThis.fetch

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método não permitido. Use POST.' }),
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { totalAmount, items, customer, paymentMethod = 'pix' } = body

    const clientId = process.env.VITE_CAKTO_CLIENT_ID || process.env.CAKTO_CLIENT_ID || 'y3yPWtLmNcR7CKdW7ishsbvjtn5agIrTWs8O6bmQ'
    const clientSecret = process.env.VITE_CAKTO_CLIENT_SECRET || process.env.CAKTO_CLIENT_SECRET || 'vJElmAdv9rMqT67Ix4hbeGmps42ycjadwPmOSThbp86lysVueLlLghqqC4jneWuzSkuULGa5qF2EikvL3pQhnUZ5OCM3JFeTzoN5J8IR6S3Z3HuHXLw72yjryywpVk0h'

    if (!clientId || !clientSecret) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Chaves da API da Cakto não configuradas.' }),
      }
    }

    // 1. Autenticação na API oficial da Cakto (OAuth2)
    let token = ''
    try {
      const authRes = await fetch('https://api.cakto.com.br/public_api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
        }).toString(),
      })

      if (authRes.ok) {
        const authData = await authRes.json()
        token = authData.access_token || authData.token || ''
      } else {
        const errBody = await authRes.json()
        console.warn('Resposta de erro na autenticação Cakto:', authRes.status, errBody)
      }
    } catch (authErr) {
      console.warn('Erro na chamada public_api/token/ Cakto:', authErr)
    }

    // 2. Criar Transação na API Cakto se obtivermos token
    if (token) {
      const orderRes = await fetch('https://api.cakto.com.br/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100), // Em centavos
          payment_method: paymentMethod,
          customer: {
            name: customer.name || 'Cliente Apple Pacces',
            email: customer.email || '',
            phone: customer.phone || '',
          },
          items: (items || []).map((i) => ({
            title: i.name,
            unit_price: Math.round((i.price || 0) * 100),
            quantity: i.quantity || 1,
          })),
        }),
      })

      if (orderRes.ok) {
        const orderData = await orderRes.json()
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: true,
            checkoutUrl: orderData.checkout_url || orderData.payment_url || orderData.qr_code_url,
            pixQrCode: orderData.pix_qr_code,
            pixCopiaECola: orderData.pix_copia_e_cola,
            data: orderData,
          }),
        }
      }
    }

    // Fallback gracioso com estrutura de checkout da Cakto
    const fallbackCheckoutUrl = `https://pay.cakto.com.br/checkout?amount=${totalAmount}&email=${encodeURIComponent(
      customer.email || '',
    )}&name=${encodeURIComponent(customer.name || '')}`

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        checkoutUrl: fallbackCheckoutUrl,
        fallback: true,
      }),
    }
  } catch (err) {
    console.error('Erro na Netlify Function cakto-checkout:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Erro interno no servidor' }),
    }
  }
}
