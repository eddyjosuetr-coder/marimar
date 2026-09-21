import { useMemo } from 'react'
import { Printer, ArrowLeft, Package, MapPin, User } from 'lucide-react'
import { products } from '@/data/products'
import { leerPedido, type LineaPedido } from '@/lib/pedido'
import { formatAmount, formatWeight, lineTotal, productLabel } from '@/lib/utils'
import { formatTasa, precioPublico } from '@/lib/tasa'
import { BrandLockup } from '@/components/BrandLockup'
import { ProductImage } from '@/components/ProductImage'

/**
 * El pedido con fotos, para quien lo despacha.
 *
 * Es la respuesta a "¿se pueden mandar las fotos por WhatsApp?": no se puede
 * —un enlace de WhatsApp sólo lleva texto—, pero sí se puede mandar un
 * enlace a esta página, que arma el pedido desde los datos que van dentro
 * del propio enlace. Sin servidor y sin base de datos.
 *
 * Está pensada para el mostrador: fotos grandes, cantidades destacadas y un
 * botón de imprimir para que la hoja baje al almacén.
 */

interface VistaPedidoProps {
  /** Lo que viene después de #/pedido/ en la dirección. */
  codificado: string
}

export default function VistaPedido({ codificado }: VistaPedidoProps) {
  const pedido = useMemo(() => leerPedido(codificado), [codificado])

  if (!pedido) return <PedidoIlegible />

  const total = pedido.lineas.reduce((suma, linea) => suma + importe(linea), 0)
  const articulos = pedido.lineas.reduce(
    (suma, linea) => suma + (esAlPeso(linea) ? 1 : linea.cantidad), 0)

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="border-b border-line bg-paper-raised print:border-0">
        <div className="max-w-[860px] mx-auto px-5 py-4 flex items-center gap-3">
          <BrandLockup size="sm" />
          {/* En el teléfono los dos botones con texto no caben junto al logo:
              el de la tienda se retira y el de imprimir se queda en icono. */}
          <a
            href="#/"
            className="ml-auto hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full border border-line text-[13.5px] font-semibold text-ink-soft hover:text-ink hover:border-ink/35 transition-colors print:hidden"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.4} />
            Ir a la tienda
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            aria-label="Imprimir el pedido"
            className="ml-auto sm:ml-0 inline-flex items-center gap-2 h-10 w-10 sm:w-auto justify-center sm:px-4 rounded-full bg-ink text-paper text-[13.5px] font-semibold hover:bg-ink-soft transition-colors print:hidden"
          >
            <Printer className="w-4 h-4" strokeWidth={2.4} />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>
      </header>

      <main className="max-w-[860px] mx-auto px-5 py-8">

        <div className="flex flex-wrap items-end justify-between gap-4 pb-5 mb-6 border-b border-line">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-ink mb-1.5">
              Pedido recibido
            </p>
            <h1 className="font-display text-[32px] font-extrabold text-ink leading-none tracking-tight">
              {pedido.codigo}
            </h1>
          </div>
          <p className="text-[14px] text-ink-muted">
            <span className="font-display text-[22px] font-extrabold text-ink tabular-nums align-middle mr-1.5">
              {pedido.lineas.length}
            </span>
            {pedido.lineas.length === 1 ? 'producto' : 'productos'}
            <span className="mx-2 text-line-strong">·</span>
            {articulos} {articulos === 1 ? 'artículo' : 'artículos'}
          </p>
        </div>

        <dl className="grid sm:grid-cols-2 gap-3 mb-8">
          <Dato icono={<User className="w-4 h-4" strokeWidth={2.2} />} titulo="Cliente"
                valor={pedido.cliente.nombre || 'No indicado'} />
          <Dato icono={<MapPin className="w-4 h-4" strokeWidth={2.2} />} titulo="Entrega"
                valor={pedido.cliente.zona || 'No indicada'} />
        </dl>

        <ul className="space-y-3">
          {pedido.lineas.map((linea, i) => (
            <Fila key={`${linea.id}-${i}`} linea={linea} posicion={i + 1} tasa={pedido.tasa} />
          ))}
        </ul>

        <div className="mt-6 pt-5 border-t border-line flex items-baseline justify-between gap-4">
          <span className="font-display text-[18px] font-bold text-ink">Total</span>
          <span className="text-right">
            {/* Con la tasa del día en que se pidió, no con la de hoy */}
            <span className="block font-display text-[30px] font-extrabold text-ink tabular-nums tracking-tight">
              {pedido.tasa === null ? `USD ${formatAmount(total)}` : precioPublico(total, pedido.tasa)}
            </span>
            {pedido.tasa !== null && (
              <span className="block text-[12.5px] text-ink-muted mt-1 tabular-nums">
                USD {formatAmount(total)} · tasa {formatTasa(pedido.tasa)}
              </span>
            )}
          </span>
        </div>

        <p className="mt-6 text-[12.5px] leading-relaxed text-ink-muted">
          Los precios y la tasa son los del momento en que el cliente hizo el
          pedido. Si algo cambió después, manda la lista vigente.
        </p>
      </main>
    </div>
  )
}

/* ── Piezas ───────────────────────────────────────────────────────────── */

const catalogo = new Map(products.map(p => [p.id, p]))

const esAlPeso = (linea: LineaPedido) => catalogo.get(linea.id)?.soldByWeight === true

function importe(linea: LineaPedido): number {
  return lineTotal({ price: linea.precio, soldByWeight: esAlPeso(linea) }, linea.cantidad)
}

function Dato({ icono, titulo, valor }: { icono: React.ReactNode; titulo: string; valor: string }) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-paper-raised border border-line">
      <span className="text-brand-ink mt-0.5">{icono}</span>
      <div className="min-w-0">
        <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">{titulo}</dt>
        <dd className="text-[15px] font-semibold text-ink break-words">{valor}</dd>
      </div>
    </div>
  )
}

function Fila({ linea, posicion, tasa }: { linea: LineaPedido; posicion: number; tasa: number | null }) {
  const producto = catalogo.get(linea.id)
  const cantidad = producto?.soldByWeight
    ? formatWeight(linea.cantidad)
    : `${linea.cantidad} und`
  const unitario = producto?.soldByWeight
    ? `${formatAmount(linea.precio)} por KG`
    : `${formatAmount(linea.precio)} c/u`

  /*
    La fila envuelve: en un teléfono no caben en la misma línea la foto, el
    nombre y las cifras, y forzarlo desbordaba la pantalla. Al envolver, los
    números bajan a su propia línea y siguen alineados a la derecha.
  */
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-2 p-3 rounded-xl bg-paper-raised border border-line break-inside-avoid">
      <span className="w-6 flex-shrink-0 text-center font-display text-[15px] font-extrabold text-ink-muted tabular-nums">
        {posicion}
      </span>

      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg bg-vitrina p-1.5">
        {producto
          ? <ProductImage product={producto} />
          : <span className="w-full h-full flex items-center justify-center text-ink-muted">
              <Package className="w-6 h-6" strokeWidth={1.8} />
            </span>}
      </div>

      <div className="min-w-0 flex-1 basis-[130px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-muted truncate">
          {producto?.brand ?? 'Producto retirado del catálogo'}
        </p>
        <p className="text-[15px] font-semibold text-ink leading-snug">
          {producto ? productLabel(producto.name) : `Referencia ${linea.id}`}
        </p>
        {linea.salsas.length > 0 && (
          <p className="text-[12.5px] text-ink-soft mt-0.5">
            <span className="font-semibold text-ink">Salsas:</span> {linea.salsas.join(' · ')}
          </p>
        )}
      </div>

      <div className="text-right flex-shrink-0 ml-auto">
        {/* La cantidad manda: es lo que se busca al preparar la caja */}
        <p className="font-display text-[20px] font-extrabold text-ink leading-none tabular-nums">
          {cantidad}
        </p>
        <p className="text-[11.5px] text-ink-muted mt-1 tabular-nums">{unitario}</p>
        <p className="text-[14px] font-semibold text-ink mt-1 tabular-nums">
          {tasa === null ? `USD ${formatAmount(importe(linea))}` : precioPublico(importe(linea), tasa)}
        </p>
        {tasa !== null && (
          <p className="text-[11.5px] text-ink-muted tabular-nums">
            USD {formatAmount(importe(linea))}
          </p>
        )}
      </div>
    </li>
  )
}

function PedidoIlegible() {
  return (
    <div className="min-h-dvh bg-paper text-ink flex items-center justify-center px-5">
      <div className="max-w-[420px] text-center">
        <Package className="w-12 h-12 text-ink-muted/50 mx-auto mb-5" strokeWidth={1.5} />
        <h1 className="font-display text-[24px] font-extrabold text-ink mb-2">
          No se pudo leer este pedido
        </h1>
        <p className="text-[14.5px] text-ink-soft mb-6">
          El enlace llegó incompleto. Suele pasar cuando se copia a medias:
          pídele al cliente que lo reenvíe entero, o revisa el mensaje original
          de WhatsApp, que trae el pedido escrito.
        </p>
        <a
          href="#/"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-brand text-white font-semibold text-[14.5px] hover:bg-brand-deep transition-colors"
        >
          Ir a la tienda
        </a>
      </div>
    </div>
  )
}
