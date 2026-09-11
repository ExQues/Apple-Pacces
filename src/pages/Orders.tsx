import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingBag } from 'lucide-react'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { useAuthStore } from '@/store/useAuthStore'
import { supabase } from '@/lib/supabase'

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  selected_color: string
  products?: { name: string; image?: string } | { name: string; image?: string }[] | null
}

interface Order {
  id: string
  created_at: string
  total_price: number
  status: 'pending' | 'completed' | 'cancelled' | string
  order_items?: OrderItem[]
}

const STATUS: Record<string, { label: string; className: string }> = {
  pending: { label: 'Aguardando pagamento', className: 'bg-amber-50 text-amber-800' },
  completed: { label: 'Pago', className: 'bg-emerald-50 text-emerald-700' },
  cancelled: { label: 'Cancelado', className: 'bg-zinc-100 text-zinc-600' },
}

export default function Orders() {
  const { user } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('orders')
          .select('id, created_at, total_price, status, order_items ( id, product_id, quantity, selected_color, products ( name, image ) )')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (fetchError) {
          console.warn('Erro ao carregar pedidos do Supabase:', fetchError)
          setError('Não foi possível carregar seus pedidos agora.')
        } else if (data) {
          setOrders(data as unknown as Order[])
        }
      } catch (err) {
        console.warn('Exceção ao buscar pedidos:', err)
        setError('Não foi possível carregar seus pedidos agora.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-950">
      <SiteHeader variant="shop" />

      <main className="px-5 pb-24 pt-28 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Meus pedidos.</h1>
          <p className="mt-3 text-lg text-zinc-500">Acompanhe o status das suas compras.</p>

          {loading ? (
            <div className="mt-10 flex flex-col items-center rounded-3xl bg-white p-16">
              <span className="apple-spinner apple-spinner--lg" aria-label="Carregando pedidos" />
              <p className="mt-4 text-sm text-zinc-500">Carregando seus pedidos…</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="mt-10 flex flex-col items-center rounded-3xl bg-white px-6 py-16 text-center">
              <ShoppingBag className="size-10 text-zinc-300" strokeWidth={1.5} />
              <p className="mt-5 text-lg font-semibold">{error ?? 'Você ainda não fez nenhum pedido'}</p>
              <p className="mt-1.5 max-w-sm text-sm leading-6 text-zinc-500">
                {error
                  ? 'Se você acabou de comprar, fique tranquilo: confirmamos pelo WhatsApp informado no pedido.'
                  : 'Quando você finalizar uma compra, ela aparece aqui.'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/shop" className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
                  Ver a loja
                </Link>
                <a href="/#contato" className="rounded-full px-6 py-3 text-sm font-semibold text-[#0066cc] hover:underline">
                  Falar com a gente
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-10 space-y-5">
              {orders.map((order) => {
                const status = STATUS[order.status] ?? STATUS.pending
                const date = new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

                return (
                  <article key={order.id} className="rounded-3xl bg-white p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-zinc-500">
                          Pedido <span className="font-mono text-zinc-700">#{order.id.slice(0, 8)}</span> · {date}
                        </p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight">R$ {order.total_price.toLocaleString('pt-BR')}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                    </div>

                    <ul className="mt-6 divide-y divide-zinc-100 border-t border-zinc-100">
                      {order.order_items && order.order_items.length > 0 ? (
                        order.order_items.map((item) => {
                          const prod = Array.isArray(item.products) ? item.products[0] : item.products
                          return (
                            <li key={item.id} className="flex items-center gap-4 py-4">
                              <div className="grid size-14 flex-none place-items-center rounded-xl bg-[#f5f5f7] p-1.5">
                                {prod?.image ? (
                                  <img src={prod.image} alt="" className="max-h-full max-w-full object-contain" />
                                ) : (
                                  <Package className="size-5 text-zinc-400" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">{prod?.name || 'Produto Apple'}</p>
                                <p className="text-xs text-zinc-500">
                                  {item.selected_color} · {item.quantity} {item.quantity === 1 ? 'unidade' : 'unidades'}
                                </p>
                              </div>
                            </li>
                          )
                        })
                      ) : (
                        <li className="py-4 text-sm text-zinc-500">Os itens deste pedido estão com o nosso atendimento.</li>
                      )}
                    </ul>

                    <p className="mt-2 text-sm text-zinc-500">
                      Dúvidas sobre este pedido?{' '}
                      <a href="/#contato" className="font-medium text-[#0066cc] hover:underline">
                        Fale com a gente
                      </a>
                    </p>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
