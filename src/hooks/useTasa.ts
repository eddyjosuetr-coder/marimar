import { useEffect, useSyncExternalStore } from 'react'
import { consultarBCV, obtenerTasa, suscribirTasa, type EstadoTasa } from '@/lib/tasa'

/** Marca si ya se consultó al BCV en esta carga: basta una vez por visita. */
let consultado = false

/**
 * La tasa del día, viva en toda la tienda.
 *
 * La consulta al BCV se dispara una sola vez por visita y en segundo plano:
 * la tienda se pinta con la última tasa conocida y, si llega una nueva, los
 * precios se actualizan solos. Nadie espera mirando una pantalla en blanco
 * por una cifra que cambia una vez al día.
 */
export function useTasa(): EstadoTasa {
  const tasa = useSyncExternalStore(suscribirTasa, obtenerTasa, obtenerTasa)

  useEffect(() => {
    if (consultado) return
    consultado = true
    void consultarBCV()
  }, [])

  return tasa
}
