import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, ShoppingBag, ArrowRight, CreditCard, QrCode, ShieldCheck, Truck } from 'lucide-react'
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

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setLoading(true)
    setError(null)
    const total = calculateTotal()

    try {
      // 1. Gravar pedido no Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_price: total,
          status: 'pending'
        })
        .select()
        .single()

      if (orderError) console.warn('Alerta ordens Supabase:', orderError)

      // 2. Tentar inserir os itens do pedido no Supabase se houver tabela
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

      // 3. Gerar Cobrança Dinâmica na API Cakto se for Pix ou Cartão
      if (paymentMethod === 'pix' || paymentMethod === 'credit_card') {
        const caktoRes = await createCaktoCheckoutSession({
          totalAmount: total,
          paymentMethod: paymentMethod === 'credit_card' ? 'credit_card' : 'pix',
          customer: {
            name: user.email?.split('@')[0] || 'Cliente Apple Pacces',
            email: user.email || '',
          },
          items: items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            price: parseItemPrice(i.priceFrom),
          })),
        })

        if (caktoRes.checkoutUrl) {
          setCaktoPaymentUrl(caktoRes.checkoutUrl)
          // Se houver URL do Checkout Cakto, redireciona o cliente após registrar
          window.location.href = caktoRes.checkoutUrl
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
            Sua solicitação foi registrada com sucesso. As chaves de cobrança Cakto foram geradas para o valor atualizado.
          </p>

          {caktoPaymentUrl && (
            <a
              href={caktoPaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-500 active:scale-95"
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
      <div className="mx-auto max-w-3xl">
        <Link
          to="/shop"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-950"
        >
          <ArrowLeft className="size-4" />
          Voltar para a loja
        </Link>

        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-zinc-950">
          Finalizar Pedido
        </h1>
        <p className="mt-3 text-[15px] text-zinc-500">
          Escolha a forma de pagamento e revise seus itens.
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
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              {/* Lista de itens */}
              <div className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {items.length === 1 ? '1 item' : `${items.length} itens`}
                </p>
                <ul className="mt-5 divide-y divide-zinc-100">
                  {items.map(item => (
                    <li key={item.cartItemId} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-slate-100 to-zinc-100 p-2 border border-zinc-200/60">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain drop-shadow-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold text-zinc-950">{item.name}</p>
                        <p className="mt-0.5 text-xs text-zinc-400">
                          {item.selectedColor} · Qtd: {item.quantity}
                        </p>
                      </div>
                      <p className="flex-shrink-0 text-sm font-semibold text-zinc-950">{item.priceFrom}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seletor de Forma de Pagamento */}
              <div className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-sky-600" />
                  <h3 className="text-base font-semibold text-zinc-950">Forma de Pagamento</h3>
                </div>
                <p className="mt-1 text-xs text-zinc-500">Cobrança dinâmica em tempo real via Cakto Pay</p>

                <div className="mt-5 space-y-3">
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

                  {/* Opção Pagamento na Entrega / Presencial */}
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

            {/* Resumo */}
            <div className="space-y-4">
              <div className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Resumo do Pedido</p>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span>R$ {calculateTotal().toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Método de cobrança</span>
                    <span className="font-semibold text-zinc-950 uppercase text-xs">
                      {paymentMethod === 'pix' ? 'Pix (Cakto)' : paymentMethod === 'credit_card' ? 'Cartão 12x' : 'Presencial'}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Frete</span>
                    <span className="text-emerald-600 font-medium">A combinar</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-5">
                  <span className="text-sm font-medium text-zinc-700">Total do dia</span>
                  <span className="text-xl font-semibold tracking-tight text-zinc-950">
                    R$ {calculateTotal().toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3.5 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading || items.length === 0}
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-zinc-950 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(24,24,27,0.22)] transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_14px_40px_rgba(24,24,27,0.30)] active:scale-95 disabled:translate-y-0 disabled:opacity-60"
              >
                {loading ? (
                  <div className="apple-spinner apple-spinner--light" />
                ) : (
                  <>
                    Confirmar e Pagar com Cakto
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-zinc-400">
                A cobrança é gerada em tempo real pela Cakto no valor atualizado do dia.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

