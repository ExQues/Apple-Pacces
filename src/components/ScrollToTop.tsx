import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Distância do topo da seção até a barra fixa do menu (48 px de menu + respiro)
const HEADER_OFFSET = 56

// Ao trocar de página, volta ao topo. Se o endereço tiver uma seção (ex.: /#contato),
// rola suavemente até ela e, depois que as fotos acima terminarem de carregar e
// empurrarem a página, confere e corrige a posição.
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.scrollTo !== 'function') return

    const scroll = (options: ScrollToOptions) => {
      try {
        window.scrollTo(options)
      } catch {
        // Ambiente de teste (jsdom) não implementa scroll
      }
    }

    if (!hash) {
      scroll({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const timers: number[] = []
    const distanceToTarget = () => {
      const section = document.getElementById(id)
      return section ? section.getBoundingClientRect().top - HEADER_OFFSET : null
    }
    const alignTo = (behavior: ScrollBehavior) => {
      const distance = distanceToTarget()
      if (distance === null) return false
      scroll({ top: window.scrollY + distance, behavior })
      return true
    }

    // A seção pode ainda não ter sido desenhada: tenta por até 1 segundo
    let tries = 0
    const start = () => {
      if (!alignTo('smooth') && tries++ < 20) timers.push(window.setTimeout(start, 50))
    }
    start()

    // Correção final, caso imagens tenham mudado a altura da página durante a rolagem
    timers.push(
      window.setTimeout(() => {
        const distance = distanceToTarget()
        if (distance !== null && Math.abs(distance) > 40) alignTo('instant')
      }, 1200),
    )

    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [pathname, hash])

  return null
}
