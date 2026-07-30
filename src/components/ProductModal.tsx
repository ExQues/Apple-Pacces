import { useEffect, useState } from 'react'
import { X, ShoppingBag, Check } from 'lucide-react'
import { useProductModalStore } from '@/store/useProductModalStore'
import { useCartStore } from '@/store/useCartStore'

export function ProductModal() {
  const { product, isOpen, close } = useProductModalStore()
  const { addItem } = useCartStore()

  // Estados locais de seleção no modal
  const [selectedStorage, setSelectedStorage] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [added, setAdded] = useState(false)

  // Trava de scroll quando o modal estiver visível
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  // Definições padrões e cálculos de preço/imagem
  const activeStorage = selectedStorage || product.storageOptions?.[0]?.storage || ''
  const activeColor = selectedColor || product.colorOptions?.[0]?.name || product.colors[0] || ''

  const activeStorageObj = product.storageOptions?.find((s) => s.storage === activeStorage)
  const activePrice = activeStorageObj?.priceFrom || product.priceFrom

  const activeColorObj = product.colorOptions?.find((c) => c.name === activeColor)
  const activeImage = activeColorObj?.image || product.image

  const handleAddToCart = () => {
    addItem(product, activeColor, activeStorage, activePrice, activeImage)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setSelectedStorage('')
      setSelectedColor('')
      close()
    }, 1200)
  }

  const handleClose = () => {
    setSelectedStorage('')
    setSelectedColor('')
    setAdded(false)
    close()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-zinc-950/40 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[61] flex items-center justify-center px-4 py-8 overflow-y-auto">
        <div
          className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.25)] my-auto"
          style={{ animation: 'modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full bg-zinc-100/90 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950 active:scale-90"
            aria-label="Fechar detalhes do produto"
          >
            <X className="size-5" />
          </button>

          {/* Imagem do Produto em Container Titanium Suave */}
          <div className="flex h-64 items-center justify-center bg-gradient-to-b from-slate-100/90 via-zinc-100/80 to-slate-200/60 p-8 sm:h-80 border-b border-zinc-200/60">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full max-h-56 sm:max-h-64 w-auto object-contain transition-all duration-300 drop-shadow-md"
              style={{ animation: 'fadeUp 0.5s ease-out 0.1s both' }}
            />
          </div>

          {/* Conteúdo */}
          <div className="p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              {product.line}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
              {product.name}
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              {product.description}
            </p>

            {/* Specs */}
            <div className="mt-5 flex flex-wrap gap-2">
              {product.specs.map((spec) => (
                <span
                  key={spec}
                  className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Seleção de Capacidade/Armazenamento se houver */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className="mt-6 border-t border-zinc-100 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Capacidade
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.storageOptions.map((opt) => {
                    const isActive = activeStorage === opt.storage
                    return (
                      <button
                        key={opt.storage}
                        onClick={() => setSelectedStorage(opt.storage)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-zinc-950 text-white shadow-md shadow-zinc-950/20'
                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        {opt.storage}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Seleção de Cor */}
            <div className="mt-6 border-t border-zinc-100 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Escolha o acabamento
                </p>
                <span className="text-xs font-semibold text-zinc-700">{activeColor}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colorOptions && product.colorOptions.length > 0
                  ? product.colorOptions.map((c) => {
                      const isActive = activeColor === c.name
                      return (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? 'border-zinc-950 bg-zinc-950 text-white shadow-md shadow-zinc-950/20'
                              : 'border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'
                          }`}
                        >
                          {c.hex && (
                            <span
                              className="size-3 rounded-full border border-black/10 shadow-inner"
                              style={{ backgroundColor: c.hex }}
                            />
                          )}
                          {c.name}
                        </button>
                      )
                    })
                  : product.colors.map((color) => {
                      const isActive = activeColor === color
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`relative rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-zinc-950 text-white shadow-md shadow-zinc-950/20'
                              : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950'
                          }`}
                        >
                          {color}
                        </button>
                      )
                    })}
              </div>
            </div>

            {/* Preço e CTA */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-zinc-100 pt-6">
              <div>
                <span className="text-xs text-zinc-400">Preço final</span>
                <p className="text-2xl font-bold tracking-tight text-zinc-950">
                  {activePrice}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-zinc-950 text-white hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-xl'
                }`}
              >
                {added ? (
                  <>
                    <Check className="size-4" />
                    Adicionado à Sacola!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    Adicionar à Sacola
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animações CSS inline */}
      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(24px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
