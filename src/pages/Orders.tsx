import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Package, Clock, CheckCircle2, ShoppingBag, ExternalLink } from 'lucide-react'
import { SiteHeader } from '@/components/SiteHeader'
import { useAuthStore } from '@/store/useAuthStore'
import { supabase } from '@/lib/supabase'

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  selected_color: string
  products?: {
    name: string
    image?: string
    price_from?: string
  } | {
    name: string
    image?: string
    price_from?: string
  }[] | null
}

interface Order {
  id: string
  created_at: string
  total_price: number
  status: 'pending' | 'completed' | 'cancelled' | string
  order_items?: OrderItem[]
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
          .select(`
            id,
            created_at,
            total_price,
            status,
            order_items (
              id,
              product_id,
              quantity,
              selected_color,
              products (
                name,
                image,
                price_from
              )
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (fetchError) {
          console.warn('Erro ao carregar pedidos do Supabase:', fetchError)
          setError('Não foi possível carregar o histórico de pedidos no momento.')
        } else if (data) {
          setOrders(data as unknown as Order[])
        }
      } catch (err) {
        console.warn('Exceção ao buscar pedidos:', err)
        setError('Erro de conexão ao buscar pedidos.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            Confirmado
          </span>
        )
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <Clock className="size-3.5 text-amber-500" />
            Em atendimento
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] text-zinc-950">
      <SiteHeader variant="shop" />

      <main className="px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-950"
          >
            <ArrowLeft className="size-4" />
            Voltar para a loja
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
                Meus Pedidos
              </h1>
              <p className="mt-2 text-base text-zinc-500">
                Acompanhe o histórico e status de suas solicitações.
              </p>
            </div>
            <div className="hidden size-14 place-items-center rounded-2xl bg-zinc-950 text-white shadow-xl sm:grid">
              <Package className="size-6" />
            </div>
          </div>

          {loading ? (
            <div className="mt-12 flex flex-col items-center justify-center rounded-[2.5rem] border border-zinc-200 bg-white p-16">
              <div className="apple-spinner apple-spinner--lg" />
              <p className="mt-4 text-sm font-medium text-zinc-500">Carregando seus pedidos...</p>
            </div>
          ) : error && orders.length === 0 ? (
            <div className="mt-12 rounded-[2.5rem] border border-zinc-200 bg-white p-10 text-center shadow-sm">
              <p className="text-base font-semibold text-zinc-950">{error}</p>
              <p className="mt-2 text-sm text-zinc-500">
                Caso você tenha realizado um pedido recente, nosso consultor entrará em contato via WhatsApp.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Ir para o Shop
              </Link>
            </div>
          ) : orders.length === 0 ? (
            <div className="mt-12 flex flex-col items-center rounded-[2.5rem] border border-dashed border-zinc-300 bg-white/70 py-20 text-center">
              <div className="grid size-20 place-items-center rounded-full bg-zinc-100 text-zinc-400">
                <ShoppingBag className="size-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-zinc-950">Nenhum pedido encontrado</h3>
              <p className="mt-2 max-w-sm text-sm text-zinc-500">
                Você ainda não realizou solicitações de compra pela plataforma.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex rounded-full bg-zinc-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl"
              >
                Explorar catálogo
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-6">
              {orders.map((order) => {
                const dateFormatted = new Date(order.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-[2.25rem] border border-zinc-200/90 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)]"
                  >
                    {/* Header do Pedido */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 bg-zinc-50/60 px-6 py-5 sm:px-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                          Pedido #{order.id.slice(0, 8)}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">{dateFormatted}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <span className="text-lg font-bold text-zinc-950">
                          R$ {order.total_price.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    {/* Itens do Pedido */}
                    <div className="p-6 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Itens</p>
                      <ul className="mt-4 divide-y divide-zinc-100">
                        {order.order_items && order.order_items.length > 0 ? (
                          order.order_items.map((item) => {
                            const prod = Array.isArray(item.products)
                              ? item.products[0]
                              : item.products

                            return (
                              <li key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                                <div className="flex size-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#f5f5f7] p-2">
                                  {prod?.image ? (
                                    <img
                                      src={prod.image}
                                      alt={prod.name}
                                      className="h-full w-full object-contain"
                                    />
                                  ) : (
                                    <Package className="size-6 text-zinc-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="truncate text-sm font-semibold text-zinc-950">
                                    {prod?.name || 'Produto Apple'}
                                  </p>
                                  <p className="mt-0.5 text-xs text-zinc-400">
                                    Cor: {item.selected_color} · Qtd: {item.quantity}
                                  </p>
                                </div>
                              </li>
                            )
                          })
                        ) : (
                          <li className="py-2 text-sm text-zinc-500">
                            Itens registrados e recebidos pelo consultor.
                          </li>
                        )}
                      </ul>

                      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
                        <p className="text-xs text-zinc-400">
                          Atendimento consultivo prioritário em andamento.
                        </p>
                        <a
                          href="https://wa.me/5500000000000"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066cc] transition hover:underline"
                        >
                          Falar com consultor
                          <ExternalLink className="size-3.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
