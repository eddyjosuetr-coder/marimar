import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn, formatWeight, gramosDesdeBolivares, redondearPeso, MINIMO_PESO_GR, PASO_PESO_GR } from '@/lib/utils'
import { aBolivares, formatBs, precioPublico } from '@/lib/tasa'

interface SelectorPesoProps {
  /** Precio por KG, en dólares. */
  precioPorKg: number
  tasa: number
  gramos: number
  onCambiar: (gramos: number) => void
}

type Modo = 'gramos' | 'bolivares'

const PESTAÑA = 'flex-1 h-9 rounded-full text-[13px] font-semibold transition-colors duration-200'
const CAMPO =
  'w-full h-12 px-4 rounded-xl bg-paper-sunken border border-line text-[16px] font-semibold text-ink ' +
  'tabular-nums outline-none focus:border-brand focus:ring-4 focus:ring-brand/15 transition-all duration-200'

/**
 * Cuánto se lleva de un producto que se vende al peso.
 *
 * Dos maneras de pedir lo mismo, porque en el mostrador se piden las dos:
 * por peso ("medio kilo de jamón") y por gasto ("dame dos mil de jamón").
 * Quien pide por gasto ve en qué peso se convierte antes de agregarlo.
 *
 * El peso manda siempre: los bolívares se convierten a gramos, se acomodan
 * hacia abajo al salto de la balanza y de ahí sale el precio. Por eso el
 * importe final puede quedar algo por debajo de lo que se escribió, nunca por
 * encima: es lo que va a marcar la balanza, y cobrar de más por redondear
 * sería peor que devolver unos bolívares.
 */
export function SelectorPeso({ precioPorKg, tasa, gramos, onCambiar }: SelectorPesoProps) {
  const [modo, setModo] = useState<Modo>('gramos')
  const [textoGramos, setTextoGramos] = useState(String(gramos))
  const [textoBolivares, setTextoBolivares] = useState('')

  const fijar = (valor: number) => {
    const limpio = redondearPeso(valor)
    onCambiar(limpio)
    setTextoGramos(String(limpio))
    return limpio
  }

  const desdeBolivares = (texto: string) => {
    setTextoBolivares(texto)
    const monto = Number(texto.replace(/\./g, '').replace(',', '.'))
    if (monto > 0) fijar(gramosDesdeBolivares(precioPorKg, monto, tasa))
  }

  return (
    <div className="mb-5">
      <div className="flex items-center gap-1 p-1 rounded-full bg-paper-sunken mb-3">
        <button
          type="button"
          onClick={() => setModo('gramos')}
          className={cn(PESTAÑA, modo === 'gramos' ? 'bg-paper-raised text-ink shadow-card' : 'text-ink-muted hover:text-ink')}
        >
          Por peso
        </button>
        <button
          type="button"
          onClick={() => setModo('bolivares')}
          className={cn(PESTAÑA, modo === 'bolivares' ? 'bg-paper-raised text-ink shadow-card' : 'text-ink-muted hover:text-ink')}
        >
          Por monto
        </button>
      </div>

      {modo === 'gramos' ? (
        <div className="flex items-center gap-2">
          <BotonPaso
            icono={<Minus className="w-4 h-4" strokeWidth={2.6} />}
            etiqueta={`Quitar ${PASO_PESO_GR} gramos`}
            onClick={() => fijar(gramos - PASO_PESO_GR)}
            inactivo={gramos <= MINIMO_PESO_GR}
          />
          <div className="relative flex-1">
            <label htmlFor="peso-gramos" className="sr-only">Gramos</label>
            <input
              id="peso-gramos"
              type="number"
              inputMode="numeric"
              min={MINIMO_PESO_GR}
              step={PASO_PESO_GR}
              value={textoGramos}
              onChange={e => setTextoGramos(e.target.value)}
              onBlur={e => fijar(Number(e.target.value))}
              className={cn(CAMPO, 'pr-10 text-center')}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-ink-muted pointer-events-none">gr</span>
          </div>
          <BotonPaso
            icono={<Plus className="w-4 h-4" strokeWidth={2.6} />}
            etiqueta={`Agregar ${PASO_PESO_GR} gramos`}
            onClick={() => fijar(gramos + PASO_PESO_GR)}
          />
        </div>
      ) : (
        <div>
          <div className="relative">
            <label htmlFor="peso-monto" className="sr-only">Cuánto quieres gastar, en bolívares</label>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-ink-muted pointer-events-none">Bs</span>
            <input
              id="peso-monto"
              type="text"
              inputMode="decimal"
              value={textoBolivares}
              onChange={e => desdeBolivares(e.target.value)}
              placeholder="2.000"
              className={cn(CAMPO, 'pl-10')}
            />
          </div>
          <p className="text-[12.5px] text-ink-muted mt-2">
            Escribe cuánto quieres gastar y te decimos cuánto te llevas. Nunca
            te cobramos más de lo que pones aquí.
          </p>
        </div>
      )}

      {/* Lo que va a salir: el peso que corta la balanza y su precio */}
      <div className="flex items-baseline justify-between gap-3 mt-3 pt-3 border-t border-line">
        <span className="text-[13px] text-ink-soft">
          Te llevas <span className="font-semibold text-ink">{formatWeight(gramos)}</span>
        </span>
        <span className="font-display text-[18px] font-extrabold text-ink tabular-nums">
          {precioPublico((precioPorKg * gramos) / 1000, tasa)}
        </span>
      </div>
      {modo === 'bolivares' && (
        <p className="text-[11.5px] text-ink-muted mt-1 tabular-nums">
          A Bs {formatBs(aBolivares(precioPorKg, tasa))} el KG
        </p>
      )}
    </div>
  )
}

function BotonPaso({ icono, etiqueta, onClick, inactivo }: {
  icono: React.ReactNode
  etiqueta: string
  onClick: () => void
  inactivo?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={inactivo}
      aria-label={etiqueta}
      className="flex-shrink-0 w-12 h-12 rounded-xl border border-line flex items-center justify-center text-ink-soft hover:border-ink/35 hover:text-ink disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
    >
      {icono}
    </button>
  )
}
