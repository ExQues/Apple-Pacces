import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

interface AuthGuardModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthGuardModal({ isOpen, onClose }: AuthGuardModalProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const goTo = (path: string) => {
    onClose()
    navigate(path)
  }

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="fixed inset-0 z-[81] flex items-end justify-center sm:items-center sm:p-4" onClick={onClose}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-guard-title"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-t-3xl bg-white p-8 text-center shadow-2xl sm:rounded-3xl sm:p-10"
          style={{ animation: 'authIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/5 text-zinc-600 transition hover:bg-black/10 hover:text-zinc-950"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>

          <h2 id="auth-guard-title" className="font-display text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl">
            Entre para usar a sacola
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Com uma conta, sua sacola fica salva no celular e no computador, e você acompanha seus pedidos.
          </p>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={() => goTo('/login')}
              className="w-full rounded-full bg-zinc-950 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => goTo('/register')}
              className="w-full rounded-full border border-zinc-300 py-3.5 text-sm font-semibold text-zinc-950 transition hover:border-zinc-950"
            >
              Criar conta
            </button>
            <button type="button" onClick={onClose} className="w-full pt-1 text-sm font-medium text-[#0066cc] hover:underline">
              Continuar navegando
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes authIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }`}</style>
    </>
  )
}
