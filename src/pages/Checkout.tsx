import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { supabase } from '@/lib/supabase'

export default function Checkout() {
  const { items, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const priceString = item.priceFrom.replace(/\D/g, '')
      const price = priceString ? parseInt(priceString, 10) : 0
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

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_price: calculateTotal(),
          status: 'pending'
        })
        .select()
        .single()

      if (orderError) throw orderError

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name')

      if (productsError) throw productsError

      const orderItemsToInsert = items.map(item => {
        const dbProduct = productsData.find(p => p.name === item.name)
        if (!dbProduct) throw new Error(`Produto nao encontrado: ${item.name}`)
        return {
          order_id: order.id,
          product_id: dbProduct.id,
          quantity: item.quantity,
          selected_color: item.selectedColor
        }
      })

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert)

      if (itemsError) throw itemsError

      setSuccess(true)
      clearCart()
    } catch (err: any) {
      setError(err.message || 'Erro ao finalizar o pedido')
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
            Sua solicitação foi registrada com sucesso. Em breve um consultor entrará em contato.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl"
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
          Revise seus itens antes de confirmar.
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
              className="mt-6 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Lista de itens */}
            <div className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {items.length === 1 ? '1 item' : `${items.length} itens`}
              </p>
              <ul className="mt-5 divide-y divide-zinc-100">
                {items.map(item => (
                  <li key={item.cartItemId} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-[#f5f5f7] p-2">
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
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

            {/* Resumo */}
            <div className="space-y-4">
              <div className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Resumo</p>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span>R$ {calculateTotal().toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Frete</span>
                    <span className="text-emerald-600 font-medium">A combinar</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-5">
                  <span className="text-sm font-medium text-zinc-700">Total estimado</span>
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
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-zinc-950 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(24,24,27,0.22)] transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_14px_40px_rgba(24,24,27,0.30)] disabled:translate-y-0 disabled:opacity-60"
              >
                {loading ? (
                  <div className="apple-spinner apple-spinner--light" />
                ) : (
                  <>
                    Confirmar Pedido
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-zinc-400">
                Ao confirmar, um consultor entrará em contato para combinar pagamento e entrega.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
