import type { FeaturedProduct } from '@/data/appleStore'

// Ordem de exibição: lançamentos primeiro, produtos em falta sempre por último
const HIGHLIGHT_ORDER = ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Air', 'iPhone 17', 'iPhone 17e']

export function displayRank(product: FeaturedProduct) {
  const highlight = HIGHLIGHT_ORDER.indexOf(product.name)
  return (product.status === 'em-falta' ? 1000 : 0) + (highlight >= 0 ? highlight : 100)
}

export const byDisplayOrder = (a: FeaturedProduct, b: FeaturedProduct) => displayRank(a) - displayRank(b)
