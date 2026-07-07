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
}

export type TrustItem = {
  title: string
  description: string
}

export const categories: ProductCategory[] = [
  {
    name: 'iPhone',
    description: 'Flagships selados, seminovos premium e upgrades sob consultoria.',
    highlight: 'Cameras Pro, titanium e alto desempenho',
  },
  {
    name: 'Mac',
    description: 'MacBooks e desktops para trabalho criativo, produtividade e estudo.',
    highlight: 'Chips Apple Silicon e bateria longa',
  },
  {
    name: 'iPad',
    description: 'Mobilidade, desenho, leitura e produtividade com acessórios certos.',
    highlight: 'Tela ampla, Pencil e teclado',
  },
  {
    name: 'Apple Watch',
    description: 'Saude, treino, notificacoes e estilo em modelos selecionados.',
    highlight: 'Monitoramento e conectividade diaria',
  },
]

export const allProducts: FeaturedProduct[] = [
  {
    name: 'iPhone 17 Pro',
    category: 'iPhone',
    line: 'Smartphone premium',
    priceFrom: 'A partir de R$ 8.999',
    description: 'Design Pro, cameras avancadas e performance para anos de uso.',
    specs: ['Tela Super Retina', '256 GB', 'Garantia inclusa'],
    colors: ['Laranja cosmico', 'Prata', 'Azul profundo'],
    image: 'https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17pro__t1j902iw6kya_large.jpg',
  },
  {
    name: 'iPhone Air',
    category: 'iPhone',
    line: 'Smartphone ultrafino',
    priceFrom: 'A partir de R$ 7.499',
    description: 'Perfil extremamente fino, acabamento leve e camera Fusion para o dia a dia.',
    specs: ['Sky Blue', 'Fusion camera', 'Tela ampla'],
    colors: ['Azul ceu', 'Dourado claro', 'Preto espacial'],
    image: 'https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_air__b5qmgl05ojyq_large.jpg',
  },
  {
    name: 'iPhone 17',
    category: 'iPhone',
    line: 'Smartphone essencial',
    priceFrom: 'A partir de R$ 6.499',
    description: 'Modelo equilibrado para quem quer camera moderna, bateria forte e design atual.',
    specs: ['Lavanda', 'Dual Fusion', '128 GB'],
    colors: ['Lavanda', 'Preto', 'Branco'],
    image: 'https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17__fb1277oq3eaa_large.jpg',
  },
  {
    name: 'iPhone 16',
    category: 'iPhone',
    line: 'Smartphone versatil',
    priceFrom: 'A partir de R$ 5.499',
    description: 'Otima escolha para atualizar sem ir direto ao modelo Pro.',
    specs: ['Ultramarino', 'Camera dupla', 'USB-C'],
    colors: ['Ultramarino', 'Rosa', 'Preto'],
    image: 'https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_16__b6tkv86m2gc2_large.jpg',
  },
  {
    name: 'MacBook Air M3',
    category: 'Mac',
    line: 'Notebook ultrafino',
    priceFrom: 'A partir de R$ 8.499',
    description: 'Leve, silencioso e preparado para estudo, negocios e criacao diaria.',
    specs: ['Chip M3', '18h de bateria', 'Tela Liquid Retina'],
    colors: ['Meia-noite', 'Estelar', 'Prateado'],
    image: 'https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mba_13_15_e733a3435.jpg',
  },
  {
    name: 'MacBook Pro 14',
    category: 'Mac',
    line: 'Notebook profissional',
    priceFrom: 'A partir de R$ 17.999',
    description: 'Potencia para edicao, desenvolvimento, design e trabalho pesado.',
    specs: ['14 polegadas', 'Chip Pro', 'Tela XDR'],
    colors: ['Preto espacial', 'Prateado'],
    image: 'https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mbp_14_16_fa5e3a2b2.jpg',
  },
  {
    name: 'Mac mini',
    category: 'Mac',
    line: 'Desktop compacto',
    priceFrom: 'A partir de R$ 7.499',
    description: 'Setup minimalista para mesa fixa, estudio e produtividade intensa.',
    specs: ['Apple Silicon', 'Compacto', 'Portas Pro'],
    colors: ['Prateado', 'Cinza espacial'],
    image: 'https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mac_mini_d300dfe42.jpg',
  },
  {
    name: 'iPad Pro M4',
    category: 'iPad',
    line: 'Tablet profissional',
    priceFrom: 'A partir de R$ 9.299',
    description: 'Tela incrivel, potencia de sobra e versatilidade para criar em movimento.',
    specs: ['Tela Ultra Retina', 'Compatível com Pencil', 'Wi-Fi 6E'],
    colors: ['Preto espacial', 'Prateado'],
    image: 'https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_pro_b15908d8a.png',
  },
  {
    name: 'iPad Air',
    category: 'iPad',
    line: 'Tablet leve',
    priceFrom: 'A partir de R$ 6.999',
    description: 'Equilibrio entre potencia, portabilidade e custo para estudar e trabalhar.',
    specs: ['Apple Pencil', 'Tela Liquid Retina', 'Wi-Fi'],
    colors: ['Azul', 'Roxo', 'Estelar'],
    image: 'https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_air_000dd2f9c.png',
  },
  {
    name: 'iPad mini',
    category: 'iPad',
    line: 'Tablet compacto',
    priceFrom: 'A partir de R$ 5.999',
    description: 'Pequeno, leve e poderoso para leitura, anotacoes e mobilidade total.',
    specs: ['8.3 polegadas', 'Apple Pencil', 'Portatil'],
    colors: ['Roxo', 'Azul', 'Cinza espacial'],
    image: 'https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_mini_cde3db6eb.png',
  },
  {
    name: 'Apple Watch Series 11',
    category: 'Apple Watch',
    line: 'Relogio inteligente',
    priceFrom: 'A partir de R$ 4.199',
    description: 'Tela ampla, monitoramento de saude e acabamento refinado para uso diario.',
    specs: ['GPS + Cellular', 'Caixa 46 mm', 'Pulseira esportiva'],
    colors: ['Rose Gold', 'Prateado', 'Jet Black'],
    image: 'https://www.apple.com/assets-www/en_WW/watch/product_tile/large/s11_5b6ada38f.png',
  },
  {
    name: 'Apple Watch SE',
    category: 'Apple Watch',
    line: 'Relogio essencial',
    priceFrom: 'A partir de R$ 2.999',
    description: 'Entrada ideal no ecossistema Watch com recursos essenciais de saude e treino.',
    specs: ['GPS', 'Notificacoes', 'Treinos'],
    colors: ['Meia-noite', 'Estelar', 'Prateado'],
    image: 'https://www.apple.com/assets-www/en_WW/watch/product_tile/large/se_df3e5c87b.png',
  },
  {
    name: 'Apple Watch Ultra 3',
    category: 'Apple Watch',
    line: 'Relogio aventureiro',
    priceFrom: 'A partir de R$ 9.499',
    description: 'Construido para esporte, trilha, mergulho e uso extremo.',
    specs: ['Titanio', 'Bateria longa', 'Tela brilhante'],
    colors: ['Titanio natural', 'Titanio preto'],
    image: 'https://www.apple.com/assets-www/en_WW/watch/product_tile/large/u3_b14b28758.png',
  },
  {
    name: 'AirPods Max',
    category: 'Acessorios',
    line: 'Audio premium',
    priceFrom: 'A partir de R$ 6.590',
    description: 'Audio de alta fidelidade, cancelamento de ruido e acabamento premium.',
    specs: ['USB-C', 'ANC adaptativo', 'Audio espacial'],
    colors: ['Stardust', 'Azul', 'Laranja'],
    image: 'https://www.apple.com/v/airpods/ae/images/overview/airpods_max_stardust__l9lr6719rmaa_large.png',
  },
  {
    name: 'AirPods 4',
    category: 'Acessorios',
    line: 'Audio diario',
    priceFrom: 'A partir de R$ 1.499',
    description: 'Fones leves para chamadas, musica e uso continuo no ecossistema Apple.',
    specs: ['USB-C', 'Som espacial', 'Estojo compacto'],
    colors: ['Branco', 'Estojo branco'],
    image: 'https://www.apple.com/v/airpods/ae/images/chapternav/airpods_4__fqax1brwh46e_large.svg',
  },
]

export const featuredProducts: FeaturedProduct[] = [allProducts[0], allProducts[4], allProducts[7]]

export const trustItems: TrustItem[] = [
  {
    title: 'Garantia e procedência',
    description: 'Produtos selecionados, conferidos e acompanhados de suporte claro.',
  },
  {
    title: 'Compra assistida',
    description: 'Um consultor ajuda a escolher o modelo ideal para seu uso e orçamento.',
  },
  {
    title: 'Condições flexíveis',
    description: 'Pagamento facilitado, troca planejada e orientação antes do fechamento.',
  },
  {
    title: 'Entrega segura',
    description: 'Processo organizado para receber seu dispositivo com tranquilidade.',
  },
]
