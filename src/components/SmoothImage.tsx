import { useEffect, useRef, useState, type MutableRefObject } from 'react'
import { preloadProductImage, productImgProps } from '@/lib/images'

type SmoothImageProps = {
  src: string
  alt: string
  sizes: string
  className?: string
  loading?: 'lazy' | 'eager'
  dimmed?: boolean
  imgRef?: MutableRefObject<HTMLImageElement | null>
}

// Foto de produto que aparece com fade ao carregar e, ao trocar de cor, só troca quando a
// nova já estiver pronta: nunca mostra espaço vazio no meio da troca.
export function SmoothImage({ src, alt, sizes, className = '', loading = 'lazy', dimmed = false, imgRef }: SmoothImageProps) {
  const [shown, setShown] = useState(src)
  const [loaded, setLoaded] = useState(false)
  const [fading, setFading] = useState(false)
  const ref = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (src === shown) return
    let cancelled = false
    let timer = 0
    // Espera a foto nova ficar pronta, mas nunca mais que 1,2 s (conexões lentas não travam a troca)
    const ready = Promise.race([preloadProductImage(src, sizes), new Promise<void>((resolve) => window.setTimeout(resolve, 1200))])
    ready.then(() => {
      if (cancelled) return
      setFading(true)
      timer = window.setTimeout(() => {
        if (cancelled) return
        setShown(src)
        setFading(false)
      }, 150)
    })
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [src, shown, sizes])

  // Foto que já estava no cache pode terminar antes do onLoad ser ligado
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [shown])

  const visible = loaded && !fading
  return (
    <img
      ref={(el) => {
        ref.current = el
        if (imgRef) imgRef.current = el
      }}
      {...productImgProps(shown, sizes)}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      className={`transition-opacity duration-300 ease-out ${visible ? (dimmed ? 'opacity-60' : 'opacity-100') : 'opacity-0'} ${className}`}
    />
  )
}
