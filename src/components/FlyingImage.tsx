import { useEffect, useRef, useState } from 'react'
import { useFlyingAnimationStore } from '@/store/useFlyingAnimationStore'

export function FlyingImage() {
  const { flyingImage, clearFly, cartIconRef, triggerBounce } = useFlyingAnimationStore()
  const ghostRef = useRef<HTMLImageElement | null>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const [phase, setPhase] = useState<'idle' | 'start' | 'fly'>('idle')

  useEffect(() => {
    if (!flyingImage || !cartIconRef) return

    const { src, startRect } = flyingImage
    const targetRect = cartIconRef.getBoundingClientRect()

    // Fase 1: posicionar na origem (sobre a imagem do cartão)
    setStyle({
      position: 'fixed',
      zIndex: 9999,
      top: startRect.top,
      left: startRect.left,
      width: startRect.width,
      height: startRect.height,
      borderRadius: '1rem',
      objectFit: 'contain' as const,
      pointerEvents: 'none',
      opacity: 1,
      transform: 'scale(1)',
      transition: 'none',
      backgroundColor: '#f5f5f7',
      padding: '8px',
    })
    setPhase('start')

    // Fase 2: no próximo frame, animar até o destino
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const dx = targetRect.left + targetRect.width / 2 - (startRect.left + startRect.width / 2)
        const dy = targetRect.top + targetRect.height / 2 - (startRect.top + startRect.height / 2)

        setStyle((prev) => ({
          ...prev,
          transform: `translate(${dx}px, ${dy}px) scale(0.15)`,
          opacity: 0.6,
          borderRadius: '50%',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, border-radius 0.6s ease',
        }))
        setPhase('fly')
      })
    })

    // Fase 3: cleanup após animação
    const timer = setTimeout(() => {
      triggerBounce()
      clearFly()
      setPhase('idle')
    }, 650)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [flyingImage, cartIconRef, clearFly, triggerBounce])

  if (phase === 'idle' || !flyingImage) return null

  return (
    <img
      ref={ghostRef}
      src={flyingImage.src}
      alt=""
      aria-hidden="true"
      style={style}
    />
  )
}
