// O navegador informa apenas quais produtos foram escolhidos; o valor é calculado no servidor.
export type CaktoOrderItem = {
  product: string
  storage?: string
  quantity: number
}

export type CaktoCustomer = {
  name: string
  email: string
  phone?: string
  docNumber?: string
}

export async function createCaktoCheckoutSession({
  items,
  customer,
}: {
  items: CaktoOrderItem[]
  customer: CaktoCustomer
}): Promise<{ checkoutUrl: string; total: number }> {
  // A função da Netlify fala com a Cakto no servidor (chaves secretas e sem CORS)
  const response = await fetch('/.netlify/functions/cakto-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, customer }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.checkoutUrl) {
    throw new Error(data.error || 'Não foi possível gerar o pagamento.')
  }
  return data
}
