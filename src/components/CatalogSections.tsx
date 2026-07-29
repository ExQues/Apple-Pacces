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
  return (
    <section id="produtos" className="scroll-mt-28 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Catalogo curado</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-5xl">
              Escolha por linha, finalize com orientacao.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 lg:justify-self-end">
            O foco nao e mostrar tudo, e mostrar o que faz sentido para voce: modelos atuais, configuracoes inteligentes e uma compra sem excesso de informacao.
          </p>
        </div>

        {/* Grade simetrica de 3 colunas (2 linhas x 3 cards = 6 categorias) */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name] || Smartphone
            const count = allProducts.filter((p) => p.category === category.name).length

            return (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-zinc-200/90 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-400 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl bg-zinc-950 text-white shadow-md shadow-zinc-950/10 transition duration-300 group-hover:scale-110 group-hover:bg-sky-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 group-hover:bg-sky-50 group-hover:text-sky-700">
                      {count} modelo{count !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-950">
                    {category.name}
                  </h3>
                  <p className="mt-3.5 text-sm leading-6 text-zinc-600">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-zinc-100 pt-5">
                  <p className="text-xs font-medium text-zinc-500 line-clamp-1">{category.highlight}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-zinc-950 group-hover:text-sky-600">
                    <span>Ver modelos</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
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
