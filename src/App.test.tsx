import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { allProducts } from './data/appleStore'

describe('App', () => {
  it('renderiza a página da loja com todos os produtos ao acessar /shop', () => {
    window.history.pushState({}, '', '/shop')

    render(<App />)

    expect(screen.getByRole('heading', { name: /^loja\.$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^todos/i })).toBeInTheDocument()
    expect(screen.getByText(/lacrados, com garantia apple de 1 ano/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'iPhone 17 Pro Max' })).toBeInTheDocument()
  })

  it('mantem catalogo consistente sem depender de imagens geradas por IA', () => {
    expect(allProducts.length).toBeGreaterThanOrEqual(15)

    const productImages = allProducts.map((product) => product.image)
    expect(productImages.every((src) => !src.includes('text_to_image'))).toBe(true)
    expect(productImages.every((src) => !src.includes('images.unsplash'))).toBe(true)
    expect(productImages.every((src) => !src.includes('core-normal.traeapi'))).toBe(true)
  })
})
