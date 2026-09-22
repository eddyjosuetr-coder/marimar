import { Truck, ShieldCheck, Boxes, Award } from 'lucide-react'
import { products, CATEGORIES } from '@/data/products'
import { FORMAS_DE_PAGO } from '@/lib/negocio'

/* Las cifras salen del catálogo: si se quedan a mano contradicen a la portada. */
const TOTAL_PRODUCTOS = products.length
const TOTAL_MARCAS = new Set(products.map(p => p.brand)).size
const TOTAL_CATEGORIAS = CATEGORIES.length - 1 // menos "Todos"

const STATS = [
  { icon: Boxes, stat: String(TOTAL_PRODUCTOS), title: 'Productos', desc: 'Todos con foto propia' },
  { icon: Award, stat: String(TOTAL_MARCAS), title: 'Marcas', desc: 'Fritz · Mavesa · La Viña' },
  { icon: Truck, stat: String(TOTAL_CATEGORIAS), title: 'Categorías', desc: 'De la salsa al congelado' },
  { icon: ShieldCheck, stat: '100%', title: 'Pago seguro', desc: FORMAS_DE_PAGO.join(' · ') },
] as const

/**
 * Banda de confianza: se lee como el pie de imprenta de un catálogo,
 * separada por hairlines en vez de cuatro tarjetas idénticas.
 */
export function TrustBar() {
  return (
    <section className="bg-paper border-b border-line" aria-label="Por qué comprar en Distribuidora Marimar">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((item, i) => (
            <div
              key={item.title}
              className={[
                'flex items-start gap-3.5 py-6 lg:py-7',
                // Hairlines internas: verticales en escritorio, retícula en móvil
                i % 2 === 1 ? 'pl-5 sm:pl-7 border-l border-line' : 'pr-5',
                i >= 2 ? 'border-t border-line lg:border-t-0' : '',
                i === 2 ? 'lg:pl-5 xl:pl-7 lg:border-l lg:border-line' : '',
              ].join(' ')}
            >
              <item.icon className="w-5 h-5 text-brand-ink flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
              <div className="min-w-0">
                <dt className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-display text-[22px] lg:text-[26px] font-extrabold text-ink leading-none tracking-tight">
                    {item.stat}
                  </span>
                  <span className="text-[13px] lg:text-[14px] font-semibold text-ink">
                    {item.title}
                  </span>
                </dt>
                <dd className="text-[12px] lg:text-[13px] text-ink-muted mt-1.5 truncate">
                  {item.desc}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
