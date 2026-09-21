import { useState } from 'react'
import type { DatosCliente } from '@/lib/pedido'

const LLAVE = 'marimar.cliente.v1'
const VACIO: DatosCliente = { nombre: '', zona: '' }

/**
 * El nombre y la zona de quien compra, recordados en su propio teléfono.
 *
 * Quien pide una vez suele volver a pedir: si tuviera que escribir lo mismo
 * cada vez, terminaría poniendo cualquier cosa. Son datos suyos y no salen
 * de su navegador; sólo viajan dentro del pedido que él mismo envía.
 */
export function useDatosCliente() {
  const [datos, setDatos] = useState<DatosCliente>(() => {
    try {
      const guardado = window.localStorage.getItem(LLAVE)
      if (!guardado) return VACIO
      const leido: unknown = JSON.parse(guardado)
      if (typeof leido !== 'object' || leido === null) return VACIO
      const { nombre, zona } = leido as Record<string, unknown>
      return {
        nombre: typeof nombre === 'string' ? nombre : '',
        zona: typeof zona === 'string' ? zona : '',
      }
    } catch {
      return VACIO
    }
  })

  const actualizar = (cambio: Partial<DatosCliente>) => {
    const siguiente = { ...datos, ...cambio }
    setDatos(siguiente)
    try {
      window.localStorage.setItem(LLAVE, JSON.stringify(siguiente))
    } catch {
      // Sin almacenamiento el pedido funciona igual: sólo habrá que reescribirlo.
    }
  }

  return { datos, actualizar }
}
