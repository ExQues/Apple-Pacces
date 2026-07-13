import { create } from 'zustand'

interface FlyingAnimationState {
  // Referência ao ícone da sacola no header (destino da animação)
  cartIconRef: HTMLButtonElement | null
  setCartIconRef: (ref: HTMLButtonElement | null) => void

  // Trigger de animação
  flyingImage: {
    src: string
    startRect: DOMRect
  } | null
  triggerFly: (src: string, startRect: DOMRect) => void
  clearFly: () => void

  // Bounce no ícone da sacola
  isBouncing: boolean
  triggerBounce: () => void
}

export const useFlyingAnimationStore = create<FlyingAnimationState>((set) => ({
  cartIconRef: null,
  setCartIconRef: (ref) => set({ cartIconRef: ref }),

  flyingImage: null,
  triggerFly: (src, startRect) => set({ flyingImage: { src, startRect } }),
  clearFly: () => set({ flyingImage: null }),

  isBouncing: false,
  triggerBounce: () => {
    set({ isBouncing: true })
    setTimeout(() => set({ isBouncing: false }), 500)
  },
}))
