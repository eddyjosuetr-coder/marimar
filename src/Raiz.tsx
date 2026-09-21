import { Suspense, lazy, useSyncExternalStore } from 'react'
import App from './App'

/**
 * Decide qué se muestra: la tienda o el panel del dueño.
 *
 * Se usa el "hash" de la dirección (`#/panel`) en vez de una ruta normal
 * porque la tienda se publica como archivos estáticos: con `/panel` el
 * servidor buscaría una carpeta que no existe y daría 404, mientras que el
 * hash nunca sale del navegador y funciona en cualquier hospedaje.
 *
 * El panel se carga aparte (`lazy`): su código no viaja en la descarga
 * inicial de la tienda, así el cliente que sólo viene a comprar no paga por
 * él ni lo tiene a mano para curiosear.
 */

const PanelPrivado = lazy(() => import('./admin/PanelPrivado'))
const VistaPedido = lazy(() => import('./pedido/VistaPedido'))

const RUTA_PANEL = '#/panel'
const RUTA_PEDIDO = '#/pedido/'

function suscribirRuta(alCambiar: () => void): () => void {
  window.addEventListener('hashchange', alCambiar)
  return () => window.removeEventListener('hashchange', alCambiar)
}

function rutaActual(): string {
  return window.location.hash
}

export function Raiz() {
  const hash = useSyncExternalStore(suscribirRuta, rutaActual, () => '')

  /* El pedido que el encargado abre desde WhatsApp: los datos vienen en la
     propia dirección, así que no hace falta consultar nada. */
  if (hash.startsWith(RUTA_PEDIDO)) {
    return (
      <Suspense fallback={<PantallaCargando texto="Abriendo el pedido…" />}>
        <VistaPedido codificado={hash.slice(RUTA_PEDIDO.length)} />
      </Suspense>
    )
  }

  if (!hash.startsWith(RUTA_PANEL)) return <App />

  return (
    <Suspense fallback={<PantallaCargando texto="Abriendo el panel…" />}>
      <PanelPrivado />
    </Suspense>
  )
}

function PantallaCargando({ texto }: { texto: string }) {
  return (
    <div className="min-h-dvh bg-paper text-ink-muted flex items-center justify-center text-[14px]">
      {texto}
    </div>
  )
}
