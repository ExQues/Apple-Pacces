import { Link } from 'react-router-dom'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-950">
      <SiteHeader variant="shop" />
      <main className="grid min-h-[75vh] place-items-center px-5 pt-24 text-center">
        <div>
          <p className="text-sm font-semibold text-zinc-500">Erro 404</p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Página não encontrada.</h1>
          <p className="mt-4 text-lg text-zinc-500">O endereço pode ter mudado ou não existe mais.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
              Ir para o início
            </Link>
            <Link to="/shop" className="rounded-full px-6 py-3 text-sm font-semibold text-[#0066cc] hover:underline">
              Ver a loja
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
