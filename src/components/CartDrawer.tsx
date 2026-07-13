import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function parsePrice(priceFrom: string): number {
  const digits = priceFrom.replace(/\D/g, '')
  return digits ? parseInt(digits, 10) : 0
}

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, totalItems } = useCartStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  const handleCheckout = () => {
    closeDrawer()
    navigate('/checkout')
  }

  const subtotal = items.reduce((acc, item) => acc + parsePrice(item.priceFrom) * item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-zinc-950/25 backdrop-blur-[6px] transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[71] flex h-full w-full max-w-[440px] flex-col border-l border-zinc-100 bg-[#fafafa] shadow-[rgba(0,0,0,0.08)_-12px_0_50px] transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ── */}
        <div className="relative flex items-center justify-between px-7 pb-5 pt-7">
          <div className="flex items-center gap-3.5">
            <div className="grid size-11 place-items-center rounded-2xl bg-zinc-950 shadow-lg shadow-zinc-950/15">
              <ShoppingBag className="size-[18px] text-white" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight text-zinc-950">Sua Sacola</h2>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                {totalItems() === 0
                  ? 'Vazia'
                  : totalItems() === 1
                    ? '1 item'
                    : `${totalItems()} itens`}
              </p>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="grid size-9 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-400 shadow-sm transition hover:border-zinc-300 hover:text-zinc-950"
          >
            <X className="size-4" />
          </button>
          {/* Divider line */}
          <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center pb-20">
              <div className="relative grid size-24 place-items-center rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <ShoppingBag className="size-9 text-zinc-200" />
                <div className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-zinc-950 shadow-lg">
                  <Sparkles className="size-3.5 text-white" />
                </div>
              </div>
              <p className="mt-6 text-sm font-semibold text-zinc-950">Sua sacola esta vazia</p>
              <p className="mt-1.5 max-w-[220px] text-center text-[13px] leading-5 text-zinc-400">
                Explore o catalogo e encontre o dispositivo perfeito para voce.
              </p>
              <button
                onClick={() => {
                  closeDrawer()
                  navigate('/shop')
                }}
                className="mt-6 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
              >
                Ver produtos
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li
                  key={item.cartItemId}
                  className="overflow-hidden rounded-[1.25rem] border border-zinc-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex gap-0">
                    {/* Thumbnail */}
                    <div className="flex w-[90px] flex-shrink-0 items-center justify-center bg-[#f5f5f7] p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-contain"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between px-4 py-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate text-[13px] font-semibold leading-tight text-zinc-950">{item.name}</h3>
                          <p className="mt-0.5 text-[11px] font-medium text-zinc-400">{item.selectedColor}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="flex-shrink-0 rounded-lg p-1 text-zinc-300 transition hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remover ${item.name}`}
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-zinc-950">{item.priceFrom}</p>

                        {/* Stepper */}
                        <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50/80">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                            className="grid size-7 place-items-center rounded-full text-zinc-400 transition hover:text-zinc-950"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-[24px] text-center text-xs font-semibold text-zinc-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="grid size-7 place-items-center rounded-full text-zinc-400 transition hover:text-zinc-950"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="border-t border-zinc-100 bg-white px-7 pb-7 pt-5">
            {/* Subtotal */}
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-zinc-500">Subtotal estimado</span>
              <span className="text-lg font-semibold tracking-tight text-zinc-950">
                R$ {subtotal.toLocaleString('pt-BR')}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(24,24,27,0.22)] transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_14px_40px_rgba(24,24,27,0.30)]"
            >
              Finalizar Compra
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <p className="mt-3 text-center text-[11px] text-zinc-400">
              Frete e condicoes calculados no checkout
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
