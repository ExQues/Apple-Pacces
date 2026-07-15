import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Register() {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (name.trim().length < 2) {
      setError('Digite seu nome completo.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setLoading(false)
      return
    }
    
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Este email já está cadastrado. Tente fazer login.')
      } else {
        setError(signUpError.message)
      }
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        name,
        whatsapp,
      })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }
    }

    navigate('/shop')
  }

  return (
    <div className="flex min-h-screen bg-[#f8f8f6]">
      {/* Painel esquerdo decorativo */}
      <div className="relative hidden w-[45%] overflow-hidden bg-zinc-950 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.1),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white backdrop-blur">
              AP
            </span>
            <span className="text-sm font-semibold tracking-[0.28em] text-white/80">PACCES</span>
          </Link>

          <div className="max-w-sm">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-white">
              Junte-se à curadoria Apple Pacces.
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400">
              Crie sua conta e tenha acesso a recomendações personalizadas, condições exclusivas e atendimento prioritário.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                ['+900', 'clientes'],
                ['24h', 'resposta'],
                ['100%', 'curadoria'],
              ].map(([val, label]) => (
                <div key={label}>
                  <p className="text-xl font-semibold text-white">{val}</p>
                  <p className="mt-1 text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-zinc-600">© 2026 Apple Pacces. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Painel direito (formulário) */}
      <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-[420px]">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-950"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>

          <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-4xl">
            Criar conta
          </h1>
          <p className="mt-3 text-[15px] leading-7 text-zinc-500">
            Preencha seus dados para começar a comprar.
          </p>

          <form onSubmit={handleRegister} className="mt-9 space-y-4">
            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3.5 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Nome */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">Nome completo</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-300" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-12 pr-4 text-[15px] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">WhatsApp</label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-300" />
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-12 pr-4 text-[15px] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-300" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-12 pr-4 text-[15px] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">Senha</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-12 pr-12 text-[15px] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-zinc-400">Mínimo de 6 caracteres</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative mt-2 flex w-full items-center justify-center rounded-full bg-zinc-950 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl disabled:translate-y-0 disabled:opacity-60"
            >
              {loading ? (
                <div className="apple-spinner apple-spinner--light" />
              ) : (
                'Criar conta'
              )}
            </button>
          </form>

          <p className="mt-9 text-center text-sm text-zinc-500">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-2 transition hover:decoration-zinc-950">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
