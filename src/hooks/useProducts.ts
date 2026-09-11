import { allProducts, type FeaturedProduct } from '@/data/appleStore'

// O catálogo do código (src/data/appleStore.ts) é a única fonte de produtos e preços.
// A tabela `products` do Supabase ficou com dados antigos e não deve substituir o catálogo.
export function useProducts(): { products: FeaturedProduct[]; loading: boolean } {
  return { products: allProducts, loading: false }
}
