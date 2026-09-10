import { useState, FormEvent } from 'react'
import { CheckCircle2, CreditCard, Headphones, ShieldCheck, Truck } from 'lucide-react'
import { trustItems } from '@/data/appleStore'
import { supabase } from '@/lib/supabase'

const trustIcons = [ShieldCheck, Headphones, CreditCard, Truck]

export function TrustStrip() {
  return (
    <section id="diferenciais" className="scroll-mt-28 bg-white px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
          Por que comprar aqui. <span className="text-zinc-500">Tranquilidade do pedido à entrega.</span>
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = trustIcons[index] ?? ShieldCheck
            return (
              <article key={item.title}>
                <Icon className="size-7 text-zinc-950" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const inputClass =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-950/5'

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
      setErrorMessage('Preencha seu nome e WhatsApp.')
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
    <section id="contato" className="scroll-mt-28 bg-[#f5f5f7] px-5 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
            Fale com um especialista.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-zinc-500">
            Tire suas dúvidas, confirme a disponibilidade e as condições de pagamento. Respondemos pelo WhatsApp em até 24 horas.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center">
            <CheckCircle2 className="size-12 text-emerald-500" aria-hidden="true" />
            <h3 className="mt-4 text-2xl font-semibold text-zinc-950">Solicitação enviada!</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Obrigado, {name}! Vamos falar com você pelo WhatsApp em até 24 horas.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setName('')
                setPhone('')
                setProductInterest('')
              }}
              className="mt-6 text-sm font-medium text-[#0066cc] hover:underline"
            >
              Enviar outra solicitação
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 sm:p-8" aria-label="Formulário de atendimento">
            {errorMessage && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">{errorMessage}</div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-zinc-700">
                Nome
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Seu nome"
                />
              </label>
              <label className="text-sm font-medium text-zinc-700">
                WhatsApp
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="(00) 00000-0000"
                />
              </label>
            </div>
            <label className="mt-5 block text-sm font-medium text-zinc-700">
              Produto de interesse
              <select value={productInterest} onChange={(e) => setProductInterest(e.target.value)} className={inputClass}>
                <option value="">Selecione um produto</option>
                <option value="iPhone 18 Pro (pré-venda)">iPhone 18 Pro / Pro Max (pré-venda)</option>
                <option value="iPhone">iPhone</option>
                <option value="Mac">Mac</option>
                <option value="iPad">iPad</option>
                <option value="Apple Watch">Apple Watch</option>
                <option value="AirPods">AirPods e acessórios</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Solicitar atendimento'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
