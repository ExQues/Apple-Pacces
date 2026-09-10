import { CatalogSections } from '@/components/CatalogSections'
import { ContactSection, TrustStrip } from '@/components/ConversionSections'
import { HeroSection } from '@/components/HeroSection'
import { SiteHeader } from '@/components/SiteHeader'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-950">
      <SiteHeader />
      <main>
        <HeroSection />
        <CatalogSections />
        <TrustStrip />
        <ContactSection />
      </main>
      <footer className="border-t border-zinc-200 bg-[#f5f5f7] px-5 py-10 text-center text-xs text-zinc-500 lg:px-8">
        <p>Apple Pacces · Produtos Apple lacrados, com garantia oficial de 1 ano.</p>
      </footer>
    </div>
  )
}
