import { useEffect, useState } from 'react'
import { SmoothImage } from '@/components/SmoothImage'
import { preloadProductImage, productImgProps } from '@/lib/images'
import { ArrowUpRight, BadgeCheck, CalendarClock, CreditCard, PackageCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'

// Lançamento iPhone 18 Pro (dados oficiais da Apple Brasil). Preço entra quando o fornecedor liberar.
const PRO_COLORS = [
  { name: 'Bordô', hex: '#5b2230', image: '/products/iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp' },
  { name: 'Glacial', hex: '#c9d3d8', image: '/products/iphone-18-pro-finish-select-202609-6-9inch-glacier.webp' },
  { name: 'Prateado', hex: '#e3e4e6', image: '/products/iphone-18-pro-finish-select-202609-6-9inch-silver.webp' },
  { name: 'Preto', hex: '#1d1d1f', image: '/products/iphone-18-pro-finish-select-202609-6-9inch-black.webp' },
]

const PRO_FEATURES = [
  { title: 'Chip A20 Pro', text: 'Duplo Neural Engine de 16 núcleos e 50% mais largura de banda da memória.' },
  { title: 'Abertura variável', text: 'Câmera principal Fusion de 48 MP de ƒ/1.48 a ƒ/4.0, com controles Pro no app Câmera.' },
  { title: 'Zoom de até 8x', text: 'Com qualidade óptica, pela teleobjetiva Fusion de 48 MP.' },
  { title: 'Três câmeras de 48 MP', text: 'Principal, ultra-angular e teleobjetiva, todas Fusion.' },
  { title: 'Dynamic Island redesenhada', text: 'Tela Super Retina XDR de 6,3" ou 6,9", com ProMotion de até 120 Hz.' },
  { title: 'Câmara de vapor', text: 'De nova geração, com o triplo da área de superfície para dissipar o calor.' },
  { title: 'Modem C2', text: 'Nova geração, com upload até 50% mais rápido.' },
  { title: 'Até 43 h de vídeo', text: 'De reprodução no iPhone 18 Pro Max, ou até 29 horas de uso por recarga.' },
]

const PRO_MODELS = [
  { name: 'iPhone 18 Pro Max', screen: 'Tela de 6,9"', highlight: 'Até 43 horas de vídeo', image: PRO_COLORS[0].image },
  {
    name: 'iPhone 18 Pro',
    screen: 'Tela de 6,3"',
    highlight: 'Pro em tamanho compacto',
    image: '/products/iphone-18-pro-finish-select-202609-6-3inch-silver.webp',
  },
]

const SWITCHER_SIZES = '(min-width: 1024px) 480px, 80vw'

const perks = [
  { icon: PackageCheck, label: 'Lacrados' },
  { icon: BadgeCheck, label: 'Garantia Apple 1 ano' },
  { icon: CreditCard, label: 'Até 18x no cartão' },
]

export function HeroSection() {
  const [color, setColor] = useState(PRO_COLORS[0])

  // Deixa as quatro cores prontas para a troca ser instantânea
  useEffect(() => {
    PRO_COLORS.forEach((c) => preloadProductImage(c.image, SWITCHER_SIZES))
  }, [])

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-black text-white">
      {/* Brilho Bordô atrás do aparelho */}
      <div className="absolute right-[-12%] top-0 -z-10 size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(150,40,62,0.45),transparent_65%)] blur-2xl" />

      {/* Abertura */}
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-36">
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
            {...productImgProps(PRO_COLORS[0].image, '(min-width: 1024px) 512px, (min-width: 640px) 448px, 288px')}
            alt="iPhone 18 Pro Max na cor Bordô"
            loading="eager"
            decoding="async"
            {...{ fetchpriority: 'high' }}
            className="mx-auto w-full max-w-[18rem] drop-shadow-[0_40px_90px_rgba(150,40,62,0.45)] sm:max-w-md lg:max-w-lg"
          />
        </div>
      </div>

      {/* Banner cinematográfico com zoom ao rolar */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem]">
            <img src="/launch/iphone-18-pro-banner.webp" alt="iPhone 18 Pro na cor Bordô" loading="lazy" className="launch-zoom w-full" />
          </div>
        </Reveal>
      </div>

      {/* Tudo sobre o iPhone 18 Pro */}
      <div className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
            Muito mais Pro. <span className="text-zinc-500">Por dentro e por fora.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PRO_FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 4) * 90} className="bg-black">
              <div className="h-full p-6 sm:p-8">
                <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Seletor de cores */}
      <div className="mx-auto max-w-7xl px-5 pt-24 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-10 rounded-[2rem] bg-zinc-900/60 p-8 sm:p-12 lg:grid-cols-2">
            <div className="flex h-72 items-center justify-center sm:h-96">
              <SmoothImage
                src={color.image}
                alt={`iPhone 18 Pro Max na cor ${color.name}`}
                sizes={SWITCHER_SIZES}
                className="max-h-full w-auto object-contain"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Quatro acabamentos.</h2>
              <p className="mt-3 text-lg text-zinc-400">
                Cor: <span className="text-white">{color.name}</span>
              </p>
              <div className="mt-6 flex gap-4">
                {PRO_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={`Ver na cor ${c.name}`}
                    aria-pressed={color.name === c.name}
                    className={`size-10 rounded-full border border-white/20 transition ${
                      color.name === c.name ? 'ring-2 ring-white ring-offset-4 ring-offset-zinc-900' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Reserva dos dois modelos */}
      <div className="mx-auto max-w-7xl px-5 pt-24 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Escolha o seu iPhone 18 Pro</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
          {PRO_MODELS.map((model) => (
            <article
              key={model.name}
              className="group flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-4 transition hover:border-white/25 hover:bg-zinc-900 sm:p-6 lg:flex-row lg:items-center lg:gap-6 lg:p-8"
            >
              <img
                {...productImgProps(model.image, '(min-width: 1024px) 180px, 150px')}
                alt={model.name}
                loading="lazy"
                className="mx-auto h-36 w-auto flex-none object-contain transition duration-500 group-hover:scale-105 sm:h-44 lg:mx-0 lg:h-56"
              />
              <div className="min-w-0">
                <h3 className="text-lg font-semibold leading-tight tracking-tight sm:text-2xl">{model.name}</h3>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                  {model.screen}
                  <span className="hidden sm:inline"> · {model.highlight}</span>
                </p>
                <div className="mt-4 flex gap-1.5">
                  {PRO_COLORS.map((c) => (
                    <span key={c.name} title={c.name} className="size-3 rounded-full ring-1 ring-white/25" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
                <p className="mt-3 text-xs font-semibold text-rose-200 sm:mt-4 sm:text-sm">Pré-venda · consulte o valor</p>
                <a
                  href="#contato"
                  className="mt-4 inline-flex w-full justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:w-auto"
                >
                  Reservar
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Transição do preto para o branco da seção do iPhone Duo */}
      <div
        aria-hidden="true"
        className="mt-24 h-56 bg-[linear-gradient(180deg,#000_0%,#1c0a0f_22%,#4a1c27_45%,#b8959c_72%,#ffffff_100%)]"
      />
    </section>
  )
}
