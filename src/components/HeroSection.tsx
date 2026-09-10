import { ArrowUpRight, BadgeCheck, CalendarClock, CreditCard, PackageCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allProducts } from '@/data/appleStore'

// Lançamento: preço entra quando o fornecedor liberar (preço do fornecedor + R$ 500)
const IPHONE_18_COLORS = [
  { name: 'Bordô', hex: '#5b2230' },
  { name: 'Glacial', hex: '#c9d3d8' },
  { name: 'Prateado', hex: '#e3e4e6' },
  { name: 'Preto', hex: '#1d1d1f' },
]

const IPHONE_18_MODELS = [
  {
    name: 'iPhone 18 Pro Max',
    screen: 'Tela de 6,9"',
    highlight: 'Até 43 horas de vídeo',
    image: '/products/iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp',
  },
  {
    name: 'iPhone 18 Pro',
    screen: 'Tela de 6,3"',
    highlight: 'Pro em tamanho compacto',
    image: '/products/iphone-18-pro-finish-select-202609-6-3inch-silver.webp',
  },
]

const heroImage = '/products/iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp'

const specs = [
  { value: 'A20 Pro', label: 'o chip mais rápido em um iPhone' },
  { value: '48 MP', label: 'câmera Fusion com abertura variável' },
  { value: '8x', label: 'zoom óptico na teleobjetiva' },
]

const perks = [
  { icon: PackageCheck, label: 'Lacrados' },
  { icon: BadgeCheck, label: 'Garantia Apple 1 ano' },
  { icon: CreditCard, label: 'Até 18x no cartão' },
]

const AVAILABLE_LINEUP = ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Air', 'iPhone 17', 'iPhone 17e'] as const

export function HeroSection() {
  const lineup = AVAILABLE_LINEUP.map((name) => allProducts.find((p) => p.name === name)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  )

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-black px-5 pb-16 pt-32 text-white lg:px-8 lg:pt-36">
      {/* Brilho Bordô atrás do aparelho */}
      <div className="absolute right-[-12%] top-0 -z-10 size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(150,40,62,0.45),transparent_65%)] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-black" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <p className="text-lg font-semibold text-rose-300">Novo</p>

          <h1 className="mt-3 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
            iPhone 18 Pro.
            <span className="block bg-gradient-to-r from-rose-200 via-rose-400 to-red-700 bg-clip-text text-transparent">
              Pré-venda aberta.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            iPhone 18 Pro e Pro Max com chip A20 Pro, a primeira câmera de iPhone com abertura variável e o novo acabamento Bordô.
            Garanta o seu entre os primeiros.
          </p>

          <p className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
            <CalendarClock className="size-4 text-rose-300" aria-hidden="true" />
            Pré-venda a partir de 12/09 · Entregas a partir de 18/09
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:-translate-y-1 hover:bg-zinc-200 active:scale-95"
            >
              Reservar meu iPhone 18
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <Link
              to="/shop?category=iPhone"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/5 active:scale-95"
            >
              Comprar a pronta entrega
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400">
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-rose-300" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-rise [animation-delay:120ms]">
          <img
            src={heroImage}
            alt="iPhone 18 Pro Max na cor Bordô"
            loading="eager"
            decoding="async"
            {...{ fetchpriority: 'high' }}
            className="mx-auto w-full max-w-md drop-shadow-[0_40px_90px_rgba(150,40,62,0.45)] lg:max-w-lg"
          />
        </div>
      </div>

      {/* Destaques técnicos */}
      <dl className="mx-auto mt-16 grid max-w-7xl gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
        {specs.map((spec) => (
          <div key={spec.value} className="bg-black p-6 sm:p-8">
            <dt className="font-display text-4xl font-semibold tracking-tight">{spec.value}</dt>
            <dd className="mt-2 text-sm text-zinc-400">{spec.label}</dd>
          </div>
        ))}
      </dl>

      {/* Os dois modelos do lançamento */}
      <div className="mx-auto mt-16 max-w-7xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Escolha o seu iPhone 18 Pro</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {IPHONE_18_MODELS.map((model) => (
            <article
              key={model.name}
              className="group flex items-center gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/60 p-6 transition hover:border-white/25 hover:bg-zinc-900 sm:p-8"
            >
              <img
                src={model.image}
                alt={model.name}
                loading="lazy"
                className="h-44 w-auto flex-none object-contain transition duration-500 group-hover:scale-105 sm:h-56"
              />
              <div className="min-w-0">
                <h3 className="text-2xl font-semibold tracking-tight">{model.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {model.screen} · {model.highlight}
                </p>
                <div className="mt-4 flex gap-1.5">
                  {IPHONE_18_COLORS.map((c) => (
                    <span
                      key={c.name}
                      title={c.name}
                      className="size-3 rounded-full ring-1 ring-white/25"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm font-semibold text-rose-200">Pré-venda · consulte o valor</p>
                <a
                  href="#contato"
                  className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Reservar
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Linha iPhone 17 disponível agora */}
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Pronta entrega: linha iPhone 17</h2>
          <Link to="/shop?category=iPhone" className="text-sm font-semibold text-rose-200 hover:text-white">
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
