import { useState, FormEvent } from 'react'
import { BadgeCheck, CheckCircle2, ClipboardCheck, CreditCard, Headphones, RefreshCw, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { trustItems } from '@/data/appleStore'
import { supabase } from '@/lib/supabase'

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
              Não compre pelo modelo mais caro. Compre pelo modelo certo.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Nossa consultoria compara uso, memória, câmera, bateria, garantia e condições para indicar a configuração com melhor custo-benefício.
            </p>
            <a href="#contato" className="mt-9 inline-flex rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800">
              Receber recomendação
            </a>
          </div>
          <div className="relative min-h-80 bg-[linear-gradient(135deg,#f8fafc,#dbeafe_42%,#18181b)]">
            <div className="absolute inset-8 rounded-[2rem] border border-white/50 bg-white/30 backdrop-blur-xl" />
            <div className="absolute bottom-10 left-10 right-10 rounded-3xl bg-white p-6 shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">Diagnóstico rápido</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">Uso diário, criação ou trabalho profissional?</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function ContactSection() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [productInterest, setProductInterest] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Por favor, preencha seu nome e WhatsApp.')
      return
    }

    setLoading(true)
    setErrorMessage('')

    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          product_interest: productInterest || 'Geral',
        },
      ])

      if (error) {
        console.error('Erro ao enviar lead:', error)
      }
      setSubmitted(true)
    } catch (err) {
      console.error('Erro de conexão:', err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contato" className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-zinc-100 p-6 sm:p-10 lg:grid-cols-[0.82fr_1fr] lg:p-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Contato comercial</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-5xl">
            Solicite uma proposta limpa, direta e sem pressão.
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Envie seu interesse e receba uma recomendação com disponibilidade, condições e próximos passos para compra.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-xl">
            <CheckCircle2 className="size-12 text-emerald-500" />
            <h3 className="mt-4 text-2xl font-semibold text-zinc-950">Solicitação enviada!</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Obrigado, {name}! Um consultor entrará em contato via WhatsApp em até 24 horas.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setName('')
                setPhone('')
                setProductInterest('')
              }}
              className="mt-6 rounded-full border border-zinc-200 bg-zinc-50 px-6 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Enviar outra solicitação
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-xl" aria-label="Formulário de atendimento comercial">
            {errorMessage && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600">
                {errorMessage}
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-zinc-700">
                Nome
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  placeholder="Seu nome"
                />
              </label>
              <label className="text-sm font-semibold text-zinc-700">
                WhatsApp
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  placeholder="(00) 00000-0000"
                />
              </label>
            </div>
            <label className="mt-5 block text-sm font-semibold text-zinc-700">
              Produto de interesse
              <select
                value={productInterest}
                onChange={(e) => setProductInterest(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                <option value="">
                  Selecione uma linha
                </option>
                <option value="iPhone">iPhone</option>
                <option value="Mac">Mac</option>
                <option value="iPad">iPad</option>
                <option value="Apple Watch">Apple Watch</option>
                <option value="AirPods">AirPods / Acessórios</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Solicitar atendimento'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
