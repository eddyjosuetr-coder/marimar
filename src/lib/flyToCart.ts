/**
 * Microinteracción de compra: el producto "vuela" desde su ficha hasta el
 * botón del carrito, que responde con un pulso dorado.
 *
 * Por qué existe: agregar al carrito cambiaba un número en la esquina y nada
 * más. El vuelo une causa y efecto en el espacio — el usuario ve a dónde fue
 * lo que agregó — que es justo lo que pide una animación con significado.
 *
 * Reglas que respeta:
 *  · sólo anima `transform` y `opacity` (nunca dispara reflow ni CLS)
 *  · la copia vuela en una capa `fixed` con `pointer-events: none`, así que
 *    nunca bloquea la interacción: se puede seguir agregando en pleno vuelo
 *  · con `prefers-reduced-motion` no hay vuelo, sólo el pulso del carrito
 *  · si algo falta (botón fuera de pantalla, sin API de animación) degrada
 *    en silencio y la compra sigue funcionando igual
 */

/** Marca el destino del vuelo. El botón del carrito lo lleva en el header. */
export const CART_ANCHOR_ATTR = 'data-cart-anchor'

const DURACION_VUELO = 620
const DURACION_PULSO = 520
const TAMANO_VUELO = 76

function anclaDelCarrito(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[${CART_ANCHOR_ATTR}]`)
}

function prefiereMenosMovimiento(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/** Pulso dorado del carrito: confirma que el producto llegó. */
function pulsarCarrito(destino: HTMLElement) {
  destino.classList.remove('cart-recibe')
  // Reinicia la animación aunque se agreguen dos productos seguidos.
  void destino.offsetWidth
  destino.classList.add('cart-recibe')
  window.setTimeout(() => destino.classList.remove('cart-recibe'), DURACION_PULSO)
}

export function flyToCart(origen: HTMLElement | null | undefined, imagen: string): void {
  const destino = anclaDelCarrito()
  if (!destino) return

  if (!origen || !imagen || prefiereMenosMovimiento() || typeof Element.prototype.animate !== 'function') {
    pulsarCarrito(destino)
    return
  }

  const desde = origen.getBoundingClientRect()
  const hasta = destino.getBoundingClientRect()
  if (desde.width === 0 || hasta.width === 0) {
    pulsarCarrito(destino)
    return
  }

  const inicioX = desde.left + desde.width / 2 - TAMANO_VUELO / 2
  const inicioY = desde.top + desde.height / 2 - TAMANO_VUELO / 2
  const dx = hasta.left + hasta.width / 2 - (inicioX + TAMANO_VUELO / 2)
  const dy = hasta.top + hasta.height / 2 - (inicioY + TAMANO_VUELO / 2)

  // Dos capas para dibujar una parábola: la de fuera lleva la X a ritmo
  // constante y la de dentro deja caer la Y al final. Una sola capa daría
  // una recta, que se lee como un salto y no como un lanzamiento.
  const capaX = document.createElement('div')
  capaX.setAttribute('aria-hidden', 'true')
  capaX.style.cssText = `position:fixed;left:${inicioX}px;top:${inicioY}px;width:${TAMANO_VUELO}px;height:${TAMANO_VUELO}px;z-index:60;pointer-events:none;will-change:transform`

  const capaY = document.createElement('div')
  capaY.style.cssText =
    'width:100%;height:100%;border-radius:9999px;overflow:hidden;background:hsl(var(--vitrina));' +
    'box-shadow:0 10px 30px -8px hsl(20 60% 8% / .45), 0 0 0 2px hsl(var(--gold) / .55);will-change:transform'

  const foto = document.createElement('img')
  foto.src = imagen
  foto.alt = ''
  foto.style.cssText = 'width:100%;height:100%;object-fit:contain;padding:8px'

  capaY.appendChild(foto)
  capaX.appendChild(capaY)
  document.body.appendChild(capaX)

  const vueloX = capaX.animate(
    [{ transform: 'translateX(0)' }, { transform: `translateX(${dx}px)` }],
    { duration: DURACION_VUELO, easing: 'cubic-bezier(0.35, 0, 0.6, 1)', fill: 'forwards' }
  )

  capaY.animate(
    [
      { transform: 'translateY(0) scale(1)', opacity: 1 },
      { transform: `translateY(${dy * 0.42}px) scale(0.78)`, opacity: 1, offset: 0.55 },
      { transform: `translateY(${dy}px) scale(0.22)`, opacity: 0.35 },
    ],
    { duration: DURACION_VUELO, easing: 'cubic-bezier(0.55, 0, 0.85, 0.6)', fill: 'forwards' }
  )

  const limpiar = () => {
    capaX.remove()
    pulsarCarrito(destino)
  }
  vueloX.onfinish = limpiar
  // Red de seguridad: si la pestaña se va a segundo plano el evento no llega.
  vueloX.oncancel = () => capaX.remove()
  window.setTimeout(() => { if (capaX.isConnected) limpiar() }, DURACION_VUELO + 250)
}
