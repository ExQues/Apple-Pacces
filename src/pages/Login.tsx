import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/shop')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6] px-5 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-950">
          <ArrowLeft className="size-4" />
          Voltar para o inicio
        </Link>
        <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-2xl sm:p-10">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.045em] text-zinc-950">
              Acesse sua conta.
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              Para fazer pedidos e ver seu historico.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-zinc-700">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" 
                placeholder="seu@email.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700">Senha</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" 
                placeholder="••••••••" 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="mt-6 w-full rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800 disabled:translate-y-0 disabled:opacity-70"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-600">
            Ainda nao tem conta?{' '}
            <Link to="/register" className="font-semibold text-sky-600 transition hover:text-sky-800">
              Crie uma agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
