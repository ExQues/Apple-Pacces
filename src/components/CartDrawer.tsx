import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useNavigate } from 'react-router-dom'

export function CartDrawer() {
  const { items, isDrawerOpen, toggleDrawer, updateQuantity, removeItem, totalItems } = useCartStore()
  const navigate = useNavigate()

  if (!isDrawerOpen) return null

  const handleCheckout = () => {
    toggleDrawer()
    navigate('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40 bg-zinc-950/20 backdrop-blur-sm transition-opacity"
        onClick={toggleDrawer}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform">
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-950">
            <ShoppingBag className="size-5" />
            Sua Sacola ({totalItems()})
          </h2>
          <button onClick={toggleDrawer} className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-zinc-500">
              <ShoppingBag className="mb-4 size-12 opacity-20" />
              <p>Sua sacola esta vazia.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.cartItemId} className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-[#f5f5f7] p-2">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-zinc-950">{item.name}</h3>
                      <p className="text-sm text-zinc-500">Cor: {item.selectedColor}</p>
                      <p className="mt-1 text-sm font-medium text-zinc-950">{item.priceFrom}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-zinc-200 px-3 py-1">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                          className="text-zinc-500 hover:text-zinc-950"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-sm font-medium text-zinc-950">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-zinc-500 hover:text-zinc-950"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-zinc-100 bg-zinc-50 px-6 py-6">
            <button 
              onClick={handleCheckout}
              className="w-full rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  )
}
