/**
 * Lee un precio escrito a mano en el panel. Acepta coma o punto decimal,
 * porque en Venezuela se escribe "2,80" y el teclado del teléfono da lo que
 * da. Devuelve `null` si no es un precio usable, para que la fila avise en
 * vez de guardar un número absurdo.
 */
export function parsearPrecio(texto: string): number | null {
  const limpio = texto.trim().replace(',', '.')
  if (limpio === '') return null
  const valor = Number(limpio)
  if (!Number.isFinite(valor) || valor <= 0) return null
  return Math.round(valor * 100) / 100
}
