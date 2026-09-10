// Função de pagamento: calcula o total no servidor e cria a oferta na Cakto.
// O navegador envia apenas quais produtos, capacidades e quantidades foram escolhidos;
// o preço vem de precos.json (gerado do catálogo a cada build) e nunca do navegador.
const PRECOS = require('./precos.json')

const MAX_QUANTIDADE = 5
const CAKTO_PRODUCT_ID = '1d7d4471-45fe-4150-9201-6ff8649cbcb1'

function responder(statusCode, data) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
}

function calcularPedido(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('A sacola está vazia.')
  }

  let total = 0
  const linhas = []

  for (const item of items) {
    const tabela = item && PRECOS[item.product]
    if (!tabela) throw new Error(`Produto indisponível: ${item && item.product}.`)

    const opcoes = Object.keys(tabela)
    let storage
    if (item.storage) {
      if (tabela[item.storage] === undefined) throw new Error(`Capacidade indisponível para ${item.product}.`)
      storage = item.storage
    } else if (opcoes.length === 1) {
      storage = opcoes[0]
    } else {
      throw new Error(`Escolha a capacidade do ${item.product}.`)
    }

    const quantidade = Number(item.quantity)
    if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > MAX_QUANTIDADE) {
      throw new Error('Quantidade inválida.')
    }

    total += tabela[storage] * quantidade
    linhas.push(`${quantidade}x ${item.product}${storage ? ` ${storage}` : ''}`)
  }

  return { total, titulo: linhas.join(', ').slice(0, 80) }
}

function parametrosDoCliente(customer = {}) {
  const params = new URLSearchParams()
  if (customer.name) {
    params.set('name', customer.name)
    params.set('full_name', customer.name)
  }
  if (customer.email) params.set('email', customer.email)
  if (customer.phone) {
    params.set('phone', customer.phone)
    params.set('cellphone', customer.phone)
  }
  if (customer.docNumber) {
    params.set('docNumber', customer.docNumber)
    params.set('cpf', customer.docNumber)
  }
  return params
}

async function autenticarCakto(clientId, clientSecret) {
  const res = await fetch('https://api.cakto.com.br/public_api/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret }).toString(),
  })
  if (!res.ok) throw new Error(`Autenticação Cakto falhou (${res.status})`)
  const data = await res.json()
  const token = data.access_token || data.token
  if (!token) throw new Error('Autenticação Cakto sem token')
  return token
}

async function criarOferta(token, { titulo, total }) {
  const res = await fetch('https://api.cakto.com.br/public_api/offers/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ product: CAKTO_PRODUCT_ID, name: titulo, price: total, currency: 'BRL' }),
  })
  if (!res.ok) throw new Error(`Criação de oferta Cakto falhou (${res.status}): ${await res.text()}`)
  const data = await res.json()
  if (!data.id) throw new Error('Oferta Cakto sem id')
  return data.id
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return responder(405, { error: 'Método não permitido. Use POST.' })
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return responder(400, { error: 'Pedido inválido.' })
  }

  let pedido
  try {
    pedido = calcularPedido(body.items)
  } catch (err) {
    return responder(400, { error: err.message })
  }

  // TODO: remover os valores reserva assim que CAKTO_CLIENT_ID e CAKTO_CLIENT_SECRET
  // estiverem cadastrados nas variáveis da Netlify (e a chave antiga for revogada na Cakto).
  const clientId = process.env.CAKTO_CLIENT_ID || process.env.VITE_CAKTO_CLIENT_ID || 'CrCaKFvxASx3VePomyUBQo1VGqRlnm2Zz6HdSRKA'
  const clientSecret = process.env.CAKTO_CLIENT_SECRET || process.env.VITE_CAKTO_CLIENT_SECRET || 'FPeTaj31IBQpThJYqMvMMAavyGhZtDq1YwCB4wkaSMAVRkW1KIPrmjrhPoYSHTXmfE1BB3wP8xIWBra47XA506BaTFvL5izClPwSA03Ibe66iUYLF2J6lKZQkG4UiZpD'

  try {
    const token = await autenticarCakto(clientId, clientSecret)
    const offerId = await criarOferta(token, pedido)
    const checkoutUrl = `https://pay.cakto.com.br/${offerId}?${parametrosDoCliente(body.customer).toString()}`
    return responder(200, { success: true, checkoutUrl, offerId, total: pedido.total })
  } catch (err) {
    console.error('Erro ao gerar pagamento na Cakto:', err)
    return responder(502, { error: 'Não foi possível gerar o pagamento agora.' })
  }
}

// Exportado para os testes automáticos
exports.calcularPedido = calcularPedido
