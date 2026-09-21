import { useTasa } from '@/hooks/useTasa'
import { aBolivares, formatBs } from '@/lib/tasa'
import { cn } from '@/lib/utils'

interface PrecioBsProps {
  /** Importe en dólares. Se convierte con la tasa vigente. */
  dolares: number
  className?: string
}

/**
 * El precio en bolívares, debajo del dólar.
 *
 * Si no hay tasa —primera visita sin internet y sin nada guardado— no
 * escribe nada. Mejor que el cliente vea sólo el dólar a que vea un
 * bolívar inventado que en la tienda no le van a cobrar.
 */
export function PrecioBs({ dolares, className }: PrecioBsProps) {
  const { valor } = useTasa()
  if (valor === null) return null

  return (
    <span className={cn('block text-[11.5px] font-semibold text-ink-muted tabular-nums', className)}>
      Bs {formatBs(aBolivares(dolares, valor))}
    </span>
  )
}
