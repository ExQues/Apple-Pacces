import { ArrowUpRight, BadgeCheck, CreditCard, PackageCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allProducts } from '@/data/appleStore'

const LAUNCH_LINEUP = ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Air', 'iPhone 17', 'iPhone 17e'] as const

const heroImage =
  '/products/iphone-17-pro-finish-select-202509-6-9inch-cosmicorange.webp'

const perks = [
  { icon: PackageCheck, label: 'Lacrados' },
  { icon: BadgeCheck, label: 'Garantia Apple 1 ano' },
  { icon: CreditCard, label: 'Até 18x no cartão' },
]

export function HeroSection() {
  const lineup = LAUNCH_LINEUP.map((name) => allProducts.find((p) => p.name === name)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  )
  const proMax = lineup[0]

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-black px-5 pb-16 pt-32 text-white lg:px-8 lg:pt-36">
      {/* Brilho laranja cósmico atrás do aparelho */}
      <div className="absolute right-[-10%] top-10 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(234,108,36,0.35),transparent_65%)] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-black" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
            <span className="size-1.5 rounded-full bg-orange-400" />
            Lançamento
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
            iPhone 17 Pro.
            <span className="block bg-gradient-to-r from-orange-300 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Chegou.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Toda a nova linha iPhone 17 lacrada, com garantia Apple e pronta para entrega.
          </p>

          {proMax && (
            <p className="mt-8 text-sm text-zinc-500">
              Pro Max a partir de <span className="text-2xl font-semibold text-white">{proMax.priceFrom}</span>
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop?category=iPhone"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:-translate-y-1 hover:bg-zinc-200 active:scale-95"
            >
              Comprar iPhone 17
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/5 active:scale-95"
            >
              Falar com consultor
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400">
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-orange-400" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-rise [animation-delay:120ms]">
          <img
            src={heroImage}
            alt="iPhone 17 Pro Max na cor Laranja Cósmico"
            loading="eager"
            decoding="async"
            {...{ fetchpriority: 'high' }}
            className="mx-auto w-full max-w-md drop-shadow-[0_40px_80px_rgba(234,108,36,0.35)] lg:max-w-lg"
          />
        </div>
      </div>

      {/* Linha completa do lançamento */}
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">A linha iPhone 17</h2>
          <Link to="/shop?category=iPhone" className="text-sm font-semibold text-orange-300 hover:text-orange-200">
            Ver todos
          </Link>
        </div>

        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:overflow-visible">
          {lineup.map((product) => (
            <Link
              key={product.name}
              to={`/shop?category=iPhone&q=${encodeURIComponent(product.name)}`}
              className="group min-w-[62%] snap-start rounded-3xl border border-white/10 bg-zinc-900/60 p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-zinc-900 sm:min-w-[40%] lg:min-w-0"
            >
              <div className="flex h-40 items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-auto object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              {product.colorOptions && (
                <div className="mt-4 flex justify-center gap-1.5">
                  {product.colorOptions.map((c) => (
                    <span
                      key={c.name}
                      title={c.name}
                      className="size-2.5 rounded-full ring-1 ring-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              )}
              <p className="mt-4 font-semibold">{product.name}</p>
              <p className="mt-1 text-sm text-zinc-400">
                a partir de <span className="font-semibold text-white">{product.priceFrom}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
