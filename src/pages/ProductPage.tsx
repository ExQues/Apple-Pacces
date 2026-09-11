import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, ChevronRight, RotateCcw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { useProducts } from '@/hooks/useProducts'
import { usePageTitle } from '@/hooks/usePageTitle'
import { productPath, productSlug } from '@/lib/slug'
import { byDisplayOrder } from '@/lib/catalogOrder'
import { preloadProductImage, productImgProps } from '@/lib/images'
import { SmoothImage } from '@/components/SmoothImage'

const MAIN_IMAGE_SIZES = '(min-width: 1024px) 640px, 90vw'
import { useCartStore } from '@/store/useCartStore'
import NotFound from '@/pages/NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const { products } = useProducts()
  const product = products.find((p) => productSlug(p.name) === slug)

  usePageTitle(product?.name ?? 'Página não encontrada')

  if (!product) return <NotFound />
  return <ProductDetails key={product.name} productName={product.name} />
}

function ProductDetails({ productName }: { productName: string }) {
  const { products } = useProducts()
  const product = products.find((p) => p.name === productName)!
  const { addItem } = useCartStore()

  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions?.[0]?.storage ?? '')
  const [selectedColor, setSelectedColor] = useState(product.colorOptions?.[0]?.name ?? product.colors[0] ?? '')
  const [added, setAdded] = useState(false)

  // Deixa as outras cores prontas para a troca ser instantânea
  useEffect(() => {
    product.colorOptions?.forEach((c) => preloadProductImage(c.image, MAIN_IMAGE_SIZES))
  }, [product])

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 2000)
    return () => clearTimeout(t)
  }, [added])

  const activePrice = product.storageOptions?.find((s) => s.storage === selectedStorage)?.priceFrom ?? product.priceFrom
  const activeImage = product.colorOptions?.find((c) => c.name === selectedColor)?.image ?? product.image
  const isSoldOut = product.status === 'em-falta'
  const optionLabel =
    product.category === 'Apple Watch'
      ? 'Tamanho'
      : product.storageOptions?.every((o) => /\d\s?(GB|TB)/i.test(o.storage))
        ? 'Armazenamento'
        : 'Versão'

  const related = products
    .filter((p) => p.category === product.category && p.name !== product.name && p.status !== 'em-falta')
    .sort(byDisplayOrder)
    .slice(0, 3)

  const handleAdd = () => {
    if (isSoldOut) return
    if (addItem(product, selectedColor, selectedStorage, activePrice, activeImage)) setAdded(true)
  }

  const buyButton = (extra = '') =>
    isSoldOut ? (
      <span className={`flex items-center justify-center rounded-full bg-zinc-200 py-4 text-sm font-semibold text-zinc-500 ${extra}`}>
        Esgotado
      </span>
    ) : (
      <button
        type="button"
        onClick={handleAdd}
        className={`flex items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition active:scale-[0.98] ${
          added ? 'bg-emerald-600' : 'bg-zinc-950 hover:bg-zinc-800'
        } ${extra}`}
      >
        {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
        {added ? 'Adicionado à sacola' : 'Adicionar à sacola'}
      </button>
    )

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-950">
      <SiteHeader variant="shop" />

      <main className="animate-page-in px-5 pb-32 pt-20 sm:pt-24 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          {/* Caminho */}
          <nav aria-label="Você está em" className="flex flex-wrap items-center gap-1 text-sm text-zinc-500">
            <Link to="/shop" className="hover:text-zinc-950">Loja</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-zinc-950">
              {product.category}
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span className="text-zinc-950">{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
            {/* Fotos */}
            <div className="lg:sticky lg:top-20">
              <div className="flex items-center justify-center rounded-3xl bg-white p-8 sm:p-12">
                <SmoothImage
                  src={activeImage}
                  alt={`${product.name} na cor ${selectedColor}`}
                  sizes={MAIN_IMAGE_SIZES}
                  loading="eager"
                  dimmed={isSoldOut}
                  className="h-72 w-auto object-contain sm:h-[28rem]"
                />
              </div>
              {product.colorOptions && product.colorOptions.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto [scrollbar-width:none]">
                  {product.colorOptions.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={`Ver na cor ${c.name}`}
                      aria-pressed={selectedColor === c.name}
                      className={`grid size-20 flex-none place-items-center rounded-2xl bg-white p-2 transition ${
                        selectedColor === c.name ? 'ring-2 ring-zinc-950' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img {...productImgProps(c.image, '80px')} alt="" className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compra */}
            <div>
              {isSoldOut && (
                <span className="mb-3 inline-block rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600">Em falta</span>
              )}
              <h1 className="font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{product.name}</h1>
              <p className="mt-3 text-lg leading-7 text-zinc-500">{product.description}</p>

              <p className="mt-6 text-3xl font-semibold tracking-tight">{activePrice}</p>
              <p className="text-sm text-zinc-500">em até 18x no cartão</p>

              {product.colorOptions && product.colorOptions.length > 0 && (
                <div className="mt-8">
                  <p className="text-sm font-medium">
                    Cor <span className="font-normal text-zinc-500">· {selectedColor}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.colorOptions.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        aria-label={`Cor ${c.name}`}
                        aria-pressed={selectedColor === c.name}
                        className={`size-9 rounded-full border border-black/10 transition ${
                          selectedColor === c.name ? 'ring-2 ring-zinc-950 ring-offset-2' : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.storageOptions && product.storageOptions.length > 0 && (
                <div className="mt-7">
                  <p className="text-sm font-medium">{optionLabel}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {product.storageOptions.map((opt) => (
                      <button
                        key={opt.storage}
                        type="button"
                        onClick={() => setSelectedStorage(opt.storage)}
                        aria-pressed={selectedStorage === opt.storage}
                        className={`rounded-2xl border bg-white px-4 py-3.5 text-left transition ${
                          selectedStorage === opt.storage ? 'border-zinc-950 ring-1 ring-zinc-950' : 'border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        <span className="block text-sm font-semibold">{opt.storage}</span>
                        <span className="block text-xs text-zinc-500">{opt.priceFrom}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 hidden lg:block">{buyButton('w-full')}</div>
              {isSoldOut && (
                <p className="mt-3 text-sm text-zinc-500">
                  Quer ser avisado quando chegar?{' '}
                  <Link to="/#contato" className="font-medium text-[#0066cc] hover:underline">Fale com a gente</Link>
                </p>
              )}

              <ul className="mt-8 space-y-3 rounded-3xl bg-white p-6 text-sm text-zinc-600">
                <li className="flex gap-3">
                  <ShieldCheck className="size-5 flex-none text-zinc-400" aria-hidden="true" />
                  Lacrado, com garantia oficial Apple de 1 ano.
                </li>
                <li className="flex gap-3">
                  <Truck className="size-5 flex-none text-zinc-400" aria-hidden="true" />
                  Entrega combinada com você depois do pedido.
                </li>
                <li className="flex gap-3">
                  <RotateCcw className="size-5 flex-none text-zinc-400" aria-hidden="true" />
                  <span>
                    Até 7 dias para desistir da compra.{' '}
                    <Link to="/trocas" className="text-[#0066cc] hover:underline">Trocas e devoluções</Link>
                  </span>
                </li>
              </ul>

              {product.specs.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold tracking-tight">Destaques</h2>
                  <ul className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200 text-sm">
                    {product.specs.map((spec) => (
                      <li key={spec} className="py-3 text-zinc-600">{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Relacionados */}
          {related.length > 0 && (
            <section className="mt-20" aria-labelledby="related-title">
              <h2 id="related-title" className="font-display text-3xl font-semibold tracking-[-0.04em]">
                Você também pode gostar
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.name}
                    to={productPath(p.name)}
                    className="group flex flex-col items-center rounded-3xl bg-white p-6 text-center transition hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                  >
                    <img {...productImgProps(p.image, '220px')} alt="" loading="lazy" className="h-32 w-auto object-contain transition duration-500 group-hover:scale-105 sm:h-40" />
                    <p className="mt-5 font-semibold">{p.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">a partir de {p.priceFrom}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Barra de compra fixa no celular */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/90 px-5 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{activePrice}</p>
            <p className="truncate text-xs text-zinc-500">
              {selectedStorage && `${selectedStorage} · `}
              {selectedColor}
            </p>
          </div>
          {buyButton('px-6')}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
