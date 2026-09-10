import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/BrandLogo'

type FooterLink = { label: string; to: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Loja',
    links: [
      { label: 'iPhone', to: '/shop?category=iPhone' },
      { label: 'Mac', to: '/shop?category=Mac' },
      { label: 'iPad', to: '/shop?category=iPad' },
      { label: 'Apple Watch', to: `/shop?category=${encodeURIComponent('Apple Watch')}` },
      { label: 'Acessórios', to: `/shop?category=${encodeURIComponent('Acessórios')}` },
    ],
  },
  {
    title: 'Atendimento',
    links: [
      { label: 'Fale com um especialista', to: '/#contato' },
      { label: 'Reservar iPhone 18 Pro', to: '/#contato' },
    ],
  },
  {
    title: 'Sua conta',
    links: [
      { label: 'Entrar', to: '/login' },
      { label: 'Criar conta', to: '/register' },
      { label: 'Meus pedidos', to: '/pedidos' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-[#f5f5f7] px-5 pb-10 pt-14 text-zinc-600 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo className="text-zinc-900" />
            <p className="mt-4 max-w-xs text-sm leading-6">
              iPhone, Mac, iPad, Apple Watch e acessórios lacrados, com garantia Apple de 1 ano e até 18x no cartão.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold text-zinc-900">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to.includes('#') ? (
                      <a href={link.to} className="text-sm transition hover:text-zinc-900 hover:underline">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="text-sm transition hover:text-zinc-900 hover:underline">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-6 text-xs leading-5 text-zinc-500">
          <p>© {new Date().getFullYear()} Apple Pacces. Todos os direitos reservados.</p>
          <p className="mt-1">
            Apple, iPhone, iPad, Mac, Apple Watch e AirPods são marcas da Apple Inc., registradas nos EUA e em outros países.
            A Apple Pacces é uma revenda independente e não tem vínculo com a Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
