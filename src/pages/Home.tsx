import { CatalogSections } from '@/components/CatalogSections'
import { ContactSection, TrustStrip } from '@/components/ConversionSections'
import { HeroSection } from '@/components/HeroSection'
import { SiteFooter } from '@/components/SiteFooter'
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
      <SiteFooter />
    </div>
  )
}
