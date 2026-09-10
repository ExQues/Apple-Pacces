import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandLogo } from '@/components/BrandLogo'
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setLoading(false)
      return
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes('Invalid login')) {
        setError('Email ou senha incorretos.')
      } else {
        setError(error.message)
      }
      setLoading(false)
    } else {
      navigate('/shop')
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Digite seu email acima para recuperar a senha.')
      return
    }
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

    if (error) {
      setError(error.message)
    } else {
      setError(null)
      alert('Se o email existir, enviamos um link de recuperação. Verifique sua caixa de entrada.')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      {/* Painel esquerdo decorativo */}
      <div className="relative hidden w-[45%] overflow-hidden bg-zinc-950 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(150,40,62,0.35),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="text-white transition-opacity hover:opacity-80" aria-label="Apple Pacces, página inicial">
            <BrandLogo />
          </Link>

          <div className="max-w-sm">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-white">
              Sua experiência Apple começa aqui.
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400">
              Acesse sua conta para gerenciar pedidos, acompanhar entregas e receber recomendações personalizadas.
            </p>
          </div>

          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Apple Pacces. Todos os direitos reservados.</p>
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
            Entrar
          </h1>
          <p className="mt-3 text-[15px] leading-7 text-zinc-500">
            Acesse sua conta para finalizar compras e ver seu histórico.
          </p>

          <form onSubmit={handleLogin} className="mt-9 space-y-5">
            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3.5 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

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
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-700">Senha</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-semibold text-[#0066cc] transition hover:underline"
                >
                  Esqueci a senha
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-12 pr-12 text-[15px] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                </button>
              </div>
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
                'Entrar'
              )}
            </button>
          </form>

          <p className="mt-9 text-center text-sm text-zinc-500">
            Ainda não tem conta?{' '}
            <Link to="/register" className="font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-2 transition hover:decoration-zinc-950">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
