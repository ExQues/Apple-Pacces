import { Search, ShoppingBag } from 'lucide-react'
import { allProducts } from '@/data/appleStore'

type SiteHeaderProps = {
  variant?: 'home' | 'shop'
}

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  const sectionPrefix = variant === 'home' ? '' : '/'
  const links = [
    { label: 'Produtos', href: `${sectionPrefix}#produtos` },
    { label: 'Diferenciais', href: `${sectionPrefix}#diferenciais` },
    { label: 'Consultoria', href: `${sectionPrefix}#consultoria` },
    { label: 'Contato', href: `${sectionPrefix}#contato` },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/85 px-4 py-3 shadow-[0_18px_60px_rgba(24,24,27,0.10)] backdrop-blur-2xl lg:px-5"
        aria-label="Navegacao principal"
      >
        <a href="/" className="group flex items-center gap-3" aria-label="Apple Pacces">
          <span className="grid size-10 place-items-center rounded-full border border-zinc-200 bg-zinc-950 text-sm font-semibold text-white shadow-sm transition group-hover:scale-105">
            AP
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.28em] text-zinc-950 sm:inline">PACCES</span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50/80 p-1 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-zinc-500 transition hover:bg-white hover:text-zinc-950 hover:shadow-sm">
              {link.label}
            </a>
          ))}
          <a
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            Shop
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/shop"
            className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 sm:inline-flex"
            aria-label={`Ver catalogo com ${allProducts.length} produtos`}
          >
            <Search className="size-4" aria-hidden="true" />
            {allProducts.length} produtos
          </a>
          <a
            href={`${sectionPrefix}#contato`}
            className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(24,24,27,0.18)] transition hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            Falar agora
          </a>
        </div>
      </nav>
    </header>
  )
}
