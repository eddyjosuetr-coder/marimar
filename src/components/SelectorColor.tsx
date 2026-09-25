import { cn } from '@/lib/utils'

interface SelectorColorProps {
  colores: { nombre: string; imagen: string }[]
  elegido: string
  onElegir: (nombre: string) => void
  /** En la vista ampliada hay sitio para muestras más grandes y su rótulo. */
  grande?: boolean
  className?: string
}

/**
 * Las muestras de color de un producto que se vende en varios.
 *
 * La muestra es un recorte de la propia fotografía, no un círculo de color
 * plano: estos papeles son a cuadros y a rayas, y un punto amarillo liso no
 * dice si el que llega es liso o estampado. Al elegir, la foto grande de la
 * ficha cambia a ese color.
 */
export function SelectorColor({ colores, elegido, onElegir, grande = false, className }: SelectorColorProps) {
  if (colores.length < 2) return null

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {grande && (
        <span className="text-[12px] font-semibold text-ink-soft mr-0.5">Color:</span>
      )}
      {colores.map(color => {
        const activo = color.nombre === elegido
        return (
          <button
            type="button"
            key={color.nombre}
            onClick={event => {
              /* La ficha entera abre la vista rápida: elegir color no debe
                 abrirla ni mandar el producto al carrito. */
              event.stopPropagation()
              event.preventDefault()
              onElegir(color.nombre)
            }}
            aria-pressed={activo}
            aria-label={`Color ${color.nombre}`}
            title={color.nombre}
            className={cn(
              'relative rounded-full overflow-hidden transition-all duration-200 flex-shrink-0',
              grande ? 'w-10 h-10' : 'w-7 h-7',
              activo
                ? 'ring-2 ring-brand ring-offset-2 ring-offset-paper-raised'
                : 'ring-1 ring-line hover:ring-ink/40'
            )}
          >
            <img
              src={color.imagen}
              alt=""
              loading="lazy"
              /* La foto trae aire alrededor del producto: se amplía para que
                 la muestra enseñe el estampado y no el margen vacío. */
              className="w-full h-full object-cover scale-[1.8]"
            />
          </button>
        )
      })}
      {grande && <span className="text-[13px] text-ink-soft">{elegido}</span>}
    </div>
  )
}
