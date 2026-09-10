// Marca Apple Pacces: silhueta de iPhone com um "P" vazado e a Dynamic Island no topo.
// Usa currentColor, então herda a cor do texto (preto no claro, branco no escuro).

export function BrandSymbol({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 40" className={className} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 0h9A6.5 6.5 0 0 1 22 6.5v27a6.5 6.5 0 0 1-6.5 6.5h-9A6.5 6.5 0 0 1 0 33.5v-27A6.5 6.5 0 0 1 6.5 0Zm1.7 3a1.2 1.2 0 0 0 0 2.4h5.6a1.2 1.2 0 0 0 0-2.4H8.2ZM6 13h5.5a4.5 4.5 0 0 1 0 9H9v6H6V13Zm3 3v3h2.5a1.5 1.5 0 0 0 0-3H9Z"
      />
    </svg>
  )
}

type BrandLogoProps = {
  className?: string
  symbolOnly?: boolean
}

export function BrandLogo({ className = '', symbolOnly = false }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <BrandSymbol className="h-6 w-auto" />
      {!symbolOnly && (
        <span className="font-display text-[15px] tracking-[-0.02em]">
          <span className="font-normal opacity-70">Apple</span> <span className="font-semibold">Pacces</span>
        </span>
      )}
    </span>
  )
}
