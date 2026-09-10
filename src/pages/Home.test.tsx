import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('apresenta uma vitrine premium com catálogo, confiança e contato comercial', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /iphone 17 pro\.\s*chegou/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /comprar iphone 17/i })).toHaveAttribute('href', '/shop?category=iPhone')
    expect(screen.getByRole('link', { name: /falar com consultor/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /shopping/i })).toHaveAttribute('href', '/shop')


    expect(screen.getAllByText(/iphone/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/mac/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/ipad/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/apple watch/i).length).toBeGreaterThan(0)

    expect(screen.getAllByText(/iPhone 17 Pro/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/iPhone 17 Air/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Garantia e proced/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /escolha inteligente em 3 passos/i })).toBeInTheDocument()
    expect(screen.getByText(/compare perfil, orçamento e ciclo de troca/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /abrir shop completo/i })).toHaveAttribute('href', '/shop')
  })
})
