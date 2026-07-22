import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { allProducts, FeaturedProduct } from '@/data/appleStore'

export function useProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>(allProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')

        if (error) {
          console.warn('Usando catálogo local:', error.message)
          return
        }

        if (data && data.length > 0) {
          const formatted: FeaturedProduct[] = data.map((item) => ({
            name: item.name,
            category: item.category,
            line: item.line,
            priceFrom: item.price_from,
            description: item.description,
            specs: item.specs || [],
            colors: item.colors || [],
            image: item.image,
            status: item.status || undefined,
          }))
          setProducts(formatted)
        }
      } catch (err) {
        console.warn('Usando catálogo local:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading }
}
