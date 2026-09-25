import { useEffect, useRef, useState } from 'react'
import { X, CheckCircle2, Package, Plus, MessageCircle } from 'lucide-react'
import type { Product } from '@/types'
import { getPackaging, productLabel, formatWeight, MINIMO_PESO_GR } from '@/lib/utils'
import { waLink } from '@/lib/negocio'
import { ProductImage } from './ProductImage'
import { useTasa } from '@/hooks/useTasa'
import { precioPublico, precioReferencia, aBolivares, formatBs } from '@/lib/tasa'
import { flyToCart } from '@/lib/flyToCart'
import { nombresElegidos, totalElegidas } from '@/lib/salsas'
import { SalsaPicker } from './SalsaPicker'
import { SelectorColor } from './SelectorColor'
import { SelectorPeso } from './SelectorPeso'
import { EtiquetaProducto } from './EtiquetaProducto'

interface QuickViewProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (p: Product, salsas?: string[], variante?: string, cantidad?: number) => void
}

export function QuickView({ product, onClose, onAddToCart }: QuickViewProps) {
  const fotoRef = useRef<HTMLDivElement>(null)
  const { valor: tasa } = useTasa()

  /*
    El color elegido se guarda junto al producto al que pertenece, en vez de
    reiniciarse con un efecto: así, al abrir otra ficha, el color vuelve solo
    al primero sin un render intermedio con el color del producto anterior.
  */
  const [eleccion, setEleccion] = useState<{ id: number; color: string } | null>(null)
  const color = eleccion && product && eleccion.id === product.id
    ? eleccion.color
    : product?.colores?.[0]?.nombre
  const elegirColor = (nombre: string) => {
    if (product) setEleccion({ id: product.id, color: nombre })
  }
  const foto = product?.colores?.find(c => c.nombre === color)?.imagen ?? product?.image

  /* Igual que el color: el peso se guarda junto al producto al que pertenece,
     para que al abrir otra ficha vuelva solo al mínimo. */
  const [pesado, setPesado] = useState<{ id: number; gramos: number } | null>(null)
  const gramos = pesado && product && pesado.id === product.id ? pesado.gramos : MINIMO_PESO_GR
  const elegirPeso = (valor: number) => {
    if (product) setPesado({ id: product.id, gramos: valor })
  }

  /* Mismo gesto que en la ficha: el producto vuela al carrito y el diálogo cierra. */
  const agregar = (salsas?: string[], cantidad?: number) => {
    if (!product) return
    flyToCart(fotoRef.current, foto ?? product.image)
    onAddToCart(product, salsas, color, cantidad)
    onClose()
  }

  // Escape cierra el diálogo y el fondo no debe desplazarse detrás de él.
  useEffect(() => {
    if (!product) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  const packaging = getPackaging(product.name)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="absolute inset-0 bg-espresso/65 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto custom-scrollbar bg-paper-raised rounded-2xl shadow-lift animate-scale-in flex flex-col md:flex-row">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-paper-raised/90 backdrop-blur-sm border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:bg-paper-sunken transition-colors"
          aria-label="Cerrar vista rápida"
        >
          <X className="w-5 h-5" strokeWidth={2.2} />
        </button>

        {/* Imagen */}
        <div ref={fotoRef} className="relative w-full md:w-1/2 vitrina-panel flex items-center justify-center p-8 md:p-12 min-h-[280px]">
          <EtiquetaProducto product={product} grande className="absolute top-5 left-5" />
          <ProductImage
            product={product.colores && foto ? { ...product, image: foto } : product}
            className="max-w-sm"
          />
        </div>

        {/* Ficha */}
        <div className="w-full md:w-1/2 p-7 md:p-10 flex flex-col">
          <p className="text-eyebrow font-bold uppercase text-ink-muted mb-3">
            {product.brand}
          </p>

          <h2 className="font-display text-display-sm font-extrabold text-ink mb-6">
            {productLabel(product.name)}
          </h2>

          {/*
            El precio en pisos, no en una fila: con una rebaja grande la cifra
            de antes y el ahorro no caben al lado del precio y se partían los
            números por la mitad. Cada cifra lleva `whitespace-nowrap` porque
            un precio cortado en dos renglones no se lee, se adivina.
          */}
          <div className="pb-6 mb-6 border-b border-line">
            {product.priceOnRequest ? (
              <span className="font-display text-[28px] font-extrabold text-ink-soft leading-none tracking-tight">
                Precio a consultar
              </span>
            ) : (
              <>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-display text-[34px] md:text-[38px] font-extrabold text-ink leading-none tracking-tight tabular-nums whitespace-nowrap">
                    {precioPublico(product.price, tasa)}
                  </span>
                  {product.soldByWeight && (
                    <span className="text-[15px] font-semibold text-ink-muted">/ KG</span>
                  )}
                </div>

                {/* La divisa acompaña al bolívar; nunca compite con él */}
                <p className="mt-2.5 text-[13px] font-medium text-ink-muted tabular-nums">
                  {precioReferencia(product.price)}{product.soldByWeight && ' / KG'}
                </p>

                {product.listPrice !== undefined && (
                  <div className="mt-3.5 flex items-center gap-2.5 flex-wrap">
                    <span className="text-[16px] font-semibold text-ink-muted tabular-nums whitespace-nowrap">
                      Antes{' '}
                      <span className="line-through">{precioPublico(product.listPrice, tasa)}</span>
                    </span>
                    <span className="text-[12.5px] font-extrabold uppercase tracking-wide text-white bg-brand rounded-md px-2 py-1 whitespace-nowrap">
                      Ahorras Bs {formatBs(aBolivares(product.listPrice - product.price, tasa))}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {product.soldByWeight && !product.priceOnRequest && (
            <SelectorPeso
              precioPorKg={product.price}
              tasa={tasa}
              gramos={gramos}
              onCambiar={elegirPeso}
            />
          )}

          {product.colores && color && (
            <div className="pb-6 mb-6 border-b border-line">
              <SelectorColor
                colores={product.colores}
                elegido={color}
                onElegir={elegirColor}
                grande
              />
            </div>
          )}

          {product.description && (
            <p className="text-[15px] leading-relaxed text-ink-soft mb-6">
              {product.description}
            </p>
          )}

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-[14px] text-ink-soft">
              <CheckCircle2 className="w-[18px] h-[18px] text-leaf flex-shrink-0 mt-0.5" strokeWidth={2.2} />
              Disponibilidad inmediata en almacén principal
            </li>
            {/* Al peso esta línea sobraba: el selector de abajo ya dice desde
                cuánto se puede pedir, y la descripción lo repetía otra vez. */}
            {!product.soldByWeight && (
              <li className="flex items-start gap-3 text-[14px] text-ink-soft">
                <Package className="w-[18px] h-[18px] text-brand flex-shrink-0 mt-0.5" strokeWidth={2.2} />
                {/* Un solo nodo de texto: si no, cada trozo es un hijo flex y se reparten a lo ancho */}
                <span>
                  Presentación: <span className="font-semibold text-ink">{packaging}</span>
                </span>
              </li>
            )}
          </ul>

          <Compra key={product.id} product={product} gramos={gramos} onAgregar={agregar} />
        </div>
      </div>
    </div>
  )
}

/**
 * Botón de compra de la vista rápida.
 *
 * Vive en su propio componente con `key` por producto: al abrir otro producto
 * las salsas elegidas se reinician solas, sin efectos que limpien a mano.
 */
function Compra({ product, gramos, onAgregar }: {
  product: Product
  /** Lo que el cliente eligió arriba, en gramos, si se vende al peso. */
  gramos: number
  onAgregar: (salsas?: string[], cantidad?: number) => void
}) {
  const [salsas, setSalsas] = useState<Record<number, number>>({})
  const requeridas = product.comboSalsas ?? 0
  const faltan = requeridas - totalElegidas(salsas)

  if (product.priceOnRequest) {
    return (
      <a
        href={waLink(product.name)}
        target="_blank"
        rel="noopener noreferrer"
        data-tap-target
        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-leaf text-white font-semibold text-[15px] hover:brightness-95 active:scale-[0.99] transition-all duration-200"
      >
        <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2.4} />
        Consultar precio por WhatsApp
      </a>
    )
  }

  return (
    <>
      {requeridas > 0 && (
        <SalsaPicker total={requeridas} value={salsas} onChange={setSalsas} />
      )}
      <button
        type="button"
        onClick={() => onAgregar(
          requeridas > 0 ? nombresElegidos(salsas) : undefined,
          product.soldByWeight ? gramos : undefined,
        )}
        disabled={faltan > 0}
        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-brand text-white font-semibold text-[15px] shadow-brand hover:bg-brand-deep active:scale-[0.99] disabled:bg-line-strong disabled:text-ink-soft disabled:shadow-none disabled:pointer-events-none transition-all duration-200"
      >
        <Plus className="w-[18px] h-[18px]" strokeWidth={2.6} />
        {faltan > 0
          ? `Elige ${faltan} ${faltan === 1 ? 'salsa más' : 'salsas más'}`
          : product.soldByWeight ? `Agregar ${formatWeight(gramos)}`
          : requeridas > 0 ? 'Agregar combo al pedido'
          : 'Agregar al pedido'}
      </button>
    </>
  )
}
