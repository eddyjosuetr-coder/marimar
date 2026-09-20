import { cn } from '@/lib/utils'

/**
 * Bloque de marca: emblema troquelado + rotulación de apoyo.
 *
 * El emblema original ya contiene "Distribuidora Marimar C.A.", pero a los
 * tamaños de interfaz (44–72px) esa rotulación deja de leerse. Por eso el
 * lockup la repite en tipografía display: el emblema aporta el color y el
 * carácter, el texto aporta la legibilidad.
 *
 * Es el único sitio donde se declara el logo. Header, pie, menú móvil y
 * hero lo consumen desde aquí para que no se desincronicen nunca.
 */

const EMBLEM_SRC = {
  sm: '/brand/marimar-emblema-96.png',
  md: '/brand/marimar-emblema-128.png',
  lg: '/brand/marimar-emblema-256.png',
} as const

const SIZES = {
  sm: { box: 'w-10 h-10', px: 40, name: 'text-[15px]', kicker: 'mt-0.5' },
  md: { box: 'w-12 h-12 md:w-14 md:h-14', px: 56, name: 'text-[17px] md:text-[19px]', kicker: 'mt-1' },
  lg: { box: 'w-16 h-16', px: 64, name: 'text-[22px]', kicker: 'mt-1' },
} as const

interface BrandLockupProps {
  /** Tamaño del emblema y de la rotulación que lo acompaña. */
  size?: keyof typeof SIZES
  /** Superficie donde se apoya: sobre oscuro el emblema lleva halo cálido. */
  tone?: 'paper' | 'dark'
  /** Sólo el emblema, sin texto (útil donde el espacio manda). */
  emblemOnly?: boolean
  /**
   * En pantallas estrechas deja sólo el emblema. Lo usa la cabecera, donde la
   * rotulación compite con buscador, tema y carrito; el pie y el menú tienen
   * sitio de sobra y no lo necesitan.
   */
  compacto?: boolean
  className?: string
}

export function BrandLockup({
  size = 'md',
  tone = 'paper',
  emblemOnly = false,
  compacto = false,
  className,
}: BrandLockupProps) {
  const s = SIZES[size]
  const isDark = tone === 'dark'

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span className={cn('flex-shrink-0 grid place-items-center', s.box, isDark && 'emblem-halo')}>
        <img
          src={EMBLEM_SRC[size]}
          /* Con rotulación al lado el emblema es decorativo: si no, duplica el nombre */
          alt={emblemOnly ? 'Distribuidora Marimar C.A.' : ''}
          width={s.px}
          height={s.px}
          className="w-full h-full object-contain"
        />
      </span>

      {!emblemOnly && (
        <span className={cn('flex flex-col', compacto ? 'max-[429px]:hidden' : 'max-[359px]:hidden')}>
          <span
            className={cn(
              'wordmark font-display',
              s.name,
              isDark ? 'text-white' : 'text-ink'
            )}
          >
            Marimar
          </span>
          <span
            className={cn(
              'wordmark-kicker',
              s.kicker,
              isDark ? 'text-gold/75' : 'text-gold-ink/80'
            )}
          >
            Distribuidora C.A.
          </span>
        </span>
      )}
    </span>
  )
}
