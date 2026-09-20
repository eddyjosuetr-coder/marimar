import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

/**
 * Cambia entre tema claro y oscuro.
 *
 * Arranca siguiendo la preferencia del sistema; en cuanto el visitante pulsa,
 * su elección manda y queda guardada para las próximas visitas.
 *
 * Los dos iconos viven a la vez, uno encima del otro, y se cruzan girando: así
 * el botón nunca cambia de tamaño ni empuja al resto de la barra. Hasta que
 * `next-themes` resuelve el tema en el cliente, se muestra el sol para no
 * parpadear con el icono equivocado.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const movimientoReducido = useReducedMotion()
  const esOscuro = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(esOscuro ? 'light' : 'dark')}
      className={cn(
        'relative grid place-items-center w-11 h-11 rounded-full text-ink',
        'hover:bg-paper-sunken transition-colors duration-200',
        className
      )}
      aria-label={esOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={esOscuro ? 'Tema claro' : 'Tema oscuro'}
    >
      <Sun
        className={cn(
          'absolute w-[19px] h-[19px]',
          !movimientoReducido && 'transition-all duration-300 ease-out-expo',
          esOscuro ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
        )}
        strokeWidth={2.2}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          'absolute w-[19px] h-[19px]',
          !movimientoReducido && 'transition-all duration-300 ease-out-expo',
          esOscuro ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
        )}
        strokeWidth={2.2}
        aria-hidden="true"
      />
    </button>
  )
}
