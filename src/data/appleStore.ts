export type ProductCategory = {
  name: string
  description: string
  highlight: string
}

export type StorageOption = {
  storage: string
  priceFrom: string
}

export type ColorOption = {
  name: string
  image: string
  hex?: string
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
  storageOptions?: StorageOption[]
  colorOptions?: ColorOption[]
}

export type TrustItem = {
  title: string
  description: string
}

// URLs oficiais da CDN Apple testadas e com resposta HTTP 200 OK.
const img = {
  // iPhone
  iphone14_midnight: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone15_black: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone15_blue: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone15_pink: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone15_yellow: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-yellow?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  iphone16_ultramarine: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16_teal: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16_pink: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16_white: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16_black: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  iphone16pro_desert: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16pro_natural: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16pro_black: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16pro_white: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  iphone16promax_desert: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // Apple Watch
  watch_se: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-se-202309?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  watch_series: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s9-202309?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  watch_ultra: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra2-digitalmat-gallery-1-202309?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // iPad
  ipad_mini: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-finish-select-gallery-202410-space-gray-wifi?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  ipad_10: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  ipad_air: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202405-11inch-blue?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  ipad_pro: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-storage-select-202405-13inch-spaceblack?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // Mac
  mac_mini: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202410?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  macbook_air_spacegray: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  macbook_air_silver: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-silver-select-201810?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  macbook_pro: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=1200&hei=1200&fmt=jpeg&qlt=90',

  // AirPods & AirTag & Pencil
  airpods4: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-select-202409?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airpods4anc: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airpodspro: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airpodsmax: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-starlight?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airtag: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-single-select-202104?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  airtag4pack: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-4pack-select-202104?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  pencil_usbc: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQLU3?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  pencil_2: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU8F2?wid=1200&hei=1200&fmt=jpeg&qlt=90',
  pencil_pro: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX2D3?wid=1200&hei=1200&fmt=jpeg&qlt=90',
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

// Produtos agrupados por Modelo com Seletores Dinâmicos de Armazenamento e Cores.
export const allProducts: FeaturedProduct[] = [
  // --- LINE IPHONE ---
  {
    name: 'iPhone 14',
    category: 'iPhone',
    line: 'Smartphone essencial',
    priceFrom: 'R$ 4.099',
    description: 'Modelo consolidado com bom desempenho e otimas fotos.',
    specs: ['Face ID', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar', 'Roxo'],
    image: img.iphone14_midnight,
    status: 'em-falta',
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 4.099' },
    ],
    colorOptions: [
      { name: 'Meia-noite', image: img.iphone14_midnight, hex: '#1c232e' },
      { name: 'Estelar', image: img.iphone14_midnight, hex: '#faf7f2' },
      { name: 'Roxo', image: img.iphone14_midnight, hex: '#e3d5e8' },
    ],
  },
  {
    name: 'iPhone 15',
    category: 'iPhone',
    line: 'Smartphone atual',
    priceFrom: 'R$ 4.649',
    description: 'Dynamic Island, camera de 48 MP e conector USB-C universal.',
    specs: ['USB-C', 'Dynamic Island', 'Camera 48 MP', 'Garantia Apple 1 ano'],
    colors: ['Preto', 'Azul', 'Rosa', 'Amarelo'],
    image: img.iphone15_black,
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 4.649' },
      { storage: '256 GB', priceFrom: 'R$ 5.099' },
    ],
    colorOptions: [
      { name: 'Preto', image: img.iphone15_black, hex: '#35393b' },
      { name: 'Azul', image: img.iphone15_blue, hex: '#d3e0ea' },
      { name: 'Rosa', image: img.iphone15_pink, hex: '#fce2e6' },
      { name: 'Amarelo', image: img.iphone15_yellow, hex: '#fbf0cb' },
    ],
  },
  {
    name: 'iPhone 16e',
    category: 'iPhone',
    line: 'Smartphone acessivel',
    priceFrom: 'R$ 4.499',
    description: 'Porta de entrada da linha 16 com bateria longa e desempenho otimizado.',
    specs: ['128 GB', 'Apple Intelligence', 'Garantia Apple 1 ano'],
    colors: ['Preto', 'Branco'],
    image: img.iphone16_black,
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 4.499' },
    ],
    colorOptions: [
      { name: 'Preto', image: img.iphone16_black, hex: '#222528' },
      { name: 'Branco', image: img.iphone16_white, hex: '#f4f4f6' },
    ],
  },
  {
    name: 'iPhone 16',
    category: 'iPhone',
    line: 'Smartphone versatil',
    priceFrom: 'R$ 4.999',
    description: 'Camera dupla Fusion, chip A18, Controle da Camera e Apple Intelligence.',
    specs: ['Chip A18', 'Controle da Camera', 'Garantia Apple 1 ano'],
    colors: ['Ultramarino', 'Teal', 'Rosa', 'Branco', 'Preto'],
    image: img.iphone16_ultramarine,
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 4.999' },
      { storage: '256 GB', priceFrom: 'R$ 5.499' },
    ],
    colorOptions: [
      { name: 'Ultramarino', image: img.iphone16_ultramarine, hex: '#48639c' },
      { name: 'Teal', image: img.iphone16_teal, hex: '#77ab9d' },
      { name: 'Rosa', image: img.iphone16_pink, hex: '#e9b5c2' },
      { name: 'Branco', image: img.iphone16_white, hex: '#f3f4f6' },
      { name: 'Preto', image: img.iphone16_black, hex: '#232528' },
    ],
  },
  {
    name: 'iPhone 17',
    category: 'iPhone',
    line: 'Smartphone essencial',
    priceFrom: 'R$ 6.099',
    description: 'Modelo equilibrado da nova geracao, com camera moderna e bateria forte.',
    specs: ['256 GB', 'Chip A19', 'Garantia Apple 1 ano'],
    colors: ['Teal', 'Preto', 'Branco'],
    image: img.iphone16_teal,
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 6.099' },
    ],
    colorOptions: [
      { name: 'Teal', image: img.iphone16_teal, hex: '#77ab9d' },
      { name: 'Preto', image: img.iphone16_black, hex: '#232528' },
      { name: 'Branco', image: img.iphone16_white, hex: '#f3f4f6' },
    ],
  },
  {
    name: 'iPhone 17 Air',
    category: 'iPhone',
    line: 'Smartphone ultrafino',
    priceFrom: 'R$ 6.099',
    description: 'Perfil extremamente fino, acabamento leve de luxo e camera Fusion.',
    specs: ['Design ultrafino', 'Titanio leve', 'Garantia Apple 1 ano'],
    colors: ['Branco', 'Preto'],
    image: img.iphone16_white,
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 6.099' },
      { storage: '512 GB', priceFrom: 'R$ 7.499' },
    ],
    colorOptions: [
      { name: 'Branco', image: img.iphone16_white, hex: '#f4f4f6' },
      { name: 'Preto', image: img.iphone16_black, hex: '#232528' },
    ],
  },
  {
    name: 'iPhone 17 Pro',
    category: 'iPhone',
    line: 'Smartphone Pro',
    priceFrom: 'R$ 7.499',
    description: 'Titanio Pro, telas com tecnologia ProMotion 120Hz e cameras triple de cinema.',
    specs: ['Chip A19 Pro', 'ProMotion 120Hz', 'Garantia Apple 1 ano'],
    colors: ['Titanio Deserto', 'Titanio Natural', 'Titanio Preto', 'Titanio Branco'],
    image: img.iphone16pro_desert,
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 7.499' },
      { storage: '512 GB', priceFrom: 'R$ 8.899' },
    ],
    colorOptions: [
      { name: 'Titanio Deserto', image: img.iphone16pro_desert, hex: '#c5b49e' },
      { name: 'Titanio Natural', image: img.iphone16pro_natural, hex: '#9d9893' },
      { name: 'Titanio Preto', image: img.iphone16pro_black, hex: '#373739' },
      { name: 'Titanio Branco', image: img.iphone16pro_white, hex: '#f0f0f2' },
    ],
  },
  {
    name: 'iPhone 17 Pro Max',
    category: 'iPhone',
    line: 'Smartphone Pro Max',
    priceFrom: 'R$ 7.949',
    description: 'A maior tela Pro Super Retina XDR, autonomia insana e zoom periscopico.',
    specs: ['Tela Pro Max 6.9"', 'Bateria estendida', 'Garantia Apple 1 ano'],
    colors: ['Titanio Deserto', 'Titanio Natural', 'Titanio Preto', 'Titanio Branco'],
    image: img.iphone16promax_desert,
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 7.949' },
      { storage: '512 GB', priceFrom: 'R$ 9.599' },
      { storage: '1 TB', priceFrom: 'R$ 11.299' },
    ],
    colorOptions: [
      { name: 'Titanio Deserto', image: img.iphone16promax_desert, hex: '#c5b49e' },
      { name: 'Titanio Natural', image: img.iphone16pro_natural, hex: '#9d9893' },
      { name: 'Titanio Preto', image: img.iphone16pro_black, hex: '#373739' },
      { name: 'Titanio Branco', image: img.iphone16pro_white, hex: '#f0f0f2' },
    ],
  },
  {
    name: 'iPhone 17e',
    category: 'iPhone',
    line: 'Smartphone acessivel',
    priceFrom: 'R$ 4.499',
    description: 'Versao acessivel da nova geracao com excelente custo-beneficio.',
    specs: ['256 GB', 'Apple Intelligence', 'Garantia Apple 1 ano'],
    colors: ['Branco', 'Preto'],
    image: img.iphone16_white,
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 4.499' },
    ],
    colorOptions: [
      { name: 'Branco', image: img.iphone16_white, hex: '#f3f4f6' },
      { name: 'Preto', image: img.iphone16_black, hex: '#232528' },
    ],
  },

  // --- LINE APPLE WATCH ---
  {
    name: 'Apple Watch SE 2',
    category: 'Apple Watch',
    line: 'Relogio essencial',
    priceFrom: 'R$ 2.199',
    description: 'Entrada no ecossistema Watch com recursos essenciais de saude, treino e chamadas.',
    specs: ['GPS', 'Monitoramento Cardíaco', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar'],
    image: img.watch_se,
    storageOptions: [
      { storage: '40 mm', priceFrom: 'R$ 2.199' },
      { storage: '44 mm', priceFrom: 'R$ 2.299' },
    ],
    colorOptions: [
      { name: 'Meia-noite', image: img.watch_se, hex: '#1c232e' },
      { name: 'Estelar', image: img.watch_se, hex: '#faf7f2' },
    ],
  },
  {
    name: 'Apple Watch SE 3',
    category: 'Apple Watch',
    line: 'Relogio essencial',
    priceFrom: 'R$ 2.599',
    description: 'Nova geracao do SE com desempenho aprimorado e novos sensores.',
    specs: ['GPS', 'Leitura Biometrica', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar'],
    image: img.watch_se,
    storageOptions: [
      { storage: '40 mm', priceFrom: 'R$ 2.599' },
      { storage: '44 mm', priceFrom: 'R$ 2.649' },
    ],
    colorOptions: [
      { name: 'Meia-noite', image: img.watch_se, hex: '#1c232e' },
      { name: 'Estelar', image: img.watch_se, hex: '#faf7f2' },
    ],
  },
  {
    name: 'Apple Watch Series 11',
    category: 'Apple Watch',
    line: 'Relogio inteligente',
    priceFrom: 'R$ 3.149',
    description: 'Design mais fino, tela Always-On OLED e recarga ultrafast.',
    specs: ['Always-On Retina', 'ECG + Oxigenio', 'Garantia Apple 1 ano'],
    colors: ['Rose Gold', 'Prateado', 'Jet Black'],
    image: img.watch_series,
    storageOptions: [
      { storage: '42 mm', priceFrom: 'R$ 3.149' },
      { storage: '46 mm', priceFrom: 'R$ 3.299' },
    ],
    colorOptions: [
      { name: 'Rose Gold', image: img.watch_series, hex: '#e8c4b8' },
      { name: 'Prateado', image: img.watch_series, hex: '#e3e4e6' },
      { name: 'Jet Black', image: img.watch_series, hex: '#121214' },
    ],
  },
  {
    name: 'Apple Watch Ultra 2 & 3',
    category: 'Apple Watch',
    line: 'Relogio aventureiro',
    priceFrom: 'R$ 4.799',
    description: 'Caixa de titanio robusta, tela de 3000 nits e bateria de ate 72h.',
    specs: ['49 mm Titanio', 'GPS Frequencia Dupla', 'Resistente 100m Water'],
    colors: ['Titanio Natural', 'Titanio Preto'],
    image: img.watch_ultra,
    storageOptions: [
      { storage: 'Ultra 2 (49mm)', priceFrom: 'R$ 4.799' },
      { storage: 'Ultra 3 (49mm)', priceFrom: 'R$ 5.649' },
    ],
    colorOptions: [
      { name: 'Titanio Natural', image: img.watch_ultra, hex: '#c0c0c2' },
      { name: 'Titanio Preto', image: img.watch_ultra, hex: '#222325' },
    ],
  },

  // --- LINE IPAD ---
  {
    name: 'iPad mini 7',
    category: 'iPad',
    line: 'Tablet compacto',
    priceFrom: 'R$ 3.599',
    description: 'Super leve e poderoso para leitura, anotacoes e mobilidade total.',
    specs: ['128 GB', '8.3" Liquid Retina', 'Compativel com Pencil Pro'],
    colors: ['Cinza Espacial', 'Roxo', 'Azul'],
    image: img.ipad_mini,
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 3.599' },
    ],
    colorOptions: [
      { name: 'Cinza Espacial', image: img.ipad_mini, hex: '#535558' },
      { name: 'Roxo', image: img.ipad_mini, hex: '#b7b4d1' },
      { name: 'Azul', image: img.ipad_mini, hex: '#95b3ca' },
    ],
  },
  {
    name: 'iPad 11',
    category: 'iPad',
    line: 'Tablet essencial',
    priceFrom: 'R$ 3.499',
    description: 'Design de tela ponta a ponta, USB-C e cores vibrantes para estudo e lazer.',
    specs: ['128 GB', 'Tela 10.9"', 'Wi-Fi + USB-C'],
    colors: ['Azul', 'Amarelo', 'Rosa', 'Prateado'],
    image: img.ipad_10,
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 3.499' },
    ],
    colorOptions: [
      { name: 'Azul', image: img.ipad_10, hex: '#63809e' },
      { name: 'Amarelo', image: img.ipad_10, hex: '#f5d665' },
      { name: 'Rosa', image: img.ipad_10, hex: '#e3697e' },
      { name: 'Prateado', image: img.ipad_10, hex: '#e3e4e6' },
    ],
  },
  {
    name: 'iPad Air (M3 & M4)',
    category: 'iPad',
    line: 'Tablet leve',
    priceFrom: 'R$ 4.399',
    description: 'Potencia do chip Apple Silicon M-Series em um corpo ultrafino.',
    specs: ['Chips M3 / M4', '11 polegadas', 'Compativel Magic Keyboard'],
    colors: ['Azul', 'Roxo', 'Estelar', 'Cinza Espacial'],
    image: img.ipad_air,
    storageOptions: [
      { storage: '128GB (M3)', priceFrom: 'R$ 4.399' },
      { storage: '128GB (M4)', priceFrom: 'R$ 5.249' },
    ],
    colorOptions: [
      { name: 'Azul', image: img.ipad_air, hex: '#839db5' },
      { name: 'Roxo', image: img.ipad_air, hex: '#aba9be' },
      { name: 'Estelar', image: img.ipad_air, hex: '#e1ded9' },
      { name: 'Cinza Espacial', image: img.ipad_air, hex: '#58595c' },
    ],
  },
  {
    name: 'iPad Pro M5',
    category: 'iPad',
    line: 'Tablet profissional',
    priceFrom: 'R$ 7.299',
    description: 'O OLED Ultra Retina XDR mais fino da historia com o chip M5.',
    specs: ['256 GB', 'Chip M5', 'Ultra Retina XDR 13"'],
    colors: ['Preto Espacial', 'Prateado'],
    image: img.ipad_pro,
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 7.299' },
    ],
    colorOptions: [
      { name: 'Preto Espacial', image: img.ipad_pro, hex: '#2e2f31' },
      { name: 'Prateado', image: img.ipad_pro, hex: '#e2e3e5' },
    ],
  },

  // --- LINE MAC ---
  {
    name: 'Mac mini M4',
    category: 'Mac',
    line: 'Desktop compacto',
    priceFrom: 'R$ 5.699',
    description: 'Design ultra reduzido de 12.7 cm com toda a performance do chip M4.',
    specs: ['256 GB SSD', 'Chip Apple M4', 'Portas Thunderbolt 4'],
    colors: ['Prateado'],
    image: img.mac_mini,
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 5.699' },
    ],
    colorOptions: [
      { name: 'Prateado', image: img.mac_mini, hex: '#e2e3e5' },
    ],
  },
  {
    name: 'MacBook Air 13"',
    category: 'Mac',
    line: 'Notebook ultrafino',
    priceFrom: 'R$ 5.499',
    description: 'O notebook mais amado do mundo, silencioso sem ventoinhas e bateria de ate 18h.',
    specs: ['Tela Liquid Retina 13.6"', 'Bateria ate 18h', 'MagSafe 3'],
    colors: ['Cinza Espacial', 'Prateado', 'Meia-noite', 'Estelar'],
    image: img.macbook_air_spacegray,
    storageOptions: [
      { storage: 'Neo 256GB', priceFrom: 'R$ 5.499' },
      { storage: 'M4 256GB', priceFrom: 'R$ 7.599' },
      { storage: 'M5 512GB', priceFrom: 'R$ 8.499' },
    ],
    colorOptions: [
      { name: 'Cinza Espacial', image: img.macbook_air_spacegray, hex: '#58595c' },
      { name: 'Prateado', image: img.macbook_air_silver, hex: '#e2e3e5' },
      { name: 'Meia-noite', image: img.macbook_air_spacegray, hex: '#1c232e' },
      { name: 'Estelar', image: img.macbook_air_silver, hex: '#faf7f2' },
    ],
  },
  {
    name: 'MacBook Pro 14"',
    category: 'Mac',
    line: 'Notebook profissional',
    priceFrom: 'R$ 12.299',
    description: 'Desempenho monstruoso com chip M5, tela Liquid Retina XDR e HDMI/SDXC.',
    specs: ['512 GB SSD', 'Chip M5 Pro', 'Tela Liquid Retina XDR 120Hz'],
    colors: ['Preto Espacial', 'Prateado'],
    image: img.macbook_pro,
    storageOptions: [
      { storage: '512 GB', priceFrom: 'R$ 12.299' },
    ],
    colorOptions: [
      { name: 'Preto Espacial', image: img.macbook_pro, hex: '#262729' },
      { name: 'Prateado', image: img.macbook_air_silver, hex: '#e2e3e5' },
    ],
  },

  // --- ACESSORIOS ---
  {
    name: 'AirPods 4',
    category: 'Acessorios',
    line: 'Audio diario',
    priceFrom: 'R$ 1.649',
    description: 'Ergonomia aprimorada, estojo USB-C compacto e audio espacial personalizavel.',
    specs: ['USB-C', 'Audio Espacial', 'Resistente a agua IP54'],
    colors: ['Branco'],
    image: img.airpods4,
    storageOptions: [
      { storage: 'Sem ANC', priceFrom: 'R$ 1.649' },
      { storage: 'Com ANC', priceFrom: 'R$ 2.099' },
    ],
    colorOptions: [
      { name: 'Branco', image: img.airpods4, hex: '#ffffff' },
    ],
  },
  {
    name: 'AirPods Pro (2ª & 3ª Gen)',
    category: 'Acessorios',
    line: 'Audio premium',
    priceFrom: 'R$ 2.149',
    description: 'Cancelamento Ativo de Ruido 2x superior, modo Transparencia e estojo com alto-falante.',
    specs: ['USB-C', 'ANC Adaptativo', 'Busca de Precisao MagSafe'],
    colors: ['Branco'],
    image: img.airpodspro,
    storageOptions: [
      { storage: 'Pro 2', priceFrom: 'R$ 2.149' },
      { storage: 'Pro 3', priceFrom: 'R$ 2.399' },
    ],
    colorOptions: [
      { name: 'Branco', image: img.airpodspro, hex: '#ffffff' },
    ],
  },
  {
    name: 'AirPods Max',
    category: 'Acessorios',
    line: 'Audio premium',
    priceFrom: 'R$ 4.099',
    description: 'Over-ear com drivers dinamicos Apple, cancelamento pro de ruido e conexao USB-C.',
    specs: ['USB-C', 'Titanio & Aluminio', 'Audio de Alta Fidelidade'],
    colors: ['Starlight', 'Azul', 'Laranja'],
    image: img.airpodsmax,
    storageOptions: [
      { storage: 'USB-C Standard', priceFrom: 'R$ 4.099' },
    ],
    colorOptions: [
      { name: 'Starlight', image: img.airpodsmax, hex: '#e3dfd8' },
    ],
  },
  {
    name: 'AirTag',
    category: 'Acessorios',
    line: 'Rastreio',
    priceFrom: 'R$ 1.049',
    description: 'Mantenha chaves, malas e carteiras sempre visiveis na rede Buscar da Apple.',
    specs: ['Chip U1', 'Resistente a agua IP67', 'Bateria CR2032'],
    colors: ['Branco'],
    image: img.airtag,
    storageOptions: [
      { storage: 'Unitario (1x)', priceFrom: 'R$ 1.049' },
      { storage: 'Pack 4 Unidades', priceFrom: 'R$ 1.599' },
    ],
    colorOptions: [
      { name: 'Branco', image: img.airtag, hex: '#ffffff' },
    ],
  },
  {
    name: 'Apple Pencil',
    category: 'Acessorios',
    line: 'Escrita digital',
    priceFrom: 'R$ 1.399',
    description: 'Precisao de pixel perfeito, baixa latencia e sensibilidade a inclinacao.',
    specs: ['Carregamento magnetico / USB-C', 'Sensibilidade a pressao'],
    colors: ['Branco'],
    image: img.pencil_pro,
    storageOptions: [
      { storage: 'Pencil 2', priceFrom: 'R$ 1.399' },
      { storage: 'Pencil USB-C', priceFrom: 'R$ 1.449' },
      { storage: 'Pencil Pro', priceFrom: 'R$ 1.699' },
    ],
    colorOptions: [
      { name: 'Branco', image: img.pencil_pro, hex: '#ffffff' },
    ],
  },
]

export const featuredProducts: FeaturedProduct[] = [
  allProducts.find((p) => p.name === 'iPhone 17 Pro Max')!,
  allProducts.find((p) => p.name === 'MacBook Air 13"')!,
  allProducts.find((p) => p.name === 'Apple Watch Series 11')!,
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
