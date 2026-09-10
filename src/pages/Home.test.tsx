import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('apresenta o lançamento, as categorias, a confiança e o contato comercial', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /iphone 18 pro\.\s*pré-venda aberta/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /reservar meu iphone 18/i })).toHaveAttribute('href', '#contato')
    expect(screen.getByRole('link', { name: /comprar a pronta entrega/i })).toHaveAttribute('href', '/shop?category=iPhone')
    expect(screen.getAllByRole('link', { name: /^reservar$/i })).toHaveLength(2)
    expect(screen.getByRole('link', { name: /^loja$/i })).toHaveAttribute('href', '/shop')

    expect(screen.getAllByText(/iPhone 17 Pro/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /compre por categoria/i })).toBeInTheDocument()
    for (const category of ['iPhone', 'Mac', 'iPad', 'Apple Watch', 'Acessórios']) {
      expect(screen.getByRole('heading', { name: category })).toBeInTheDocument()
    }
    expect(screen.getByText(/garantia e procedência/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /fale com um especialista/i })).toBeInTheDocument()
  })
})
