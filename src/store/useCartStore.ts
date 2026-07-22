import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FeaturedProduct } from '@/data/appleStore'

export interface CartItem extends FeaturedProduct {
  cartItemId: string
  quantity: number
  selectedColor: string
  selectedStorage?: string
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (product: FeaturedProduct, selectedColor: string, selectedStorage?: string, customPrice?: string, customImage?: string) => void
  addItemSilently: (product: FeaturedProduct, selectedColor: string, selectedStorage?: string, customPrice?: string, customImage?: string) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  totalItems: () => number
}

function addProductToItems(
  items: CartItem[],
  product: FeaturedProduct,
  selectedColor: string,
  selectedStorage?: string,
  customPrice?: string,
  customImage?: string
): CartItem[] {
  const itemPrice = customPrice || product.priceFrom
  const itemImage = customImage || product.image
  const storageLabel = selectedStorage ? ` (${selectedStorage})` : ''
  const itemTitle = `${product.name}${storageLabel}`

  const existingItem = items.find(
    (item) => item.name === itemTitle && item.selectedColor === selectedColor
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
    {
      ...product,
      name: itemTitle,
      priceFrom: itemPrice,
      image: itemImage,
      cartItemId: crypto.randomUUID(),
      quantity: 1,
      selectedColor,
      selectedStorage,
    },
  ]
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, selectedColor, selectedStorage, customPrice, customImage) => {
        set((state) => ({
          items: addProductToItems(state.items, product, selectedColor, selectedStorage, customPrice, customImage),
          isDrawerOpen: true,
        }))
      },

      addItemSilently: (product, selectedColor, selectedStorage, customPrice, customImage) => {
        set((state) => ({
          items: addProductToItems(state.items, product, selectedColor, selectedStorage, customPrice, customImage),
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
