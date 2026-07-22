import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { allProducts } from './data/appleStore'

describe('App', () => {
  it('renderiza a pagina Shop com todos os produtos ao acessar /shop', () => {
    window.history.pushState({}, '', '/shop')

    render(<App />)

    expect(screen.getByRole('heading', { name: /shopping apple completo/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^todos/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /curadoria que reduz arrependimento/i })).toBeInTheDocument()
    expect(screen.getByText(/estoque selecionado por uso real/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar para o inicio/i })).toHaveAttribute('href', '/')
  })

  it('mantem catalogo consistente sem depender de imagens geradas por IA', () => {
    expect(allProducts.length).toBeGreaterThanOrEqual(15)

    const productImages = allProducts.map((product) => product.image)
    expect(productImages.every((src) => !src.includes('text_to_image'))).toBe(true)
    expect(productImages.every((src) => !src.includes('images.unsplash'))).toBe(true)
    expect(productImages.every((src) => !src.includes('core-normal.traeapi'))).toBe(true)
  })
})

