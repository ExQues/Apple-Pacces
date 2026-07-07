import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { ImportContactModal } from '@/components/ImportContactModal'

type SiteHeaderProps = {
  variant?: 'home' | 'shop'
}

const SECTIONS = ['produtos', 'diferenciais', 'consultoria', 'contato'] as const
type SectionId = (typeof SECTIONS)[number]

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  const sectionPrefix = variant === 'home' ? '' : '/'
  const links: { label: string; id: SectionId; href: string }[] = [
    { label: 'Produtos', id: 'produtos', href: `${sectionPrefix}#produtos` },
    { label: 'Diferenciais', id: 'diferenciais', href: `${sectionPrefix}#diferenciais` },
    { label: 'Consultoria', id: 'consultoria', href: `${sectionPrefix}#consultoria` },
    { label: 'Contato', id: 'contato', href: `${sectionPrefix}#contato` },
  ]

  const [active, setActive] = useState<SectionId>('produtos')
  const [modalOpen, setModalOpen] = useState(false)
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  })
  const listRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

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
          {/* Pill minimalista: preto solido, movimento suave */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-zinc-950"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready && variant === 'home' ? 1 : 0,
              transition:
                'left 500ms cubic-bezier(0.4, 0, 0.2, 1), width 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 220ms ease',
            }}
          />
          {links.map((link) => {
            const isActive = variant === 'home' && active === link.id
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
            href="/shop"
            aria-current={variant === 'shop' ? 'page' : undefined}
            className="relative z-10 ml-1 inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(2,132,199,0.28)] transition hover:-translate-y-0.5 hover:bg-sky-500"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            Shopping
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(24,24,27,0.18)] transition hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            Falar agora
          </button>
        </div>
      </nav>
      <ImportContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  )
}
