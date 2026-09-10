import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

type LegalPageProps = {
  title: string
  updatedAt: string
  intro: string
  sections: { title: string; body: ReactNode }[]
}

export function LegalPage({ title, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-950">
      <SiteHeader variant="shop" />
      <main className="px-5 pb-24 pt-28 sm:pt-32 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm text-zinc-500">Atualizado em {updatedAt}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">{intro}</p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
                <div className="mt-3 space-y-3 text-[15px] leading-7 text-zinc-600 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-zinc-900">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
