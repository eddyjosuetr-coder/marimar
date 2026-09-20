import { useMemo, useState } from 'react'
import { ArrowLeft, Search, Store, Tag, EyeOff, AlertTriangle } from 'lucide-react'
import { products } from '@/data/products'
import { useAjustes } from '@/hooks/useCatalogo'
import { ajustarProducto, limpiarAjustes, type Ajuste } from '@/lib/ajustes'
import { cn } from '@/lib/utils'
import { BrandLockup } from '@/components/BrandLockup'
import { ThemeToggle } from '@/components/ThemeToggle'
import { FilaAjuste } from './FilaAjuste'

/**
 * Panel del dueño: poner ofertas, corregir precios y ocultar productos.
 *
 * Trabaja sobre el catálogo CRUDO (`products`), no sobre el que ve el
 * cliente: el dueño tiene que poder ver lo que ocultó para devolverlo.
 *
 * Se carga aparte del resto de la tienda (`lazy`), así el cliente nunca
 * descarga este código ni lo encuentra husmeando en la página.
 */

type Pestana = 'todos' | 'ofertas' | 'ocultos' | 'cambiados'

const PESTANAS: { id: Pestana; texto: string }[] = [
  { id: 'todos', texto: 'Todos' },
  { id: 'ofertas', texto: 'En oferta' },
  { id: 'ocultos', texto: 'Ocultos' },
  { id: 'cambiados', texto: 'Con cambios' },
]

/** Cuántos se pintan de una vez: 290 fichas con foto de golpe pesan. */
const POR_TANDA = 40

export default function PanelAdmin() {
  const ajustes = useAjustes()
  const [busqueda, setBusqueda] = useState('')
  const [pestana, setPestana] = useState<Pestana>('todos')
  const [visibles, setVisibles] = useState(POR_TANDA)
  const [confirmandoLimpieza, setConfirmandoLimpieza] = useState(false)

  const enOferta = useMemo(
    () => products.filter(p => {
      const a = ajustes[p.id]
      return a?.oferta !== undefined && a.oferta < (a.precio ?? p.price)
    }).length,
    [ajustes]
  )
  const ocultos = useMemo(
    () => products.filter(p => ajustes[p.id]?.oculto).length,
    [ajustes]
  )

  const lista = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return products.filter(p => {
      const a = ajustes[p.id]
      if (pestana === 'ofertas' && !(a?.oferta !== undefined && a.oferta < (a.precio ?? p.price))) return false
      if (pestana === 'ocultos' && !a?.oculto) return false
      if (pestana === 'cambiados' && !a) return false
      if (!q) return true
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    })
  }, [ajustes, busqueda, pestana])

  const cambiar = (id: number, cambio: Ajuste | null) => ajustarProducto(id, cambio)

  const mostrarMenos = () => { setVisibles(POR_TANDA); setConfirmandoLimpieza(false) }
  const cambiarPestana = (id: Pestana) => { setPestana(id); mostrarMenos() }

  return (
    <div className="min-h-dvh bg-paper text-ink">

      <header className="sticky top-0 z-30 bg-paper-raised/95 backdrop-blur-sm border-b border-line">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <BrandLockup size="sm" compacto />
          <span className="hidden sm:inline text-[12px] font-bold uppercase tracking-[0.14em] text-brand-ink">
            Panel del dueño
          </span>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#/"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-ink text-paper text-[13.5px] font-semibold hover:bg-ink-soft transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.4} />
              Ver la tienda
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">

        {/* La versión de prueba no puede fingir que ya está en línea */}
        <div className="flex items-start gap-3 p-4 mb-7 rounded-xl border border-gold/45 bg-gold/10">
          <AlertTriangle className="w-5 h-5 text-gold-ink flex-shrink-0 mt-0.5" strokeWidth={2.2} />
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            <strong className="text-ink">Versión de prueba.</strong>{' '}
            Los cambios se guardan sólo en este navegador y en este equipo, para
            que puedas mostrar cómo funciona. Los clientes todavía no los ven en
            sus teléfonos: eso llega cuando conectemos la tienda a internet.
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-display-sm font-extrabold text-ink">
              Ofertas y precios
            </h1>
            <p className="text-[14px] text-ink-muted mt-1.5">
              Escribe el precio de oferta y el producto sale marcado en la tienda.
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-[13px]">
            <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-brand-tint text-brand-ink font-semibold tabular-nums">
              <Tag className="w-3.5 h-3.5" strokeWidth={2.4} />
              {enOferta} en oferta
            </span>
            <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-paper-sunken text-ink-soft font-semibold tabular-nums">
              <EyeOff className="w-3.5 h-3.5" strokeWidth={2.4} />
              {ocultos} ocultos
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-paper-sunken text-ink-soft font-semibold tabular-nums">
              <Store className="w-3.5 h-3.5" strokeWidth={2.4} />
              {products.length - ocultos} en la tienda
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex items-center gap-2.5 h-11 px-4 flex-1 rounded-full bg-paper-raised border border-line focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 transition-all">
            <Search className="w-4 h-4 text-ink-muted flex-shrink-0" strokeWidth={2.2} />
            <label htmlFor="buscar-producto" className="sr-only">Buscar producto</label>
            <input
              id="buscar-producto"
              type="search"
              value={busqueda}
              onChange={e => { setBusqueda(e.target.value); mostrarMenos() }}
              placeholder="Buscar producto o marca…"
              className="w-full bg-transparent outline-none text-[14px] text-ink placeholder:text-ink-muted"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-full bg-paper-sunken overflow-x-auto">
            {PESTANAS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => cambiarPestana(p.id)}
                aria-pressed={pestana === p.id}
                className={cn(
                  'h-9 px-3.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors',
                  pestana === p.id
                    ? 'bg-paper-raised text-ink shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                )}
              >
                {p.texto}
              </button>
            ))}
          </div>
        </div>

        {lista.length > 0 ? (
          <>
            <ul className="space-y-2.5">
              {lista.slice(0, visibles).map(producto => (
                <FilaAjuste
                  key={producto.id}
                  producto={producto}
                  ajuste={ajustes[producto.id]}
                  onCambio={cambiar}
                />
              ))}
            </ul>

            {lista.length > visibles && (
              <button
                type="button"
                onClick={() => setVisibles(v => v + POR_TANDA)}
                className="mt-5 w-full h-12 rounded-xl border border-line bg-paper-raised text-[14px] font-semibold text-ink hover:border-ink/35 transition-colors"
              >
                Ver más productos ({lista.length - visibles} restantes)
              </button>
            )}
          </>
        ) : (
          <p className="py-16 text-center text-[14px] text-ink-muted border border-dashed border-line-strong rounded-2xl">
            Ningún producto coincide con la búsqueda.
          </p>
        )}

        {(enOferta > 0 || ocultos > 0) && (
          <div className="mt-10 pt-6 border-t border-line">
            {confirmandoLimpieza ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[13.5px] text-ink">
                  ¿Seguro? Se quitan todas las ofertas y vuelven los precios de la lista.
                </span>
                <button
                  type="button"
                  onClick={() => { limpiarAjustes(); setConfirmandoLimpieza(false) }}
                  className="h-10 px-4 rounded-full bg-destructive text-destructive-foreground text-[13px] font-semibold hover:brightness-95 transition-all"
                >
                  Sí, dejar todo como estaba
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmandoLimpieza(false)}
                  className="h-10 px-4 rounded-full border border-line text-[13px] font-semibold text-ink-soft hover:text-ink transition-colors"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmandoLimpieza(true)}
                className="text-[13px] font-semibold text-ink-muted hover:text-destructive transition-colors"
              >
                Quitar todas las ofertas y cambios
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
