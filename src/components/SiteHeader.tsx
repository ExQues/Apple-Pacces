import { useEffect, useRef, useState } from 'react'
import { ShoppingBag, User as UserIcon, LogOut, Menu, X, Package } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandLogo } from '@/components/BrandLogo'
import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'
import { useFlyingAnimationStore } from '@/store/useFlyingAnimationStore'

type SiteHeaderProps = {
  variant?: 'home' | 'shop'
}

const STORE_LINKS = [
  { label: 'Loja', to: '/shop' },
  { label: 'iPhone', to: '/shop?category=iPhone' },
  { label: 'Mac', to: '/shop?category=Mac' },
  { label: 'iPad', to: '/shop?category=iPad' },
  { label: 'Watch', to: `/shop?category=${encodeURIComponent('Apple Watch')}` },
  { label: 'Acessórios', to: `/shop?category=${encodeURIComponent('Acessórios')}` },
]

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  const contactHref = variant === 'home' ? '#contato' : '/#contato'

  const { user, signOut } = useAuthStore()
  const { toggleDrawer, totalItems } = useCartStore()
  const { setCartIconRef, isBouncing } = useFlyingAnimationStore()
  const navigate = useNavigate()
  const cartButtonRef = useRef<HTMLButtonElement | null>(null)
  const userMenuRef = useRef<HTMLDivElement | null>(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Barra escura enquanto estiver sobre o hero escuro da home; clara no resto
  const [overDark, setOverDark] = useState(variant === 'home')

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('inicio')
      setOverDark(variant === 'home' && !!hero && hero.getBoundingClientRect().bottom > 48)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [variant])

  // Registrar o ref do ícone da sacola na store global para a animação de voo
  useEffect(() => {
    setCartIconRef(cartButtonRef.current)
    return () => setCartIconRef(null)
  }, [setCartIconRef])

  // Fechar dropdown de usuário ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Travar scroll quando o menu mobile estiver aberto
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleSignOut = async () => {
    setUserMenuOpen(false)
    setMobileMenuOpen(false)
    await signOut()
    navigate('/')
  }

  const dark = overDark && !mobileMenuOpen
  const barClass = dark
    ? 'border-white/10 bg-black/70 text-white'
    : 'border-black/5 bg-[#f5f5f7]/80 text-zinc-900'
  const linkClass = 'text-[13px] opacity-80 transition-opacity hover:opacity-100'
  const count = totalItems()

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${barClass}`}>
      <nav className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8" aria-label="Navegação principal">
        <Link to="/" aria-label="Apple Pacces, página inicial" className="flex-none transition-opacity hover:opacity-80">
          <BrandLogo />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {STORE_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <a href={contactHref} className={linkClass}>
            Contato
          </a>
        </div>

        <div className="flex flex-none items-center gap-4">
          {/* Sacola com ref para a animação de voo */}
          <button
            ref={cartButtonRef}
            type="button"
            onClick={toggleDrawer}
            className={`relative opacity-80 transition hover:opacity-100 active:scale-90 ${isBouncing ? 'animate-cart-bounce' : ''}`}
            aria-label="Ver sacola de compras"
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.75} />
            {count > 0 && (
              <span
                className={`absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full text-[10px] font-semibold ${
                  dark ? 'bg-white text-black' : 'bg-zinc-950 text-white'
                }`}
              >
                {count}
              </span>
            )}
          </button>

          {user ? (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="opacity-80 transition hover:opacity-100 active:scale-90"
                aria-label="Minha conta"
              >
                <UserIcon className="size-[18px]" strokeWidth={1.75} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 z-50 mt-3 w-60 max-w-[calc(100vw-2rem)] rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-900 shadow-2xl">
                  <div className="mb-1 border-b border-zinc-100 px-3 py-3">
                    <p className="text-xs text-zinc-500">Conectado como</p>
                    <p className="mt-0.5 truncate text-sm font-semibold">{user.email}</p>
                  </div>
                  <Link
                    to="/pedidos"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                  >
                    <Package className="size-4 text-zinc-500" />
                    Meus pedidos
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="size-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={`${linkClass} hidden sm:inline`}>
              Entrar
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="opacity-80 transition hover:opacity-100 md:hidden"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="h-[calc(100dvh-3rem)] overflow-y-auto border-t border-black/5 px-8 pb-10 pt-6 md:hidden">
          <div className="flex flex-col gap-1">
            {STORE_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-3xl font-semibold tracking-tight text-zinc-900"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={contactHref}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-3xl font-semibold tracking-tight text-zinc-900"
            >
              Contato
            </a>
            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 text-lg font-medium text-[#0066cc]"
              >
                Entrar na sua conta
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
