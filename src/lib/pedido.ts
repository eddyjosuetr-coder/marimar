import type { CartItem } from '@/types'
import { formatWeight, lineTotal, productLabel } from './utils'
import { NEGOCIO } from './negocio'
import { formatTasa, precioPublico } from './tasa'

/**
 * El pedido: su código, su mensaje de WhatsApp y el enlace que lo muestra
 * con fotos.
 *
 * POR QUÉ UN ENLACE Y NO IMÁGENES — Un enlace de WhatsApp sólo puede llevar
 * texto; adjuntar fotos exige la API de WhatsApp Business, con cuenta de
 * Meta, número dedicado y plantillas aprobadas. En su lugar, el mensaje
 * incluye un enlace que abre el pedido con las fotos de cada producto. Los
 * datos viajan dentro del propio enlace, así que no hace falta servidor ni
 * base de datos: quien lo abra ve exactamente lo que se pidió.
 */

export interface DatosCliente {
  nombre: string
  zona: string
}

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // sin I, O, 0, 1: se confunden al dictarlos

/**
 * Código corto del pedido, del tipo MM-0921-K7Q.
 *
 * Sirve para que cliente y encargado hablen del mismo pedido sin describirlo
 * ("el K7Q ya salió"), que es justo donde se enredan los chats cuando entran
 * varios seguidos.
 */
export function generarCodigo(fecha = new Date()): string {
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const azar = Array.from({ length: 3 }, () =>
    ALFABETO[Math.floor(Math.random() * ALFABETO.length)]).join('')
  return `MM-${mes}${dia}-${azar}`
}

/* ── El pedido dentro del enlace ──────────────────────────────────────── */

/** Las barras separan campos, así que en los textos libres no pueden estar. */
const limpiar = (texto: string) => texto.replace(/[|;:]/g, ' ').trim().slice(0, 60)

function aBase64Url(texto: string): string {
  const bytes = new TextEncoder().encode(texto)
  let binario = ''
  for (const byte of bytes) binario += String.fromCharCode(byte)
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function deBase64Url(codificado: string): string {
  const base = codificado.replace(/-/g, '+').replace(/_/g, '/')
  const binario = atob(base + '='.repeat((4 - (base.length % 4)) % 4))
  const bytes = Uint8Array.from(binario, c => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

/**
 * Empaqueta el pedido en un texto corto.
 * Formato: `1|código|nombre|zona|id:cantidad:centavos:salsas;…`
 * Los centavos guardan el precio del momento: si mañana cambia, el enlace
 * sigue mostrando lo que el cliente vio al pedir.
 */
export function codificarPedido(
  cart: CartItem[],
  codigo: string,
  cliente: DatosCliente,
  tasa: number
): string {
  const lineas = cart.map(item => {
    const salsas = item.salsas?.length ? item.salsas.map(limpiar).join(',') : ''
    return `${item.id}:${item.quantity}:${Math.round(item.price * 100)}:${salsas}`
  })
  const cuerpo = [
    '2',
    codigo,
    limpiar(cliente.nombre),
    limpiar(cliente.zona),
    String(tasa),
    lineas.join(';'),
  ].join('|')
  return aBase64Url(cuerpo)
}

export interface LineaPedido {
  id: number
  cantidad: number
  precio: number
  salsas: string[]
}

export interface PedidoLeido {
  codigo: string
  cliente: DatosCliente
  /** Tasa del día en que se hizo el pedido. `null` si no se conocía. */
  tasa: number | null
  lineas: LineaPedido[]
}

/**
 * Lee el pedido de un enlace. Devuelve `null` si viene roto o manipulado: es
 * texto que llega de fuera, así que no se confía en su forma.
 */
export function leerPedido(codificado: string): PedidoLeido | null {
  try {
    const partes = deBase64Url(codificado).split('|')
    // La versión 1 no llevaba tasa; los enlaces que ya circulan siguen valiendo
    const version = partes[0]
    if (version !== '1' && version !== '2') return null
    if (partes.length < (version === '1' ? 5 : 6)) return null

    const tasaCruda = version === '2' ? Number(partes[4]) : NaN
    const tasa = Number.isFinite(tasaCruda) && tasaCruda > 0 ? tasaCruda : null

    const lineas: LineaPedido[] = []
    for (const cruda of partes[version === '1' ? 4 : 5].split(';')) {
      if (!cruda) continue
      const [id, cantidad, centavos, salsas = ''] = cruda.split(':')
      const linea: LineaPedido = {
        id: Number(id),
        cantidad: Number(cantidad),
        precio: Number(centavos) / 100,
        salsas: salsas ? salsas.split(',').filter(Boolean) : [],
      }
      if (!Number.isFinite(linea.id) || !Number.isFinite(linea.cantidad) || linea.cantidad <= 0) return null
      if (!Number.isFinite(linea.precio) || linea.precio < 0) return null
      lineas.push(linea)
    }
    if (lineas.length === 0) return null

    return {
      codigo: partes[1] || '—',
      cliente: { nombre: partes[2] || '', zona: partes[3] || '' },
      tasa,
      lineas,
    }
  } catch {
    return null
  }
}

/* ── El mensaje de WhatsApp ───────────────────────────────────────────── */

/** Dirección de la tienda, para armar el enlace del pedido con fotos. */
function baseDelSitio(): string {
  const { origin, pathname } = window.location
  return `${origin}${pathname}`.replace(/\/$/, '')
}

export function enlaceDelPedido(codificado: string): string {
  return `${baseDelSitio()}/#/pedido/${codificado}`
}

/**
 * Redacta el pedido para WhatsApp.
 *
 * Está escrito para quien lo recibe con el almacén al lado, no para lucir:
 *  · el código va primero, para referirse al pedido sin describirlo
 *  · quién lo pide y a dónde va, antes que la lista
 *  · una línea por producto, con la cantidad separada en su propia línea
 *  · los asteriscos los convierte WhatsApp en negrita: el nombre y el total
 *    se leen de un vistazo entre los mensajes del día
 *  · la charcutería va en gramos o kilos, nunca en "unidades"
 *  · al final, el enlace para verlo con fotos
 */
/**
 * A partir de aquí el mensaje se acorta. Un pedido de veinte y pico
 * productos generaba un enlace tan largo que algunas versiones de WhatsApp
 * lo recortan, y un pedido recortado es peor que uno escueto: se pierden
 * justo los últimos renglones. Pasado el límite se deja lo imprescindible
 * —cantidad, producto e importe— y el detalle queda en el enlace con fotos.
 */
const PRODUCTOS_ANTES_DE_RESUMIR = 18

export function mensajeDePedido(
  cart: CartItem[],
  total: number,
  codigo: string,
  cliente: DatosCliente,
  enlace: string,
  tasa: number
): string {
  const articulos = cart.reduce((suma, item) => suma + (item.soldByWeight ? 1 : item.quantity), 0)
  const resumido = cart.length > PRODUCTOS_ANTES_DE_RESUMIR

  const lineas = resumido ? cart.map((item, i) => {
    const cantidad = item.soldByWeight ? formatWeight(item.quantity) : `${item.quantity} und`
    const salsas = item.salsas?.length ? ` (${item.salsas.join(', ')})` : ''
    return `${i + 1}. ${cantidad} — ${productLabel(item.name)}${salsas} = ${precioPublico(lineTotal(item, item.quantity), tasa)}`
  }) : cart.map((item, i) => {
    const cantidad = item.soldByWeight
      ? formatWeight(item.quantity)
      : `${item.quantity} und`
    const unitario = item.soldByWeight
      ? `${precioPublico(item.price, tasa)}/KG`
      : `${precioPublico(item.price, tasa)} c/u`

    const partes = [
      `${i + 1}. *${productLabel(item.name)}*`,
      `    ${cantidad} × ${unitario} = ${precioPublico(lineTotal(item, item.quantity), tasa)}`,
    ]
    if (item.salsas?.length) partes.push(`    Salsas: ${item.salsas.join(', ')}`)
    if (item.listPrice !== undefined) partes.push(`    En oferta (antes ${precioPublico(item.listPrice, tasa)})`)
    return partes.join('\n')
  })

  return [
    `*PEDIDO ${codigo}*`,
    `${NEGOCIO.nombre}`,
    '',
    `*Cliente:* ${cliente.nombre}`,
    `*Entrega:* ${cliente.zona}`,
    '',
    `*${cart.length} ${cart.length === 1 ? 'producto' : 'productos'}* (${articulos} ${articulos === 1 ? 'artículo' : 'artículos'})`,
    '',
    ...lineas,
    '',
    `*TOTAL: ${precioPublico(total, tasa)}*`,
    `(tasa del día ${formatTasa(tasa)})`,
    '',
    `Ver el pedido con fotos:`,
    enlace,
  ].join('\n')
}
