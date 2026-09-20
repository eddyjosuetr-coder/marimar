import { useState, type ReactNode } from 'react'
import { KeyRound, ArrowLeft } from 'lucide-react'
import { BrandLockup } from '@/components/BrandLockup'

/**
 * Puerta del panel.
 *
 * QUÉ PROTEGE DE VERDAD — Evita que alguien que llegue al enlace por
 * casualidad toque los precios. Nada más. La clave viaja dentro del programa
 * de la página, así que quien sepa buscar puede leerla: NO es seguridad real
 * y no debe tratarse como tal. La seguridad de verdad llega con el inicio de
 * sesión contra el servidor, cuando la tienda se conecte a internet; ahí la
 * clave vive en el servidor y el navegador nunca la ve.
 *
 * Como hoy los cambios sólo viven en este navegador, lo que se arriesga es la
 * demostración, no la tienda de los clientes.
 */

const CLAVE = import.meta.env.VITE_PANEL_CLAVE ?? 'marimar2026'
const LLAVE_SESION = 'marimar.panel.abierto'

function yaEntro(): boolean {
  try {
    return window.sessionStorage.getItem(LLAVE_SESION) === 'si'
  } catch {
    return false
  }
}

export function Acceso({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(yaEntro)
  const [clave, setClave] = useState('')
  const [error, setError] = useState(false)

  if (abierto) return <>{children}</>

  const entrar = (e: React.FormEvent) => {
    e.preventDefault()
    if (clave !== CLAVE) {
      setError(true)
      setClave('')
      return
    }
    // Dura lo que dure la pestaña: al cerrarla vuelve a pedir la clave.
    try {
      window.sessionStorage.setItem(LLAVE_SESION, 'si')
    } catch {
      // Sin almacenamiento el panel igual se abre; sólo volverá a pedirla.
    }
    setAbierto(true)
  }

  return (
    <div className="min-h-dvh bg-paper text-ink flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[380px]">
        <div className="flex justify-center mb-8">
          <BrandLockup size="lg" emblemOnly />
        </div>

        <h1 className="font-display text-[26px] font-extrabold text-ink text-center">
          Panel del dueño
        </h1>
        <p className="text-[14px] text-ink-muted text-center mt-2 mb-7">
          Esta parte no es para los clientes de la tienda.
        </p>

        <form onSubmit={entrar} className="space-y-3">
          <label htmlFor="clave-panel" className="sr-only">Clave del panel</label>
          <div className="flex items-center gap-2.5 h-12 px-4 rounded-xl bg-paper-raised border border-line focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 transition-all">
            <KeyRound className="w-4 h-4 text-ink-muted flex-shrink-0" strokeWidth={2.2} />
            <input
              id="clave-panel"
              type="password"
              value={clave}
              autoFocus
              onChange={e => { setClave(e.target.value); setError(false) }}
              placeholder="Clave"
              className="w-full bg-transparent outline-none text-[15px] text-ink placeholder:text-ink-muted"
            />
          </div>

          {error && (
            <p role="alert" className="text-[13px] font-semibold text-destructive text-center">
              Esa clave no es. Inténtalo otra vez.
            </p>
          )}

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-brand text-white font-semibold text-[15px] hover:bg-brand-deep active:scale-[0.99] transition-all"
          >
            Entrar
          </button>
        </form>

        <a
          href="#/"
          className="mt-6 flex items-center justify-center gap-2 text-[13.5px] font-semibold text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.4} />
          Volver a la tienda
        </a>
      </div>
    </div>
  )
}
