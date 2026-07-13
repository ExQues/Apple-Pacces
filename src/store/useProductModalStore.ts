import { create } from 'zustand'
import { FeaturedProduct } from '@/data/appleStore'

interface ProductModalState {
  product: FeaturedProduct | null
  isOpen: boolean
  open: (product: FeaturedProduct) => void
  close: () => void
}

export const useProductModalStore = create<ProductModalState>((set) => ({
  product: null,
  isOpen: false,
  open: (product) => set({ product, isOpen: true }),
  close: () => set({ isOpen: false }),
}))
