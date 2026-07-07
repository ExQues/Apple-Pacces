import { BadgeCheck, ClipboardCheck, CreditCard, Headphones, RefreshCw, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { trustItems } from '@/data/appleStore'

const trustIcons = [ShieldCheck, Headphones, CreditCard, Truck]

const choiceSteps = [
  {
    title: 'Perfil de uso',
    description: 'Entenda se o foco é câmera, estudo, trabalho, bateria, mobilidade ou criação.',
    icon: ClipboardCheck,
  },
  {
    title: 'Orçamento inteligente',
    description: 'Compare perfil, orçamento e ciclo de troca antes de escolher o modelo ideal.',
    icon: Sparkles,
  },
  {
    title: 'Compra com plano',
    description: 'Receba uma indicação objetiva com opção de upgrade, garantia e acessórios certos.',
    icon: RefreshCw,
  },
]

export function SmartChoiceSection() {
  return (
    <section className="px-5 py-20 lg:px-8" aria-labelledby="smart-choice-title">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] border border-zinc-200 bg-white shadow-[0_30px_90px_rgba(24,24,27,0.10)]">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="relative isolate bg-zinc-950 p-8 text-white sm:p-12 lg:p-14">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.28),transparent_34%),radial-gradient(circle_at_92%_88%,rgba(226,232,240,0.18),transparent_28%)]" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">Método de compra</p>
            <h2 id="smart-choice-title" className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Escolha inteligente em 3 passos.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-zinc-300">
              Em vez de empurrar o modelo mais caro, organizamos a decisão para você comprar o produto certo, no momento certo.
            </p>
            <a href="/shop" className="mt-9 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:-translate-y-1 hover:bg-sky-50">
              Abrir Shop completo
            </a>
          </div>

          <div className="grid gap-4 p-5 sm:p-8 lg:p-10">
            {choiceSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <article key={step.title} className="group grid gap-5 rounded-[2rem] border border-zinc-200 bg-zinc-50/70 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:grid-cols-[auto_1fr]">
                  <div className="grid size-12 place-items-center rounded-2xl bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-200 transition group-hover:bg-zinc-950 group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Passo {index + 1}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{step.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function TrustAndConsulting() {
  return (
    <>
      <section id="diferenciais" className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-zinc-950 p-6 text-white shadow-[0_35px_80px_rgba(24,24,27,0.26)] lg:p-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item, index) => {
              const Icon = trustIcons[index]
              return (
                <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                  <Icon className="size-6 text-sky-300" aria-hidden="true" />
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{item.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="consultoria" className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-2xl lg:grid-cols-[1fr_0.85fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
              <BadgeCheck className="size-4" aria-hidden="true" />
              Compra assistida
            </div>
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-5xl">
              Nao compre pelo modelo mais caro. Compre pelo modelo certo.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Nossa consultoria compara uso, memoria, camera, bateria, garantia e condicoes para indicar a configuracao com melhor custo-beneficio.
            </p>
            <a href="#contato" className="mt-9 inline-flex rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800">
              Receber recomendacao
            </a>
          </div>
          <div className="relative min-h-80 bg-[linear-gradient(135deg,#f8fafc,#dbeafe_42%,#18181b)]">
            <div className="absolute inset-8 rounded-[2rem] border border-white/50 bg-white/30 backdrop-blur-xl" />
            <div className="absolute bottom-10 left-10 right-10 rounded-3xl bg-white p-6 shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">Diagnostico rapido</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">Uso diario, criacao ou trabalho profissional?</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function ContactSection() {
  return (
    <section id="contato" className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-zinc-100 p-6 sm:p-10 lg:grid-cols-[0.82fr_1fr] lg:p-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Contato comercial</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-5xl">
            Solicite uma proposta limpa, direta e sem pressao.
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Envie seu interesse e receba uma recomendacao com disponibilidade, condicoes e proximos passos para compra.
          </p>
        </div>

        <form className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-xl" aria-label="Formulario de atendimento comercial">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-zinc-700">
              Nome
              <input className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" placeholder="Seu nome" />
            </label>
            <label className="text-sm font-semibold text-zinc-700">
              WhatsApp
              <input className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" placeholder="(00) 00000-0000" />
            </label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-zinc-700">
            Produto de interesse
            <select className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" defaultValue="">
              <option value="" disabled>
                Selecione uma linha
              </option>
              <option>iPhone</option>
              <option>Mac</option>
              <option>iPad</option>
              <option>Apple Watch</option>
            </select>
          </label>
          <button type="button" className="mt-6 w-full rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800">
            Solicitar atendimento
          </button>
        </form>
      </div>
    </section>
  )
}
