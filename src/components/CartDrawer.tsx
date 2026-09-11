import { productImgProps } from '@/lib/images'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

function parsePrice(priceFrom: string): number {
  const digits = priceFrom.replace(/\D/g, '')
  return digits ? parseInt(digits, 10) : 0
}

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, totalItems } = useCartStore()
  const navigate = useNavigate()
  const count = totalItems()

  // Trava o scroll e fecha com Esc
  useEffect(() => {
    if (!isDrawerOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeDrawer()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isDrawerOpen, closeDrawer])

  const goTo = (path: string) => {
    closeDrawer()
    navigate(path)
  }

  const subtotal = items.reduce((acc, item) => acc + parsePrice(item.priceFrom) * item.quantity, 0)

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sacola"
        className={`fixed right-0 top-0 z-[71] flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950">Sacola</h2>
            <p className="text-sm text-zinc-500">
              {count === 0 ? 'Nenhum item' : count === 1 ? '1 item' : `${count} itens`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="grid size-9 place-items-center rounded-full bg-black/5 text-zinc-600 transition hover:bg-black/10 hover:text-zinc-950"
            aria-label="Fechar sacola"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Itens */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center pb-16 text-center">
              <ShoppingBag className="size-10 text-zinc-300" strokeWidth={1.5} />
              <p className="mt-5 text-base font-semibold text-zinc-950">Sua sacola está vazia</p>
              <p className="mt-1.5 max-w-[240px] text-sm leading-6 text-zinc-500">
                Explore a loja e encontre o aparelho ideal para você.
              </p>
              <button
                type="button"
                onClick={() => goTo('/shop')}
                className="mt-6 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Ver a loja
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {items.map((item) => (
                <li key={item.cartItemId} className="flex gap-4 py-5">
                  <div className="grid size-20 flex-none place-items-center rounded-2xl bg-[#f5f5f7] p-2">
                    <img {...productImgProps(item.image, '80px')} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-zinc-950">{item.name}</h3>
                        <p className="mt-0.5 text-xs text-zinc-500">{item.selectedColor}</p>
                      </div>
                      <p className="flex-none text-sm font-semibold text-zinc-950">{item.priceFrom}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-full border border-zinc-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                          className="grid size-8 place-items-center text-zinc-500 transition hover:text-zinc-950"
                          aria-label={`Diminuir quantidade de ${item.name}`}
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-medium text-zinc-950">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="grid size-8 place-items-center text-zinc-500 transition hover:text-zinc-950"
                          aria-label={`Aumentar quantidade de ${item.name}`}
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-xs font-medium text-[#0066cc] hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé */}
        {items.length > 0 && (
          <div className="border-t border-zinc-100 px-6 pb-6 pt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-zinc-500">Subtotal</span>
              <span className="text-xl font-semibold tracking-tight text-zinc-950">
                R$ {subtotal.toLocaleString('pt-BR')}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-zinc-500">Pix ou em até 18x no cartão · frete combinado após o pedido</p>

            <button
              type="button"
              onClick={() => goTo('/checkout')}
              className="mt-5 w-full rounded-full bg-zinc-950 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
            >
              Finalizar compra
            </button>
            <button
              type="button"
              onClick={closeDrawer}
              className="mt-3 w-full text-center text-sm font-medium text-[#0066cc] hover:underline"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
