import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FeaturedProduct } from '@/data/appleStore'

export interface CartItem extends FeaturedProduct {
  cartItemId: string
  quantity: number
  selectedColor: string
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (product: FeaturedProduct, selectedColor: string) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  toggleDrawer: () => void
  totalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (product, selectedColor) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.name === product.name && item.selectedColor === selectedColor
          )
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.cartItemId === existingItem.cartItemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isDrawerOpen: true,
            }
          }
          return {
            items: [
              ...state.items,
              { ...product, cartItemId: crypto.randomUUID(), quantity: 1, selectedColor },
            ],
            isDrawerOpen: true,
          }
        })
      },
      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        })),
      updateQuantity: (cartItemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'apple-pacces-cart',
    }
  )
)
