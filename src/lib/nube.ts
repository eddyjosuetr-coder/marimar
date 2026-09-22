/**
 * La nube: lo que el dueño cambia en el panel y todos los clientes ven.
 *
 * Hasta ahora sus ofertas y su tasa vivían en el navegador de su equipo, así
 * que él los veía y sus clientes no. Aquí van a una base de datos en línea:
 * la tienda la lee al abrir y el panel la escribe cuando el dueño entra con
 * su contraseña.
 *
 * SIN LIBRERÍA — Se habla con la base por HTTP normal en vez de instalar el
 * paquete oficial: lo que se necesita son dos lecturas y dos escrituras, y
 * el paquete pesa más que todo este archivo. Menos peso que descargar para
 * quien entra desde un teléfono con datos móviles.
 *
 * QUÉ PROTEGE QUÉ — La clave de abajo es pública a propósito: va dentro de
 * la página y cualquiera puede leerla. No es la que protege nada. Lo que
 * protege es la regla que vive en el servidor: cualquiera puede LEER los
 * precios, pero sólo una sesión iniciada puede ESCRIBIRLOS. Por eso la
 * contraseña del dueño nunca viaja dentro del programa.
 */

const URL_BASE = import.meta.env.VITE_SUPABASE_URL ?? 'https://wtwrqdqlntcixaoojkbf.supabase.co'
const CLAVE_PUBLICA = import.meta.env.VITE_SUPABASE_KEY ?? 'sb_publishable_9O8daK3we3_7AgyzoPLwbw_7u3W3IUz'

const LLAVE_SESION = 'marimar.sesion.v1'
const ESPERA_MAXIMA_MS = 6000

/** Las dos cosas que el dueño controla desde el panel. */
export type ClaveConfig = 'tasa' | 'ajustes'

interface Sesion {
  token: string
  refresco: string
  /** Momento en que caduca el token, en milisegundos. */
  expira: number
}

/* ── Sesión del dueño ─────────────────────────────────────────────────── */

function leerSesion(): Sesion | null {
  try {
    const crudo = window.localStorage.getItem(LLAVE_SESION)
    if (!crudo) return null
    const datos: unknown = JSON.parse(crudo)
    if (typeof datos !== 'object' || datos === null) return null
    const { token, refresco, expira } = datos as Record<string, unknown>
    if (typeof token !== 'string' || typeof refresco !== 'string' || typeof expira !== 'number') return null
    return { token, refresco, expira }
  } catch {
    return null
  }
}

function escribirSesion(sesion: Sesion | null): void {
  try {
    if (sesion) window.localStorage.setItem(LLAVE_SESION, JSON.stringify(sesion))
    else window.localStorage.removeItem(LLAVE_SESION)
  } catch {
    // Sin almacenamiento la sesión dura lo que dure la pestaña.
  }
}

let sesion: Sesion | null = typeof window === 'undefined' ? null : leerSesion()

export function haySesion(): boolean {
  return sesion !== null
}

async function pedirToken(cuerpo: Record<string, string>, tipo: string): Promise<Sesion | null> {
  const respuesta = await fetch(`${URL_BASE}/auth/v1/token?grant_type=${tipo}`, {
    method: 'POST',
    headers: { apikey: CLAVE_PUBLICA, 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  })
  if (!respuesta.ok) return null

  const datos: unknown = await respuesta.json()
  if (typeof datos !== 'object' || datos === null) return null
  const { access_token, refresh_token, expires_in } = datos as Record<string, unknown>
  if (typeof access_token !== 'string' || typeof refresh_token !== 'string') return null

  const segundos = typeof expires_in === 'number' ? expires_in : 3600
  return {
    token: access_token,
    refresco: refresh_token,
    // Un minuto de margen: más vale renovar de más que quedarse a medias
    // guardando un precio.
    expira: Date.now() + (segundos - 60) * 1000,
  }
}

/** Entra con el correo y la contraseña del dueño. */
export async function iniciarSesion(correo: string, contrasena: string): Promise<boolean> {
  try {
    const nueva = await pedirToken({ email: correo.trim(), password: contrasena }, 'password')
    if (!nueva) return false
    sesion = nueva
    escribirSesion(sesion)
    return true
  } catch {
    return false
  }
}

export function cerrarSesion(): void {
  sesion = null
  escribirSesion(null)
}

/** Devuelve un token válido, renovándolo si ya venció. */
async function tokenVigente(): Promise<string | null> {
  if (!sesion) return null
  if (Date.now() < sesion.expira) return sesion.token

  try {
    const renovada = await pedirToken({ refresh_token: sesion.refresco }, 'refresh_token')
    if (!renovada) {
      cerrarSesion()
      return null
    }
    sesion = renovada
    escribirSesion(sesion)
    return sesion.token
  } catch {
    return null
  }
}

/* ── Lectura y escritura ──────────────────────────────────────────────── */

function conCorte<T>(promesa: (senal: AbortSignal) => Promise<T>): Promise<T> {
  const corte = new AbortController()
  const reloj = window.setTimeout(() => corte.abort(), ESPERA_MAXIMA_MS)
  return promesa(corte.signal).finally(() => window.clearTimeout(reloj))
}

/**
 * Lee un valor de la nube. Devuelve `null` si no hay respuesta: la tienda
 * sigue con lo que tenga guardado en vez de quedarse en blanco.
 */
export async function leerDeLaNube(clave: ClaveConfig): Promise<unknown | null> {
  try {
    return await conCorte(async senal => {
      const respuesta = await fetch(
        `${URL_BASE}/rest/v1/configuracion?clave=eq.${clave}&select=valor`,
        { headers: { apikey: CLAVE_PUBLICA, Authorization: `Bearer ${CLAVE_PUBLICA}` }, signal: senal }
      )
      if (!respuesta.ok) return null

      const filas: unknown = await respuesta.json()
      if (!Array.isArray(filas) || filas.length === 0) return null
      const primera = filas[0] as Record<string, unknown>
      return primera.valor ?? null
    })
  } catch {
    return null
  }
}

/**
 * Guarda un valor. Sólo funciona con la sesión del dueño iniciada; si no, el
 * servidor lo rechaza aunque alguien manipule el programa.
 */
export async function guardarEnLaNube(clave: ClaveConfig, valor: unknown): Promise<boolean> {
  const token = await tokenVigente()
  if (!token) return false

  try {
    return await conCorte(async senal => {
      const respuesta = await fetch(`${URL_BASE}/rest/v1/configuracion?clave=eq.${clave}`, {
        method: 'PATCH',
        headers: {
          apikey: CLAVE_PUBLICA,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ valor, actualizado: new Date().toISOString() }),
        signal: senal,
      })
      return respuesta.ok
    })
  } catch {
    return false
  }
}
