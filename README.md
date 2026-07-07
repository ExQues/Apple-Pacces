# Apple Pacces

A vitrine digital e catálogo premium para venda consultiva do ecossistema Apple. Focado em uma experiência de usuário de alto nível (UI/UX), curadoria inteligente e design minimalista.

## Tecnologias e Stack

Este projeto foi construído utilizando as melhores práticas do ecossistema front-end moderno:

- **React 18** - Biblioteca de UI
- **Vite** - Bundler ultrarrápido
- **TypeScript** - Tipagem estática para maior segurança do código
- **Tailwind CSS** - Estilização utility-first (com suporte a animações e efeitos de glassmorphism)
- **React Router DOM** - Navegação fluida entre páginas (SPA)
- **Lucide React** - Ícones minimalistas
- **Zustand** - Gerenciamento de estado (preparado para futuras integrações)

## 📁 Estrutura de Diretórios

O projeto segue uma arquitetura baseada em features e componentes:

```text
src/
├── assets/         # Imagens estáticas e recursos visuais
├── components/     # Componentes reutilizáveis de UI
│   ├── CatalogSections.tsx   # Vitrine de produtos e categorias
│   ├── ConversionSections.tsx # Passos de venda, diferenciais e formulário
│   ├── HeroSection.tsx       # Dobra principal da landing page
│   └── SiteHeader.tsx        # Navegação principal global
├── data/           # Mock data para o catálogo de produtos
│   └── appleStore.ts         # Produtos, categorias e textos do site
├── hooks/          # React hooks customizados
├── lib/            # Utilitários gerais (ex: junção de classes tailwind)
└── pages/          # Páginas roteáveis da aplicação
    ├── Home.tsx              # Landing page principal
    └── Shop.tsx              # Catálogo expandido com todos os produtos
```

## Instalação e Execução

Para rodar o projeto localmente, certifique-se de ter o Node.js instalado (versão 18+ recomendada).

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ExQues/Apple-Pacces.git
   cd Apple-Pacces
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Acesse no navegador em `http://localhost:5173`.

## Próximos Passos (Roadmap Backend)

Atualmente o site funciona de forma estática no front-end. O próximo passo lógico da evolução da plataforma inclui:

1. **Integração com Supabase:** Mover os dados locais (`src/data/appleStore.ts`) para um banco de dados PostgreSQL real.
2. **Captação de Leads:** Conectar o formulário de "Solicitar atendimento" a uma tabela de contatos ou a um webhook (ex: envio direto para WhatsApp ou e-mail comercial).
3. **Gerenciamento do Catálogo:** Criação de um painel administrativo (ou integração direta pelo painel do Supabase) para adicionar, remover e alterar o preço dos dispositivos dinamicamente.

---
*Desenvolvido com padrão de curadoria premium.*
