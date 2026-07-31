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
        // ID do Produto Ativo na conta Cakto do usuário
        const productId = '1d7d4471-45fe-4150-9201-6ff8649cbcb1'

        // Nome formatado para a oferta
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
            const params = new URLSearchParams()
            if (customer.name) {
              params.set('name', customer.name)
              params.set('full_name', customer.name)
              params.set('nome', customer.name)
            }
            if (customer.email) params.set('email', customer.email)
            if (customer.phone) {
              params.set('phone', customer.phone)
              params.set('cellphone', customer.phone)
              params.set('telephone', customer.phone)
              params.set('celular', customer.phone)
            }
            if (customer.docNumber) {
              params.set('docNumber', customer.docNumber)
              params.set('cpf', customer.docNumber)
              params.set('document', customer.docNumber)
              params.set('cpf_cnpj', customer.docNumber)
            }

            const checkoutUrl = `https://pay.cakto.com.br/${offerData.id}?${params.toString()}`

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

    // Fallback seguro usando oferta ativa da conta
    const fallbackParams = new URLSearchParams()
    if (customer.name) {
      fallbackParams.set('name', customer.name)
      fallbackParams.set('full_name', customer.name)
    }
    if (customer.email) fallbackParams.set('email', customer.email)
    if (customer.phone) fallbackParams.set('phone', customer.phone)
    if (customer.docNumber) fallbackParams.set('docNumber', customer.docNumber)

    const fallbackCheckoutUrl = `https://pay.cakto.com.br/e5mby49?${fallbackParams.toString()}`

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
