import { writeFileSync } from 'node:fs'
import { allProducts, categories } from '../src/data/appleStore'
import { productPath } from '../src/lib/slug'

// Gera public/sitemap.xml (páginas que o Google deve conhecer). Roda antes de cada build.
const SITE = 'https://aple-pacces.netlify.app'

const paths = [
  '/',
  '/shop',
  ...categories.map((c) => `/shop?category=${encodeURIComponent(c.name)}`),
  ...allProducts.map((p) => productPath(p.name)),
  '/trocas',
  '/privacidade',
]

const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p.replace(/&/g, '&amp;')}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml gerado com ${paths.length} páginas`)
