export type ProductCategory = {
  name: string
  description: string
  highlight: string
}

export type FeaturedProduct = {
  name: string
  category: string
  line: string
  priceFrom: string
  description: string
  specs: string[]
  colors: string[]
  image: string
  status?: 'em-falta'
}

export type TrustItem = {
  title: string
  description: string
}

// URLs oficiais da CDN Apple testadas e com resposta HTTP 200 OK.
const img = {
  // iPhone
  iphone14: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone15: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16e: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone17: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone17Air: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone17Pro: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone17ProMax: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone17e: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // Apple Watch
  watchSE2: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-se-202309?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  watchSE3: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-se-202309?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  watchSeries11: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s9-202309?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  watchUltra2: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPLL3?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  watchUltra3: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPLL3?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // iPad
  ipadMini7: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-finish-select-gallery-202410-space-gray-wifi?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  ipad11: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  ipadAirM3: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202405-11inch-blue?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  ipadAirM4: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202405-11inch-blue?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  ipadProM5: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-storage-select-202405-13inch-spaceblack?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // Mac
  macMini: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202410?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  macbookNeo: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  macbookAirM4: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  macbookAirM5: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-silver-select-201810?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  macbookProM5: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // AirPods
  airpods4: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-select-202409?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airpods4Anc: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airpodsPro2: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airpodsPro3: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airpodsMax: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-starlight?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // AirTag
  airtag: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-single-select-202104?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airtagPack: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-4pack-select-202104?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // Apple Pencil
  pencilUsbc: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQLU3?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  pencil2: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU8F2?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  pencilPro: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX2D3?wid=1200&hei=1200&fmt=jpeg&qlt=90',
} as const

export const categories: ProductCategory[] = [
  {
    name: 'iPhone',
    description: 'Flagships lacrados com garantia Apple de 1 ano.',
    highlight: 'Cameras Pro, acabamentos premium e alto desempenho',
  },
  {
    name: 'Apple Watch',
    description: 'Saude, treinos, notificacoes e estilo com garantia Apple.',
    highlight: 'Monitoramento avancado e conectividade total',
  },
  {
    name: 'iPad',
    description: 'Mobilidade, leitura, ilustracao e produtividade profissional.',
    highlight: 'Telas Liquid Retina, chips M-series e compatibilidade Pencil',
  },
  {
    name: 'Mac',
    description: 'MacBooks e desktops para trabalho criativo, engenharia e estudos.',
    highlight: 'Chips Apple Silicon M-series e autonomia impressionante',
  },
  {
    name: 'Android',
    description: 'Xiaomi, Redmi e POCO lacrados com excelente custo-beneficio.',
    highlight: 'Bateria longa e desempenho para o dia a dia',
  },
  {
    name: 'Acessorios',
    description: 'AirPods, AirTag e Apple Pencils originais para o seu ecossistema.',
    highlight: 'Audio imersivo, rastreamento de precisao e escrita digital',
  },
]

// Preços finais calculados = Custo da Foto + R$ 800 de margem de lucro.
export const allProducts: FeaturedProduct[] = [
  // iPhone
  {
    name: 'iPhone 14 128GB',
    category: 'iPhone',
    line: 'Smartphone essencial',
    priceFrom: 'R$ 4.099',
    description: 'Modelo consolidado, com desempenho solido e otima camera para o dia a dia.',
    specs: ['128 GB', 'Face ID', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar', 'Roxo'],
    image: img.iphone14,
    status: 'em-falta',
  },
  {
    name: 'iPhone 15 128GB',
    category: 'iPhone',
    line: 'Smartphone atual',
    priceFrom: 'R$ 4.649',
    description: 'USB-C, camera principal de 48 MP e Dynamic Island.',
    specs: ['128 GB', 'USB-C', 'Garantia Apple 1 ano'],
    colors: ['Preto', 'Azul', 'Rosa', 'Amarelo'],
    image: img.iphone15,
  },
  {
    name: 'iPhone 15 256GB',
    category: 'iPhone',
    line: 'Smartphone atual',
    priceFrom: 'R$ 5.099',
    description: 'Mais espaco para fotos, videos e apps sem se preocupar.',
    specs: ['256 GB', 'USB-C', 'Garantia Apple 1 ano'],
    colors: ['Preto', 'Azul', 'Rosa', 'Amarelo'],
    image: img.iphone15,
  },
  {
    name: 'iPhone 16e 128GB',
    category: 'iPhone',
    line: 'Smartphone acessivel',
    priceFrom: 'R$ 4.499',
    description: 'Porta de entrada da linha 16 com bateria longa e desempenho equilibrado.',
    specs: ['128 GB', 'Apple Intelligence', 'Garantia Apple 1 ano'],
    colors: ['Preto', 'Branco'],
    image: img.iphone16e,
  },
  {
    name: 'iPhone 16 128GB',
    category: 'iPhone',
    line: 'Smartphone versatil',
    priceFrom: 'R$ 4.999',
    description: 'Camera dupla Fusion, chip A18 e Apple Intelligence.',
    specs: ['128 GB', 'Chip A18', 'Garantia Apple 1 ano'],
    colors: ['Ultramarino', 'Rosa', 'Preto', 'Verde'],
    image: img.iphone16,
  },
  {
    name: 'iPhone 16 256GB',
    category: 'iPhone',
    line: 'Smartphone versatil',
    priceFrom: 'R$ 5.499',
    description: 'Mais armazenamento para uso pesado e midia local.',
    specs: ['256 GB', 'Chip A18', 'Garantia Apple 1 ano'],
    colors: ['Ultramarino', 'Rosa', 'Preto', 'Verde'],
    image: img.iphone16,
  },
  {
    name: 'iPhone 17e 256GB',
    category: 'iPhone',
    line: 'Smartphone acessivel',
    priceFrom: 'R$ 4.499',
    description: 'Versao acessivel da linha 17 com bom custo-beneficio.',
    specs: ['256 GB', 'Apple Intelligence', 'Garantia Apple 1 ano'],
    colors: ['Preto', 'Branco'],
    image: img.iphone17e,
  },
  {
    name: 'iPhone 17 256GB',
    category: 'iPhone',
    line: 'Smartphone essencial',
    priceFrom: 'R$ 6.099',
    description: 'Modelo equilibrado da nova geracao, com camera moderna e bateria forte.',
    specs: ['256 GB', 'Chip A19', 'Garantia Apple 1 ano'],
    colors: ['Lavanda', 'Preto', 'Branco'],
    image: img.iphone17,
  },
  {
    name: 'iPhone 17 Air 256GB',
    category: 'iPhone',
    line: 'Smartphone ultrafino',
    priceFrom: 'R$ 6.099',
    description: 'Perfil extremamente fino, acabamento leve e camera Fusion.',
    specs: ['256 GB', 'Design ultrafino', 'Garantia Apple 1 ano'],
    colors: ['Azul ceu', 'Dourado claro', 'Preto espacial'],
    image: img.iphone17Air,
  },
  {
    name: 'iPhone 17 Air 512GB',
    category: 'iPhone',
    line: 'Smartphone ultrafino',
    priceFrom: 'R$ 7.499',
    description: 'iPhone Air com armazenamento maior para uso profissional.',
    specs: ['512 GB', 'Design ultrafino', 'Garantia Apple 1 ano'],
    colors: ['Azul ceu', 'Dourado claro', 'Preto espacial'],
    image: img.iphone17Air,
  },
  {
    name: 'iPhone 17 Pro 256GB',
    category: 'iPhone',
    line: 'Smartphone Pro',
    priceFrom: 'R$ 7.499',
    description: 'Design Pro, camera avancada e performance para anos de uso.',
    specs: ['256 GB', 'Tela Pro', 'Garantia Apple 1 ano'],
    colors: ['Laranja cosmico', 'Prata', 'Azul profundo'],
    image: img.iphone17Pro,
  },
  {
    name: 'iPhone 17 Pro 512GB',
    category: 'iPhone',
    line: 'Smartphone Pro',
    priceFrom: 'R$ 8.899',
    description: '17 Pro com armazenamento amplo para criacao e trabalho profissional.',
    specs: ['512 GB', 'Tela Pro', 'Garantia Apple 1 ano'],
    colors: ['Laranja cosmico', 'Prata', 'Azul profundo'],
    image: img.iphone17Pro,
  },
  {
    name: 'iPhone 17 Pro Max 256GB',
    category: 'iPhone',
    line: 'Smartphone Pro Max',
    priceFrom: 'R$ 7.949',
    description: 'A maior tela Pro e a maior bateria da linha.',
    specs: ['256 GB', 'Tela Pro Max', 'Garantia Apple 1 ano'],
    colors: ['Laranja cosmico', 'Prata', 'Azul profundo'],
    image: img.iphone17ProMax,
  },
  {
    name: 'iPhone 17 Pro Max 512GB',
    category: 'iPhone',
    line: 'Smartphone Pro Max',
    priceFrom: 'R$ 9.599',
    description: '17 Pro Max com espaco para quem edita e produz no telefone.',
    specs: ['512 GB', 'Tela Pro Max', 'Garantia Apple 1 ano'],
    colors: ['Laranja cosmico', 'Prata', 'Azul profundo'],
    image: img.iphone17ProMax,
  },
  {
    name: 'iPhone 17 Pro Max 1TB',
    category: 'iPhone',
    line: 'Smartphone Pro Max',
    priceFrom: 'R$ 11.299',
    description: 'A configuracao maxima do iPhone: 1 TB para nao ter limites.',
    specs: ['1 TB', 'Tela Pro Max', 'Garantia Apple 1 ano'],
    colors: ['Laranja cosmico', 'Prata', 'Azul profundo'],
    image: img.iphone17ProMax,
  },

  // Apple Watch
  {
    name: 'Apple Watch SE 2 40mm',
    category: 'Apple Watch',
    line: 'Relogio essencial',
    priceFrom: 'R$ 2.199',
    description: 'Entrada no Watch com recursos essenciais de saude e treino.',
    specs: ['40 mm', 'GPS', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar'],
    image: img.watchSE2,
  },
  {
    name: 'Apple Watch SE 2 44mm',
    category: 'Apple Watch',
    line: 'Relogio essencial',
    priceFrom: 'R$ 2.299',
    description: 'Versao maior do SE 2 com melhor visualizacao das notificacoes.',
    specs: ['44 mm', 'GPS', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar'],
    image: img.watchSE2,
  },
  {
    name: 'Apple Watch SE 3 40mm',
    category: 'Apple Watch',
    line: 'Relogio essencial',
    priceFrom: 'R$ 2.599',
    description: 'Nova geracao do SE com desempenho aprimorado.',
    specs: ['40 mm', 'GPS', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar'],
    image: img.watchSE3,
  },
  {
    name: 'Apple Watch SE 3 44mm',
    category: 'Apple Watch',
    line: 'Relogio essencial',
    priceFrom: 'R$ 2.649',
    description: 'SE 3 em tamanho maior, ideal para pulsos maiores e leitura confortavel.',
    specs: ['44 mm', 'GPS', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar'],
    image: img.watchSE3,
  },
  {
    name: 'Apple Watch Series 11 42mm',
    category: 'Apple Watch',
    line: 'Relogio inteligente',
    priceFrom: 'R$ 3.149',
    description: 'Tela ampla, monitoramento avancado e acabamento refinado.',
    specs: ['42 mm', 'GPS', 'Garantia Apple 1 ano'],
    colors: ['Rose Gold', 'Prateado', 'Jet Black'],
    image: img.watchSeries11,
  },
  {
    name: 'Apple Watch Series 11 46mm',
    category: 'Apple Watch',
    line: 'Relogio inteligente',
    priceFrom: 'R$ 3.299',
    description: 'Series 11 em versao maior para maxima visualizacao.',
    specs: ['46 mm', 'GPS', 'Garantia Apple 1 ano'],
    colors: ['Rose Gold', 'Prateado', 'Jet Black'],
    image: img.watchSeries11,
  },
  {
    name: 'Apple Watch Ultra 2 49mm',
    category: 'Apple Watch',
    line: 'Relogio aventureiro',
    priceFrom: 'R$ 4.799',
    description: 'Titanio, bateria longa e construcao para esporte e aventura.',
    specs: ['49 mm', 'GPS + Cellular', 'Titanio natural'],
    colors: ['Titanio natural'],
    image: img.watchUltra2,
  },
  {
    name: 'Apple Watch Ultra 3 49mm',
    category: 'Apple Watch',
    line: 'Relogio aventureiro',
    priceFrom: 'R$ 5.649',
    description: 'A geracao mais robusta do Watch, para trilha, mergulho e treino pesado.',
    specs: ['49 mm', 'GPS + Cellular', 'Titanio'],
    colors: ['Titanio natural', 'Titanio preto'],
    image: img.watchUltra3,
  },

  // iPad
  {
    name: 'iPad mini 7 128GB',
    category: 'iPad',
    line: 'Tablet compacto',
    priceFrom: 'R$ 3.599',
    description: 'Pequeno, leve e poderoso para leitura, anotacoes e mobilidade total.',
    specs: ['128 GB', '8.3 polegadas', 'Wi-Fi'],
    colors: ['Roxo', 'Azul', 'Cinza espacial'],
    image: img.ipadMini7,
  },
  {
    name: 'iPad 11 128GB',
    category: 'iPad',
    line: 'Tablet essencial',
    priceFrom: 'R$ 3.499',
    description: 'Tablet moderno para estudo, streaming e uso diario.',
    specs: ['128 GB', 'Wi-Fi', 'USB-C'],
    colors: ['Prateado', 'Amarelo', 'Rosa', 'Azul'],
    image: img.ipad11,
  },
  {
    name: 'iPad Air M3 128GB',
    category: 'iPad',
    line: 'Tablet leve',
    priceFrom: 'R$ 4.399',
    description: 'Equilibrio entre potencia, portabilidade e custo, com chip M3.',
    specs: ['128 GB', 'Chip M3', 'Wi-Fi'],
    colors: ['Azul', 'Roxo', 'Estelar', 'Cinza espacial'],
    image: img.ipadAirM3,
  },
  {
    name: 'iPad Air M4 128GB',
    category: 'iPad',
    line: 'Tablet leve',
    priceFrom: 'R$ 5.249',
    description: 'Nova geracao do Air com chip M4 e desempenho ainda maior.',
    specs: ['128 GB', 'Chip M4', 'Wi-Fi'],
    colors: ['Azul', 'Roxo', 'Estelar', 'Cinza espacial'],
    image: img.ipadAirM4,
  },
  {
    name: 'iPad Pro M5 256GB',
    category: 'iPad',
    line: 'Tablet profissional',
    priceFrom: 'R$ 7.299',
    description: 'Tela incrivel, chip M5 e versatilidade para criar em movimento.',
    specs: ['256 GB', 'Chip M5', 'Compativel com Pencil Pro'],
    colors: ['Preto espacial', 'Prateado'],
    image: img.ipadProM5,
  },

  // Mac
  {
    name: 'Mac mini M4 256GB',
    category: 'Mac',
    line: 'Desktop compacto',
    priceFrom: 'R$ 5.699',
    description: 'Setup minimalista para mesa fixa, estudio e produtividade intensa.',
    specs: ['256 GB', 'Chip M4', 'Compacto'],
    colors: ['Prateado'],
    image: img.macMini,
  },
  {
    name: 'MacBook Neo 256GB',
    category: 'Mac',
    line: 'Notebook essencial',
    priceFrom: 'R$ 5.499',
    description: 'Notebook Apple com custo acessivel para estudo e trabalho leve.',
    specs: ['256 GB', 'Tela Retina', 'Bateria longa'],
    colors: ['Prateado', 'Estelar'],
    image: img.macbookNeo,
  },
  {
    name: 'MacBook Air M4 13" 256GB',
    category: 'Mac',
    line: 'Notebook ultrafino',
    priceFrom: 'R$ 7.599',
    description: 'Leve, silencioso e preparado para estudo, negocios e criacao diaria.',
    specs: ['256 GB', 'Chip M4', 'Tela Liquid Retina'],
    colors: ['Meia-noite', 'Estelar', 'Prateado'],
    image: img.macbookAirM4,
  },
  {
    name: 'MacBook Air M5 13" 512GB',
    category: 'Mac',
    line: 'Notebook ultrafino',
    priceFrom: 'R$ 8.499',
    description: 'Versao mais nova do Air, agora com M5 e mais armazenamento.',
    specs: ['512 GB', 'Chip M5', 'Tela Liquid Retina'],
    colors: ['Meia-noite', 'Estelar', 'Prateado'],
    image: img.macbookAirM5,
  },
  {
    name: 'MacBook Pro M5 14" 512GB',
    category: 'Mac',
    line: 'Notebook profissional',
    priceFrom: 'R$ 12.299',
    description: 'Potencia para edicao, desenvolvimento, design e trabalho pesado.',
    specs: ['512 GB', 'Chip M5', 'Tela XDR 14"'],
    colors: ['Preto espacial', 'Prateado'],
    image: img.macbookProM5,
  },

  // AirPods
  {
    name: 'AirPods 4',
    category: 'Acessorios',
    line: 'Audio diario',
    priceFrom: 'R$ 1.649',
    description: 'Fones leves para chamadas, musica e uso continuo no ecossistema Apple.',
    specs: ['USB-C', 'Som espacial', 'Estojo compacto'],
    colors: ['Branco'],
    image: img.airpods4,
  },
  {
    name: 'AirPods 4 com Cancelamento de Ruido',
    category: 'Acessorios',
    line: 'Audio diario',
    priceFrom: 'R$ 2.099',
    description: 'Versao com cancelamento ativo de ruido para foco em ambientes ruidosos.',
    specs: ['USB-C', 'ANC', 'Som espacial'],
    colors: ['Branco'],
    image: img.airpods4Anc,
  },
  {
    name: 'AirPods Pro 2',
    category: 'Acessorios',
    line: 'Audio premium',
    priceFrom: 'R$ 2.149',
    description: 'ANC avancado, transparencia adaptativa e ajuste in-ear confortavel.',
    specs: ['USB-C', 'ANC', 'Audio espacial'],
    colors: ['Branco'],
    image: img.airpodsPro2,
  },
  {
    name: 'AirPods Pro 3',
    category: 'Acessorios',
    line: 'Audio premium',
    priceFrom: 'R$ 2.399',
    description: 'Nova geracao do Pro com melhorias em ANC, som e bateria.',
    specs: ['USB-C', 'ANC aprimorado', 'Audio espacial'],
    colors: ['Branco'],
    image: img.airpodsPro3,
  },
  {
    name: 'AirPods Max',
    category: 'Acessorios',
    line: 'Audio premium',
    priceFrom: 'R$ 4.099',
    description: 'Audio de alta fidelidade, cancelamento de ruido e acabamento premium.',
    specs: ['USB-C', 'ANC adaptativo', 'Audio espacial'],
    colors: ['Stardust', 'Azul', 'Laranja'],
    image: img.airpodsMax,
  },

  // AirTag
  {
    name: 'AirTag Unitario',
    category: 'Acessorios',
    line: 'Rastreio',
    priceFrom: 'R$ 1.049',
    description: 'Rastreador Apple para chaves, bolsas e itens do dia a dia.',
    specs: ['Rede Buscar', 'Bateria substituivel', 'Precise Finding'],
    colors: ['Branco'],
    image: img.airtag,
  },
  {
    name: 'AirTag Pack com 4 Unidades',
    category: 'Acessorios',
    line: 'Rastreio',
    priceFrom: 'R$ 1.599',
    description: 'Kit com 4 AirTags para toda a familia ou multiplos itens.',
    specs: ['Rede Buscar', 'Bateria substituivel', '4 unidades'],
    colors: ['Branco'],
    image: img.airtagPack,
  },

  // Apple Pencil
  {
    name: 'Apple Pencil USB-C',
    category: 'Acessorios',
    line: 'Escrita digital',
    priceFrom: 'R$ 1.449',
    description: 'Caneta essencial para anotacoes, marcacoes e desenhos no iPad.',
    specs: ['USB-C', 'Compativel com iPad recentes', 'Baixa latencia'],
    colors: ['Branco'],
    image: img.pencilUsbc,
  },
  {
    name: 'Apple Pencil 2',
    category: 'Acessorios',
    line: 'Escrita digital',
    priceFrom: 'R$ 1.399',
    description: 'Pareamento e recarga magnetica, ideal para produtividade e criacao.',
    specs: ['Carregamento magnetico', 'Sensibilidade a inclinacao', 'Toque duplo'],
    colors: ['Branco'],
    image: img.pencil2,
  },
  {
    name: 'Apple Pencil Pro',
    category: 'Acessorios',
    line: 'Escrita digital',
    priceFrom: 'R$ 1.699',
    description: 'Modelo mais avancado com aperto, giroscopio e resposta haptica.',
    specs: ['Squeeze', 'Barrel roll', 'Haptic feedback'],
    colors: ['Branco'],
    image: img.pencilPro,
  },
]

export const featuredProducts: FeaturedProduct[] = [
  allProducts.find((p) => p.name.startsWith('iPhone 17 Pro Max 256GB'))!,
  allProducts.find((p) => p.name.startsWith('MacBook Air M4'))!,
  allProducts.find((p) => p.name.startsWith('Apple Watch Series 11 46mm'))!,
]

export const trustItems: TrustItem[] = [
  {
    title: 'Garantia e procedencia',
    description: 'Produtos lacrados com garantia oficial Apple de 1 ano.',
  },
  {
    title: 'Compra assistida',
    description: 'Um consultor ajuda a escolher o modelo ideal para seu uso e orcamento.',
  },
  {
    title: 'Condicoes flexiveis',
    description: 'Pagamento em ate 18x no cartao de credito com taxas reduzidas.',
  },
  {
    title: 'Entrega segura',
    description: 'Processo organizado para receber seu dispositivo com total tranquilidade.',
  },
]
