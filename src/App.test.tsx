import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { allProducts } from './data/appleStore'

describe('App', () => {
  it('renderiza a pagina Shop com todos os produtos ao acessar /shop', () => {
    window.history.pushState({}, '', '/shop')

    render(<App />)

    expect(screen.getByRole('heading', { name: /shop apple completo/i })).toBeInTheDocument()
    expect(screen.getByText(/todos os produtos/i)).toBeInTheDocument()
    expect(screen.getByText(/iPhone 17 Pro/i)).toBeInTheDocument()
    expect(screen.getByText(/MacBook Air M3/i)).toBeInTheDocument()
    expect(screen.getByText(/Apple Watch Series 11/i)).toBeInTheDocument()
    expect(screen.getByText(/iPhone Air/i)).toBeInTheDocument()
    expect(screen.getByText(/MacBook Pro 14/i)).toBeInTheDocument()
    expect(screen.getByText(/iPad Air/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /curadoria que reduz arrependimento/i })).toBeInTheDocument()
    expect(screen.getByText(/estoque selecionado por uso real/i)).toBeInTheDocument()
    expect(screen.getByText(/cores disponiveis/i)).toBeInTheDocument()
    expect(screen.getByText(/Laranja cosmico/i)).toBeInTheDocument()
    expect(screen.getByText(/Azul ceu/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar para o inicio/i })).toHaveAttribute('href', '/')
  })

  it('usa fotos reais oficiais da Apple e remove imagens geradas por IA', () => {
    window.history.pushState({}, '', '/shop')

    render(<App />)

    const productImages = allProducts.map((product) => product.image)
    expect(allProducts.length).toBeGreaterThanOrEqual(12)
    expect(productImages.every((src) => src.includes('apple.com'))).toBe(true)
    expect(productImages.every((src) => !src.includes('text_to_image'))).toBe(true)
    expect(productImages.every((src) => !src.includes('images.unsplash'))).toBe(true)
    expect(allProducts.every((product) => product.colors.length >= 2)).toBe(true)

    const renderedImageSources = screen.getAllByRole('img').map((image) => image.getAttribute('src') ?? '')
    expect(renderedImageSources.every((src) => !src.includes('core-normal.traeapi'))).toBe(true)
  })
})
