import { useState } from 'react'
import { Eye, EyeOff, RotateCcw, Tag } from 'lucide-react'
import type { Product } from '@/types'
import type { Ajuste } from '@/lib/ajustes'
import { formatAmount, productLabel, cn } from '@/lib/utils'
import { ProductImage } from '@/components/ProductImage'
import { parsearPrecio } from './precio'

interface FilaAjusteProps {
  /** El producto como está en el catálogo, sin ajustes encima. */
  producto: Product
  ajuste?: Ajuste
  onCambio: (id: number, cambio: Ajuste | null) => void
}

const CAMPO =
  'w-full h-10 px-3 rounded-lg bg-paper border border-line text-[14px] text-ink tabular-nums ' +
  'outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all placeholder:text-ink-muted'

export function FilaAjuste({ producto, ajuste, onCambio }: FilaAjusteProps) {
  const precioLista = producto.price
  const precioBase = ajuste?.precio ?? precioLista

  /* Se escribe como se habla aquí: con coma decimal. */
  const conComa = (valor: number) => valor.toFixed(2).replace('.', ',')

  const [precio, setPrecio] = useState(ajuste?.precio !== undefined ? conComa(ajuste.precio) : '')
  const [oferta, setOferta] = useState(ajuste?.oferta !== undefined ? conComa(ajuste.oferta) : '')
  const [error, setError] = useState('')

  const oculto = ajuste?.oculto === true
  const enOferta = ajuste?.oferta !== undefined && ajuste.oferta < precioBase
  const tocado = ajuste !== undefined

  /* Se confirma al salir del campo o con Enter, no en cada tecla: escribir
     "2" camino de "2,80" no puede llegar a guardarse como precio. */
  const confirmarPrecio = () => {
    if (precio.trim() === '') {
      onCambio(producto.id, { precio: undefined })
      setError('')
      return
    }
    const valor = parsearPrecio(precio)
    if (valor === null) {
      setError('Escribe un precio mayor que cero, por ejemplo 2,80')
      return
    }
    setPrecio(conComa(valor))
    setError('')
    onCambio(producto.id, { precio: valor })
  }

  const confirmarOferta = () => {
    if (oferta.trim() === '') {
      onCambio(producto.id, { oferta: undefined })
      setError('')
      return
    }
    const valor = parsearPrecio(oferta)
    if (valor === null) {
      setError('Escribe un precio de oferta mayor que cero')
      return
    }
    if (valor >= precioBase) {
      setError(`La oferta tiene que ser menor que ${formatAmount(precioBase)}`)
      return
    }
    setOferta(conComa(valor))
    setError('')
    onCambio(producto.id, { oferta: valor })
  }

  const restaurar = () => {
    setPrecio('')
    setOferta('')
    setError('')
    onCambio(producto.id, null)
  }

  return (
    <li
      className={cn(
        'rounded-xl border bg-paper-raised p-3 md:p-4 transition-colors',
        enOferta ? 'border-brand/45' : 'border-line',
        oculto && 'opacity-60'
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">

        <div className="flex items-center gap-3 min-w-0 md:w-[320px] md:flex-shrink-0">
          <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-vitrina p-1">
            <ProductImage product={producto} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-muted truncate">
              {producto.brand}
            </p>
            <p className="text-[13.5px] font-medium text-ink leading-snug line-clamp-2">
              {productLabel(producto.name)}
            </p>
            <p className="text-[11.5px] text-ink-muted tabular-nums mt-0.5">
              Lista: {formatAmount(precioLista)}
              {producto.soldByWeight && ' por KG'}
            </p>
          </div>
        </div>

        <div className="flex items-end gap-2.5 md:gap-3 md:ml-auto">
          <div className="w-[104px]">
            <label
              htmlFor={`precio-${producto.id}`}
              className="block text-[10px] font-bold uppercase tracking-[0.12em] text-ink-muted mb-1"
            >
              Precio
            </label>
            <input
              id={`precio-${producto.id}`}
              inputMode="decimal"
              value={precio}
              placeholder={conComa(precioLista)}
              onChange={e => setPrecio(e.target.value)}
              onBlur={confirmarPrecio}
              onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur() }}
              className={CAMPO}
            />
          </div>

          <div className="w-[104px]">
            <label
              htmlFor={`oferta-${producto.id}`}
              className="block text-[10px] font-bold uppercase tracking-[0.12em] text-brand-ink mb-1"
            >
              Oferta
            </label>
            <input
              id={`oferta-${producto.id}`}
              inputMode="decimal"
              value={oferta}
              placeholder="—"
              onChange={e => setOferta(e.target.value)}
              onBlur={confirmarOferta}
              onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur() }}
              className={cn(CAMPO, enOferta && 'border-brand/60 bg-brand-tint/40 font-semibold')}
            />
          </div>

          <button
            type="button"
            onClick={() => onCambio(producto.id, { oculto: !oculto })}
            aria-pressed={oculto}
            className="h-10 w-10 flex-shrink-0 rounded-lg border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/35 transition-colors"
            title={oculto ? 'Mostrar en la tienda' : 'Ocultar de la tienda'}
            aria-label={oculto ? `Mostrar ${producto.name} en la tienda` : `Ocultar ${producto.name} de la tienda`}
          >
            {oculto ? <EyeOff className="w-4 h-4" strokeWidth={2.2} /> : <Eye className="w-4 h-4" strokeWidth={2.2} />}
          </button>

          <button
            type="button"
            onClick={restaurar}
            disabled={!tocado}
            className="h-10 w-10 flex-shrink-0 rounded-lg border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/35 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Dejarlo como estaba"
            aria-label={`Dejar ${producto.name} como estaba`}
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {(enOferta || oculto || error) && (
        <div className="flex flex-wrap items-center gap-2 mt-2.5 pl-[60px] md:pl-0">
          {enOferta && (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-brand-ink">
              <Tag className="w-3.5 h-3.5" strokeWidth={2.4} />
              En oferta: {formatAmount(precioBase)} → {formatAmount(ajuste!.oferta!)}
            </span>
          )}
          {oculto && (
            <span className="text-[11.5px] font-semibold text-ink-muted">
              Oculto: los clientes no lo ven
            </span>
          )}
          {error && (
            <span role="alert" className="text-[11.5px] font-semibold text-destructive">
              {error}
            </span>
          )}
        </div>
      )}
    </li>
  )
}
