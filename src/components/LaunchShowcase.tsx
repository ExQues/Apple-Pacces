import { useEffect, useState } from 'react'
import { SmoothImage } from '@/components/SmoothImage'
import { preloadProductImage, productImgProps } from '@/lib/images'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { allProducts } from '@/data/appleStore'
import { productPath } from '@/lib/slug'

// Seções dos lançamentos de setembro de 2026, com dados oficiais da Apple Brasil.
// Preços entram quando o fornecedor liberar.

const SWITCHER_SIZES = '(min-width: 1024px) 480px, 80vw'

const DUO_COLORS = [
  { name: 'Céu noturno', hex: '#2b3444', image: '/products/iphone-duo-finish-select-202609-nightsky.webp' },
  { name: 'Branco-estrela', hex: '#efece6', image: '/products/iphone-duo-finish-select-202609-starwhite.webp' },
]

const DUO_FACTS = [
  { value: '7,6"', label: 'tela interna aberta, a maior já feita em um iPhone' },
  { value: '5,4"', label: 'tela externa para usar fechado' },
  { value: 'A20 Pro', label: 'chip resfriado por evaporação' },
  { value: '44 h', label: 'de vídeo na tela externa (31 h na interna)' },
]

const DUO_DETAILS = [
  'Estrutura e cobertura da dobradiça em titânio',
  'Câmera FaceTime sob a tela',
  'Câmera dupla Fusion de 48 MP',
  'Câmera frontal Center Stage de 12 MP',
  'Resistência à água e poeira IP68',
  'Tela interna com acabamento que reduz reflexos',
]

export function DuoSection() {
  const [color, setColor] = useState(DUO_COLORS[0])

  // Deixa as duas cores prontas para a troca ser instantânea
  useEffect(() => {
    DUO_COLORS.forEach((c) => preloadProductImage(c.image, SWITCHER_SIZES))
  }, [])

  return (
    <section id="iphone-duo" className="bg-white px-5 pb-24 text-zinc-950 lg:px-8" aria-labelledby="duo-title">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-lg font-semibold text-[#b4455a]">Novo · o primeiro iPhone dobrável</p>
          <h2 id="duo-title" className="mt-3 font-display text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            iPhone Duo.
          </h2>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-zinc-500">
            Fechado, cabe no bolso como um iPhone. Aberto, vira a maior tela que já existiu em um iPhone.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-[2rem] bg-white">
            <img
              src="/launch/iphone-duo-uso.webp"
              alt="iPhone Duo aberto nas mãos, mostrando a tela interna"
              loading="lazy"
              className="launch-zoom w-full"
            />
          </div>
        </Reveal>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {DUO_FACTS.map((fact, index) => (
            <Reveal key={fact.value} delay={index * 90}>
              <dt className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{fact.value}</dt>
              <dd className="mt-2 text-sm leading-6 text-zinc-500">{fact.label}</dd>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <div className="mt-20 grid items-center gap-10 rounded-[2rem] bg-[#f5f5f7] p-8 sm:p-12 lg:grid-cols-2">
            <div className="flex h-64 items-center justify-center sm:h-80">
              <SmoothImage
                src={color.image}
                alt={`iPhone Duo na cor ${color.name}`}
                sizes={SWITCHER_SIZES}
                className="max-h-full w-auto object-contain"
              />
            </div>
            <div>
              <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Em titânio, em duas cores.</h3>
              <p className="mt-3 text-lg text-zinc-500">
                Cor: <span className="text-zinc-950">{color.name}</span>
              </p>
              <div className="mt-6 flex gap-4">
                {DUO_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={`Ver na cor ${c.name}`}
                    aria-pressed={color.name === c.name}
                    className={`size-10 rounded-full border border-black/10 transition ${
                      color.name === c.name ? 'ring-2 ring-zinc-950 ring-offset-4 ring-offset-[#f5f5f7]' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <ul className="mt-8 grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
                {DUO_DETAILS.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 size-1.5 flex-none rounded-full bg-zinc-400" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/#contato"
                  className="rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Quero o iPhone Duo
                </Link>
                <p className="text-sm text-zinc-500">Pré-venda em 16/10 · Chega em 23/10</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const ALSO_LAUNCHED = [
  {
    name: 'Apple Watch Ultra 4',
    text: 'Até 50 horas de bateria em uso normal e até 84 horas no Modo Pouca Energia. Caixa de titânio de 49 mm e tela de até 3.000 nits.',
    image: '/launch/apple-watch-ultra-4.webp',
    status: 'Em breve',
    dark: true,
  },
  {
    name: 'Apple Watch Series 12',
    text: 'Chip S11 e novas medições de saúde, como Prontidão, variabilidade da frequência cardíaca e qualidade do sono.',
    image: '/launch/apple-watch-series-12.webp',
    status: 'Em breve',
    dark: true,
  },
  {
    name: 'AirPods 5',
    text: 'Cancelamento Ativo de Ruído até 1,5x melhor que na geração anterior, agora em todas as versões.',
    image: '/launch/airpods-5.webp',
    status: 'A partir de 18/09',
    dark: false,
  },
]

export function AlsoLaunchedSection() {
  return (
    <section className="bg-[#f5f5f7] px-5 py-24 lg:px-8" aria-labelledby="also-title">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 id="also-title" className="font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Também chegaram. <span className="text-zinc-500">Os novos Apple Watch e AirPods.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ALSO_LAUNCHED.map((item, index) => (
            <Reveal key={item.name} delay={index * 110}>
              <article
                className={`flex h-full flex-col overflow-hidden rounded-3xl ${item.dark ? 'bg-black text-white' : 'bg-white text-zinc-950'}`}
              >
                <img src={item.image} alt={item.name} loading="lazy" className="aspect-[1200/630] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className={`text-xs font-semibold ${item.dark ? 'text-rose-300' : 'text-[#b4455a]'}`}>{item.status}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.name}</h3>
                  <p className={`mt-3 text-sm leading-6 ${item.dark ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const READY_LINEUP = ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Air', 'iPhone 17', 'iPhone 17e']

export function ReadyToShipSection() {
  const lineup = READY_LINEUP.map((name) => allProducts.find((p) => p.name === name)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  )

  return (
    <section className="bg-[#f5f5f7] px-5 lg:px-8" aria-labelledby="ready-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <h2 id="ready-title" className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Pronta entrega: linha iPhone 17
          </h2>
          <Link to="/shop?category=iPhone" className="text-sm font-medium text-[#0066cc] hover:underline">
            Ver todos
          </Link>
        </div>

        <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:overflow-visible">
          {lineup.map((product) => (
            <Link
              key={product.name}
              to={productPath(product.name)}
              className="group min-w-[62%] snap-start rounded-3xl bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:min-w-[40%] lg:min-w-0"
            >
              <div className="flex h-40 items-center justify-center">
                <img
                  {...productImgProps(product.image, '(min-width: 1024px) 200px, 60vw')}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-auto object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              {product.colorOptions && (
                <div className="mt-4 flex justify-center gap-1.5">
                  {product.colorOptions.map((c) => (
                    <span key={c.name} title={c.name} className="size-2.5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              )}
              <p className="mt-4 font-semibold">{product.name}</p>
              <p className="mt-1 text-sm text-zinc-500">
                a partir de <span className="font-semibold text-zinc-950">{product.priceFrom}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
