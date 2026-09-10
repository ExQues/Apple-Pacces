import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FeaturedProduct } from '@/data/appleStore'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/useAuthStore'
import { RealtimeChannel } from '@supabase/supabase-js'

export interface CartItem extends FeaturedProduct {
  cartItemId: string
  quantity: number
  selectedColor: string
  selectedStorage?: string
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  isAuthModalOpen: boolean
  isLoadingCart: boolean
  
  openAuthModal: () => void
  closeAuthModal: () => void
  
  addItem: (
    product: FeaturedProduct,
    selectedColor: string,
    selectedStorage?: string,
    customPrice?: string,
    customImage?: string
  ) => boolean
  
  addItemSilently: (
    product: FeaturedProduct,
    selectedColor: string,
    selectedStorage?: string,
    customPrice?: string,
    customImage?: string
  ) => boolean
  
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  totalItems: () => number
  
  syncWithSupabase: (userId: string | null) => Promise<void>
  unsubscribeRealtime: () => void
}

let realtimeChannel: RealtimeChannel | null = null

function addProductToItems(
  items: CartItem[],
  product: FeaturedProduct,
  selectedColor: string,
  selectedStorage?: string,
  customPrice?: string,
  customImage?: string
): { updatedItems: CartItem[]; targetItem: CartItem } {
  const itemPrice = customPrice || product.priceFrom
  const itemImage = customImage || product.image
  const storageLabel = selectedStorage ? ` (${selectedStorage})` : ''
  const itemTitle = `${product.name}${storageLabel}`

  const existingItem = items.find(
    (item) => item.name === itemTitle && item.selectedColor === selectedColor
  )

  if (existingItem) {
    const updatedTarget: CartItem = { ...existingItem, quantity: existingItem.quantity + 1 }
    const updatedItems = items.map((item) =>
      item.cartItemId === existingItem.cartItemId ? updatedTarget : item
    )
    return { updatedItems, targetItem: updatedTarget }
  }

  const newItem: CartItem = {
    ...product,
    name: itemTitle,
    priceFrom: itemPrice,
    image: itemImage,
    cartItemId: crypto.randomUUID(),
    quantity: 1,
    selectedColor,
    selectedStorage,
  }

  return { updatedItems: [...items, newItem], targetItem: newItem }
}

async function saveItemToSupabase(userId: string, item: CartItem) {
  try {
    await supabase.from('cart_items').upsert(
      {
        user_id: userId,
        cart_item_id: item.cartItemId,
        product_name: item.name,
        price_from: item.priceFrom,
        image: item.image,
        quantity: item.quantity,
        selected_color: item.selectedColor,
        selected_storage: item.selectedStorage || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,cart_item_id' }
    )
  } catch (err) {
    console.warn('Erro ao salvar item no Supabase:', err)
  }
}

async function removeItemFromSupabase(userId: string, cartItemId: string) {
  try {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('cart_item_id', cartItemId)
  } catch (err) {
    console.warn('Erro ao remover item do Supabase:', err)
  }
}

async function clearCartInSupabase(userId: string) {
  try {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
  } catch (err) {
    console.warn('Erro ao limpar sacola no Supabase:', err)
  }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      isAuthModalOpen: false,
      isLoadingCart: false,

      openAuthModal: () => set({ isAuthModalOpen: true }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),

      addItem: (product, selectedColor, selectedStorage, customPrice, customImage) => {
        const user = useAuthStore.getState().user
        if (!user) {
          set({ isAuthModalOpen: true })
          return false
        }

        const { updatedItems, targetItem } = addProductToItems(
          get().items,
          product,
          selectedColor,
          selectedStorage,
          customPrice,
          customImage
        )

        set({ items: updatedItems, isDrawerOpen: true })
        saveItemToSupabase(user.id, targetItem)
        return true
      },

      addItemSilently: (product, selectedColor, selectedStorage, customPrice, customImage) => {
        const user = useAuthStore.getState().user
        if (!user) {
          set({ isAuthModalOpen: true })
          return false
        }

        const { updatedItems, targetItem } = addProductToItems(
          get().items,
          product,
          selectedColor,
          selectedStorage,
          customPrice,
          customImage
        )

        set({ items: updatedItems })
        saveItemToSupabase(user.id, targetItem)
        return true
      },

      removeItem: (cartItemId) => {
        const user = useAuthStore.getState().user
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }))

        if (user) {
          removeItemFromSupabase(user.id, cartItemId)
        }
      },

      updateQuantity: (cartItemId, quantity) => {
        const user = useAuthStore.getState().user
        const targetItem = get().items.find((item) => item.cartItemId === cartItemId)

        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        }))

        if (user && targetItem) {
          saveItemToSupabase(user.id, { ...targetItem, quantity })
        }
      },

      clearCart: () => {
        const user = useAuthStore.getState().user
        set({ items: [] })
        if (user) {
          clearCartInSupabase(user.id)
        }
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

      unsubscribeRealtime: () => {
        if (realtimeChannel) {
          supabase.removeChannel(realtimeChannel)
          realtimeChannel = null
        }
      },

      syncWithSupabase: async (userId: string | null) => {
        get().unsubscribeRealtime()

        if (!userId) {
          set({ items: [], isLoadingCart: false })
          return
        }

        set({ isLoadingCart: true })

        try {
          // Buscar itens salvos no Supabase
          const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)

          if (!error && data) {
            const mappedItems: CartItem[] = data.map((dbItem) => ({
              id: dbItem.cart_item_id,
              cartItemId: dbItem.cart_item_id,
              name: dbItem.product_name,
              priceFrom: dbItem.price_from,
              image: dbItem.image,
              quantity: dbItem.quantity,
              selectedColor: dbItem.selected_color,
              selectedStorage: dbItem.selected_storage || undefined,
              category: dbItem.category || 'Apple',
              line: 'Apple',
              description: '',
              colors: [dbItem.selected_color],
              specs: [],
            }))

            set({ items: mappedItems })
          }

          // Subscrever às atualizações em tempo real para sincronizar entre celular e PC
          realtimeChannel = supabase
            .channel(`public:cart_items:user_id=eq.${userId}`)
            .on(
              'postgres_changes',
              {
                event: '*',
                schema: 'public',
                table: 'cart_items',
                filter: `user_id=eq.${userId}`,
              },
              async () => {
                // Atualizar lista de itens quando o banco sofrer alteração em outro dispositivo
                const { data: updatedData } = await supabase
                  .from('cart_items')
                  .select('*')
                  .eq('user_id', userId)

                if (updatedData) {
                  const mappedUpdated: CartItem[] = updatedData.map((dbItem) => ({
                    id: dbItem.cart_item_id,
                    cartItemId: dbItem.cart_item_id,
                    name: dbItem.product_name,
                    priceFrom: dbItem.price_from,
                    image: dbItem.image,
                    quantity: dbItem.quantity,
                    selectedColor: dbItem.selected_color,
                    selectedStorage: dbItem.selected_storage || undefined,
                    category: dbItem.category || 'Apple',
              line: 'Apple',
                    description: '',
                    colors: [dbItem.selected_color],
                    specs: [],
                  }))

                  set({ items: mappedUpdated })
                }
              }
            )
            .subscribe()
        } catch (err) {
          console.warn('Erro ao sincronizar sacola com Supabase:', err)
        } finally {
          set({ isLoadingCart: false })
        }
      },
    }),
    {
      name: 'apple-pacces-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
