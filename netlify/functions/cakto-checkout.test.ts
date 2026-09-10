import { afterEach, describe, expect, it, vi } from 'vitest'
import precos from './precos.json'
import checkout from './cakto-checkout.cjs'

const { handler, calcularPedido } = checkout as {
  handler: (event: { httpMethod: string; body?: string }) => Promise<{ statusCode: number; body: string }>
  calcularPedido: (items: unknown) => { total: number; titulo: string }
}

const post = (body: unknown) => handler({ httpMethod: 'POST', body: JSON.stringify(body) })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('cálculo do pedido no servidor', () => {
  it('usa o preço da tabela do servidor', () => {
    const { total } = calcularPedido([{ product: 'iPhone 17 Pro Max', storage: '512 GB', quantity: 2 }])
    expect(total).toBe((precos as Record<string, Record<string, number>>)['iPhone 17 Pro Max']['512 GB'] * 2)
  })

  it('aceita produto de capacidade única sem informar a capacidade', () => {
    expect(calcularPedido([{ product: 'iPhone 17', quantity: 1 }]).total).toBe(5699)
  })

  it('recusa produto em falta, capacidade inexistente e quantidade inválida', () => {
    expect(() => calcularPedido([{ product: 'iPhone 14', storage: '128 GB', quantity: 1 }])).toThrow()
    expect(() => calcularPedido([{ product: 'iPhone 17 Pro', storage: '2 TB', quantity: 1 }])).toThrow()
    expect(() => calcularPedido([{ product: 'iPhone 17 Pro', storage: '256 GB', quantity: 0 }])).toThrow()
    expect(() => calcularPedido([{ product: 'iPhone 17 Pro', storage: '256 GB', quantity: 99 }])).toThrow()
    expect(() => calcularPedido([])).toThrow()
  })
})

describe('função de pagamento', () => {
  it('ignora valor enviado pelo navegador e cria a oferta com o preço do servidor', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'token-teste' })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'oferta123' }), { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)

    const res = await post({
      totalAmount: 1,
      items: [{ product: 'iPhone 17 Pro Max', storage: '256 GB', quantity: 1 }],
      customer: { name: 'Cliente Teste', email: 'teste@exemplo.com' },
    })

    expect(res.statusCode).toBe(200)
    const oferta = JSON.parse(fetchMock.mock.calls[1][1].body)
    expect(oferta.price).toBe(7799)
    expect(JSON.parse(res.body).checkoutUrl).toContain('https://pay.cakto.com.br/oferta123?')
  })

  it('responde 400 para item inválido sem chamar a Cakto', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const res = await post({ items: [{ product: 'Produto inventado', quantity: 1 }] })
    expect(res.statusCode).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('responde erro, sem oferta de valor fixo, quando a Cakto falha', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('erro', { status: 500 })))
    const res = await post({ items: [{ product: 'iPhone 17', quantity: 1 }], customer: {} })
    expect(res.statusCode).toBe(502)
    expect(res.body).not.toContain('e5mby49')
  })

  it('só aceita POST', async () => {
    expect((await handler({ httpMethod: 'GET' })).statusCode).toBe(405)
  })
})
