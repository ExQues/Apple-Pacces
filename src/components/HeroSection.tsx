import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react'

const heroImage =
  'https://www.apple.com/v/iphone/home/cj/images/overview/guided-tour/guided_tour__e70yvshmbb2i_large.jpg'

export function HeroSection() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden px-5 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-20 h-[760px] bg-[linear-gradient(180deg,#ffffff_0%,#f8f8f6_76%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.32),rgba(255,255,255,0)_67%)]" />
      <div className="absolute right-0 top-28 -z-10 h-56 w-56 rounded-full bg-zinc-200/50 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="max-w-3xl animate-rise">


          <h1 className="max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-zinc-950 sm:text-6xl lg:text-7xl">
            Linha Apple para quem exige o melhor.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600">
            Uma experiência de compra Apple com curadoria, comparação honesta e apresentação premium para você escolher sem dúvida e sem excesso.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(24,24,27,0.22)] transition hover:-translate-y-1 hover:bg-zinc-800"
            >
              Explorar Shop premium
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-7 py-4 text-sm font-semibold text-zinc-950 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
            >
              Falar com consultor
            </a>
          </div>

          <a href="#produtos" className="mt-5 inline-flex text-sm font-semibold text-sky-700 transition hover:text-sky-900">
            Ver produtos
          </a>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
            {[
              ['+900', 'clientes orientados'],
              ['24h', 'resposta comercial'],
              ['100%', 'curadoria premium'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">{label}</dt>
                <dd className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex max-w-xl items-start gap-3 rounded-3xl border border-zinc-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <ShieldCheck className="mt-0.5 size-5 flex-none text-sky-600" aria-hidden="true" />
            <p className="text-sm leading-6 text-zinc-600">
              Atendimento com foco em procedência, condição real do produto e recomendação adequada ao seu uso.
            </p>
          </div>
        </div>

        <div className="relative animate-rise [animation-delay:120ms]">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-sky-200/40 via-white to-zinc-200/60 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white bg-white p-3 shadow-[0_35px_90px_rgba(24,24,27,0.16)]">
            <img src={heroImage} alt="Composicao premium de dispositivos Apple em showroom minimalista" className="h-[440px] w-full rounded-[1.75rem] object-cover" />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-2xl backdrop-blur-xl">
              <p className="text-sm font-semibold text-zinc-950">Curadoria sob medida</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">Compare modelos, memoria, uso e condicoes antes de comprar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
