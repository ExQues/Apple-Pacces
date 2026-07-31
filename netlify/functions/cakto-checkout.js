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

    const clientId = process.env.VITE_CAKTO_CLIENT_ID || process.env.CAKTO_CLIENT_ID || 'CrCaKFvxASx3VePomyUBQo1VGqRlnm2Zz6HdSRKA'
    const clientSecret = process.env.VITE_CAKTO_CLIENT_SECRET || process.env.CAKTO_CLIENT_SECRET || 'FPeTaj31IBQpThJYqMvMMAavyGhZtDq1YwCB4wkaSMAVRkW1KIPrmjrhPoYSHTXmfE1BB3wP8xIWBra47XA506BaTFvL5izClPwSA03Ibe66iUYLF2J6lKZQkG4UiZpD'

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

    // 2. Criar Oferta Dinâmica na Cakto para o Valor do Dia
    if (token) {
      try {
        // Obter produto ativo da conta Cakto do cliente
        const prodRes = await fetch('https://api.cakto.com.br/public_api/products/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const prodData = await prodRes.json()
        const activeProduct = (prodData.results || []).find((p) => p.status === 'active') || prodData.results?.[0]
        const productId = activeProduct ? activeProduct.id : '1d7d4471-45fe-4150-9201-6ff8649cbcb1'

        // Nome resumido dos itens
        const orderTitle = items && items.length > 0
          ? items.map((i) => i.name).join(', ').substring(0, 80)
          : 'Pedido Apple Pacces'

        // Criar Oferta Dinâmica na API da Cakto com o valor do dia
        const offerRes = await fetch('https://api.cakto.com.br/public_api/offers/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product: productId,
            name: orderTitle,
            price: Number(totalAmount),
            currency: 'BRL',
          }),
        })

        if (offerRes.ok || offerRes.status === 201) {
          const offerData = await offerRes.json()
          if (offerData.id) {
            const checkoutUrl = `https://pay.cakto.com.br/${offerData.id}?email=${encodeURIComponent(
              customer.email || '',
            )}&name=${encodeURIComponent(customer.name || '')}`

            return {
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                success: true,
                checkoutUrl,
                offerId: offerData.id,
              }),
            }
          }
        } else {
          const offerErr = await offerRes.text()
          console.warn('Erro ao criar oferta dinâmica na Cakto:', offerRes.status, offerErr)
        }
      } catch (orderErr) {
        console.warn('Erro ao processar oferta dinâmica Cakto:', orderErr)
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
