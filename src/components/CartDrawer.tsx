import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, totalItems } = useCartStore()
  const navigate = useNavigate()

  // Travar scroll do body quando o drawer estiver aberto
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  const handleCheckout = () => {
    closeDrawer()
    navigate('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-zinc-950/30 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed right-0 top-0 z-[71] flex h-full w-full max-w-[420px] flex-col bg-white shadow-[rgba(0,0,0,0.12)_-8px_0_40px] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 pb-5 pt-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-zinc-950 text-white">
              <ShoppingBag className="size-[18px]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-950">Sua Sacola</h2>
              <p className="text-xs text-zinc-400">
                {totalItems() === 0
                  ? 'Nenhum item'
                  : totalItems() === 1
                    ? '1 item'
                    : `${totalItems()} itens`}
              </p>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="grid size-9 place-items-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-950"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center pb-16">
              <div className="grid size-20 place-items-center rounded-full bg-zinc-50">
                <ShoppingBag className="size-8 text-zinc-300" />
              </div>
              <p className="mt-5 text-sm font-semibold text-zinc-950">Sacola vazia</p>
              <p className="mt-1.5 text-center text-sm text-zinc-400">
                Adicione produtos navegando pelo catalogo.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.cartItemId}
                  className="group rounded-2xl border border-zinc-100 bg-white p-4 transition hover:border-zinc-200 hover:shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#f5f5f7] p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-950 leading-tight">{item.name}</h3>
                        <p className="mt-0.5 text-xs text-zinc-400">{item.selectedColor}</p>
                      </div>
                      <p className="text-sm font-semibold text-zinc-950">{item.priceFrom}</p>
                    </div>

                    {/* Remover */}
                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="self-start rounded-lg p-1.5 text-zinc-300 transition hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remover ${item.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  {/* Quantidade */}
                  <div className="mt-3 flex items-center justify-end">
                    <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                        className="grid size-7 place-items-center rounded-full text-zinc-400 transition hover:bg-white hover:text-zinc-950 hover:shadow-sm"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="min-w-[28px] text-center text-sm font-semibold text-zinc-950">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="grid size-7 place-items-center rounded-full text-zinc-400 transition hover:bg-white hover:text-zinc-950 hover:shadow-sm"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / CTA */}
        {items.length > 0 && (
          <div className="border-t border-zinc-100 px-6 pb-6 pt-5">
            <button
              onClick={handleCheckout}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl"
            >
              Finalizar Compra
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
