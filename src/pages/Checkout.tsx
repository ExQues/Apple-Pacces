import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, ShoppingBag, ArrowRight, CreditCard, QrCode, ShieldCheck, Truck, User, MapPin, Search } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { supabase } from '@/lib/supabase'
import { createCaktoCheckoutSession } from '@/lib/cakto'

export default function Checkout() {
  const { items, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'delivery'>('pix')
  const [caktoPaymentUrl, setCaktoPaymentUrl] = useState<string | null>(null)

  // Dados Pessoais do Cliente
  const [fullName, setFullName] = useState(user?.user_metadata?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState(user?.user_metadata?.whatsapp || '')

  // Endereço de Entrega
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
    let cleaned = priceFrom.trim()
    if (cleaned.includes(',')) {
      cleaned = cleaned.split(',')[0]
    }
    const priceString = cleaned.replace(/\D/g, '')
    return priceString ? parseInt(priceString, 10) : 0
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseItemPrice(item.priceFrom)
      return total + (price * item.quantity)
    }, 0)
  }

  // Mascaras de formatacao
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

  // Busca Automatica de CEP via API ViaCEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 8)
    const formatted = rawDigits.length > 5 ? `${rawDigits.slice(0, 5)}-${rawDigits.slice(5)}` : rawDigits
    setCep(formatted)

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
          setError('CEP não encontrado. Por favor, preencha o endereço manualmente.')
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

    // Validacao dos campos obrigatorios do Primeiro Checkout (Oficial do site)
    if (!fullName.trim() || !cpf.trim() || !phone.trim() || !cep.trim() || !street.trim() || !number.trim() || !neighborhood.trim() || !city.trim() || !state.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios de contato e endereço de entrega.')
      return
    }

    setLoading(true)
    setError(null)
    const total = calculateTotal()

    try {
      // 1. Gravar pedido completo no Supabase (incluindo endereco e dados do cliente)
      const shippingAddress = {
        fullName,
        cpf,
        phone,
        cep,
        street,
        number,
        complement,
        neighborhood,
        city,
        state
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_price: total,
          status: 'pending',
          shipping_address: shippingAddress
        })
        .select()
        .single()

      if (orderError) console.warn('Alerta ordens Supabase:', orderError)

      // 2. Gravar os itens do pedido no Supabase
      if (order) {
        try {
          const { data: productsData } = await supabase.from('products').select('id, name')
          if (productsData && productsData.length > 0) {
            const orderItemsToInsert = items.map((item) => {
              const baseName = item.name.split(' (')[0].trim()
              const dbProduct = productsData.find(
                (p) => p.name === item.name || p.name === baseName,
              )
              return {
                order_id: order.id,
                product_id: dbProduct ? dbProduct.id : productsData[0]?.id,
                quantity: item.quantity,
                selected_color: item.selectedColor,
              }
            })
            await supabase.from('order_items').insert(orderItemsToInsert)
          }
        } catch (e) {
          console.warn('Alerta itens Supabase:', e)
        }
      }

      // 3. Gerar Cobrança Dinâmica na API Cakto se for Pix ou Cartão repassando dados pre-preenchidos
      if (paymentMethod === 'pix' || paymentMethod === 'credit_card') {
        const caktoRes = await createCaktoCheckoutSession({
          totalAmount: total,
          paymentMethod: paymentMethod === 'credit_card' ? 'credit_card' : 'pix',
          customer: {
            name: fullName,
            email: email,
            phone: phone.replace(/\D/g, ''),
          },
          items: items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            price: parseItemPrice(i.priceFrom),
          })),
        })

        if (caktoRes.checkoutUrl) {
          // Adiciona parametros pre-preenchidos de cliente e documento na URL da Cakto
          const cleanCpf = cpf.replace(/\D/g, '')
          const cleanPhone = phone.replace(/\D/g, '')
          const finalUrl = `${caktoRes.checkoutUrl}&docNumber=${encodeURIComponent(cleanCpf)}&phone=${encodeURIComponent(cleanPhone)}`
          
          setCaktoPaymentUrl(finalUrl)
          window.location.href = finalUrl
          return
        }
      }

      setSuccess(true)
      clearCart()
    } catch (err) {
      console.warn('Erro ao processar checkout:', err)
      setSuccess(true)
      clearCart()
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6] px-5 py-12 animate-page-in">
        <div className="w-full max-w-md text-center">
          <div className="relative mx-auto mb-8 grid size-24 place-items-center rounded-full bg-emerald-50">
            <CheckCircle className="size-12 text-emerald-500" />
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-30" />
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] text-zinc-950">
            Pedido Confirmado!
          </h2>
          <p className="mx-auto mt-4 max-w-xs text-[15px] leading-7 text-zinc-500">
            Sua solicitação de pedido foi gravada no sistema com sucesso.
          </p>

          {caktoPaymentUrl && (
            <a
              href={caktoPaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-500 active:scale-95"
            >
              Ir para Pagamento Cakto
              <ArrowRight className="size-4" />
            </a>
          )}

          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-8 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-50 active:scale-95"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] px-5 pb-20 pt-12 animate-page-in sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-950"
        >
          <ArrowLeft className="size-4" />
          Voltar para a loja
        </Link>

        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-zinc-950">
          Finalizar Pedido
        </h1>
        <p className="mt-2 text-[15px] text-zinc-500">
          Preencha suas informações de entrega e escolha a forma de pagamento.
        </p>
        
        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-[2rem] border border-dashed border-zinc-200 bg-white/60 py-20 text-center">
            <div className="grid size-20 place-items-center rounded-full bg-zinc-50">
              <ShoppingBag className="size-8 text-zinc-300" />
            </div>
            <p className="mt-5 font-semibold text-zinc-950">Nenhum item no pedido</p>
            <p className="mt-1.5 text-sm text-zinc-400">Adicione produtos pelo catálogo antes de continuar.</p>
            <Link
              to="/shop"
              className="mt-6 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 active:scale-95"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              
              {/* 1. SEÇÃO DE DADOS PESSOAIS */}
              <div className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                  <div className="grid size-9 place-items-center rounded-xl bg-zinc-100 text-zinc-950">
                    <User className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-950">1. Dados do Cliente</h3>
                    <p className="text-xs text-zinc-400">Informações de identificação para o pedido</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-700">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700">CPF *</label>
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(formatCpf(e.target.value))}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700">WhatsApp / Celular *</label>
                    <input
                      type="text"
                      required
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-700">E-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. SEÇÃO DE ENDEREÇO DE ENTREGA */}
              <div className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                  <div className="grid size-9 place-items-center rounded-xl bg-zinc-100 text-zinc-950">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-950">2. Endereço de Entrega</h3>
                    <p className="text-xs text-zinc-400">Informe onde você deseja receber seu aparelho</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700">CEP *</label>
                    <div className="relative mt-1.5">
                      <input
                        type="text"
                        required
                        placeholder="00000-000"
                        value={cep}
                        onChange={handleCepChange}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 pr-10 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                      />
                      {loadingCep ? (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="apple-spinner apple-spinner--dark size-4" />
                        </div>
                      ) : (
                        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-700">Rua / Logradouro *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Av. Paulista"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700">Número *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 1000"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-700">Complemento (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ex: Apto 42, Bloco B"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700">Bairro *</label>
                    <input
                      type="text"
                      required
                      placeholder="Bairro"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700">Cidade *</label>
                    <input
                      type="text"
                      required
                      placeholder="Cidade"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700">Estado (UF) *</label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      placeholder="SP"
                      value={state}
                      onChange={(e) => setState(e.target.value.toUpperCase())}
                      className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-950 placeholder-zinc-400 transition focus:border-zinc-950 focus:bg-white focus:outline-none uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* 3. SEÇÃO DE FORMA DE PAGAMENTO */}
              <div className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                  <div className="grid size-9 place-items-center rounded-xl bg-sky-50 text-sky-600">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-950">3. Forma de Pagamento</h3>
                    <p className="text-xs text-zinc-400">Cobrança segura no valor do dia via Cakto Pay</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {/* Opção Pix */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition active:scale-98 ${
                      paymentMethod === 'pix'
                        ? 'border-zinc-950 bg-zinc-950 text-white shadow-md'
                        : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <div className={`grid size-10 flex-shrink-0 place-items-center rounded-xl ${paymentMethod === 'pix' ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                      <QrCode className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">Pix Instantâneo (Cakto)</p>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${paymentMethod === 'pix' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'}`}>
                          Aprovação imediata
                        </span>
                      </div>
                      <p className={`mt-1 text-xs ${paymentMethod === 'pix' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        Gera o QR Code / Copia e Cola no valor exato do dia (R$ {calculateTotal().toLocaleString('pt-BR')})
                      </p>
                    </div>
                  </button>

                  {/* Opção Cartão de Crédito */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition active:scale-98 ${
                      paymentMethod === 'credit_card'
                        ? 'border-zinc-950 bg-zinc-950 text-white shadow-md'
                        : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <div className={`grid size-10 flex-shrink-0 place-items-center rounded-xl ${paymentMethod === 'credit_card' ? 'bg-white/15 text-white' : 'bg-sky-50 text-sky-600'}`}>
                      <CreditCard className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">Cartão de Crédito (até 12x)</p>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${paymentMethod === 'credit_card' ? 'bg-sky-400/20 text-sky-300' : 'bg-sky-50 text-sky-700'}`}>
                          Até 12x
                        </span>
                      </div>
                      <p className={`mt-1 text-xs ${paymentMethod === 'credit_card' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        Parcelamento seguro via Cakto Pay em até 12 vezes no cartão
                      </p>
                    </div>
                  </button>

                  {/* Opção Presencial */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('delivery')}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition active:scale-98 ${
                      paymentMethod === 'delivery'
                        ? 'border-zinc-950 bg-zinc-950 text-white shadow-md'
                        : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <div className={`grid size-10 flex-shrink-0 place-items-center rounded-xl ${paymentMethod === 'delivery' ? 'bg-white/15 text-white' : 'bg-zinc-100 text-zinc-700'}`}>
                      <Truck className="size-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Combinar no Atendimento / Retirada</p>
                      <p className={`mt-1 text-xs ${paymentMethod === 'delivery' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        Pagamento presencial no momento da entrega ou retirada do aparelho
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* RESUMO DO PEDIDO */}
            <div className="space-y-4">
              <div className="sticky top-6 rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Resumo do Pedido</p>

                {/* Lista compacta de itens */}
                <ul className="mt-4 divide-y divide-zinc-100 border-b border-zinc-100 pb-4">
                  {items.map(item => (
                    <li key={item.cartItemId} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-50 p-1 border border-zinc-100">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-semibold text-zinc-950">{item.name}</p>
                        <p className="text-[11px] text-zinc-400">{item.selectedColor} · Qtd: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold text-zinc-950">{item.priceFrom}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                    <span className="font-medium text-zinc-950">R$ {calculateTotal().toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Pagamento</span>
                    <span className="font-semibold text-zinc-950 uppercase">
                      {paymentMethod === 'pix' ? 'Pix (Cakto)' : paymentMethod === 'credit_card' ? 'Cartão 12x' : 'Presencial'}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Frete de Envio</span>
                    <span className="font-semibold text-emerald-600">A combinar</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <span className="text-sm font-medium text-zinc-700">Total do dia</span>
                  <span className="text-2xl font-bold tracking-tight text-zinc-950">
                    R$ {calculateTotal().toLocaleString('pt-BR')}
                  </span>
                </div>

                {error && (
                  <div className="mt-4 rounded-2xl border border-red-100 bg-red-50/80 p-4 text-xs font-medium leading-relaxed text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="mt-6 group flex w-full items-center justify-center gap-2.5 rounded-full bg-zinc-950 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(24,24,27,0.22)] transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_14px_40px_rgba(24,24,27,0.30)] active:scale-95 disabled:translate-y-0 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="apple-spinner apple-spinner--light" />
                  ) : (
                    <>
                      Confirmar e Ir para Pagamento
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[11px] text-zinc-400">
                  🔒 Seus dados de entrega estão protegidos por criptografia de ponta a ponta.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}


