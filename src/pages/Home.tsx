import { CatalogSections } from '@/components/CatalogSections'
import { ContactSection, SmartChoiceSection, TrustAndConsulting } from '@/components/ConversionSections'
import { HeroSection } from '@/components/HeroSection'
import { SiteHeader } from '@/components/SiteHeader'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f8f6] text-zinc-950">
      <SiteHeader />
      <main>
        <HeroSection />
        <CatalogSections />
        <SmartChoiceSection />
        <TrustAndConsulting />
        <ContactSection />
      </main>
      <footer className="border-t border-zinc-200 px-5 py-10 text-center text-sm text-zinc-500 lg:px-8">
        <p>Apple Pacces. Curadoria premium para tecnologia Apple.</p>
      </footer>
    </div>
  )
}
