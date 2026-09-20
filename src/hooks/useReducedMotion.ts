import { useSyncExternalStore } from 'react'

const CONSULTA = '(prefers-reduced-motion: reduce)'

/**
 * Indica si el sistema pide movimiento reducido, y se actualiza si el usuario
 * cambia la preferencia sin recargar.
 *
 * Se usa cuando la alternativa no puede ser "animar más rápido" sino "no
 * animar": una marquesina con la duración recortada a cero saltaría al final
 * en vez de detenerse.
 *
 * La preferencia es estado que vive fuera de React, así que se lee con
 * `useSyncExternalStore` en lugar de un efecto que llama a setState: React
 * queda suscrito al media query sin provocar un render en cascada al montar.
 */
function suscribir(alCambiar: () => void): () => void {
  const consulta = window.matchMedia(CONSULTA)
  consulta.addEventListener('change', alCambiar)
  return () => consulta.removeEventListener('change', alCambiar)
}

const leer = () => window.matchMedia(CONSULTA).matches

/* En servidor no hay media queries: se asume movimiento normal. */
const leerEnServidor = () => false

export function useReducedMotion(): boolean {
  return useSyncExternalStore(suscribir, leer, leerEnServidor)
}
