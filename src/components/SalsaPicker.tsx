import { Minus, Plus } from 'lucide-react'
import { SALSAS_COMBO, totalElegidas } from '@/lib/salsas'
import { cn } from '@/lib/utils'

interface SalsaPickerProps {
  /** Cuántas salsas incluye el combo. */
  total: number
  /** Cantidad elegida de cada salsa, por id de producto. */
  value: Record<number, number>
  onChange: (next: Record<number, number>) => void
}

/**
 * Selector de salsas de un combo.
 *
 * Cada salsa tiene su propio contador, así se puede repetir (dos de cheddar y
 * una de maíz) sin inventar reglas raras. El + se bloquea cuando ya se
 * eligieron todas y el contador de arriba dice cuántas faltan, así el cliente
 * nunca se queda preguntándose por qué no puede agregar el combo.
 */
export function SalsaPicker({ total, value, onChange }: SalsaPickerProps) {
  const elegidas = totalElegidas(value)
  const completo = elegidas >= total

  const cambiar = (id: number, delta: number) => {
    const actual = value[id] ?? 0
    const siguiente = Math.max(0, actual + delta)
    if (delta > 0 && completo) return
    onChange({ ...value, [id]: siguiente })
  }

  return (
    <fieldset className="mb-6">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <legend className="font-display text-[16px] font-bold text-ink">
          Elige tus {total} salsas
        </legend>
        <span
          className={cn(
            'text-[12px] font-bold tabular-nums rounded-full px-2.5 py-1 transition-colors',
            completo ? 'bg-leaf/15 text-leaf' : 'bg-brand-tint text-brand-ink'
          )}
          aria-live="polite"
        >
          {elegidas} de {total}
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-1.5">
        {SALSAS_COMBO.map(salsa => {
          const cantidad = value[salsa.id] ?? 0
          return (
            <li
              key={salsa.id}
              className={cn(
                'flex items-center gap-2.5 p-2 rounded-xl border transition-colors',
                cantidad > 0 ? 'border-brand/50 bg-brand-tint/60' : 'border-line bg-paper'
              )}
            >
              <img
                src={salsa.image}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                className="w-9 h-9 p-0.5 rounded-md bg-vitrina object-contain flex-shrink-0"
              />
              <span className="flex-1 min-w-0 text-[13.5px] font-medium text-ink leading-tight truncate">
                {salsa.nombre}
              </span>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => cambiar(salsa.id, -1)}
                  disabled={cantidad === 0}
                  className="tap-inline w-7 h-7 rounded-full flex items-center justify-center text-ink-soft hover:bg-paper-sunken disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label={`Quitar una salsa ${salsa.nombre}`}
                >
                  <Minus className="w-3.5 h-3.5" strokeWidth={2.6} />
                </button>
                <span className="w-5 text-center text-[13px] font-bold text-ink tabular-nums" aria-label={`${cantidad} de ${salsa.nombre}`}>
                  {cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => cambiar(salsa.id, 1)}
                  disabled={completo}
                  className="tap-inline w-7 h-7 rounded-full flex items-center justify-center text-ink-soft hover:bg-paper-sunken disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label={`Agregar una salsa ${salsa.nombre}`}
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.6} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
