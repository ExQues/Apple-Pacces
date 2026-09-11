// Endereço amigável de cada produto: "iPhone 17 Pro Max" → "iphone-17-pro-max"
export function productSlug(name: string) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const productPath = (name: string) => `/produto/${productSlug(name)}`
