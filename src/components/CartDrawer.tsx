import { useEffect, useMemo, useState } from 'react'
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react'
import type { CartItem } from '@/types'
import { scrollToCatalog, formatWeight, lineTotal, productLabel, redondearPeso, MINIMO_PESO_GR, PASO_PESO_GR } from '@/lib/utils'
import { waHref } from '@/lib/negocio'
import { codificarPedido, enlaceDelPedido, generarCodigo, mensajeDePedido } from '@/lib/pedido'
import { useDatosCliente } from '@/hooks/useDatosCliente'
import { useTasa } from '@/hooks/useTasa'
import { precioPublico, precioReferencia, formatTasa } from '@/lib/tasa'

const CAMPO =
  'w-full h-11 px-4 rounded-xl bg-paper border border-line text-[15px] text-ink ' +
  'outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all placeholder:text-ink-muted'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  updateQuantity: (lineId: string, delta: number) => void
  setQuantity: (lineId: string, cantidad: number) => void
  removeFromCart: (lineId: string) => void
}

export function CartDrawer({ isOpen, onClose, cart, cartCount, cartTotal, updateQuantity, setQuantity, removeFromCart }: CartDrawerProps) {
  const { datos, actualizar } = useDatosCliente()
  const tasa = useTasa()

  /* Un código por visita: el mismo pedido no puede cambiar de nombre entre
     que se revisa el carrito y se pulsa enviar. */
  const [codigo] = useState(generarCodigo)

  const listo = datos.nombre.trim().length >= 2 && datos.zona.trim().length >= 2

  const mensaje = useMemo(() => {
    const codificado = codificarPedido(cart, codigo, datos, tasa.valor)
    return mensajeDePedido(cart, cartTotal, codigo, datos, enlaceDelPedido(codificado), tasa.valor)
  }, [cart, cartTotal, codigo, datos, tasa.valor])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null


  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Tu pedido">
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-paper flex flex-col animate-slide-in-right shadow-lift">

        {/* Cabecera */}
        <div className="flex items-center justify-between gap-3 px-5 h-[72px] border-b border-line flex-shrink-0">
          <h2 className="flex items-center gap-2.5 font-display text-[18px] font-extrabold text-ink tracking-tight">
            Tu pedido
            {cartCount > 0 && (
              <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-brand text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-lg text-ink-soft hover:text-ink hover:bg-paper-sunken transition-colors"
            aria-label="Cerrar pedido"
          >
            <X className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-paper-sunken flex items-center justify-center mb-5">
                <ShoppingCart className="w-7 h-7 text-ink-muted" strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-[19px] font-bold text-ink mb-2">
                Tu pedido está vacío
              </h3>
              <p className="text-[14px] text-ink-muted max-w-[16rem] mb-7">
                Agrega productos del catálogo y arma tu pedido.
              </p>
              <button
                type="button"
                onClick={() => { onClose(); scrollToCatalog() }}
                className="inline-flex items-center h-11 px-6 rounded-full bg-ink text-paper font-semibold text-[14px] hover:bg-ink-soft transition-colors"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {cart.map(item => (
                <li key={item.lineId} className="flex gap-3.5 p-3 rounded-xl bg-paper-raised border border-line">
                  <div className="w-[72px] h-[72px] flex-shrink-0 rounded-lg bg-vitrina p-2">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        width={72}
                        height={72}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-[13px] font-bold text-ink/25">
                        {item.brand.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted truncate">
                          {item.brand}
                        </p>
                        <h4 className="text-[13px] font-medium text-ink leading-snug line-clamp-2 mt-0.5">
                          {productLabel(item.name)}
                        </h4>
                        {item.variante && (
                          <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                            <span className="font-semibold text-ink-soft">Color:</span> {item.variante}
                          </p>
                        )}
                        {item.salsas && item.salsas.length > 0 && (
                          <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                            <span className="font-semibold text-ink-soft">Salsas:</span> {item.salsas.join(' · ')}
                          </p>
                        )}
                        {item.soldByWeight && (
                          <p className="text-[11px] text-ink-muted mt-1 tabular-nums">
                            {precioPublico(item.price, tasa.valor)} por KG
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.lineId)}
                        className="tap-inline flex-shrink-0 p-1.5 -mt-1 -mr-1 rounded-lg text-ink-muted hover:text-destructive hover:bg-destructive/10 transition-colors"
                        aria-label={`Quitar ${item.name} del pedido`}
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2.5">
                      <p className="font-display text-[14px] font-extrabold text-ink tabular-nums tracking-tight">
                        {precioPublico(lineTotal(item, item.quantity), tasa.valor)}
                      </p>

                      <div className="flex items-center gap-1 rounded-full border border-line bg-paper p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, -1)}
                          disabled={item.quantity <= (item.soldByWeight ? MINIMO_PESO_GR : 1)}
                          className="tap-inline w-7 h-7 rounded-full flex items-center justify-center text-ink-soft hover:bg-paper-sunken hover:text-ink disabled:opacity-35 disabled:pointer-events-none transition-colors"
                          aria-label={item.soldByWeight ? `Quitar ${PASO_PESO_GR} gramos` : 'Reducir cantidad'}
                        >
                          <Minus className="w-3.5 h-3.5" strokeWidth={2.6} />
                        </button>
                        {item.soldByWeight ? (
                          <CampoGramos
                            gramos={item.quantity}
                            onFijar={valor => setQuantity(item.lineId, redondearPeso(valor))}
                            nombre={productLabel(item.name)}
                          />
                        ) : (
                          <span className="w-6 text-center text-[13px] font-bold text-ink tabular-nums">
                            {item.quantity}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, 1)}
                          className="tap-inline w-7 h-7 rounded-full flex items-center justify-center text-ink-soft hover:bg-paper-sunken hover:text-ink transition-colors"
                          aria-label={item.soldByWeight ? `Agregar ${PASO_PESO_GR} gramos` : 'Aumentar cantidad'}
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={2.6} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Resumen */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 p-5 border-t border-line bg-paper-raised">
            <dl className="space-y-2.5 mb-5">
              <div className="flex justify-between text-[14px] text-ink-soft">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{precioPublico(cartTotal, tasa.valor)}</dd>
              </div>
              <div className="flex justify-between text-[14px] text-ink-soft">
                <dt>Envío estimado</dt>
                <dd className="font-semibold text-leaf">Gratis</dd>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-line">
                <dt className="font-display text-[16px] font-bold text-ink">Total</dt>
                <dd className="text-right">
                  <span className="block font-display text-[24px] font-extrabold text-ink tabular-nums tracking-tight">
                    {precioPublico(cartTotal, tasa.valor)}
                  </span>
                  <span className="block text-[12.5px] font-medium text-ink-muted tabular-nums mt-1">
                    {precioReferencia(cartTotal)}
                  </span>
                  <span className="block text-[11px] text-ink-muted mt-0.5">
                    tasa del día {formatTasa(tasa.valor)}
                  </span>
                </dd>
              </div>
            </dl>

            {/*
              Dos datos, no más. Sin ellos el pedido llega desde un número
              suelto y el encargado tiene que preguntar quién es y a dónde va
              antes de poder preparar nada. Se recuerdan en el teléfono del
              cliente para que la segunda compra no cueste escribirlos.
            */}
            <div className="space-y-2.5 mb-4">
              <div>
                <label htmlFor="pedido-nombre" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted mb-1.5">
                  ¿A nombre de quién?
                </label>
                <input
                  id="pedido-nombre"
                  value={datos.nombre}
                  onChange={e => actualizar({ nombre: e.target.value })}
                  placeholder="Tu nombre y apellido"
                  autoComplete="name"
                  className={CAMPO}
                />
              </div>
              <div>
                <label htmlFor="pedido-zona" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted mb-1.5">
                  ¿Dónde lo entregamos?
                </label>
                <input
                  id="pedido-zona"
                  value={datos.zona}
                  onChange={e => actualizar({ zona: e.target.value })}
                  placeholder="Ciudad y sector"
                  autoComplete="address-level2"
                  className={CAMPO}
                />
              </div>
            </div>

            {/*
              El enlace se arma en cada render con el pedido de ese momento:
              si se calculara una sola vez, el cliente mandaría el carrito que
              tenía antes de cambiar las cantidades.
            */}
            {listo ? (
              <a
                href={waHref(mensaje)}
                target="_blank"
                rel="noopener noreferrer"
                data-tap-target
                className="group flex items-center justify-center gap-2 w-full py-4 rounded-full bg-brand text-white font-semibold text-[15px] shadow-brand hover:bg-brand-deep transition-all duration-200"
              >
                Enviar pedido por WhatsApp
                <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.2} />
              </a>
            ) : (
              <p className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-paper-sunken text-ink-muted font-semibold text-[14px] text-center px-4">
                Completa tu nombre y la zona de entrega
              </p>
            )}

            <p className="text-[12px] text-ink-muted text-center mt-3">
              Se abre WhatsApp con tu pedido escrito, con el código{' '}
              <span className="font-semibold text-ink-soft">{codigo}</span>.
              Confirmamos disponibilidad y coordinamos la entrega.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Los gramos de una línea al peso, escribibles.
 *
 * Con los botones de ± se avanza de cincuenta en cincuenta, que para llegar a
 * un kilo son dieciocho toques. Quien ya sabe cuánto quiere lo escribe, y al
 * salir del campo el número se acomoda al salto de la balanza.
 */
function CampoGramos({ gramos, onFijar, nombre }: {
  gramos: number
  onFijar: (valor: number) => void
  nombre: string
}) {
  const [texto, setTexto] = useState<string | null>(null)

  return (
    <input
      type="text"
      inputMode="numeric"
      aria-label={`Gramos de ${nombre}`}
      value={texto ?? formatWeight(gramos)}
      onFocus={() => setTexto(String(gramos))}
      onChange={e => setTexto(e.target.value.replace(/[^0-9]/g, ''))}
      onBlur={() => {
        if (texto !== null) onFijar(Number(texto))
        setTexto(null)
      }}
      onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur() }}
      className="w-[58px] bg-transparent text-center text-[13px] font-bold text-ink tabular-nums outline-none rounded focus:ring-2 focus:ring-brand/40"
    />
  )
}
