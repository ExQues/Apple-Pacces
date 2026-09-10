import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allProducts, categories } from '@/data/appleStore'

// Produto usado como foto de capa de cada categoria
const CATEGORY_COVER: Record<string, string> = {
  iPhone: 'iPhone 17 Pro Max',
  Mac: 'MacBook Air 13"',
  iPad: 'iPad Pro M5',
  'Apple Watch': 'Apple Watch Series 11',
  Acessórios: 'AirPods Max',
}

function parsePrice(value: string) {
  return Number(value.replace(/\D/g, ''))
}

function lowestPrice(category: string) {
  const prices = allProducts
    .filter((p) => p.category === category && p.status !== 'em-falta')
    .flatMap((p) => (p.storageOptions?.length ? p.storageOptions.map((s) => s.priceFrom) : [p.priceFrom]))
    .map(parsePrice)
    .filter(Boolean)
  return prices.length ? `R$ ${Math.min(...prices).toLocaleString('pt-BR')}` : null
}

export function CatalogSections() {
  return (
    <section id="produtos" className="scroll-mt-28 bg-[#f5f5f7] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-4xl text-balance font-display text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
          Compre por categoria. <span className="text-zinc-500">Tudo lacrado e com garantia Apple.</span>
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const cover = allProducts.find((p) => p.name === CATEGORY_COVER[category.name]) ?? allProducts[0]
            const price = lowestPrice(category.name)

            return (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group flex flex-col items-center rounded-3xl bg-white px-5 pb-6 pt-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="flex h-36 w-full items-center justify-center">
                  <img
                    src={cover.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-zinc-950">{category.name}</h3>
                {price && <p className="mt-1 text-sm text-zinc-500">a partir de {price}</p>}
                <span className="mt-3 inline-flex items-center text-sm font-medium text-[#0066cc] group-hover:underline">
                  Ver modelos
                  <ChevronRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
