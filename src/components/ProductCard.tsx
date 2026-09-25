import { useRef, useState } from 'react'
import { Eye, Plus, Check, MessageCircle, ListChecks, Scale } from 'lucide-react'
import type { Product } from '@/types'
import { getPackaging, cn, productLabel } from '@/lib/utils'
import { waLink } from '@/lib/negocio'
import { ProductImage } from './ProductImage'
import { useTasa } from '@/hooks/useTasa'
import { precioPublico, precioReferencia } from '@/lib/tasa'
import { flyToCart } from '@/lib/flyToCart'
import { EtiquetaProducto } from './EtiquetaProducto'
import { SelectorColor } from './SelectorColor'

interface ProductCardProps {
  product: Product
  onAddToCart: (p: Product, salsas?: string[], variante?: string) => void
  onQuickView: (p: Product) => void
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const packaging = getPackaging(product.name)
  const { valor: tasa } = useTasa()
  const fotoRef = useRef<HTMLButtonElement>(null)
  const [agregado, setAgregado] = useState(false)
  /* Productos de varios colores: el primero es el que se enseña de entrada. */
  const [color, setColor] = useState(product.colores?.[0]?.nombre)
  const foto = product.colores?.find(c => c.nombre === color)?.imagen ?? product.image

  /* El vuelo sale de la foto; el botón confirma con un visto durante 1s. */
  const agregar = () => {
    flyToCart(fotoRef.current, foto)
    onAddToCart(product, undefined, color)
    setAgregado(true)
    window.setTimeout(() => setAgregado(false), 1000)
  }

  return (
    <article className="group relative flex flex-col bg-paper-raised rounded-xl border border-line overflow-hidden transition-all duration-300 ease-out-expo hover:border-brand/45 hover:shadow-card-hover hover:-translate-y-1">

      {/* ── Panel de imagen (toda el área abre la vista rápida) ── */}
      <button
        ref={fotoRef}
        type="button"
        onClick={() => onQuickView(product)}
        className="relative aspect-square vitrina-panel overflow-hidden cursor-pointer text-left"
        aria-label={`Vista rápida de ${product.name}`}
      >
        <ProductImage
          product={product.colores ? { ...product, image: foto } : product}
          className={cn(
            'p-3 transition-transform duration-500 ease-out-expo group-hover:scale-[1.07]',
            product.hoverImage && 'group-hover:opacity-0'
          )}
        />

        {/* Segunda toma: la caja se abre y muestra la unidad */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
            loading="lazy"
            width={320}
            height={320}
            className="absolute inset-0 w-full h-full object-contain p-3 opacity-0 scale-100 group-hover:scale-[1.07] group-hover:opacity-100 transition-all duration-500 ease-out-expo"
          />
        )}

        {/* Vidrio de aumento — sólo en escritorio, al pasar el cursor */}
        <span className="hidden md:flex absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-paper-raised/90 backdrop-blur-sm text-ink-soft items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-card">
          <Eye className="w-4 h-4" strokeWidth={2.2} />
        </span>
      </button>

      {/* Etiqueta */}
      <EtiquetaProducto product={product} className="absolute top-2.5 left-2.5" />

      {/* ── Ficha ── */}
      <div className="flex flex-col flex-1 p-3.5 md:p-4 border-t border-line">

        <div className="flex items-center gap-2 mb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted truncate">
            {product.brand}
          </p>
          <span className="ml-auto flex-shrink-0 text-[10px] font-semibold text-ink-soft bg-paper-sunken rounded px-1.5 py-0.5">
            {packaging}
          </span>
        </div>

        <h3 className="text-[13px] md:text-[14px] font-medium text-ink leading-snug line-clamp-2 min-h-[2.6em]">
          {productLabel(product.name)}
        </h3>

        {product.colores && color && (
          <SelectorColor
            colores={product.colores}
            elegido={color}
            onElegir={setColor}
            className="mt-2.5"
          />
        )}

        {/*
          Sin precio de lista no se muestra una cifra ni se deja agregar al
          carrito: la ficha manda a consultar por WhatsApp con el producto ya
          escrito en el mensaje.
        */}
        {/*
          El precio arriba, el botón debajo — en TODOS los tamaños.
          Lado a lado no caben en ninguno: la ficha mide entre 140px en el
          teléfono y ~230px en el escritorio a cuatro columnas, y un precio
          como "Bs 52.849,84" ya ocupa eso solo. Cuando compartían fila, o se
          partía la cifra en dos renglones o el botón la tapaba. Además así el
          botón es ancho y no un círculo: se ve qué hace y se acierta mejor.
        */}
        <div className="mt-auto pt-4 flex flex-col items-stretch gap-3">
          {product.priceOnRequest ? (
            <p className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-ink-muted mb-0.5">
                Precio
              </span>
              <span className="font-display text-[15px] md:text-[16px] font-bold text-ink-soft leading-none tracking-tight">
                A consultar
              </span>
            </p>
          ) : (
            <p className="min-w-0">
              {product.soldByWeight && (
                <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-ink-muted mb-0.5">
                  Precio por KG
                </span>
              )}
              <span className="block font-display text-[17px] md:text-[19px] font-extrabold text-ink leading-none tracking-tight tabular-nums whitespace-nowrap">
                {precioPublico(product.price, tasa)}
              </span>
              {/* La divisa acompaña; el bolívar es lo que se cobra. Va pegada
                  a su bolívar y antes del precio viejo: suelta al final se
                  leería como el "antes" en dólares. */}
              <span className="block text-[10.5px] font-medium text-ink-muted tabular-nums mt-1">
                {precioReferencia(product.price)}
              </span>
              {/* En oferta: primero cuánto cuesta hoy, luego de cuánto bajó.
                  El tachado solo no se entiende de un vistazo; "Antes" sí. */}
              {product.listPrice !== undefined && (
                <span className="block text-[11.5px] font-semibold text-ink-muted tabular-nums mt-1 whitespace-nowrap">
                  Antes <span className="line-through">{precioPublico(product.listPrice, tasa)}</span>
                </span>
              )}
              {product.soldByWeight && (
                <span className="block text-[10px] text-ink-muted mt-1">Desde 100 gr</span>
              )}
            </p>
          )}

          {product.priceOnRequest ? (
            <a
              href={waLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              data-tap-target
              className="inline-flex items-center justify-center gap-1.5 w-full h-10 px-3.5 rounded-full bg-leaf text-white font-semibold text-[12.5px] hover:brightness-95 active:scale-95 transition-all duration-200"
              aria-label={`Consultar el precio de ${product.name} por WhatsApp`}
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2.4} />
              <span>Consultar</span>
            </a>
          ) : product.soldByWeight ? (
            /*
              Al peso no se agrega a ciegas: el botón abre la ficha, donde se
              elige cuánto se lleva —en gramos o en bolívares— antes de que
              entre al pedido. Antes metía 100 gr y el cliente tenía que
              corregirlos después en el carrito.
            */
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="inline-flex items-center justify-center gap-1.5 w-full h-10 px-3.5 rounded-full bg-brand text-white font-semibold text-[12.5px] hover:bg-brand-deep active:scale-95 transition-all duration-200"
              aria-label={`Elegir cuánto llevas de ${product.name}`}
            >
              <Scale className="w-4 h-4" strokeWidth={2.4} />
              <span>Elegir peso</span>
            </button>
          ) : product.comboSalsas ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="inline-flex items-center justify-center gap-1.5 w-full h-10 px-3.5 rounded-full bg-brand text-white font-semibold text-[12.5px] hover:bg-brand-deep active:scale-95 transition-all duration-200"
              aria-label={`Elegir las salsas de ${product.name}`}
            >
              <ListChecks className="w-4 h-4" strokeWidth={2.4} />
              <span>Elegir salsas</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={agregar}
              className={cn(
                'inline-flex items-center justify-center gap-1.5 w-full h-10 px-3.5 rounded-full text-white font-semibold text-[12.5px] active:scale-95 transition-all duration-200',
                agregado ? 'bg-leaf' : 'bg-brand hover:bg-brand-deep'
              )}
              aria-label={`Agregar ${product.name} al pedido`}
            >
              {agregado
                ? <Check className="w-4 h-4" strokeWidth={3} />
                : <Plus className="w-4 h-4" strokeWidth={2.6} />}
              <span>{agregado ? 'Listo' : 'Agregar'}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
