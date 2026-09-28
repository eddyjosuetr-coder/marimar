import { useCallback, useEffect, useRef } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/types'
import { useReveal } from '@/hooks/useReveal'
import { getPackaging, scrollToCatalog, cn, productLabel } from '@/lib/utils'
import { ProductImage } from './ProductImage'
import { useTasa } from '@/hooks/useTasa'
import { precioPublico, precioReferencia } from '@/lib/tasa'
import { EtiquetaProducto } from './EtiquetaProducto'

interface FeaturedRailProps {
  products: Product[]
  onQuickView: (p: Product) => void
}

/*
  A qué velocidad avanza solo, en píxeles por segundo.

  Se mide en píxeles y no en "segundos por vuelta" para que la velocidad no
  dependa de cuántos productos haya: si mañana entran treinta artículos más,
  el riel seguiría moviéndose igual de rápido en vez de acelerarse.
*/
const PIXELES_POR_SEGUNDO = 42

/*
  Cuánto se queda quieto tras una interacción.

  TODA pausa vence. La primera versión paraba el riel sin fecha de vuelta
  mientras el cursor estuviera encima, y en un portátil el cursor se queda
  parado en mitad de la pantalla —justo encima del riel— sin que nadie lo
  piense: el riel no volvía a moverse nunca. En el teléfono era peor, porque
  un toque cualquiera sintetiza un "cursor encima" que ya no se retira: con
  tocar una vez, muerto.
*/
const ESPERA_TRAS_TOCAR_MS = 2500
const ESPERA_CON_EL_TECLADO_MS = 5000

/** A partir de aquí el gesto es un arrastre y no un clic en la ficha. */
const UMBRAL_ARRASTRE_PX = 6

function RailCard({ product, onQuickView, inerte }: {
  product: Product
  onQuickView: (p: Product) => void
  inerte: boolean
}) {
  const { valor: tasa } = useTasa()

  return (
    <li className="flex-shrink-0 w-[190px] sm:w-[212px] mr-3.5 md:mr-4" aria-hidden={inerte || undefined}>
      <button
        type="button"
        onClick={() => onQuickView(product)}
        tabIndex={inerte ? -1 : undefined}
        className="group w-full text-left bg-paper-raised rounded-xl border border-line overflow-hidden transition-all duration-300 ease-out-expo hover:border-gold/55 hover:shadow-card-hover hover:-translate-y-1"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative aspect-square vitrina-panel overflow-hidden">
          <ProductImage
            product={product}
            className="p-3 transition-transform duration-500 ease-out-expo group-hover:scale-[1.08]"
          />
          <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gold text-espresso flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.6} />
          </span>
          {/* Si el producto está de oferta, en la portada es donde más se ve */}
          <EtiquetaProducto product={product} className="absolute top-2 left-2" />
        </div>

        <div className="p-3 border-t border-line">
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-muted truncate">
              {product.brand}
            </p>
            <span className="ml-auto flex-shrink-0 text-[9.5px] font-semibold text-ink-soft bg-paper-sunken rounded px-1.5 py-0.5">
              {getPackaging(product.name)}
            </span>
          </div>
          <h3 className="text-[12.5px] font-medium text-ink leading-snug line-clamp-2 min-h-[2.6em]">
            {productLabel(product.name)}
          </h3>
          <p className="mt-2 font-display text-[15px] font-extrabold text-ink leading-none tracking-tight tabular-nums">
            {precioPublico(product.price, tasa)}
            <span className="block text-[10.5px] font-medium text-ink-muted mt-1">
              {precioReferencia(product.price)}
            </span>
            {product.listPrice !== undefined && (
              <span className="block text-[11px] font-semibold text-ink-muted mt-1">
                Antes <span className="line-through">{precioPublico(product.listPrice, tasa)}</span>
              </span>
            )}
          </p>
        </div>
      </button>
    </li>
  )
}

/**
 * Riel de productos en venta que se desplaza solo.
 *
 * Sustituye a la banda de piezas publicitarias: en la portada pesa más ver el
 * producto real con su precio que un flyer. Se toma un artículo con precio de
 * cada categoría, así que la muestra cubre todo el catálogo y se actualiza
 * sola cuando entran productos nuevos.
 *
 * Detalles de comportamiento:
 *  · la pista se duplica para que el bucle cierre sin salto (se anima a -50%)
 *  · se detiene al pasar el cursor o al enfocar con teclado — si no, sería
 *    imposible hacer clic en una ficha en movimiento
 *  · el avance automático NO se apaga con la preferencia de movimiento
 *    reducida del sistema. Es una decisión del negocio: en Windows basta con
 *    tener las animaciones desactivadas —o el ahorro de batería puesto— para
 *    que el navegador la pida, y entonces el carrusel se quedaba muerto sin
 *    que el visitante entendiera por qué. El resto de animaciones del sitio sí
 *    la respetan; ésta es la excepción, y es lenta y se detiene al tocarla
 *  · la copia duplicada va `aria-hidden` y fuera del orden de tabulación para
 *    que el lector de pantalla no lea el catálogo dos veces
 */
export function FeaturedRail({ products, onQuickView }: FeaturedRailProps) {
  const ref = useReveal<HTMLElement>()
  const pista = useRef<HTMLDivElement>(null)

  /* Nada de esto vive en el estado de React: cambia en cada fotograma y un
     re-render por fotograma daría tirones justo en lo que debe verse suave. */
  const quieto = useRef(false)
  const reanudar = useRef<number>(0)
  const arrastrando = useRef(false)
  const arrastroDeVerdad = useRef(false)
  /* `partida` sólo sirve para saber si el gesto ya cuenta como arrastre;
     el desplazamiento se aplica por incrementos desde `ultimoX`. */
  const partida = useRef({ x: 0 })
  const ultimoX = useRef(0)

  /**
   * Para el riel y programa su vuelta. Nunca se para sin vencimiento: si algo
   * queda mal —un cursor olvidado encima, un evento de ratón inventado por el
   * teléfono tras un toque— el riel se recupera solo en unos segundos.
   */
  const pausar = useCallback((ms: number) => {
    quieto.current = true
    window.clearTimeout(reanudar.current)
    reanudar.current = window.setTimeout(() => { quieto.current = false }, ms)
  }, [])

  /*
    El avance automático.

    Antes era una animación CSS sobre la pista entera, y eso no se puede
    agarrar: el dedo resbalaba por encima sin mover nada. Ahora el riel es un
    contenedor que se desplaza de verdad, así que el dedo, la rueda del ratón
    y la barra de desplazamiento funcionan solos, y el movimiento automático
    se limita a empujar unos píxeles en cada fotograma.

    El bucle cierra sin salto porque la lista va duplicada: al pasar de la
    mitad se resta la mitad, y hacia atrás se suma. Nadie nota el corte porque
    lo que hay en los dos puntos es exactamente lo mismo.
  */
  useEffect(() => {
    if (products.length === 0) return
    const el = pista.current
    if (!el) return

    let pedido = 0
    let anterior = performance.now()

    /*
      La posición se lleva aquí, en decimales, y no sumándosela a `scrollLeft`.

      A 42 px/s y 60 cuadros por segundo cada empujón son 0,7 px. El navegador
      puede redondear `scrollLeft` a píxeles enteros, y entonces esa fracción
      se pierde en cada cuadro: el riel se queda clavado sin avanzar nunca. Es
      exactamente lo que pasaba en la máquina del cliente y no en la de
      pruebas, donde el navegador sí guarda los decimales.
    */
    let posicion = el.scrollLeft

    /* Mientras el riel no se ve no hay nada que animar: en un teléfono eso es
       batería gastada en mover algo que nadie está mirando. */
    let aLaVista = true
    const observador = new IntersectionObserver(
      ([entrada]) => { aLaVista = entrada.isIntersecting; anterior = performance.now() },
      { threshold: 0 }
    )
    observador.observe(el)

    const paso = (ahora: number) => {
      const dt = Math.min((ahora - anterior) / 1000, 0.05) // una pestaña dormida no debe dar un salto
      anterior = ahora
      const mitad = el.scrollWidth / 2
      const avanzando = aLaVista && !quieto.current && !arrastrando.current
      if (mitad > 0) {
        if (avanzando) {
          /* Si alguien lo movió por su cuenta —dedo, rueda, flecha— manda él:
             se vuelve a tomar la posición real antes de seguir empujando. */
          if (Math.abs(el.scrollLeft - posicion) > 1) posicion = el.scrollLeft
          posicion += PIXELES_POR_SEGUNDO * dt
          if (posicion >= mitad) posicion -= mitad
          else if (posicion <= 0) posicion += mitad
          el.scrollLeft = posicion
        } else {
          /* Quieto: no se le escribe nada encima, que sería pelearse con el
             desplazamiento suave de las flechas o con el dedo. */
          posicion = el.scrollLeft
          if (el.scrollLeft >= mitad) el.scrollLeft -= mitad
          else if (el.scrollLeft <= 0) el.scrollLeft += mitad
        }
      }
      pedido = requestAnimationFrame(paso)
    }

    pedido = requestAnimationFrame(paso)
    return () => {
      cancelAnimationFrame(pedido)
      observador.disconnect()
      window.clearTimeout(reanudar.current)
    }
  }, [products.length])

  /* Arrastre con el ratón. El dedo no pasa por aquí: el desplazamiento táctil
     nativo ya lo hace mejor —con su inercia— y capturar el puntero lo rompería. */
  const alBajar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !pista.current) return
    arrastrando.current = true
    arrastroDeVerdad.current = false
    partida.current = { x: e.clientX }
    ultimoX.current = e.clientX
    pausar(ESPERA_TRAS_TOCAR_MS)
  }

  const alMover = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!arrastrando.current || !pista.current) return
    if (Math.abs(e.clientX - partida.current.x) > UMBRAL_ARRASTRE_PX) {
      arrastroDeVerdad.current = true
      /* Sólo se captura al confirmar que es un arrastre: hacerlo antes se
         comería los clics normales sobre una ficha. */
      if (e.currentTarget.hasPointerCapture?.(e.pointerId) === false) {
        e.currentTarget.setPointerCapture(e.pointerId)
      }
    }
    /*
      Se mueve por incrementos, no fijando la posición de salida menos lo
      andado. Con la posición absoluta el arrastre peleaba con el salto del
      bucle: al llegar a cero el bucle saltaba al final, el siguiente
      movimiento volvía a calcular desde una salida ya vieja y lo devolvía a
      cero. Arrastrando hacia atrás el riel se quedaba clavado en el principio.
    */
    pista.current.scrollLeft -= e.clientX - ultimoX.current
    ultimoX.current = e.clientX
  }

  const alSubir = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!arrastrando.current) return
    arrastrando.current = false
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    pausar(ESPERA_TRAS_TOCAR_MS)
  }

  /* Al terminar de arrastrar, el dedo o el ratón suele levantarse encima de
     una ficha: sin esto se abriría la vista rápida del producto que pasaba
     por ahí, que no es lo que nadie pidió. */
  const alPulsar = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!arrastroDeVerdad.current) return
    e.preventDefault()
    e.stopPropagation()
    arrastroDeVerdad.current = false
  }

  /*
    Flechas para moverlo a golpes.

    El riel se arrastra, pero eso no se ve: quien no está acostumbrado a una
    tienda en línea no prueba a agarrar una tira de productos. Una flecha sí
    se entiende sin explicación, y de paso sirve a quien no puede arrastrar.
  */
  const empujar = (sentido: 1 | -1) => {
    const el = pista.current
    if (!el) return
    pausar(ESPERA_TRAS_TOCAR_MS)
    el.scrollBy({ left: sentido * Math.min(el.clientWidth * 0.8, 600), behavior: 'smooth' })
  }

  if (products.length === 0) return null

  const pistas = [0, 1]

  return (
    <section
      ref={ref}
      data-reveal
      className="bg-paper border-b border-line overflow-hidden"
      aria-labelledby="rail-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-16 pb-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow font-bold uppercase text-brand-ink mb-2.5">
              Esta semana
            </p>
            <h2 id="rail-heading" className="font-display text-display-sm font-extrabold text-ink">
              Lo que se está vendiendo
            </h2>
          </div>
          <button
            type="button"
            onClick={scrollToCatalog}
            className="hidden sm:inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink hover:text-brand-ink transition-colors group"
          >
            Ver todo el catálogo
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* El riel sangra a todo el ancho: refuerza que hay más de lo que se ve */}
      <div className="relative">
      <div
        ref={pista}
        className={cn(
          'mask-fade-x pb-12 md:pb-16 overflow-x-auto scrollbar-hide',
          /* `auto` y no `smooth`: el empujón de cada fotograma no debe
             animarse, y el salto del bucle tiene que ser instantáneo. */
          'scroll-auto',
          /* Sin esto, al mover el ratón el navegador empieza a arrastrar la
             fotografía del producto —las imágenes son arrastrables de fábrica—
             y el gesto de desplazar el riel muere en el primer píxel. */
          'select-none cursor-grab active:cursor-grabbing'
        )}
        onDragStart={e => e.preventDefault()}
        /*
          Tener el cursor encima ya NO lo detiene.

          Se detenía, y en un portátil el cursor se queda en mitad de la
          pantalla —justo sobre el riel— sin que nadie lo piense. El dueño lo
          veía parado una y otra vez y no había forma de explicarle que era su
          propio ratón. Se para sólo con lo que es una intención de verdad:
          arrastrar, deslizar con el dedo, la rueda o el foco del teclado.

          Hacer clic en una ficha sigue siendo fácil: a esta velocidad se
          mueve cuatro píxeles en lo que dura un clic.
        */
        onPointerMove={alMover}
        onPointerLeave={() => { arrastrando.current = false }}
        onFocusCapture={() => pausar(ESPERA_CON_EL_TECLADO_MS)}
        onBlurCapture={() => pausar(ESPERA_TRAS_TOCAR_MS)}
        onTouchStart={() => pausar(ESPERA_TRAS_TOCAR_MS)}
        onTouchMove={() => pausar(ESPERA_TRAS_TOCAR_MS)}
        onTouchEnd={() => pausar(ESPERA_TRAS_TOCAR_MS)}
        onWheel={() => pausar(ESPERA_TRAS_TOCAR_MS)}
        onPointerDown={alBajar}
        onPointerUp={alSubir}
        onPointerCancel={alSubir}
        onClickCapture={alPulsar}
      >
        <ul className="flex w-max">
          {pistas.map(pista => (
            products.map(product => (
              <RailCard
                key={`${pista}-${product.id}`}
                product={product}
                onQuickView={onQuickView}
                inerte={pista === 1}
              />
            ))
          ))}
        </ul>
      </div>

        <Flecha lado="izquierda" onClick={() => empujar(-1)} />
        <Flecha lado="derecha" onClick={() => empujar(1)} />
      </div>
    </section>
  )
}

/** Flecha redonda a un lado del riel. Sólo en escritorio: en el teléfono el
 *  gesto natural es deslizar, y dos botones ahí taparían producto. */
function Flecha({ lado, onClick }: { lado: 'izquierda' | 'derecha'; onClick: () => void }) {
  const esIzquierda = lado === 'izquierda'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={esIzquierda ? 'Ver productos anteriores' : 'Ver más productos'}
      className={cn(
        /* Centrada sobre la FOTOGRAFÍA, no sobre la ficha entera: la ficha
           incluye marca, nombre y precio, así que su centro cae en el texto y
           la flecha quedaba baja. La foto es cuadrada y mide lo que la ficha
           de ancho, así que su mitad es la mitad de ese ancho. */
        'hidden md:flex absolute top-[106px] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center',
        'rounded-full bg-paper-raised/95 backdrop-blur-sm border border-line shadow-card text-ink-soft',
        'hover:text-ink hover:border-ink/35 hover:scale-105 active:scale-95 transition-all duration-200',
        esIzquierda ? 'left-3 lg:left-6' : 'right-3 lg:right-6'
      )}
    >
      {esIzquierda
        ? <ChevronLeft className="w-5 h-5" strokeWidth={2.4} />
        : <ChevronRight className="w-5 h-5" strokeWidth={2.4} />}
    </button>
  )
}
