import { SmoothImage } from '@/components/SmoothImage'
import { useEffect, useState } from 'react'
import { Check, ShieldCheck, ShoppingBag, Truck, X } from 'lucide-react'
import { useProductModalStore } from '@/store/useProductModalStore'
import { useCartStore } from '@/store/useCartStore'

export function ProductModal() {
  const { product, isOpen, close } = useProductModalStore()
  const { addItem } = useCartStore()

  const [selectedStorage, setSelectedStorage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [added, setAdded] = useState(false)

  // Cada produto abre com as opções padrão
  useEffect(() => {
    setSelectedStorage('')
    setSelectedColor('')
    setAdded(false)
  }, [product])

  // Trava o scroll e fecha com Esc
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  if (!isOpen || !product) return null

  const activeStorage = selectedStorage || product.storageOptions?.[0]?.storage || ''
  const activeColor = selectedColor || product.colorOptions?.[0]?.name || product.colors[0] || ''
  const activePrice = product.storageOptions?.find((s) => s.storage === activeStorage)?.priceFrom || product.priceFrom
  const activeImage = product.colorOptions?.find((c) => c.name === activeColor)?.image || product.image

  const handleAddToCart = () => {
    if (addItem(product, activeColor, activeStorage, activePrice, activeImage)) {
      setAdded(true)
      setTimeout(close, 1100)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div
        className="fixed inset-0 z-[61] flex items-end justify-center overflow-y-auto sm:items-center sm:p-6"
        onClick={close}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          onClick={(e) => e.stopPropagation()}
          className="relative grid w-full max-w-4xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:grid-cols-2"
          style={{ animation: 'modalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-black/5 text-zinc-600 transition hover:bg-black/10 hover:text-zinc-950"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>

          {/* Foto */}
          <div className="flex items-center justify-center bg-[#f5f5f7] p-10 md:p-12">
            <SmoothImage
              src={activeImage}
              alt={`${product.name} na cor ${activeColor}`}
              sizes="(min-width: 768px) 420px, 80vw"
              loading="eager"
              className="h-60 w-auto object-contain sm:h-80"
            />
          </div>

          {/* Detalhes */}
          <div className="flex flex-col p-7 sm:p-10">
            <h2 id="product-modal-title" className="font-display text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
              {product.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">{product.description}</p>

            <p className="mt-5 text-2xl font-semibold tracking-tight text-zinc-950">{activePrice}</p>
            <p className="text-sm text-zinc-500">em até 18x no cartão</p>

            {/* Cor */}
            <div className="mt-7">
              <p className="text-sm font-medium text-zinc-950">
                Cor <span className="font-normal text-zinc-500">· {activeColor}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colorOptions && product.colorOptions.length > 0
                  ? product.colorOptions.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        aria-label={`Cor ${c.name}`}
                        aria-pressed={activeColor === c.name}
                        className={`size-8 rounded-full border border-black/10 transition ${
                          activeColor === c.name ? 'ring-2 ring-zinc-950 ring-offset-2' : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))
                  : product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        aria-pressed={activeColor === color}
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          activeColor === color ? 'border-zinc-950 text-zinc-950' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
              </div>
            </div>

            {/* Capacidade */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-zinc-950">
                  {product.category === 'Apple Watch'
                    ? 'Tamanho'
                    : product.storageOptions.every((o) => /\d\s?(GB|TB)/i.test(o.storage))
                      ? 'Armazenamento'
                      : 'Versão'}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {product.storageOptions.map((opt) => (
                    <button
                      key={opt.storage}
                      type="button"
                      onClick={() => setSelectedStorage(opt.storage)}
                      aria-pressed={activeStorage === opt.storage}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        activeStorage === opt.storage
                          ? 'border-zinc-950 ring-1 ring-zinc-950'
                          : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <span className="block text-sm font-semibold text-zinc-950">{opt.storage}</span>
                      <span className="block text-xs text-zinc-500">{opt.priceFrom}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={added}
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition ${
                added ? 'bg-emerald-600' : 'bg-zinc-950 hover:bg-zinc-800 active:scale-[0.98]'
              }`}
            >
              {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
              {added ? 'Adicionado à sacola' : 'Adicionar à sacola'}
            </button>

            <ul className="mt-6 space-y-2 text-sm text-zinc-500">
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 flex-none text-zinc-400" aria-hidden="true" />
                Lacrado, com garantia Apple de 1 ano
              </li>
              <li className="flex items-center gap-2">
                <Truck className="size-4 flex-none text-zinc-400" aria-hidden="true" />
                Entrega combinada com você após o pedido
              </li>
            </ul>
            {product.specs.length > 0 && <p className="mt-4 text-xs text-zinc-400">{product.specs.join(' · ')}</p>}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  )
}
