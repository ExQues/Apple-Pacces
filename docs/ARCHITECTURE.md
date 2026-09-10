# Arquitetura — Apple Pacces

A loja é um site de página única (SPA) em React, publicado na Netlify. O navegador fala com três serviços: o Supabase (contas, sacola, pedidos e contatos), uma função da Netlify que cria o pagamento na Cakto, e o ViaCEP (endereço pelo CEP).

## Páginas

| Endereço | Página | Acesso | Grava em |
|---|---|---|---|
| `/` | Início: lançamento, pronta entrega, categorias, contato | Público | `leads` |
| `/shop` | Loja com filtros (`?category=`, `?q=`) | Público | — |
| `/login` | Entrar | Público | Supabase Auth |
| `/register` | Criar conta | Público | Auth + `profiles` |
| `/checkout` | Dados, CPF, endereço e pagamento | Com login | `orders`, `order_items` |
| `/pedidos` | Meus pedidos | Com login | leitura |
| `/privacidade` | Política de privacidade | Público | — |
| `/trocas` | Trocas e devoluções | Público | — |
| `*` | Página não encontrada | Público | — |

As páginas de login, cadastro, checkout, pedidos e as páginas legais carregam sob demanda, para a página inicial ficar leve.

## Fluxo de compra

1. O cliente escolhe cor e capacidade e adiciona à sacola (`src/store/useCartStore.ts`). Com login, a sacola sincroniza com a tabela `cart_items`.
2. No checkout, o cliente informa nome, CPF, telefone e endereço. O pedido é gravado como `pending` em `orders`.
3. O navegador envia à função `/.netlify/functions/cakto-checkout` apenas **quais** produtos, capacidades e quantidades foram escolhidos, nunca o valor.
4. A função calcula o total com `netlify/functions/precos.json`, autentica na Cakto com as chaves secretas guardadas nas variáveis da Netlify, cria a oferta e devolve o link de pagamento.
5. O cliente paga na página da Cakto (Pix ou cartão).
6. Se a Cakto falhar, o checkout mostra um erro e mantém a sacola. Não existe mais redirecionamento para oferta de valor fixo.

**Pendente:** o retorno automático da Cakto (webhook) para marcar o pedido como pago. Hoje a confirmação é feita pelo painel da Cakto.

## Dados

- **Catálogo:** `src/data/appleStore.ts` é a fonte única dos produtos, preços, cores e capacidades.
- **Tabela de preços do servidor:** `netlify/functions/precos.json`, gerada por `scripts/gerar-precos.ts` antes de cada build.
- **Supabase:** tabelas `profiles`, `cart_items`, `orders`, `order_items` e `leads`. Cada uma deve ter RLS ativo, com cada cliente acessando apenas as próprias linhas. Em `leads`, só é permitido inserir.

## Segurança

- A chave pública do Supabase fica no navegador por design. A proteção vem das regras de RLS.
- As chaves da Cakto existem apenas na função da Netlify (variáveis `CAKTO_CLIENT_ID` e `CAKTO_CLIENT_SECRET`).
- Os cabeçalhos de segurança ficam no `netlify.toml`: bloqueio de incorporação em outros sites, política de conteúdo, Referrer-Policy e HSTS.
- Os dados de cartão são digitados na Cakto e nunca passam pelo site.

## Decisões de front-end

- **Estado:** Zustand para sacola, login, janela do produto e a animação da sacola.
- **Estilo:** Tailwind com a paleta da marca (Grafite `#0B0B0C`, Névoa `#F5F5F7`, Bordô `#7A2233` só em lançamentos, azul de link `#0066CC`) e a fonte Plus Jakarta Sans.
- **Build:** React, React Router e Supabase ficam em pacotes separados (`vite.config.ts`) para melhor cache entre publicações.
