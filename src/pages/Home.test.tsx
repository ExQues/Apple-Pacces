import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('apresenta uma vitrine premium com catálogo, confiança e contato comercial', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', { name: /linha apple para quem exige o melhor/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver produtos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /falar com consultor/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^shop$/i })).toHaveAttribute('href', '/shop')

    expect(screen.getAllByText(/iphone/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/mac/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/ipad/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/apple watch/i).length).toBeGreaterThan(0)

    expect(screen.getByText(/iPhone 17 Pro/i)).toBeInTheDocument()
    expect(screen.getByText(/MacBook Air M3/i)).toBeInTheDocument()
    expect(screen.getByText(/Garantia e procedência/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /escolha inteligente em 3 passos/i })).toBeInTheDocument()
    expect(screen.getByText(/compare perfil, orçamento e ciclo de troca/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /abrir shop completo/i })).toHaveAttribute('href', '/shop')

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/produto de interesse/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /solicitar atendimento/i })).toBeInTheDocument()
  })
})
