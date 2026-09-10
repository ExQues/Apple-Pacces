// Marca Apple Pacces: módulo de três câmeras do iPhone Pro em um quadrado arredondado.
// Usa currentColor, então herda a cor do texto (preto no claro, branco no escuro).

export function BrandSymbol({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M9 0h14a9 9 0 0 1 9 9v14a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9V9a9 9 0 0 1 9-9ZM4.8 10a5.4 5.4 0 1 0 10.8 0a5.4 5.4 0 1 0-10.8 0ZM7.8 10a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0-4.8 0ZM4.8 22a5.4 5.4 0 1 0 10.8 0a5.4 5.4 0 1 0-10.8 0ZM7.8 22a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0-4.8 0ZM16.4 16a5.4 5.4 0 1 0 10.8 0a5.4 5.4 0 1 0-10.8 0ZM19.4 16a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0-4.8 0ZM20.3 7a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0Z"
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
      <BrandSymbol className="size-[22px]" />
      {!symbolOnly && (
        <span className="font-display text-[15px] tracking-[-0.02em]">
          <span className="font-normal opacity-70">Apple</span> <span className="font-semibold">Pacces</span>
        </span>
      )}
    </span>
  )
}
