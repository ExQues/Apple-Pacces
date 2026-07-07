import { ArrowUpRight, BadgeCheck, Clock3, PackageCheck, SlidersHorizontal } from 'lucide-react'
import { SiteHeader } from '@/components/SiteHeader'
import { allProducts, categories } from '@/data/appleStore'

export default function Shop() {
  return (
    <div className="min-h-screen bg-[#f8f8f6] text-zinc-950">
      <SiteHeader variant="shop" />
      <main className="px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm">
                <SlidersHorizontal className="size-4 text-sky-600" aria-hidden="true" />
                Todos os produtos
              </p>
              <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-zinc-950 sm:text-6xl">
                Shop Apple completo.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                Uma prateleira digital limpa para comparar iPhone, Mac, iPad, Apple Watch e acessorios com foco em disponibilidade, valor e recomendacao comercial.
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Cores disponiveis por produto</p>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-xl">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <a key={category.name} href={`#${category.name.toLowerCase().replace(' ', '-')}`} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-950 hover:text-white">
                    {category.name}
                  </a>
                ))}
                <a href="#acessorios" className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-950 hover:text-white">
                  Acessorios
                </a>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-6 text-center">
                <div>
                  <p className="text-2xl font-semibold tracking-tight">{allProducts.length}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">itens</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight">5</p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">linhas</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight">24h</p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">retorno</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl" aria-labelledby="shop-curation-title">
          <div className="grid gap-5 rounded-[2.5rem] border border-zinc-200 bg-white p-5 shadow-[0_24px_70px_rgba(24,24,27,0.10)] lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div className="rounded-[2rem] bg-zinc-950 p-8 text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100">
                <BadgeCheck className="size-4" aria-hidden="true" />
                Compra premium, menos dúvida
              </p>
              <h2 id="shop-curation-title" className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-[-0.045em]">
                Curadoria que reduz arrependimento.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
                Estoque selecionado por uso real, com orientação sobre memória, geração, garantia, acessórios e momento ideal de upgrade.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ['Modelos revisados', 'Produtos apresentados com configuração e indicação de uso claras.', PackageCheck],
                ['Resposta em até 24h', 'Consultoria rápida para comparar alternativas antes de fechar.', Clock3],
              ].map(([title, description, Icon]) => (
                <article key={title as string} className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-6">
                  <Icon className="size-6 text-sky-600" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{description as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl" aria-label="Lista completa de produtos Apple">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {allProducts.map((product) => (
              <article key={product.name} id={product.category.toLowerCase().replace(' ', '-')} className="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative overflow-hidden bg-zinc-100">
                  <div className="flex h-72 items-center justify-center bg-[#f5f5f7] p-8">
                    <img src={product.image} alt={`Imagem oficial do ${product.name}`} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" />
                  </div>
                  <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur">
                    {product.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">{product.line}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">{product.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{product.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.specs.map((spec) => (
                      <span key={spec} className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Acabamentos</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <span key={color} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-7 flex items-center justify-between border-t border-zinc-100 pt-5">
                    <p className="font-semibold text-zinc-950">{product.priceFrom}</p>
                    <a href="/#contato" className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition hover:text-sky-900">
                      Consultar
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-16 flex max-w-7xl justify-center">
          <a href="/" className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:text-zinc-950 hover:shadow-xl">
            Voltar para o inicio
          </a>
        </div>
      </main>
    </div>
  )
}
