import { useRef } from 'react'
import { ShoppingBag, Smartphone, Watch, Tablet, Laptop, Boxes, Headphones, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, featuredProducts, allProducts } from '@/data/appleStore'
import { useCartStore } from '@/store/useCartStore'
import { useProductModalStore } from '@/store/useProductModalStore'
import { useFlyingAnimationStore } from '@/store/useFlyingAnimationStore'
import type { FeaturedProduct } from '@/data/appleStore'

const categoryIcons: Record<string, typeof Smartphone> = {
  iPhone: Smartphone,
  'Apple Watch': Watch,
  iPad: Tablet,
  Mac: Laptop,
  Android: Boxes,
  Acessorios: Headphones,
}

function FeaturedCard({ product }: { product: FeaturedProduct }) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const { addItemSilently } = useCartStore()
  const { open: openModal } = useProductModalStore()
  const { triggerFly } = useFlyingAnimationStore()

  const handleAddToCart = () => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect()
      triggerFly(product.image, rect)
    }
    addItemSilently(product, product.colors[0])
  }

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex h-72 items-center justify-center overflow-hidden bg-[#f5f5f7] p-8">
        <img
          ref={imgRef}
          src={product.image}
          alt={`Imagem oficial do ${product.name}`}
          loading="lazy"
          decoding="async"
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
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">{product.line}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">{product.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {product.specs.map((spec) => (
            <span key={spec} className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600">
              {spec}
            </span>
          ))}
        </div>
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Acabamentos</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <span key={color} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
                {color}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between border-t border-zinc-100 pt-5">
          <p className="font-semibold text-zinc-950">{product.priceFrom}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal(product)}
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
          </div>
        </div>
      </div>
    </article>
  )
}

export function CatalogSections() {
  const categoryImages: Record<string, string> = {
    iPhone: allProducts.find((p) => p.name === 'iPhone 17 Pro Max')?.image || allProducts[0].image,
    Mac: allProducts.find((p) => p.name === 'MacBook Pro 14"')?.image || allProducts[0].image,
    iPad: allProducts.find((p) => p.name === 'iPad Pro M5')?.image || allProducts[0].image,
    'Apple Watch': allProducts.find((p) => p.name === 'Apple Watch Ultra 2 & 3')?.image || allProducts[0].image,
    Acessorios: allProducts.find((p) => p.name === 'AirPods Max')?.image || allProducts[0].image,
  }

  return (
    <section id="produtos" className="scroll-mt-28 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Catálogo curado</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-5xl">
              Escolha por linha, finalize com orientação.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 lg:justify-self-end">
            O foco não é mostrar tudo, é mostrar o que faz sentido para você: modelos atuais, configurações inteligentes e uma compra sem excesso de informação.
          </p>
        </div>

        {/* Bento Grid Showcase Apple (5 categorias sem Android) */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = allProducts.filter((p) => p.category === category.name).length
            const isHero = category.name === 'iPhone'
            const productImage = categoryImages[category.name]

            return (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] ${
                  isHero
                    ? 'md:col-span-2 bg-gradient-to-br from-slate-100 via-zinc-100 to-slate-200/90 text-zinc-950 border-zinc-300/80 shadow-md hover:border-zinc-400'
                    : 'bg-gradient-to-b from-zinc-50 via-slate-100/70 to-zinc-100/90 text-zinc-950 border-zinc-200/90 shadow-sm hover:border-zinc-300'
                }`}
              >
                {/* Glow Radial Decorativo Suave Titanium */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_70%)] transition-transform duration-700 group-hover:scale-125"
                />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`inline-block rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                        isHero
                          ? 'bg-sky-500/15 text-sky-800 border border-sky-200/60'
                          : 'bg-zinc-200/70 text-zinc-700 border border-zinc-300/40'
                      }`}
                    >
                      Linha {category.name}
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-zinc-950 sm:text-4xl">
                      {category.name}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold text-zinc-800 shadow-xs border border-zinc-200/80">
                    {count} modelo{count !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Render do Produto em Destaque no Display Titanium Harmonioso */}
                <div
                  className={`relative my-6 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-white/90 to-zinc-50/70 p-4 shadow-inner border border-zinc-200/70 backdrop-blur-sm ${
                    isHero ? 'h-52 sm:h-64' : 'h-48'
                  }`}
                >
                  <img
                    src={productImage}
                    alt={`Preview ${category.name}`}
                    loading="lazy"
                    className="h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-sm"
                  />
                </div>

                <div className="relative z-10 border-t border-zinc-200/80 pt-5">
                  <p className="text-sm leading-6 text-zinc-600">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-zinc-950 transition group-hover:text-sky-600">
                    <span>Explorar {category.name}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <FeaturedCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
