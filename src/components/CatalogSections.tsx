import { useRef } from 'react'
import { ShoppingBag } from 'lucide-react'
import { categories, featuredProducts } from '@/data/appleStore'
import { useCartStore } from '@/store/useCartStore'
import { useProductModalStore } from '@/store/useProductModalStore'
import { useFlyingAnimationStore } from '@/store/useFlyingAnimationStore'
import type { FeaturedProduct } from '@/data/appleStore'

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
    <section id="produtos" className="px-5 py-20 lg:px-8">
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

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <article key={category.name} className="group rounded-[2rem] border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Linha</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">{category.name}</h3>
              <p className="mt-4 min-h-20 text-sm leading-6 text-zinc-600">{category.description}</p>
              <p className="mt-6 border-t border-zinc-100 pt-5 text-sm font-semibold text-zinc-950">{category.highlight}</p>
            </article>
          ))}
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
