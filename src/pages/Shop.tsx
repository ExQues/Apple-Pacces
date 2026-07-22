import { useMemo, useRef, useState } from 'react'
import { BadgeCheck, Clock3, PackageCheck, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react'
import { SiteHeader } from '@/components/SiteHeader'
import { categories } from '@/data/appleStore'
import { useCartStore } from '@/store/useCartStore'
import { useProductModalStore } from '@/store/useProductModalStore'
import { useFlyingAnimationStore } from '@/store/useFlyingAnimationStore'
import { useProducts } from '@/hooks/useProducts'
import type { FeaturedProduct } from '@/data/appleStore'

const CATEGORY_FILTERS = ['Todos', 'iPhone', 'Mac', 'iPad', 'Apple Watch', 'Android', 'Acessorios'] as const

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-')
}

function ProductCard({ product }: { product: FeaturedProduct }) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const { addItemSilently } = useCartStore()
  const { open: openModal } = useProductModalStore()
  const { triggerFly } = useFlyingAnimationStore()

  // Estado da opcao de armazenamento selecionada
  const defaultStorage = product.storageOptions?.[0]?.storage || ''
  const [selectedStorage, setSelectedStorage] = useState(defaultStorage)

  // Estado da cor selecionada
  const defaultColor = product.colorOptions?.[0]?.name || product.colors[0] || ''
  const [selectedColor, setSelectedColor] = useState(defaultColor)

  // Calcular preco e imagem ativos dinamicamente
  const activeStorageObj = product.storageOptions?.find((s) => s.storage === selectedStorage)
  const activePrice = activeStorageObj?.priceFrom || product.priceFrom

  const activeColorObj = product.colorOptions?.find((c) => c.name === selectedColor)
  const activeImage = activeColorObj?.image || product.image

  const handleAddToCart = () => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect()
      triggerFly(activeImage, rect)
    }
    addItemSilently(product, selectedColor, selectedStorage, activePrice, activeImage)
  }

  return (
    <article
      id={slugify(product.category)}
      className="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden bg-zinc-100">
        <div className="flex h-72 items-center justify-center bg-[#f5f5f7] p-8">
          <img
            ref={imgRef}
            src={activeImage}
            alt={`Imagem do ${product.name} na cor ${selectedColor}`}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget
              target.onerror = null
              target.src =
                'data:image/svg+xml;utf8,' +
                encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f5f5f7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="20" fill="%239ca3af">${product.name}</text></svg>`,
                )
            }}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute left-5 top-5 flex gap-2">
          <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur">
            {product.category}
          </span>
          {product.status === 'em-falta' && (
            <span className="rounded-full bg-red-500/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur">
              Em falta
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">{product.line}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">{product.name}</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{product.description}</p>

        {/* Seletor Dinamico de Armazenamento/Capacidade */}
        {product.storageOptions && product.storageOptions.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Capacidade</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.storageOptions.map((opt) => (
                <button
                  key={opt.storage}
                  onClick={() => setSelectedStorage(opt.storage)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    selectedStorage === opt.storage
                      ? 'bg-zinc-950 font-semibold text-white shadow-sm'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {opt.storage}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Seletor Dinamico de Cor com Bolinhas e Preview em Tempo Real */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Cor</p>
              <span className="text-xs font-semibold text-zinc-700">{selectedColor}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {product.colorOptions.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                    selectedColor === c.name
                      ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'
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
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
          <div>
            <span className="text-xs text-zinc-400">A partir de</span>
            <p className="text-xl font-bold text-zinc-950">{activePrice}</p>
          </div>
          <div className="flex items-center gap-2">
            {product.status === 'em-falta' ? (
              <span className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-400">
                Esgotado
              </span>
            ) : (
              <>
                <button
                  onClick={() => openModal({ ...product, priceFrom: activePrice, image: activeImage })}
                  className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
                >
                  Comprar
                </button>
                <button
                  onClick={handleAddToCart}
                  className="grid size-10 place-items-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950"
                  aria-label={`Adicionar ${product.name} à sacola`}
                >
                  <ShoppingBag className="size-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Shop() {
  const { products } = useProducts()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<(typeof CATEGORY_FILTERS)[number]>('Todos')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return products.filter((p) => {
      const inCategory = selected === 'Todos' || p.category === selected
      if (!inCategory) return false
      if (!term) return true
      return (
        p.name.toLowerCase().includes(term) ||
        p.line.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      )
    })
  }, [query, selected, products])

  const totalByCategory = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + 1)
    return map
  }, [products])

  return (
    <div className="min-h-screen bg-[#f8f8f6] text-zinc-950">
      <SiteHeader variant="shop" />
      <main className="px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-zinc-950 sm:text-6xl">
                Shopping Apple completo.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                Uma prateleira digital limpa para comparar iPhone, Mac, iPad, Apple Watch, Android e acessorios. Filtre por linha, busque pelo nome e fale direto com um consultor.
              </p>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-xl">
              <label className="flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100">
                <Search className="size-4 text-zinc-500" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por modelo, linha ou uso"
                  className="w-full bg-transparent text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none"
                  aria-label="Buscar produtos"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="grid size-6 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950"
                    aria-label="Limpar busca"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                )}
              </label>
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map((cat) => {
                  const isActive = selected === cat
                  const count = cat === 'Todos' ? products.length : totalByCategory.get(cat) ?? 0
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelected(cat)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? 'bg-zinc-950 text-white shadow-sm'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
                      }`}
                    >
                      {cat}
                      <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${isActive ? 'bg-white/15 text-white' : 'bg-white text-zinc-500'}`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-6 text-center">
                <div>
                  <p className="text-2xl font-semibold tracking-tight">{filtered.length}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">exibidos</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight">{categories.length}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">linhas</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight">24h</p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">retorno</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl" aria-labelledby="shop-curation-title">
          <div className="grid gap-5 rounded-[2.5rem] border border-zinc-200 bg-white p-5 shadow-[0_24px_70px_rgba(24,24,27,0.10)] lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div className="rounded-[2rem] bg-zinc-950 p-8 text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <BadgeCheck className="size-4" aria-hidden="true" />
                Compra premium, menos duvida
              </p>
              <h2 id="shop-curation-title" className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-[-0.045em]">
                Curadoria que reduz arrependimento.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
                Estoque selecionado por uso real, com orientacao sobre memoria, geracao, garantia, acessorios e momento ideal de upgrade.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ['Modelos revisados', 'Produtos apresentados com configuracao e indicacao de uso claras.', PackageCheck],
                ['Resposta em ate 24h', 'Consultoria rapida para comparar alternativas antes de fechar.', Clock3],
              ].map(([title, description, Icon]) => (
                <article key={title as string} className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-6">
                  <Icon className="size-6 text-zinc-950" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{description as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl" aria-label="Lista completa de produtos Apple">
          {filtered.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white/60 p-12 text-center">
              <p className="text-lg font-semibold text-zinc-950">Nenhum produto encontrado.</p>
              <p className="mt-2 text-sm text-zinc-500">Ajuste a busca ou selecione outra linha para ver o catalogo.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setSelected('Todos')
                }}
                className="mt-6 inline-flex rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          )}
        </section>

        <div className="mx-auto mt-16 flex max-w-7xl justify-center">
          <a href="/" className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:text-zinc-950 hover:shadow-xl">
            Voltar para o inicio
          </a>
        </div>
      </main>
    </div>
  )
}
