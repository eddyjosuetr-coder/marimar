import type { CartItem } from '@/types'
import { formatAmount, formatWeight, lineTotal, productLabel } from './utils'

/**
 * Los datos reales del negocio, en un solo sitio.
 *
 * Antes el teléfono estaba copiado en seis archivos y cambiarlo significaba
 * buscarlo por todo el proyecto, con el riesgo de dejar uno viejo. Aquí se
 * cambia una vez y cambia en toda la tienda.
 */
export const NEGOCIO = {
  nombre: 'Distribuidora Marimar C.A.',
  /** Sin el signo ni espacios: es el formato que exige wa.me. */
  whatsapp: '584144748871',
  telefonoVisible: '+58 414-4748871',
  telefonoHref: 'tel:+584144748871',
  correo: 'Dmarimar04@gmail.com',
} as const

/** Enlace de WhatsApp con un mensaje ya redactado. */
export function waHref(mensaje: string): string {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`
}

/**
 * Enlace para escribir al negocio.
 * Sin argumento abre un mensaje genérico; con un producto, pregunta por él
 * (lo usan las fichas sin precio, que mandan a consultar).
 */
export function waLink(producto?: string): string {
  return waHref(
    producto
      ? `Hola Marimar, quiero consultar el precio de: ${producto}`
      : 'Hola Marimar, quiero hacer un pedido'
  )
}

/**
 * Redacta el pedido para WhatsApp.
 *
 * Es la pieza que cierra la venta: el cliente pulsa un botón y al negocio le
 * llega el pedido escrito, listo para preparar. Por eso cada línea dice
 * exactamente qué es, cuánto lleva y cuánto cuesta, sin que nadie tenga que
 * preguntar de vuelta:
 *
 *  · la charcutería va en gramos o kilos, no en "unidades"
 *  · los combos listan las salsas que eligió el cliente
 *  · lo que está en oferta lo dice, para que en el negocio cuadre la cuenta
 *  · al final va el total, que es el mismo que el cliente vio en la tienda
 */
export function mensajeDePedido(cart: CartItem[], total: number): string {
  const lineas = cart.map((item, i) => {
    const cantidad = item.soldByWeight
      ? formatWeight(item.quantity)
      : `${item.quantity} und`

    const unitario = item.soldByWeight
      ? `${formatAmount(item.price)} por KG`
      : `${formatAmount(item.price)} c/u`

    const partes = [
      `${i + 1}. ${productLabel(item.name)} (${item.brand})`,
      `   ${cantidad} × ${unitario} = USD ${formatAmount(lineTotal(item, item.quantity))}`,
    ]

    if (item.salsas?.length) {
      partes.push(`   Salsas: ${item.salsas.join(', ')}`)
    }
    if (item.listPrice !== undefined) {
      partes.push(`   En oferta (antes ${formatAmount(item.listPrice)})`)
    }
    return partes.join('\n')
  })

  return [
    `¡Hola ${NEGOCIO.nombre}! Quiero hacer este pedido:`,
    '',
    ...lineas,
    '',
    `TOTAL: USD ${formatAmount(total)}`,
    '',
    'Quedo atento para coordinar la entrega y el pago. Gracias.',
  ].join('\n')
}
