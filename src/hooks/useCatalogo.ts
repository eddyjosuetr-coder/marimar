import { useMemo, useSyncExternalStore } from 'react'
import { products } from '@/data/products'
import { aplicarAjustes, obtenerAjustes, suscribirAjustes, type Ajustes } from '@/lib/ajustes'
import type { Product } from '@/types'

/**
 * Los cambios que el dueño guardó en el panel. Se leen con
 * `useSyncExternalStore` para que el panel y la tienda abiertos a la vez
 * muestren siempre lo mismo.
 */
export function useAjustes(): Ajustes {
  return useSyncExternalStore(suscribirAjustes, obtenerAjustes, obtenerAjustes)
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
