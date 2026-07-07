import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Search, ShoppingBag } from 'lucide-react'
import { allProducts } from '@/data/appleStore'

type SiteHeaderProps = {
  variant?: 'home' | 'shop'
}

const SECTIONS = ['produtos', 'diferenciais', 'consultoria', 'contato'] as const
type SectionId = (typeof SECTIONS)[number]
type ActiveKey = SectionId | 'shop'

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  const sectionPrefix = variant === 'home' ? '' : '/'
  const links: { label: string; id: SectionId; href: string }[] = [
    { label: 'Produtos', id: 'produtos', href: `${sectionPrefix}#produtos` },
    { label: 'Diferenciais', id: 'diferenciais', href: `${sectionPrefix}#diferenciais` },
    { label: 'Consultoria', id: 'consultoria', href: `${sectionPrefix}#consultoria` },
    { label: 'Contato', id: 'contato', href: `${sectionPrefix}#contato` },
  ]

  // Na Shop, o item ativo eh o proprio Shop. Na home, comeca em "produtos".
  const [active, setActive] = useState<ActiveKey>(variant === 'shop' ? 'shop' : 'produtos')
  const [prevActive, setPrevActive] = useState<ActiveKey>(active)
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  })
  const [motion, setMotion] = useState<'idle' | 'left' | 'right'>('idle')
  const listRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const ORDER: ActiveKey[] = ['produtos', 'diferenciais', 'consultoria', 'contato', 'shop']

  // Detecta a secao ativa com base em scrollY (mais confiavel que IntersectionObserver
  // quando as secoes tem alturas muito diferentes).
  useEffect(() => {
    if (variant !== 'home') return
    if (typeof window === 'undefined') return

    const computeActive = () => {
      const trigger = window.innerHeight * 0.35 // ponto de leitura acima do meio
      let current: SectionId = 'produtos'
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top - trigger <= 0) {
          current = id
        }
      }
      setActive(current)
    }

    computeActive()
    window.addEventListener('scroll', computeActive, { passive: true })
    window.addEventListener('resize', computeActive)
    return () => {
      window.removeEventListener('scroll', computeActive)
      window.removeEventListener('resize', computeActive)
    }
  }, [variant])

  const recalcIndicator = useCallback(() => {
    const container = listRef.current
    const target = itemRefs.current[active]
    if (!container || !target) return
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    setIndicator({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      ready: true,
    })
  }, [active])

  // Dispara animacao de squash & stretch conforme direcao do movimento
  useEffect(() => {
    if (prevActive === active) return
    const dir = ORDER.indexOf(active) - ORDER.indexOf(prevActive)
    setMotion(dir > 0 ? 'right' : 'left')
    const t = window.setTimeout(() => setMotion('idle'), 780)
    setPrevActive(active)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useLayoutEffect(() => {
    recalcIndicator()
  }, [recalcIndicator])

  useEffect(() => {
    window.addEventListener('resize', recalcIndicator)
    return () => window.removeEventListener('resize', recalcIndicator)
  }, [recalcIndicator])

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

        <div
          ref={listRef}
          className="relative hidden items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50/80 p-1 md:flex"
        >
          {/* Filtro SVG que gera o efeito goo/liquid */}
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <filter id="liquid-goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          {/* Camada com filtro goo para blob preto se fundir */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ filter: 'url(#liquid-goo)' }}
            aria-hidden="true"
          >
            <span
              className="absolute top-1 bottom-1 rounded-full bg-black"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.ready ? 1 : 0,
                transformOrigin: motion === 'right' ? 'left center' : 'right center',
                transform:
                  motion === 'idle'
                    ? 'scale(1, 1)'
                    : motion === 'right'
                    ? 'scale(1.08, 0.88)'
                    : 'scale(1.08, 0.88)',
                transition:
                  'left 720ms cubic-bezier(0.34, 1.2, 0.28, 1), width 720ms cubic-bezier(0.34, 1.2, 0.28, 1), transform 720ms cubic-bezier(0.34, 1.2, 0.28, 1), opacity 260ms ease',
                boxShadow: '0 14px 34px rgba(0,0,0,0.35)',
              }}
            />
            {/* Gotinha secundaria que segue com atraso, dando sensacao de liquido */}
            <span
              className="absolute top-2 bottom-2 rounded-full bg-black"
              style={{
                left: indicator.left + indicator.width * 0.25,
                width: indicator.width * 0.5,
                opacity: indicator.ready && motion !== 'idle' ? 0.9 : 0,
                transition:
                  'left 900ms cubic-bezier(0.34, 1.35, 0.24, 1) 60ms, width 900ms cubic-bezier(0.34, 1.35, 0.24, 1) 60ms, opacity 500ms ease',
              }}
            />
          </div>

          {/* Highlight e reflexo (fora do filtro goo, para nao borrar) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1 bottom-1 overflow-hidden rounded-full"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
              transition:
                'left 720ms cubic-bezier(0.34, 1.2, 0.28, 1), width 720ms cubic-bezier(0.34, 1.2, 0.28, 1), opacity 260ms ease',
            }}
          >
            {/* brilho superior estilo Liquid Glass */}
            <span
              className="absolute inset-x-3 top-0 h-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0.32), rgba(255,255,255,0) 72%)',
              }}
            />
            {/* reflexo animado que atravessa o pill */}
            <span
              className="absolute inset-y-0 w-1/2 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)',
                animation: 'liquidShine 3.6s ease-in-out infinite',
                mixBlendMode: 'screen',
              }}
            />
            {/* borda interna sutil */}
            <span
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(255,255,255,0.05)',
              }}
            />
          </span>
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.href}
                ref={(el) => {
                  itemRefs.current[link.id] = el
                }}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-950'
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <a
            ref={(el) => {
              itemRefs.current['shop'] = el
            }}
            href="/shop"
            aria-current={active === 'shop' ? 'page' : undefined}
            className={`relative z-10 ml-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              active === 'shop'
                ? 'bg-transparent text-white'
                : 'bg-sky-600 text-white hover:-translate-y-0.5 hover:bg-sky-500'
            }`}
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            Shopping
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
