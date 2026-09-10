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

// Fotos oficiais da Apple (CDN store.storeimages.cdn-apple.com), recortadas e hospedadas em public/products.
const img = {
  // iPhone
  iphone14_midnight: '/products/iphone-14-finish-select-202209-6-1inch-midnight.webp',
  iphone15_black: '/products/iphone-15-finish-select-202309-6-1inch-black.webp',
  iphone15_blue: '/products/iphone-15-finish-select-202309-6-1inch-blue.webp',
  iphone15_pink: '/products/iphone-15-finish-select-202309-6-1inch-pink.webp',
  iphone15_yellow: '/products/iphone-15-finish-select-202309-6-1inch-yellow.webp',

  iphone16_ultramarine: '/products/iphone-16-finish-select-202409-6-1inch-ultramarine.webp',
  iphone16_teal: '/products/iphone-16-finish-select-202409-6-1inch-teal.webp',
  iphone16_pink: '/products/iphone-16-finish-select-202409-6-1inch-pink.webp',
  iphone16_white: '/products/iphone-16-finish-select-202409-6-1inch-white.webp',
  iphone16_black: '/products/iphone-16-finish-select-202409-6-1inch-black.webp',

  iphone16pro_desert: '/products/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium.webp',
  iphone16pro_natural: '/products/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium.webp',
  iphone16pro_black: '/products/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium.webp',
  iphone16pro_white: '/products/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium.webp',
  iphone16promax_desert: '/products/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium.webp',

  // Apple Watch
  watch_se: '/products/watch-card-40-se-202309.webp',
  watch_series: '/products/watch-card-40-s9-202309.webp',
  watch_ultra: '/products/watch-ultra2-digitalmat-gallery-1-202309.webp',

  // iPad
  ipad_mini: '/products/ipad-mini-finish-select-gallery-202410-space-gray-wifi.webp',
  ipad_10: '/products/ipad-10th-gen-finish-select-202212-blue.webp',
  ipad_air: '/products/ipad-air-storage-select-202405-11inch-blue.webp',
  ipad_pro: '/products/ipad-pro-storage-select-202405-13inch-spaceblack.webp',

  // Mac
  mac_mini: '/products/mac-mini-hero-202410.webp',
  macbook_air_spacegray: '/products/macbook-air-space-gray-select-201810.webp',
  macbook_air_silver: '/products/macbook-air-silver-select-201810.webp',
  macbook_pro: '/products/mbp16-spaceblack-select-202310.webp',

  // AirPods & AirTag & Pencil
  airpods4: '/products/airpods-4-select-202409.webp',
  airpods4anc: '/products/airpods-4-anc-select-202409.webp',
  airpodspro: '/products/MTJV3.webp',
  airpodsmax: '/products/airpods-max-select-202409-starlight.webp',
  airtag: '/products/airtag-single-select-202104.webp',
  airtag4pack: '/products/airtag-4pack-select-202104.webp',
  pencil_usbc: '/products/MQLU3.webp',
  pencil_2: '/products/MU8F2.webp',
  pencil_pro: '/products/MX2D3.webp',
} as const

export const categories: ProductCategory[] = [
  {
    name: 'iPhone',
    description: 'Flagships lacrados com garantia Apple de 1 ano.',
    highlight: 'Câmeras Pro, acabamentos premium e alto desempenho',
  },
  {
    name: 'Apple Watch',
    description: 'Saúde, treinos, notificações e estilo com garantia Apple.',
    highlight: 'Monitoramento avançado e conectividade total',
  },
  {
    name: 'iPad',
    description: 'Mobilidade, leitura, ilustração e produtividade profissional.',
    highlight: 'Telas Liquid Retina, chips M-series e compatibilidade Pencil',
  },
  {
    name: 'Mac',
    description: 'MacBooks e desktops para trabalho criativo, engenharia e estudos.',
    highlight: 'Chips Apple Silicon M-series e autonomia impressionante',
  },
  {
    name: 'Acessórios',
    description: 'AirPods, AirTag e Apple Pencils originais para o seu ecossistema.',
    highlight: 'Áudio imersivo, rastreamento de precisão e escrita digital',
  },
]

// Produtos agrupados por Modelo com Seletores Dinâmicos de Armazenamento e Cores.
export const allProducts: FeaturedProduct[] = [
  // --- LINE IPHONE ---
  {
    name: 'iPhone 14',
    category: 'iPhone',
    line: 'Smartphone essencial',
    priceFrom: 'R$ 3.799',
    description: 'Modelo consolidado com bom desempenho e ótimas fotos.',
    specs: ['Face ID', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar', 'Roxo'],
    image: '/products/iphone-14-finish-select-202209-6-1inch-midnight.webp',
    status: 'em-falta',
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 3.799' },
    ],
    colorOptions: [
      { name: 'Meia-noite', image: '/products/iphone-14-finish-select-202209-6-1inch-midnight.webp', hex: '#1c232e' },
      { name: 'Estelar', image: '/products/iphone-14-finish-select-202209-6-1inch-starlight.webp', hex: '#faf7f2' },
      { name: 'Roxo', image: '/products/iphone-14-finish-select-202209-6-1inch-purple.webp', hex: '#e3d5e8' },
    ],
  },
  {
    name: 'iPhone 15',
    category: 'iPhone',
    line: 'Smartphone atual',
    priceFrom: 'R$ 4.249',
    description: 'Dynamic Island, câmera de 48 MP e conector USB-C universal.',
    specs: ['USB-C', 'Dynamic Island', 'Câmera 48 MP', 'Garantia Apple 1 ano'],
    colors: ['Preto', 'Azul', 'Rosa', 'Amarelo'],
    image: img.iphone15_black,
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 4.249' },
      { storage: '256 GB', priceFrom: 'R$ 4.699' },
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
    line: 'Smartphone acessível',
    priceFrom: 'R$ 3.799',
    description: 'Porta de entrada da linha 16 com bateria longa e desempenho otimizado.',
    specs: ['128 GB', 'Apple Intelligence', 'Garantia Apple 1 ano'],
    colors: ['Preto', 'Branco'],
    image: '/products/iphone-16e-finish-select-202502-black.webp',
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 3.799' },
    ],
    colorOptions: [
      { name: 'Preto', image: '/products/iphone-16e-finish-select-202502-black.webp', hex: '#222528' },
      { name: 'Branco', image: '/products/iphone-16e-finish-select-202502-white.webp', hex: '#f4f4f6' },
    ],
  },
  {
    name: 'iPhone 16',
    category: 'iPhone',
    line: 'Smartphone versátil',
    priceFrom: 'R$ 4.699',
    description: 'Câmera dupla Fusion, chip A18, Controle da Câmera e Apple Intelligence.',
    specs: ['Chip A18', 'Controle da Câmera', 'Garantia Apple 1 ano'],
    colors: ['Ultramarino', 'Teal', 'Rosa', 'Branco', 'Preto'],
    image: img.iphone16_ultramarine,
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 4.699' },
      { storage: '256 GB', priceFrom: 'R$ 4.999' },
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
    priceFrom: 'R$ 5.699',
    description: 'Modelo equilibrado da nova geração, com câmera moderna e bateria forte.',
    specs: ['256 GB', 'Chip A19', 'Garantia Apple 1 ano'],
    colors: ['Lavanda', 'Sálvia', 'Azul-névoa', 'Preto', 'Branco'],
    image: '/products/iphone-17-finish-select-202509-lavender.webp',
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 5.699' },
    ],
    colorOptions: [
      { name: 'Lavanda', image: '/products/iphone-17-finish-select-202509-lavender.webp', hex: '#dccfe8' },
      { name: 'Sálvia', image: '/products/iphone-17-finish-select-202509-sage.webp', hex: '#b9c6a8' },
      { name: 'Azul-névoa', image: '/products/iphone-17-finish-select-202509-mistblue.webp', hex: '#a9bdd3' },
      { name: 'Preto', image: '/products/iphone-17-finish-select-202509-black.webp', hex: '#2a2b2d' },
      { name: 'Branco', image: '/products/iphone-17-finish-select-202509-white.webp', hex: '#f3f3f1' },
    ],
  },
  {
    name: 'iPhone 17 Air',
    category: 'iPhone',
    line: 'Smartphone ultrafino',
    priceFrom: 'R$ 5.899',
    description: 'Perfil extremamente fino, acabamento leve de luxo e câmera Fusion.',
    specs: ['Design ultrafino', 'Titânio leve', 'Garantia Apple 1 ano'],
    colors: ['Azul-céu', 'Branco-nuvem'],
    image: '/products/iphone-air-finish-select-202509-skyblue.webp',
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 5.899' },
      { storage: '512 GB', priceFrom: 'R$ 7.199' },
    ],
    colorOptions: [
      { name: 'Azul-céu', image: '/products/iphone-air-finish-select-202509-skyblue.webp', hex: '#c9dbe9' },
      { name: 'Branco-nuvem', image: '/products/iphone-air-finish-select-202509-cloudwhite.webp', hex: '#f2f1ec' },
    ],
  },
  {
    name: 'iPhone 17 Pro',
    category: 'iPhone',
    line: 'Smartphone Pro',
    priceFrom: 'R$ 7.299',
    description: 'Titânio Pro, telas com tecnologia ProMotion 120Hz e câmeras triplas de nível profissional.',
    specs: ['Chip A19 Pro', 'ProMotion 120Hz', 'Garantia Apple 1 ano'],
    colors: ['Laranja Cósmico', 'Azul Profundo', 'Prateado'],
    image: '/products/iphone-17-pro-finish-select-202509-6-3inch-cosmicorange.webp',
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 7.299' },
      { storage: '512 GB', priceFrom: 'R$ 8.499' },
    ],
    colorOptions: [
      { name: 'Laranja Cósmico', image: '/products/iphone-17-pro-finish-select-202509-6-3inch-cosmicorange.webp', hex: '#d8742f' },
      { name: 'Azul Profundo', image: '/products/iphone-17-pro-finish-select-202509-6-3inch-deepblue.webp', hex: '#2f3d58' },
      { name: 'Prateado', image: '/products/iphone-17-pro-finish-select-202509-6-3inch-silver.webp', hex: '#e3e4e6' },
    ],
  },
  {
    name: 'iPhone 17 Pro Max',
    category: 'iPhone',
    line: 'Smartphone Pro Max',
    priceFrom: 'R$ 7.799',
    description: 'A maior tela Pro Super Retina XDR, autonomia excepcional e zoom periscópico.',
    specs: ['Tela de 6,9"', 'Bateria estendida', 'Garantia Apple 1 ano'],
    colors: ['Laranja Cósmico', 'Azul Profundo', 'Prateado'],
    image: '/products/iphone-17-pro-finish-select-202509-6-9inch-cosmicorange.webp',
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 7.799' },
      { storage: '512 GB', priceFrom: 'R$ 9.299' },
      { storage: '1 TB', priceFrom: 'R$ 10.399' },
    ],
    colorOptions: [
      { name: 'Laranja Cósmico', image: '/products/iphone-17-pro-finish-select-202509-6-9inch-cosmicorange.webp', hex: '#d8742f' },
      { name: 'Azul Profundo', image: '/products/iphone-17-pro-finish-select-202509-6-9inch-deepblue.webp', hex: '#2f3d58' },
      { name: 'Prateado', image: '/products/iphone-17-pro-finish-select-202509-6-9inch-silver.webp', hex: '#e3e4e6' },
    ],
  },
  {
    name: 'iPhone 17e',
    category: 'iPhone',
    line: 'Smartphone acessível',
    priceFrom: 'R$ 4.599',
    description: 'Versão acessível da nova geração com excelente custo-benefício.',
    specs: ['256 GB', 'Apple Intelligence', 'Garantia Apple 1 ano'],
    colors: ['Branco'],
    image: '/products/iphone-17e-finish-select-202603-white.webp',
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 4.599' },
    ],
    colorOptions: [
      { name: 'Branco', image: '/products/iphone-17e-finish-select-202603-white.webp', hex: '#f3f3f1' },
    ],
  },

  // --- LINE APPLE WATCH ---
  {
    name: 'Apple Watch SE 2',
    category: 'Apple Watch',
    line: 'Relógio essencial',
    priceFrom: 'R$ 1.899',
    description: 'Entrada no ecossistema Watch com recursos essenciais de saúde, treino e chamadas.',
    specs: ['GPS', 'Monitoramento Cardíaco', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite', 'Estelar'],
    image: img.watch_se,
    storageOptions: [
      { storage: '40 mm', priceFrom: 'R$ 1.899' },
      { storage: '44 mm', priceFrom: 'R$ 1.999' },
    ],
    colorOptions: [
      { name: 'Meia-noite', image: img.watch_se, hex: '#1c232e' },
      { name: 'Estelar', image: img.watch_se, hex: '#faf7f2' },
    ],
  },
  {
    name: 'Apple Watch SE 3',
    category: 'Apple Watch',
    line: 'Relógio essencial',
    priceFrom: 'R$ 2.199',
    description: 'Nova geração do SE com desempenho aprimorado e novos sensores.',
    specs: ['GPS', 'Leitura Biométrica', 'Garantia Apple 1 ano'],
    colors: ['Meia-noite'],
    image: '/products/watch-card-40-se3-202509.webp',
    storageOptions: [
      { storage: '40 mm', priceFrom: 'R$ 2.199' },
      { storage: '44 mm', priceFrom: 'R$ 2.299' },
    ],
    colorOptions: [
      { name: 'Meia-noite', image: '/products/watch-card-40-se3-202509.webp', hex: '#1c232e' },
    ],
  },
  {
    name: 'Apple Watch Series 11',
    category: 'Apple Watch',
    line: 'Relógio inteligente',
    priceFrom: 'R$ 2.799',
    description: 'Design mais fino, tela Always-On OLED e recarga ultrarrápida.',
    specs: ['Always-On Retina', 'ECG + Oxigênio', 'Garantia Apple 1 ano'],
    colors: ['Jet Black'],
    image: '/products/watch-card-40-s11-202509.webp',
    storageOptions: [
      { storage: '42 mm', priceFrom: 'R$ 2.799' },
      { storage: '46 mm', priceFrom: 'R$ 2.999' },
    ],
    colorOptions: [
      { name: 'Jet Black', image: '/products/watch-card-40-s11-202509.webp', hex: '#121214' },
    ],
  },
  {
    name: 'Apple Watch Ultra 2 & 3',
    category: 'Apple Watch',
    line: 'Relógio aventureiro',
    priceFrom: 'R$ 4.499',
    description: 'Caixa de titânio robusta, tela de 3000 nits e bateria de até 72h.',
    specs: ['49 mm Titânio', 'GPS Frequência Dupla', 'Resistente à água até 100 m'],
    colors: ['Titânio Natural', 'Titânio Preto'],
    image: img.watch_ultra,
    storageOptions: [
      { storage: 'Ultra 2 (49mm)', priceFrom: 'R$ 4.499' },
      { storage: 'Ultra 3 (49mm)', priceFrom: 'R$ 5.199' },
    ],
    colorOptions: [
      { name: 'Titânio Natural', image: img.watch_ultra, hex: '#c0c0c2' },
      { name: 'Titânio Preto', image: img.watch_ultra, hex: '#222325' },
    ],
  },

  // --- LINE IPAD ---
  {
    name: 'iPad mini 7',
    category: 'iPad',
    line: 'Tablet compacto',
    priceFrom: 'R$ 4.499',
    description: 'Super leve e poderoso para leitura, anotações e mobilidade total.',
    specs: ['128 GB', '8,3" Liquid Retina', 'Compatível com Pencil Pro'],
    colors: ['Cinza Espacial', 'Roxo', 'Azul'],
    image: '/products/ipad-mini-finish-select-gallery-202410-space-gray-wifi.webp',
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 4.499' },
    ],
    colorOptions: [
      { name: 'Cinza Espacial', image: '/products/ipad-mini-finish-select-gallery-202410-space-gray-wifi.webp', hex: '#535558' },
      { name: 'Roxo', image: '/products/ipad-mini-finish-select-gallery-202410-purple-wifi.webp', hex: '#b7b4d1' },
      { name: 'Azul', image: '/products/ipad-mini-finish-select-gallery-202410-blue-wifi.webp', hex: '#95b3ca' },
    ],
  },
  {
    name: 'iPad 11',
    category: 'iPad',
    line: 'Tablet essencial',
    priceFrom: 'R$ 3.299',
    description: 'Design de tela ponta a ponta, USB-C e cores vibrantes para estudo e lazer.',
    specs: ['128 GB', 'Tela de 10,9"', 'Wi-Fi + USB-C'],
    colors: ['Azul', 'Amarelo', 'Rosa', 'Prateado'],
    image: '/products/ipad-finish-select-202503-blue-wifi.webp',
    storageOptions: [
      { storage: '128 GB', priceFrom: 'R$ 3.299' },
    ],
    colorOptions: [
      { name: 'Azul', image: '/products/ipad-finish-select-202503-blue-wifi.webp', hex: '#63809e' },
      { name: 'Amarelo', image: '/products/ipad-finish-select-202503-yellow-wifi.webp', hex: '#f5d665' },
      { name: 'Rosa', image: '/products/ipad-finish-select-202503-pink-wifi.webp', hex: '#e3697e' },
      { name: 'Prateado', image: '/products/ipad-finish-select-202503-silver-wifi.webp', hex: '#e3e4e6' },
    ],
  },
  {
    name: 'iPad Air (M3 & M4)',
    category: 'iPad',
    line: 'Tablet leve',
    priceFrom: 'R$ 4.099',
    description: 'Potência do chip Apple Silicon M-Series em um corpo ultrafino.',
    specs: ['Chips M3 / M4', '11 polegadas', 'Compatível Magic Keyboard'],
    colors: ['Azul', 'Roxo', 'Estelar', 'Cinza Espacial'],
    image: img.ipad_air,
    storageOptions: [
      { storage: '128GB (M3)', priceFrom: 'R$ 4.099' },
      { storage: '128GB (M4)', priceFrom: 'R$ 5.199' },
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
    priceFrom: 'R$ 7.999',
    description: 'O OLED Ultra Retina XDR mais fino da história com o chip M5.',
    specs: ['256 GB', 'Chip M5', 'Ultra Retina XDR 13"'],
    colors: ['Preto Espacial', 'Prateado'],
    image: '/products/ipad-pro-storage-select-202405-11inch-spaceblack.webp',
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 7.999' },
    ],
    colorOptions: [
      { name: 'Preto Espacial', image: '/products/ipad-pro-storage-select-202405-11inch-spaceblack.webp', hex: '#2e2f31' },
      { name: 'Prateado', image: '/products/ipad-pro-storage-select-202405-11inch-silver.webp', hex: '#e2e3e5' },
    ],
  },

  // --- LINE MAC ---
  {
    name: 'Mac mini M4',
    category: 'Mac',
    line: 'Desktop compacto',
    priceFrom: 'R$ 5.399',
    description: 'Design ultra reduzido de 12,7 cm com toda a performance do chip M4.',
    specs: ['256 GB SSD', 'Chip Apple M4', 'Portas Thunderbolt 4'],
    colors: ['Prateado'],
    image: img.mac_mini,
    storageOptions: [
      { storage: '256 GB', priceFrom: 'R$ 5.399' },
    ],
    colorOptions: [
      { name: 'Prateado', image: img.mac_mini, hex: '#e2e3e5' },
    ],
  },
  {
    name: 'MacBook Air 13"',
    category: 'Mac',
    line: 'Notebook ultrafino',
    priceFrom: 'R$ 5.199',
    description: 'O notebook mais amado do mundo, silencioso sem ventoinhas e bateria de até 18h.',
    specs: ['Tela Liquid Retina 13,6"', 'Bateria até 18h', 'MagSafe 3'],
    colors: ['Azul-céu', 'Meia-noite', 'Prateado', 'Estelar'],
    image: '/products/mba13-skyblue-select-202503.webp',
    storageOptions: [
      { storage: 'Neo 256GB', priceFrom: 'R$ 5.199' },
      { storage: 'M5 512GB', priceFrom: 'R$ 8.749' },
    ],
    colorOptions: [
      { name: 'Azul-céu', image: '/products/mba13-skyblue-select-202503.webp', hex: '#c6d6e3' },
      { name: 'Meia-noite', image: '/products/mba13-midnight-select-202503.webp', hex: '#1c232e' },
      { name: 'Prateado', image: '/products/mba13-silver-select-202503.webp', hex: '#e2e3e5' },
      { name: 'Estelar', image: '/products/mba13-starlight-select-202503.webp', hex: '#f0e9df' },
    ],
  },
  {
    name: 'MacBook Pro 14"',
    category: 'Mac',
    line: 'Notebook profissional',
    priceFrom: 'R$ 11.999',
    description: 'Desempenho extremo com chip M5, tela Liquid Retina XDR e HDMI/SDXC.',
    specs: ['512 GB SSD', 'Chip M5 Pro', 'Tela Liquid Retina XDR 120Hz'],
    colors: ['Preto Espacial', 'Prateado'],
    image: '/products/mbp14-spaceblack-select-202410.webp',
    storageOptions: [
      { storage: '512 GB', priceFrom: 'R$ 11.999' },
    ],
    colorOptions: [
      { name: 'Preto Espacial', image: '/products/mbp14-spaceblack-select-202410.webp', hex: '#262729' },
      { name: 'Prateado', image: '/products/mbp14-silver-select-202410.webp', hex: '#e2e3e5' },
    ],
  },

  // --- ACESSORIOS ---
  {
    name: 'AirPods 4',
    category: 'Acessórios',
    line: 'Áudio diário',
    priceFrom: 'R$ 1.349',
    description: 'Ergonomia aprimorada, estojo USB-C compacto e áudio espacial personalizável.',
    specs: ['USB-C', 'Áudio Espacial', 'Resistente à água IP54'],
    colors: ['Branco'],
    image: '/products/airpods-4-hero-select-202409.webp',
    storageOptions: [
      { storage: 'Sem ANC', priceFrom: 'R$ 1.349' },
      { storage: 'Com ANC', priceFrom: 'R$ 1.799' },
    ],
    colorOptions: [
      { name: 'Branco', image: '/products/airpods-4-hero-select-202409.webp', hex: '#ffffff' },
    ],
  },
  {
    name: 'AirPods Pro (2ª & 3ª Gen)',
    category: 'Acessórios',
    line: 'Áudio premium',
    priceFrom: 'R$ 1.849',
    description: 'Cancelamento Ativo de Ruído 2x superior, modo Transparência e estojo com alto-falante.',
    specs: ['USB-C', 'ANC Adaptativo', 'Busca Precisa com MagSafe'],
    colors: ['Branco'],
    image: '/products/airpods-pro-3-hero-select-202509.webp',
    storageOptions: [
      { storage: 'Pro 2', priceFrom: 'R$ 1.849' },
      { storage: 'Pro 3', priceFrom: 'R$ 2.099' },
    ],
    colorOptions: [
      { name: 'Branco', image: '/products/airpods-pro-3-hero-select-202509.webp', hex: '#ffffff' },
    ],
  },
  {
    name: 'AirPods Max',
    category: 'Acessórios',
    line: 'Áudio premium',
    priceFrom: 'R$ 3.799',
    description: 'Fones over-ear com drivers dinâmicos Apple, cancelamento pro de ruído e conexão USB-C.',
    specs: ['USB-C', 'Titânio & Alumínio', 'Áudio de Alta Fidelidade'],
    colors: ['Meia-noite', 'Estelar', 'Azul', 'Roxo', 'Laranja'],
    image: '/products/airpods-max-select-202409-midnight.webp',
    storageOptions: [
      { storage: 'USB-C Standard', priceFrom: 'R$ 3.799' },
    ],
    colorOptions: [
      { name: 'Meia-noite', image: '/products/airpods-max-select-202409-midnight.webp', hex: '#2b2e33' },
      { name: 'Estelar', image: '/products/airpods-max-select-202409-starlight.webp', hex: '#e3dfd8' },
      { name: 'Azul', image: '/products/airpods-max-select-202409-blue.webp', hex: '#7e93ad' },
      { name: 'Roxo', image: '/products/airpods-max-select-202409-purple.webp', hex: '#b9a8c9' },
      { name: 'Laranja', image: '/products/airpods-max-select-202409-orange.webp', hex: '#e39a6a' },
    ],
  },
  {
    name: 'AirTag',
    category: 'Acessórios',
    line: 'Rastreio',
    priceFrom: 'R$ 749',
    description: 'Mantenha chaves, malas e carteiras sempre visíveis na rede Buscar da Apple.',
    specs: ['Chip U1', 'Resistente à água IP67', 'Bateria CR2032'],
    colors: ['Branco'],
    image: img.airtag,
    storageOptions: [
      { storage: 'Unitário (1x)', priceFrom: 'R$ 749' },
      { storage: 'Pack 4 Unidades', priceFrom: 'R$ 1.299' },
    ],
    colorOptions: [
      { name: 'Branco', image: img.airtag, hex: '#ffffff' },
    ],
  },
  {
    name: 'Apple Pencil',
    category: 'Acessórios',
    line: 'Escrita digital',
    priceFrom: 'R$ 1.099',
    description: 'Precisão de pixel, baixa latência e sensibilidade à inclinação.',
    specs: ['Carregamento magnético / USB-C', 'Sensibilidade à pressão'],
    colors: ['Branco'],
    image: img.pencil_pro,
    storageOptions: [
      { storage: 'Pencil 2', priceFrom: 'R$ 1.099' },
      { storage: 'Pencil USB-C', priceFrom: 'R$ 1.149' },
      { storage: 'Pencil Pro', priceFrom: 'R$ 1.349' },
    ],
    colorOptions: [
      { name: 'Branco', image: img.pencil_pro, hex: '#ffffff' },
    ],
  },
]

export const featuredProducts: FeaturedProduct[] = [
  allProducts.find((p) => p.name === 'iPhone 17 Pro Max')!,
  allProducts.find((p) => p.name === 'iPhone 17 Pro')!,
  allProducts.find((p) => p.name === 'iPhone 17 Air')!,
]

export const trustItems: TrustItem[] = [
  {
    title: 'Garantia e procedência',
    description: 'Produtos lacrados com garantia oficial Apple de 1 ano.',
  },
  {
    title: 'Compra assistida',
    description: 'Um consultor ajuda a escolher o modelo ideal para seu uso e orçamento.',
  },
  {
    title: 'Condições flexíveis',
    description: 'Pagamento em até 18x no cartão de crédito com taxas reduzidas.',
  },
  {
    title: 'Entrega segura',
    description: 'Processo organizado para receber seu dispositivo com total tranquilidade.',
  },
]
