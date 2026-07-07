# Arquitetura Técnica - Apple Pacces

Este documento descreve as decisões arquiteturais do front-end da plataforma Apple Pacces.

## 1. Visão Geral
A plataforma é uma Single Page Application (SPA) focada em performance e estética premium. O fluxo atual foca na conversão e contato humano (venda consultiva), não havendo um checkout/carrinho tradicional integrado a gatewarys de pagamento no momento.

## 2. Padrões de Projeto

- **Componentização:** 
  A UI é dividida em blocos lógicos (`Hero`, `Catalog`, `Conversion`). Os componentes são construídos para serem burros (dumb components) sempre que possível, recebendo dados através de props ou consumindo o mock de dados global.
- **Roteamento:** 
  Utiliza o padrão declarativo do `react-router-dom`. Rotas centralizadas em `App.tsx` instanciam os componentes de página presentes em `src/pages/`.
- **Estilização (Tailwind CSS):** 
  Estilos definidos inline permitindo iteração rápida. O utilitário `cn` (clsx + tailwind-merge) é utilizado na pasta `lib` para junção condicional de classes de forma segura.

## 3. Entidades de Dados (Mocks)
Até a integração com o banco de dados (Supabase), o domínio é regido por interfaces TypeScript (`src/data/appleStore.ts`):
- `ProductCategory`: Agrupamentos macro (iPhone, Mac, iPad).
- `FeaturedProduct`: Modelo principal contendo `name`, `priceFrom`, `specs`, `colors`, e url de imagem oficial (`image`).
- `TrustItem`: Pontos de conversão e diferenciais do método de venda.

## 4. Integração Futura (Supabase)
O projeto está isolado de forma que a transição para API seja suave:
- Substituiremos a importação estática do `appleStore.ts` por chamadas a um cliente do Supabase.
- Utilização de `useEffect` (ou uma lib como React Query) para carregamento de estado assíncrono (Loading -> Data -> View).
