import { useEffect } from 'react'

const BRAND = 'Apple Pacces'
const DEFAULT_TITLE = `${BRAND} · iPhone e produtos Apple lacrados`

// Título da aba do navegador por página (ex.: "Loja · Apple Pacces"); volta ao padrão ao sair.
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND}` : DEFAULT_TITLE
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}
