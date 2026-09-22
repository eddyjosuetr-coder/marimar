import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { products } from '@/data/products'
import {
  aplicarAjustes, consultarAjustesPublicados, obtenerAjustes, suscribirAjustes, type Ajustes,
} from '@/lib/ajustes'
import type { Product } from '@/types'

/**
 * Los cambios que el dueño guardó en el panel. Se leen con
 * `useSyncExternalStore` para que el panel y la tienda abiertos a la vez
 * muestren siempre lo mismo.
 */
/** Una sola consulta al servidor por visita: las ofertas no cambian solas. */
let consultado = false

export function useAjustes(): Ajustes {
  const ajustes = useSyncExternalStore(suscribirAjustes, obtenerAjustes, obtenerAjustes)

  /*
    La tienda se pinta con la copia guardada y, cuando llega la respuesta del
    servidor, los precios se actualizan solos. Nadie mira una pantalla vacía
    esperando unas ofertas que cambian una vez al día.
  */
  useEffect(() => {
    if (consultado) return
    consultado = true
    void consultarAjustesPublicados()
  }, [])

  return ajustes
}

/**
 * El catálogo tal como debe verlo el cliente: con los precios corregidos,
 * las ofertas puestas y sin los productos que el dueño ocultó.
 *
 * Toda la tienda lee de aquí en vez de importar `products` directamente, que
 * es el catálogo crudo. El panel sí usa el crudo, porque necesita ver
 * también lo oculto para poder devolverlo.
 */
export function useCatalogo(): Product[] {
  const ajustes = useAjustes()
  return useMemo(() => aplicarAjustes(products, ajustes), [ajustes])
}
