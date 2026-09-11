import { useMemo, useRef, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, ShoppingBag, X } from 'lucide-react'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { useCartStore } from '@/store/useCartStore'
import { useProductModalStore } from '@/store/useProductModalStore'
import { useFlyingAnimationStore } from '@/store/useFlyingAnimationStore'
import { useProducts } from '@/hooks/useProducts'
import { usePageTitle } from '@/hooks/usePageTitle'
import { categoryCovers, type FeaturedProduct } from '@/data/appleStore'

const CATEGORY_FILTERS = ['Todos', 'iPhone', 'Mac', 'iPad', 'Apple Watch', 'Acessórios'] as const
type CategoryFilter = (typeof CATEGORY_FILTERS)[number]

// Frase de abertura de cada página da loja
const CATEGORY_INTRO: Record<CategoryFilter, string> = {
  Todos: 'Todos os produtos lacrados, com garantia Apple de 1 ano e até 18x no cartão.',
  iPhone: 'Linha iPhone 17 à pronta entrega e iPhone 18 Pro em pré-venda.',
  Mac: 'MacBook Air, MacBook Pro e Mac mini com chip Apple.',
  iPad: 'Do iPad 11 ao iPad Pro com chip M5, para estudar, trabalhar e desenhar.',
  'Apple Watch': 'Saúde, treino e notificações no pulso. Do SE ao Ultra.',
  Acessórios: 'AirPods, AirTag e Apple Pencil originais.',
}

// Lançamentos primeiro; produtos em falta sempre por último
const HIGHLIGHT_ORDER = ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Air', 'iPhone 17', 'iPhone 17e']
const displayRank = (p: FeaturedProduct) => {
  const highlight = HIGHLIGHT_ORDER.indexOf(p.name)
  return (p.status === 'em-falta' ? 1000 : 0) + (highlight >= 0 ? highlight : 100)
}

const productAnchor = (name: string) => `produto-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

const scrollToTop = () => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch {
    // Ambiente de teste (jsdom) não implementa scroll
  }
}

// Faixa de miniaturas: na loja geral mostra as categorias; dentro de uma categoria, os modelos
function ShelfStrip({
  selected,
  products,
  onSelectCategory,
}: {
  selected: CategoryFilter
  products: FeaturedProduct[]
  onSelectCategory: (category: CategoryFilter) => void
}) {
  const tileClass =
    'group flex w-24 flex-none flex-col items-center gap-2 rounded-2xl px-1 py-3 text-center transition hover:bg-white sm:w-28'
  const imageBox = 'flex h-16 w-full items-center justify-center'
  const imageClass = 'max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105'

  if (selected === 'Todos') {
    const order: CategoryFilter[] = ['iPhone', 'Mac', 'iPad', 'Apple Watch', 'Acessórios']
    return (
      <nav aria-label="Categorias" className="mt-6 hidden gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:flex">
        {order.map((category) => {
          const cover = products.find((p) => p.name === categoryCovers[category])
          return (
            <button key={category} type="button" onClick={() => onSelectCategory(category)} className={tileClass}>
              <span className={imageBox}>{cover && <img src={cover.image} alt="" className={imageClass} />}</span>
              <span className="text-xs font-medium text-zinc-700">{category === 'Apple Watch' ? 'Watch' : category}</span>
            </button>
          )
        })}
      </nav>
    )
  }

  const models = products.filter((p) => p.category === selected).sort((a, b) => displayRank(a) - displayRank(b))
  return (
    <nav aria-label={`Modelos de ${selected}`} className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
      {selected === 'iPhone' && (
        <Link to="/" className={tileClass}>
          <span className={imageBox}>
            <img src="/products/iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" alt="" className={imageClass} />
          </span>
          <span className="text-xs font-medium text-zinc-700">
            iPhone 18 Pro
            <span className="mt-0.5 block text-[11px] font-semibold text-[#b4455a]">Novo</span>
          </span>
        </Link>
      )}
      {models.map((p) => (
        <button
          key={p.name}
          type="button"
          onClick={() => document.getElementById(productAnchor(p.name))?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })}
          className={`${tileClass} ${p.status === 'em-falta' ? 'opacity-50' : ''}`}
        >
          <span className={imageBox}>
            <img src={p.image} alt="" className={imageClass} />
          </span>
          <span className="text-xs font-medium leading-4 text-zinc-700">{p.name}</span>
        </button>
      ))}
    </nav>
  )
}

function ProductCard({ product }: { product: FeaturedProduct }) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const { addItemSilently } = useCartStore()
  const { open: openModal } = useProductModalStore()
  const { triggerFly } = useFlyingAnimationStore()

  // Estado da opção de armazenamento selecionada
  const defaultStorage = product.storageOptions?.[0]?.storage || ''
  const [selectedStorage, setSelectedStorage] = useState(defaultStorage)

  // Estado da cor selecionada
  const defaultColor = product.colorOptions?.[0]?.name || product.colors[0] || ''
  const [selectedColor, setSelectedColor] = useState(defaultColor)

  // Calcular preço e imagem ativos dinamicamente
  const activeStorageObj = product.storageOptions?.find((s) => s.storage === selectedStorage)
  const activePrice = activeStorageObj?.priceFrom || product.priceFrom

  const activeColorObj = product.colorOptions?.find((c) => c.name === selectedColor)
  const activeImage = activeColorObj?.image || product.image

  // Pré-carregamento em cache das imagens de todas as variações de cores do produto
  useEffect(() => {
    if (product.colorOptions && product.colorOptions.length > 0) {
      product.colorOptions.forEach((opt) => {
        const img = new Image()
        img.src = opt.image
      })
    }
  }, [product])

  // Transição suave de troca de imagem sem tela branca / piscada
  const [displaySrc, setDisplaySrc] = useState(activeImage)
  const [isChanging, setIsChanging] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Foto que já estava no cache pode terminar de carregar antes do onLoad ser ligado
  useEffect(() => {
    if (imgRef.current?.complete) setImageLoaded(true)
  }, [displaySrc])

  useEffect(() => {
    if (activeImage !== displaySrc) {
      setIsChanging(true)
      const timeout = setTimeout(() => {
        setDisplaySrc(activeImage)
        setIsChanging(false)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [activeImage, displaySrc])

  const handleAddToCart = () => {
    const success = addItemSilently(product, selectedColor, selectedStorage, activePrice, activeImage)
    if (success && imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect()
      triggerFly(activeImage, rect)
    }
  }

  const isSoldOut = product.status === 'em-falta'

  return (
    <article
      id={productAnchor(product.name)}
      className="group flex scroll-mt-36 flex-col overflow-hidden rounded-3xl bg-white transition duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
    >
      <div className="relative flex h-72 items-center justify-center p-10">
        <img
          ref={imgRef}
          src={displaySrc}
          alt={`${product.name} na cor ${selectedColor}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.currentTarget
            target.onerror = null
            setImageLoaded(true)
            target.src =
              'data:image/svg+xml;utf8,' +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23ffffff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="20" fill="%239ca3af">${product.name}</text></svg>`,
              )
          }}
          className={`h-full w-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.03] ${
            !imageLoaded || isChanging ? 'opacity-0' : isSoldOut ? 'opacity-60' : 'opacity-100'
          }`}
        />
        {isSoldOut && (
          <span className="absolute left-5 top-5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-500">
            Em falta
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6">
        {/* Seletor de cor */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {product.colorOptions.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
                aria-label={`Cor ${c.name}`}
                aria-pressed={selectedColor === c.name}
                className={`size-5 rounded-full border border-black/10 transition ${
                  selectedColor === c.name ? 'ring-2 ring-zinc-950 ring-offset-2' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="ml-1 text-xs text-zinc-500">{selectedColor}</span>
          </div>
        )}

        <h2 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950">{product.name}</h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-zinc-500">{product.description}</p>

        {/* Seletor de capacidade */}
        {product.storageOptions && product.storageOptions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.storageOptions.map((opt) => (
              <button
                key={opt.storage}
                type="button"
                onClick={() => setSelectedStorage(opt.storage)}
                aria-pressed={selectedStorage === opt.storage}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition active:scale-95 ${
                  selectedStorage === opt.storage
                    ? 'border-zinc-950 text-zinc-950'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-950'
                }`}
              >
                {opt.storage}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div>
            <p className="text-xs text-zinc-500">A partir de</p>
            <p className="text-xl font-semibold tracking-tight text-zinc-950">{activePrice}</p>
            <p className="text-xs text-zinc-500">em até 18x no cartão</p>
          </div>
          {isSoldOut ? (
            <span className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-400">Esgotado</span>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openModal({ ...product, priceFrom: activePrice, image: activeImage })}
                className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-95"
              >
                Comprar
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="grid size-10 place-items-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-950 active:scale-90"
                aria-label={`Adicionar ${product.name} à sacola`}
              >
                <ShoppingBag className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { products } = useProducts()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')

  // A categoria mora no endereço (?category=): menu, filtros e botão voltar ficam sempre em sincronia
  const categoryParam = searchParams.get('category')
  const selected: CategoryFilter = (CATEGORY_FILTERS as readonly string[]).includes(categoryParam ?? '')
    ? (categoryParam as CategoryFilter)
    : 'Todos'

  usePageTitle(selected === 'Todos' ? 'Loja' : selected)

  // Busca que veio por link (ex.: vitrine da home) acompanha o endereço
  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  // Ao trocar de categoria com a página rolada, volta ao topo para mostrar a nova seleção
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    scrollToTop()
  }, [selected])

  const selectCategory = (category: CategoryFilter) => {
    const next = new URLSearchParams()
    if (category !== 'Todos') next.set('category', category)
    setSearchParams(next)
  }

  const isSearching = query.trim().length > 0

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return products
      .filter((p) => {
        // Ao digitar uma busca, ignora a categoria para buscar em todo o catálogo
        const inCategory = term ? true : selected === 'Todos' || p.category === selected
        if (!inCategory) return false
        if (!term) return true
        return (
          p.name.toLowerCase().includes(term) ||
          p.line.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
        )
      })
      .sort((a, b) => displayRank(a) - displayRank(b))
  }, [query, selected, products])

  const totalByCategory = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + 1)
    return map
  }, [products])

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-950">
      <SiteHeader variant="shop" />
      <main className="animate-page-in px-5 pb-24 pt-24 sm:pt-28 lg:px-8">
        <section key={selected} className="animate-page-in mx-auto max-w-7xl">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {selected === 'Todos' ? 'Loja.' : `${selected}.`}
          </h1>
          <p className="mt-2 max-w-2xl text-lg leading-7 text-zinc-500 sm:text-xl">{CATEGORY_INTRO[selected]}</p>
          <ShelfStrip selected={selected} products={products} onSelectCategory={selectCategory} />
        </section>

        {/* Filtros (no celular, onde o menu fica recolhido) e busca */}
        <div className="sticky top-12 z-30 mx-auto mt-4 max-w-7xl bg-[#f5f5f7]/85 py-3 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:hidden">
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = selected === cat
                const count = cat === 'Todos' ? products.length : totalByCategory.get(cat) ?? 0
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => selectCategory(cat)}
                    aria-pressed={isActive}
                    className={`inline-flex flex-none items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
                      isActive ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {cat}
                    <span className={`text-xs ${isActive ? 'text-white/60' : 'text-zinc-400'}`}>{count}</span>
                  </button>
                )
              })}
            </div>

            <p className="hidden text-sm text-zinc-500 md:block">
              {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}
            </p>

            <label className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 ring-1 ring-zinc-200 transition focus-within:ring-zinc-400 md:w-80">
              <Search className="size-4 flex-none text-zinc-400" aria-hidden="true" />
              <input
                type="text"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar modelo"
                className="w-full bg-transparent text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none"
                aria-label="Buscar produtos"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="grid size-6 flex-none place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
                  aria-label="Limpar busca"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              )}
            </label>
          </div>

          {isSearching && (
            <p className="mt-2 px-1 text-xs text-zinc-500">
              {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'} para “{query}” em todo o catálogo
            </p>
          )}
        </div>

        <section className="mx-auto mt-4 max-w-7xl" aria-label="Produtos Apple">
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center">
              <p className="text-lg font-semibold text-zinc-950">Nenhum produto encontrado.</p>
              <p className="mt-2 text-sm text-zinc-500">Ajuste a busca ou escolha outra categoria.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  selectCategory('Todos')
                }}
                className="mt-6 inline-flex rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div key={selected} className="animate-page-in grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
