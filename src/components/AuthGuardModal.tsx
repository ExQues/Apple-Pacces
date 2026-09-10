import { Lock, X, ArrowRight, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AuthGuardModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthGuardModal({ isOpen, onClose }: AuthGuardModalProps) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleLogin = () => {
    onClose()
    navigate('/login')
  }

  const handleRegister = () => {
    onClose()
    navigate('/register')
  }

  return (
    <>
      {/* Overlay com Blur */}
      <div
        className="fixed inset-0 z-[80] bg-zinc-950/40 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[81] flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-zinc-200/80 bg-white p-7 shadow-[0_32px_100px_rgba(0,0,0,0.22)] sm:p-9"
          style={{ animation: 'modalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-zinc-100/80 text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-950 active:scale-90"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>

          {/* Ícone com Glow e estilo Apple */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-zinc-950 shadow-xl shadow-zinc-950/20">
            <Lock className="size-7 text-white" />
          </div>

          {/* Conteúdo */}
          <div className="mt-6 text-center">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl">
              Entre para colocar na sacola
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Sua sacola fica associada à sua conta e é sincronizada instantaneamente em qualquer dispositivo (PC ou celular).
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleLogin}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(24,24,27,0.20)] transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl active:scale-98"
            >
              Entrar na Conta
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleRegister}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white py-3.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950 active:scale-98"
            >
              <UserPlus className="size-4 text-zinc-400" />
              Criar uma Conta
            </button>

            <button
              onClick={onClose}
              className="w-full pt-1 text-center text-xs font-medium text-zinc-400 transition hover:text-zinc-600"
            >
              Continuar apenas navegando
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  )
}
