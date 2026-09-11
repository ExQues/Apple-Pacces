import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { allProducts } from '@/data/appleStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore, type CartItem } from '@/store/useCartStore'
import { useProductModalStore } from '@/store/useProductModalStore'
import Checkout from '@/pages/Checkout'
import Orders from '@/pages/Orders'
import Shop from '@/pages/Shop'

// Página só de desenvolvimento (não entra no build de produção): abre a sacola, a janela
// do produto, o checkout e os pedidos com dados de exemplo para revisar o visual.
const pro = allProducts.find((p) => p.name === 'iPhone 17 Pro')!
const air = allProducts.find((p) => p.name === 'iPhone 17 Air')!

const SAMPLE_ITEMS: CartItem[] = [
  {
    ...pro,
    name: 'iPhone 17 Pro (256 GB)',
    priceFrom: 'R$ 7.299',
    cartItemId: 'preview-1',
    quantity: 1,
    selectedColor: 'Laranja Cósmico',
    selectedStorage: '256 GB',
  },
  {
    ...air,
    name: 'iPhone 17 Air (256 GB)',
    priceFrom: 'R$ 5.899',
    cartItemId: 'preview-2',
    quantity: 1,
    selectedColor: 'Azul-céu',
    selectedStorage: '256 GB',
  },
]

const SAMPLE_USER = {
  id: 'preview',
  email: 'cliente@exemplo.com',
  user_metadata: { name: 'Cliente Exemplo' },
} as unknown as User

export default function DevPreview() {
  const [params] = useSearchParams()
  const view = params.get('view') ?? 'modal'

  useEffect(() => {
    if (view === 'orders') {
      // O login real inicia vazio; reaplica o cliente de exemplo nos primeiros segundos
      const id = setInterval(() => useAuthStore.setState({ user: SAMPLE_USER }), 300)
      const stop = setTimeout(() => clearInterval(id), 3000)
      return () => {
        clearInterval(id)
        clearTimeout(stop)
      }
    }
    useCartStore.setState({ items: SAMPLE_ITEMS, isDrawerOpen: view === 'cart' })
    if (view === 'modal') useProductModalStore.getState().open(pro)
  }, [view])

  if (view === 'checkout') return <Checkout />
  if (view === 'orders') return <Orders />
  return <Shop />
}
