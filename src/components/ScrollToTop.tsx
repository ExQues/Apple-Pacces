import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant',
        })
      }
    } catch {
      // Ignorar ambiente de teste jsdom
    }
  }, [pathname])

  return null
}
