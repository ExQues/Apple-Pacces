// Cada foto de produto tem duas versões: a original (até ~1000 px) em /products/ e uma leve
// de 480 px em /products/sm/. O navegador escolhe a menor que fica nítida no espaço exibido.

export function productImgProps(src: string, sizes: string) {
  if (!src.startsWith('/products/')) return { src }
  const small = src.replace('/products/', '/products/sm/')
  return { src: small, srcSet: `${small} 480w, ${src} 1000w`, sizes }
}

// Baixa a foto com antecedência (mesma versão que o navegador vai escolher na tela)
export function preloadProductImage(src: string, sizes: string): Promise<void> {
  const props = productImgProps(src, sizes)
  const img = new Image()
  if (props.srcSet) {
    img.sizes = sizes
    img.srcset = props.srcSet
  }
  img.src = props.src
  if (typeof img.decode !== 'function') return Promise.resolve()
  return img.decode().catch(() => undefined)
}
