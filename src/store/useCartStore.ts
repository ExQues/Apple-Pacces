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
  addItemSilently: (product: FeaturedProduct, selectedColor: string) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  totalItems: () => number
}

function addProductToItems(items: CartItem[], product: FeaturedProduct, selectedColor: string): CartItem[] {
  const existingItem = items.find(
    (item) => item.name === product.name && item.selectedColor === selectedColor
  )
  if (existingItem) {
    return items.map((item) =>
      item.cartItemId === existingItem.cartItemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }
  return [
    ...items,
    { ...product, cartItemId: crypto.randomUUID(), quantity: 1, selectedColor },
  ]
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, selectedColor) => {
        set((state) => ({
          items: addProductToItems(state.items, product, selectedColor),
          isDrawerOpen: true,
        }))
      },

      // Adiciona sem abrir o drawer — usado pela flying animation
      addItemSilently: (product, selectedColor) => {
        set((state) => ({
          items: addProductToItems(state.items, product, selectedColor),
        }))
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
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'apple-pacces-cart',
    }
  )
)
