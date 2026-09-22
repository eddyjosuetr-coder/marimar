import { useState, type ReactNode } from 'react'
import { Mail, Lock, LogIn } from 'lucide-react'
import { haySesion, iniciarSesion } from '@/lib/nube'
import { BrandLockup } from '@/components/BrandLockup'

/**
 * Puerta del panel.
 *
 * Antes era una clave escrita dentro del propio programa: servía para que
 * nadie entrara de casualidad, pero cualquiera que supiera mirar el código
 * la encontraba. Ahora es un inicio de sesión de verdad contra el servidor,
 * con el correo y la contraseña del dueño. Esa contraseña nunca viaja dentro
 * de la página y el servidor es quien decide si deja pasar.
 *
 * Lo que de verdad protege los precios no es esta pantalla, sino la regla
 * del servidor: sin una sesión válida, los cambios se rechazan aunque
 * alguien se salte esta puerta manipulando la página.
 */
export function Acceso({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(haySesion)
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [entrando, setEntrando] = useState(false)

  if (abierto) return <>{children}</>

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault()
    setEntrando(true)
    const bien = await iniciarSesion(correo, contrasena)
    setEntrando(false)
    if (!bien) {
      setError('Ese correo o esa contraseña no son. Inténtalo otra vez.')
      setContrasena('')
      return
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
          Entra con tu correo para cambiar precios, ofertas y la tasa.
        </p>

        <form onSubmit={entrar} className="space-y-3">
          <div>
            <label htmlFor="correo-panel" className="sr-only">Correo</label>
            <div className="flex items-center gap-2.5 h-12 px-4 rounded-xl bg-paper-raised border border-line focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 transition-all">
              <Mail className="w-4 h-4 text-ink-muted flex-shrink-0" strokeWidth={2.2} />
              <input
                id="correo-panel"
                type="email"
                autoComplete="username"
                value={correo}
                autoFocus
                onChange={e => { setCorreo(e.target.value); setError('') }}
                placeholder="Correo"
                className="w-full bg-transparent outline-none text-[15px] text-ink placeholder:text-ink-muted"
              />
            </div>
          </div>

          <div>
            <label htmlFor="clave-panel" className="sr-only">Contraseña</label>
            <div className="flex items-center gap-2.5 h-12 px-4 rounded-xl bg-paper-raised border border-line focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 transition-all">
              <Lock className="w-4 h-4 text-ink-muted flex-shrink-0" strokeWidth={2.2} />
              <input
                id="clave-panel"
                type="password"
                autoComplete="current-password"
                value={contrasena}
                onChange={e => { setContrasena(e.target.value); setError('') }}
                placeholder="Contraseña"
                className="w-full bg-transparent outline-none text-[15px] text-ink placeholder:text-ink-muted"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="text-[13px] font-semibold text-destructive text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={entrando || !correo || !contrasena}
            className="w-full h-12 rounded-xl bg-brand text-white font-semibold text-[15px] hover:bg-brand-deep active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all inline-flex items-center justify-center gap-2"
          >
            <LogIn className="w-[18px] h-[18px]" strokeWidth={2.4} />
            {entrando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <a
          href="#/"
          className="mt-6 block text-center text-[13.5px] font-semibold text-ink-muted hover:text-ink transition-colors"
        >
          Volver a la tienda
        </a>
      </div>
    </div>
  )
}
