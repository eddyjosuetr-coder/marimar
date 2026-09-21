
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
