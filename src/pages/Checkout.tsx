import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Search, ShoppingBag } from 'lucide-react'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { supabase } from '@/lib/supabase'
import { createCaktoCheckoutSession } from '@/lib/cakto'
import { usePageTitle } from '@/hooks/usePageTitle'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-950/5'
const labelClass = 'block text-sm font-medium text-zinc-700'

export default function Checkout() {
  const { items } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  usePageTitle('Finalizar compra')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Dados do cliente
  const [fullName, setFullName] = useState(user?.user_metadata?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState(user?.user_metadata?.whatsapp || '')

  // Endereço de entrega
  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [loadingCep, setLoadingCep] = useState(false)

  const parseItemPrice = (priceFrom: string) => {
    if (!priceFrom) return 0
    const cleaned = priceFrom.trim().split(',')[0]
    const digits = cleaned.replace(/\D/g, '')
    return digits ? parseInt(digits, 10) : 0
  }

  const total = items.reduce((sum, item) => sum + parseItemPrice(item.priceFrom) * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Máscaras de formatação
  const formatCpf = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 11)
    if (d.length <= 3) return d
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
  }

  const formatPhone = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 11)
    if (d.length <= 2) return d
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  }

  // Busca automática de CEP via ViaCEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 8)
    setCep(rawDigits.length > 5 ? `${rawDigits.slice(0, 5)}-${rawDigits.slice(5)}` : rawDigits)

    if (rawDigits.length === 8) {
      setLoadingCep(true)
      try {
        const res = await fetch(`https://viacep.com.br/ws/${rawDigits}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setStreet(data.logradouro || '')
          setNeighborhood(data.bairro || '')
          setCity(data.localidade || '')
          setState(data.uf || '')
          setError(null)
        } else {
          setError('CEP não encontrado. Preencha o endereço manualmente.')
        }
      } catch (err) {
        console.warn('Erro ao consultar CEP:', err)
      } finally {
        setLoadingCep(false)
      }
    }
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      navigate('/login')
      return
    }

    if (![fullName, cpf, phone, cep, street, number, neighborhood, city, state].every((v) => v.trim())) {
      setError('Preencha todos os campos obrigatórios de contato e endereço de entrega.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // 1. Gravar o pedido no Supabase com os dados de entrega
      const shippingAddress = { fullName, cpf, phone, cep, street, number, complement, neighborhood, city, state }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({ user_id: user.id, total_price: total, status: 'pending', shipping_address: shippingAddress })
        .select()
        .single()

      if (orderError) console.warn('Alerta ordens Supabase:', orderError)

      // 2. Gravar os itens do pedido (só os que existem na tabela de produtos)
      if (order) {
        try {
          const { data: productsData } = await supabase.from('products').select('id, name')
          const orderItemsToInsert = items
            .map((item) => {
              const baseName = item.name.split(' (')[0].trim()
              const dbProduct = productsData?.find((p) => p.name === item.name || p.name === baseName)
              return dbProduct
                ? { order_id: order.id, product_id: dbProduct.id, quantity: item.quantity, selected_color: item.selectedColor }
                : null
            })
            .filter(Boolean)
          if (orderItemsToInsert.length > 0) await supabase.from('order_items').insert(orderItemsToInsert)
        } catch (err) {
          console.warn('Alerta itens Supabase:', err)
        }
      }

      // 3. Gerar a cobrança na Cakto; o servidor calcula o valor, aqui vai só o que foi escolhido
      const caktoRes = await createCaktoCheckoutSession({
        customer: {
          name: fullName.trim(),
          email: email.trim(),
          phone: phone.replace(/\D/g, ''),
          docNumber: cpf.replace(/\D/g, ''),
        },
        items: items.map((i) => ({
          product:
            i.selectedStorage && i.name.endsWith(` (${i.selectedStorage})`)
              ? i.name.slice(0, -(i.selectedStorage.length + 3))
              : i.name,
          storage: i.selectedStorage,
          quantity: i.quantity,
        })),
      })

      window.location.href = caktoRes.checkoutUrl
    } catch (err) {
      console.warn('Erro ao processar checkout:', err)
      setError('Não conseguimos gerar o pagamento agora. Sua sacola continua salva: tente de novo em alguns minutos ou fale com a gente pelo atendimento.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-950">
      <SiteHeader variant="shop" />

      <main className="animate-page-in px-5 pb-24 pt-28 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Finalizar compra.</h1>
          <p className="mt-3 text-lg text-zinc-500">Confirme seus dados e o endereço. O pagamento é feito na página segura da Cakto.</p>

          {items.length === 0 ? (
            <div className="mt-10 flex flex-col items-center rounded-3xl bg-white px-6 py-20 text-center">
              <ShoppingBag className="size-10 text-zinc-300" strokeWidth={1.5} />
              <p className="mt-5 text-lg font-semibold">Sua sacola está vazia</p>
              <p className="mt-1.5 text-sm text-zinc-500">Adicione produtos pela loja antes de continuar.</p>
              <Link to="/shop" className="mt-6 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
                Ver a loja
              </Link>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.9fr] lg:items-start">
              <div className="space-y-6">
                {/* Dados */}
                <section className="rounded-3xl bg-white p-6 sm:p-8" aria-labelledby="dados-title">
                  <h2 id="dados-title" className="text-xl font-semibold tracking-tight">
                    <span className="text-zinc-400">1.</span> Seus dados
                  </h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <label className={`${labelClass} sm:col-span-2`}>
                      Nome completo
                      <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Como está no documento" className={inputClass} autoComplete="name" />
                    </label>
                    <label className={labelClass}>
                      CPF
                      <input required inputMode="numeric" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} placeholder="000.000.000-00" className={inputClass} />
                    </label>
                    <label className={labelClass}>
                      WhatsApp
                      <input required inputMode="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(00) 00000-0000" className={inputClass} autoComplete="tel" />
                    </label>
                    <label className={`${labelClass} sm:col-span-2`}>
                      E-mail
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className={inputClass} autoComplete="email" />
                    </label>
                  </div>
                </section>

                {/* Entrega */}
                <section className="rounded-3xl bg-white p-6 sm:p-8" aria-labelledby="entrega-title">
                  <h2 id="entrega-title" className="text-xl font-semibold tracking-tight">
                    <span className="text-zinc-400">2.</span> Endereço de entrega
                  </h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-6">
                    <label className={`${labelClass} sm:col-span-2`}>
                      CEP
                      <span className="relative block">
                        <input required inputMode="numeric" value={cep} onChange={handleCepChange} placeholder="00000-000" className={`${inputClass} pr-10`} autoComplete="postal-code" />
                        {loadingCep ? (
                          <span className="apple-spinner absolute right-3 top-1/2 mt-[3px] size-4 -translate-y-1/2" aria-label="Buscando CEP" />
                        ) : (
                          <Search className="absolute right-3 top-1/2 mt-[3px] size-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
                        )}
                      </span>
                    </label>
                    <label className={`${labelClass} sm:col-span-4`}>
                      Rua
                      <input required value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Preenchida pelo CEP" className={inputClass} autoComplete="address-line1" />
                    </label>
                    <label className={`${labelClass} sm:col-span-2`}>
                      Número
                      <input required value={number} onChange={(e) => setNumber(e.target.value)} className={inputClass} />
                    </label>
                    <label className={`${labelClass} sm:col-span-4`}>
                      Complemento <span className="font-normal text-zinc-400">(opcional)</span>
                      <input value={complement} onChange={(e) => setComplement(e.target.value)} placeholder="Apartamento, bloco" className={inputClass} autoComplete="address-line2" />
                    </label>
                    <label className={`${labelClass} sm:col-span-2`}>
                      Bairro
                      <input required value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className={inputClass} />
                    </label>
                    <label className={`${labelClass} sm:col-span-3`}>
                      Cidade
                      <input required value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} autoComplete="address-level2" />
                    </label>
                    <label className={`${labelClass} sm:col-span-1`}>
                      UF
                      <input required maxLength={2} value={state} onChange={(e) => setState(e.target.value.toUpperCase())} placeholder="SP" className={`${inputClass} uppercase`} autoComplete="address-level1" />
                    </label>
                  </div>
                </section>
              </div>

              {/* Resumo */}
              <aside className="rounded-3xl bg-white p-6 sm:p-8 lg:sticky lg:top-20" aria-labelledby="resumo-title">
                <h2 id="resumo-title" className="text-xl font-semibold tracking-tight">Resumo</h2>

                <ul className="mt-5 divide-y divide-zinc-100">
                  {items.map((item) => (
                    <li key={item.cartItemId} className="flex items-center gap-4 py-4 first:pt-0">
                      <div className="grid size-14 flex-none place-items-center rounded-xl bg-[#f5f5f7] p-1.5">
                        <img src={item.image} alt="" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-950">{item.name}</p>
                        <p className="text-xs text-zinc-500">
                          {item.selectedColor}
                          {item.quantity > 1 ? ` · ${item.quantity} unidades` : ''}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-zinc-950">{item.priceFrom}</p>
                    </li>
                  ))}
                </ul>

                <dl className="mt-2 space-y-2.5 border-t border-zinc-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-zinc-500">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</dt>
                    <dd>R$ {total.toLocaleString('pt-BR')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-500">Entrega</dt>
                    <dd>Combinada após o pedido</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-500">Pagamento</dt>
                    <dd>Pix ou cartão em até 18x</dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-baseline justify-between border-t border-zinc-100 pt-5">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-2xl font-semibold tracking-tight">R$ {total.toLocaleString('pt-BR')}</span>
                </div>

                {error && (
                  <p role="alert" className="mt-5 rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? <span className="apple-spinner apple-spinner--light" aria-label="Gerando pagamento" /> : 'Ir para o pagamento'}
                </button>

                <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-zinc-500">
                  <Lock className="mt-0.5 size-3.5 flex-none" aria-hidden="true" />
                  Pagamento processado pela Cakto. Os dados do cartão são digitados direto lá e não passam pelo nosso site.
                </p>
                <p className="mt-3 text-xs leading-5 text-zinc-500">
                  Ao continuar, você concorda com a{' '}
                  <Link to="/privacidade" className="text-[#0066cc] hover:underline">Política de privacidade</Link> e as{' '}
                  <Link to="/trocas" className="text-[#0066cc] hover:underline">Trocas e devoluções</Link>.
                </p>
              </aside>
            </form>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
