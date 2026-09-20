import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PRICE_FORMATTER = new Intl.NumberFormat('es-VE', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

const AMOUNT_FORMATTER = new Intl.NumberFormat('es-VE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Precio completo con símbolo: "USD 15,34" */
export function formatPrice(price: number): string {
  return PRICE_FORMATTER.format(price)
}

/**
 * Sólo la cifra: "15,34".
 * Permite componer el precio con la moneda en menor jerarquía visual.
 */
export function formatAmount(price: number): string {
  return AMOUNT_FORMATTER.format(price)
}

/**
 * Presentación del producto ("Botella", "Galón", "Doypack"…), derivada del nombre.
 * Los nombres siguen el patrón "Producto peso - Presentación".
 *
 * Se busca el ÚLTIMO " - " y no el primer guion: hay marcas que llevan guion
 * dentro del nombre ("Coca-Cola 1,5 L - Botella") y partir por el primero
 * devolvía "Cola 1,5 L" como presentación.
 */
export function getPackaging(productName: string): string {
  const separador = productName.lastIndexOf(' - ')
  if (separador === -1) return 'Unidad'
  return productName.slice(separador + 3).trim() || 'Unidad'
}

/**
 * Nombre para mostrar: el mismo nombre sin la presentación del final.
 *
 * El dato guarda "Jamón de Pierna Villa Julia - Al peso" porque la
 * presentación se usa para filtrar y viajará en el pedido de WhatsApp, pero la
 * ficha ya la enseña en su propia etiqueta. Repetirla en el título sobra —y en
 * los productos al peso llegaba a salir tres veces en la misma tarjeta.
 */
export function productLabel(productName: string): string {
  const separador = productName.lastIndexOf(' - ')
  return separador === -1 ? productName : productName.slice(0, separador)
}

/* Charcutería: el pedido se arma de cien en cien gramos, desde 100 gr. */
export const PASO_PESO_GR = 100

const PESO_FORMATTER = new Intl.NumberFormat('es-VE', { maximumFractionDigits: 2 })

/** 100 → "100 gr"; 1500 → "1,5 KG". */
export function formatWeight(gramos: number): string {
  if (gramos < 1000) return `${gramos} gr`
  return `${PESO_FORMATTER.format(gramos / 1000)} KG`
}

/**
 * Importe de una línea del pedido.
 * Al peso el precio es por KG y la cantidad viene en gramos, así que hay que
 * dividir entre mil; por unidad es la multiplicación de siempre.
 */
export function lineTotal(
  producto: { price: number; soldByWeight?: boolean },
  quantity: number
): number {
  return producto.soldByWeight
    ? (producto.price * quantity) / 1000
    : producto.price * quantity
}

/** Cantidad inicial al agregar: 100 gr al peso, 1 unidad en lo demás. */
export function cantidadInicial(producto: { soldByWeight?: boolean }): number {
  return producto.soldByWeight ? PASO_PESO_GR : 1
}

const WA_NUMERO = '584241234567'

/**
 * Enlace de WhatsApp con el pedido ya redactado.
 * Sin argumento abre un mensaje genérico; con un producto, pregunta por él.
 */
export function waLink(producto?: string): string {
  const texto = producto
    ? `Hola Marimar, quiero consultar el precio de: ${producto}`
    : 'Hola Marimar, quiero hacer un pedido'
  return `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(texto)}`
}

export function scrollToCatalog() {
  const el = document.getElementById('catalogo')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
