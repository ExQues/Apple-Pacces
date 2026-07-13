import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
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
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6] px-5 py-12">
        <div className="w-full max-w-md rounded-[2.5rem] border border-zinc-200 bg-white p-10 text-center shadow-2xl">
          <CheckCircle className="mx-auto mb-6 size-16 text-emerald-500" />
          <h2 className="font-display text-3xl font-semibold text-zinc-950">Pedido Confirmado!</h2>
          <p className="mt-4 text-zinc-600">Sua solicitacao foi registrada com sucesso. Em breve um consultor entrara em contato.</p>
          <Link to="/" className="mt-8 inline-block rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800">
            Voltar para o inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/shop" className="mb-8 flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-950">
          <ArrowLeft className="size-4" />
          Voltar para a loja
        </Link>
        <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-2xl sm:p-12">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.045em] text-zinc-950">
            Finalizar Pedido
          </h2>
          
          {items.length === 0 ? (
            <p className="mt-4 text-zinc-600">Seu carrinho esta vazio.</p>
          ) : (
            <>
              <div className="mt-8 border-t border-zinc-100 pt-8">
                <ul className="space-y-6">
                  {items.map(item => (
                    <li key={item.cartItemId} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-zinc-950">{item.name}</p>
                        <p className="text-sm text-zinc-500">{item.selectedColor} - Qtd: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-zinc-950">{item.priceFrom}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-8">
                <p className="text-lg font-semibold text-zinc-950">Total Estimado</p>
                <p className="text-2xl font-semibold text-zinc-950">
                  R$ {calculateTotal().toLocaleString('pt-BR')}
                </p>
              </div>

              {error && (
                <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {!user && (
                <div className="mt-8 rounded-2xl border border-sky-100 bg-sky-50 p-6">
                  <p className="text-sm font-medium text-sky-800">Voce precisa estar logado para fazer o pedido.</p>
                  <Link to="/login" className="mt-4 inline-block rounded-full border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 shadow-sm transition hover:bg-sky-100">
                    Fazer Login
                  </Link>
                </div>
              )}

              <button 
                onClick={handleCheckout}
                disabled={loading || items.length === 0 || !user}
                className="mt-8 w-full rounded-full bg-zinc-950 px-7 py-5 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800 disabled:translate-y-0 disabled:opacity-50"
              >
                {loading ? 'Processando...' : 'Confirmar Pedido'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
