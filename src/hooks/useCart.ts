import { useState, useCallback, useMemo } from 'react'
import type { Product, CartItem } from '@/types'
import { cantidadInicial, lineTotal, PASO_PESO_GR } from '@/lib/utils'

/**
 * Identificador de la línea del pedido.
 * Las salsas se ordenan para que "Cheddar + Maíz + BBQ" y "BBQ + Cheddar +
 * Maíz" caigan en la misma línea: es el mismo pedido dicho en otro orden.
 */
function idDeLinea(product: Product, salsas?: string[], variante?: string): string {
  const extras = [
    salsas?.length ? [...salsas].sort().join('+') : '',
    variante ?? '',
  ].filter(Boolean)
  if (extras.length === 0) return String(product.id)
  return `${product.id}|${extras.join('|')}`
}

/**
 * Pedido en curso.
 *
 * `quantity` significa dos cosas según el producto: unidades en lo normal y
 * GRAMOS en la charcutería, que se vende al peso. Toda la aritmética que
 * depende de esa diferencia vive en `lineTotal` y `cantidadInicial`, así que
 * los componentes nunca tienen que acordarse de dividir entre mil.
 *
 * Las líneas se identifican por `lineId`, no por el id del producto: un mismo
 * combo con salsas distintas son dos líneas del pedido.
 */
export function useCart(catalogo: Product[]) {
  const [lineas, setLineas] = useState<CartItem[]>([])

  /*
    El pedido copia el producto al agregarlo, así que si el dueño cambia un
    precio desde el panel esa copia quedaría vieja y el cliente pediría por
    WhatsApp a un precio que ya no existe. Por eso el precio del carrito se
    vuelve a leer del catálogo en cada render, y lo que el dueño retiró se cae
    del pedido: manda la tienda, no la copia.
  */
  const cart = useMemo(() => {
    const porId = new Map(catalogo.map(p => [p.id, p]))
    return lineas.flatMap(linea => {
      const actual = porId.get(linea.id)
      if (!actual) return []
      return [{ ...linea, price: actual.price, listPrice: actual.listPrice, badge: actual.badge }]
    })
  }, [lineas, catalogo])



  const addToCart = useCallback((product: Product, salsas?: string[], variante?: string) => {
    const lineId = idDeLinea(product, salsas, variante)
    const paso = cantidadInicial(product)
    setLineas(prev => {
      const existing = prev.find(item => item.lineId === lineId)
      if (existing) {
        return prev.map(item =>
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + paso }
            : item
        )
      }
      /* La línea guarda la foto del color elegido: en el carrito y en el
         pedido tiene que verse el papel que pidió, no el primero. */
      const imagen = variante
        ? product.colores?.find(c => c.nombre === variante)?.imagen
        : undefined
      return [...prev, { ...product, ...(imagen ? { image: imagen } : {}), lineId, quantity: paso, salsas, variante }]
    })
  }, [])

  const removeFromCart = useCallback((lineId: string) => {
    setLineas(prev => prev.filter(item => item.lineId !== lineId))
  }, [])

  /**
   * `delta` viene en pasos (+1 / -1), no en unidades crudas: quien pulsa el
   * botón no tiene que saber si el producto avanza de uno en uno o de cien en
   * cien gramos.
   */
  const updateQuantity = useCallback((lineId: string, delta: number) => {
    setLineas(prev => prev.map(item => {
      if (item.lineId !== lineId) return item
      const paso = item.soldByWeight ? PASO_PESO_GR : 1
      return { ...item, quantity: Math.max(0, item.quantity + delta * paso) }
    }).filter(item => item.quantity > 0))
  }, [])

  /* Una línea al peso cuenta como un artículo: 300 en la chapa no diría nada. */
  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + (item.soldByWeight ? 1 : item.quantity), 0),
    [cart]
  )

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + lineTotal(item, item.quantity), 0),
    [cart]
  )

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal
  }
}
