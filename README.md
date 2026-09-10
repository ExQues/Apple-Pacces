# Apple Pacces

Loja online de iPhone, Mac, iPad, Apple Watch e acessórios lacrados, com garantia Apple de 1 ano e pagamento em até 18x.

- **Site:** https://aple-pacces.netlify.app
- **Hospedagem:** Netlify, publicada automaticamente a cada envio para a branch `main`
- **Arquitetura e fluxo de compra:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Identidade visual:** [docs/brand/](docs/brand/)

## Tecnologias

React 18, TypeScript, Vite, Tailwind CSS, React Router, Zustand (estado da sacola e do login), Supabase (contas e banco de dados), Cakto (pagamento) e Netlify Functions (servidor do pagamento).

## Rodar no computador

Precisa de Node.js 20 ou mais novo.

```bash
npm install
cp .env.example .env   # preencha com as chaves reais
npm run dev            # abre em http://localhost:5173
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a tabela de preços do servidor e o site de produção em `dist/` |
| `npm run precos` | Só regenera `netlify/functions/precos.json` a partir do catálogo |
| `npm test` | Testes automáticos |
| `npm run lint` | Verifica o padrão do código |

## Variáveis de ambiente

Nunca envie o `.env` para o GitHub. Em produção, cadastre as variáveis no painel da Netlify (Site configuration → Environment variables).

| Variável | Onde é usada | Secreta? |
|---|---|---|
| `VITE_SUPABASE_URL` | Navegador | Não (protegida por RLS) |
| `VITE_SUPABASE_ANON_KEY` | Navegador | Não (protegida por RLS) |
| `CAKTO_CLIENT_ID` | Função de pagamento | **Sim** |
| `CAKTO_CLIENT_SECRET` | Função de pagamento | **Sim** |

Variáveis com prefixo `VITE_` vão para o navegador. Nunca coloque uma chave secreta com esse prefixo.

## Catálogo e preços

O catálogo fica em `src/data/appleStore.ts`. A regra de preço é **preço do fornecedor + R$ 500** em todos os produtos, inclusive acessórios. Produtos marcados `status: 'em-falta'` aparecem na loja, mas não podem ser comprados.

Ao mudar um preço, basta editar `appleStore.ts`: o build regenera a tabela usada pelo servidor, que calcula o valor cobrado sem confiar no navegador.

As fotos são oficiais da Apple, recortadas e hospedadas em `public/products/`.

## Estrutura

```text
├── docs/                    Arquitetura e identidade visual
├── netlify/functions/       Servidor do pagamento (Cakto) e tabela de preços
├── public/                  Fotos dos produtos, ícones e imagem de compartilhamento
├── scripts/                 Gerador da tabela de preços
└── src/
    ├── components/          Menu, rodapé, seções da home, sacola, janelas
    ├── data/appleStore.ts   Catálogo, preços, categorias e textos de confiança
    ├── hooks/               useProducts (catálogo)
    ├── lib/                 Supabase e Cakto
    ├── pages/               Início, Loja, Login, Cadastro, Checkout, Pedidos, 404, Privacidade, Trocas
    └── store/               Sacola, login, janela de produto e animação
```
