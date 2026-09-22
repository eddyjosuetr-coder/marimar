import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RielCategoriasProps {
  categorias: readonly string[]
  activa: string
  onElegir: (categoria: string) => void
}

/** Cuánto avanza cada flecha: algo menos de una pantalla, para no perder el hilo. */
const PASO = 320

/**
 * La tira de categorías del encabezado.
 *
 * Son 26 categorías y en ninguna pantalla caben todas, así que la tira se
 * desplaza. El problema no era ese, sino cómo lo contaba: la última
 * categoría se cortaba a media palabra contra el borde ("Aceites y Vina…")
 * y eso no se lee como "hay más", se lee como que algo está roto.
 *
 * Ahora el borde se desvanece —y sólo del lado donde queda contenido— y en
 * pantallas grandes aparecen dos flechas para recorrerla sin arrastrar. El
 * desvanecido se hace con máscara y no con un degradado encima, para que
 * funcione igual sobre el fondo claro y sobre el oscuro.
 */
export function RielCategorias({ categorias, activa, onElegir }: RielCategoriasProps) {
  const pista = useRef<HTMLDivElement>(null)
  const [sobra, setSobra] = useState({ izquierda: false, derecha: false })

  const medir = useCallback(() => {
    const el = pista.current
    if (!el) return
    const margen = 8 // holgura: un píxel suelto no debe encender una flecha
    setSobra({
      izquierda: el.scrollLeft > margen,
      derecha: el.scrollLeft + el.clientWidth < el.scrollWidth - margen,
    })
  }, [])

  useEffect(() => {
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [medir])

  /* Al elegir una categoría desde el menú, su ficha puede estar fuera de la
     vista: se trae, para que se vea cuál está activa. */
  useEffect(() => {
    const el = pista.current?.querySelector('[aria-current="true"]')
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activa])

  const desplazar = (sentido: 1 | -1) => {
    pista.current?.scrollBy({ left: sentido * PASO, behavior: 'smooth' })
  }

  /* Un desvanecido ancho lee como "esto sigue"; uno estrecho, como un
     corte. Por eso son ocho puntos y no dos. */
  const mascara = [
    sobra.izquierda ? 'transparent, black 8%' : 'black',
    sobra.derecha ? 'black 92%, transparent' : 'black',
  ].join(', ')

  return (
    <div className="relative group">
      <div
        ref={pista}
        onScroll={medir}
        className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-2.5 -mx-1 px-1"
        style={{
          maskImage: `linear-gradient(90deg, ${mascara})`,
          WebkitMaskImage: `linear-gradient(90deg, ${mascara})`,
        }}
      >
        {categorias.map(c => {
          const esActiva = activa === c
          return (
            <button
              type="button"
              key={c}
              onClick={() => onElegir(c)}
              aria-current={esActiva ? 'true' : undefined}
              className={cn(
                /* h-9 para que el dedo acierte: con py-1.5 el botón medía
                   22px de alto y en el teléfono se fallaba el toque */
                'flex-shrink-0 inline-flex items-center h-9 px-3.5 rounded-full text-[13px] font-medium whitespace-nowrap border transition-all duration-200',
                esActiva
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-transparent text-ink-soft border-line hover:border-ink/35 hover:text-ink'
              )}
            >
              {c === 'Todos' ? 'Todo el catálogo' : c}
            </button>
          )
        })}
      </div>

      {/* Las flechas viven fuera de la pista: si estuvieran dentro, la misma
          máscara que desvanece las fichas las desvanecería a ellas. */}
      <Flecha lado="izquierda" visible={sobra.izquierda} onClick={() => desplazar(-1)} />
      <Flecha lado="derecha" visible={sobra.derecha} onClick={() => desplazar(1)} />
    </div>
  )
}

function Flecha({ lado, visible, onClick }: {
  lado: 'izquierda' | 'derecha'
  visible: boolean
  onClick: () => void
}) {
  if (!visible) return null
  const esIzquierda = lado === 'izquierda'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={esIzquierda ? 'Ver categorías anteriores' : 'Ver más categorías'}
      className={cn(
        'hidden md:flex absolute top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center',
        'rounded-full bg-paper-raised border border-line text-ink-soft shadow-card',
        'hover:text-ink hover:border-ink/35 transition-all duration-200',
        /* Aparecen al acercarse a la tira: en reposo la barra queda limpia,
           y quien las necesita las encuentra donde espera. El foco también
           las muestra, para quien navega con teclado. */
        'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100',
        esIzquierda ? '-left-1' : '-right-1'
      )}
    >
      {esIzquierda
        ? <ChevronLeft className="w-4 h-4" strokeWidth={2.4} />
        : <ChevronRight className="w-4 h-4" strokeWidth={2.4} />}
    </button>
  )
}
