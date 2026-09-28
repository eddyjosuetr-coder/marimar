
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
  /** Hasta dónde llega el reparto. */
  zonaDeEntrega: 'Maracay',
  /**
   * Dónde está el local.
   *
   * Las coordenadas las dio el dueño desde el mapa, así que son el dato
   * exacto; la calle se lee del propio mapa en ese punto. El enlace lleva a
   * las coordenadas y no a un texto buscado, que es lo que evita que alguien
   * termine en otra Santos Michelena.
   */
  direccion: 'Av. Santos Michelena, Maracay',
  ciudad: 'Maracay',
  estado: 'Aragua',
  pais: 'VE',
  coordenadas: { lat: 10.253442, lon: -67.602608 },
  mapa: 'https://www.google.com/maps/search/?api=1&query=10.253442,-67.602608',
} as const

/**
 * Cuándo abre.
 *
 * Se escribe una vez y de aquí sale tanto lo que lee el cliente en el pie
 * como lo que leen los buscadores en la ficha del negocio.
 */
export const HORARIO = {
  dias: 'Lunes a sábado',
  abre: '8:00 am',
  cierra: '5:00 pm',
  cerrado: 'Domingos cerrado',
} as const

/**
 * Cómo se paga, en el orden en que la gente pregunta.
 *
 * Vivía suelto en el pie y en la banda de confianza, y las dos listas ya no
 * coincidían: una todavía ofrecía Zelle. Aquí sólo están las tres que el
 * negocio acepta de verdad.
 */
export const FORMAS_DE_PAGO = ['Pago Móvil', 'Efectivo', 'Transferencia'] as const

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
