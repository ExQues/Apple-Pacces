import { writeFileSync } from 'node:fs'
import { allProducts } from '../src/data/appleStore'

// Gera a tabela de preços usada pela função de pagamento (netlify/functions/precos.json).
// O servidor calcula o total a partir desta tabela e ignora qualquer valor vindo do navegador.
// Roda sozinho antes de cada build, então a tabela sempre acompanha o catálogo.

function toNumber(price: string) {
  return Number(price.replace(/\D/g, ''))
}

const table: Record<string, Record<string, number>> = {}

for (const product of allProducts) {
  if (product.status === 'em-falta') continue
  const options = product.storageOptions?.length
    ? product.storageOptions
    : [{ storage: '', priceFrom: product.priceFrom }]
  table[product.name] = Object.fromEntries(options.map((option) => [option.storage, toNumber(option.priceFrom)]))
}

writeFileSync(new URL('../netlify/functions/precos.json', import.meta.url), JSON.stringify(table, null, 2) + '\n')
console.log(`precos.json gerado com ${Object.keys(table).length} produtos`)
