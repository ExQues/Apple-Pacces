import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

type ImportContactModalProps = {
  open: boolean
  onClose: () => void
}

const WHATSAPP_NUMBER = '5511999999999'

export function ImportContactModal({ open, onClose }: ImportContactModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [product, setProduct] = useState('')
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanedPhone = phone.replace(/\D/g, '')
    const text = encodeURIComponent(
      [
        'Ola! Quero solicitar a importacao de um produto Apple pela Pacces.',
        '',
        `Nome completo: ${name}`,
        `WhatsApp: ${cleanedPhone}`,
        `Produto desejado: ${product}`,
        '',
        'Estou ciente de que se trata de importacao sob demanda com pagamento adiantado.',
      ].join('\n'),
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-modal-title"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_40px_120px_rgba(24,24,27,0.35)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar formulario"
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200 hover:text-zinc-950"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="border-b border-zinc-100 bg-zinc-950 px-8 py-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">Importacao sob demanda</p>
          <h2 id="import-modal-title" className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">
            Vamos importar seu Apple.
          </h2>
          <p className="mt-4 text-sm leading-6 text-zinc-300">
            Esta area e destinada a importacao de produtos Apple sob demanda. O trabalho envolve cotacao,
            reserva do estoque, taxas de importacao e logistica internacional. Por esse motivo, o pagamento
            e adiantado antes de iniciarmos o processo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">
          <div>
            <label htmlFor="import-name" className="block text-sm font-semibold text-zinc-950">
              Nome completo
            </label>
            <input
              id="import-name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome completo"
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-zinc-100"
            />
          </div>

          <div>
            <label htmlFor="import-phone" className="block text-sm font-semibold text-zinc-950">
              WhatsApp
            </label>
            <input
              id="import-phone"
              type="tel"
              required
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="(11) 99999-9999"
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-zinc-100"
            />
          </div>

          <div>
            <label htmlFor="import-product" className="block text-sm font-semibold text-zinc-950">
              Produto que deseja importar
            </label>
            <textarea
              id="import-product"
              required
              rows={3}
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              placeholder="Ex: iPhone 16 Pro Max 256GB, cor Titanio Deserto"
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-zinc-100"
            />
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
            <strong>Importante:</strong> a importacao exige pagamento adiantado para reserva de estoque e
            inicio do processo logistico. Voce recebera o orcamento completo e as condicoes por WhatsApp
            antes de qualquer cobranca.
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(24,24,27,0.28)] transition hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            Enviar pedido pelo WhatsApp
          </button>
        </form>
      </div>
    </div>
  )
}
