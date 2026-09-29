/**
 * Escribe `dist/_headers`, las cabeceras de seguridad que Cloudflare Pages
 * aplica a cada respuesta.
 *
 * Se genera DESPUÉS de compilar, no se escribe a mano, por una razón: la
 * política de contenido tiene que autorizar el guion en línea del index —el
 * que aplica el tema antes del primer pintado— y sólo se puede autorizar por
 * su huella. Escrita a mano, esa huella se queda vieja en cuanto alguien toca
 * ese guion, el navegador lo bloquea y la tienda abre con un parpadeo blanco
 * que nadie relacionaría con este archivo.
 *
 * Lo ejecuta `npm run build`.
 */
import { createHash } from 'node:crypto'
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'

const INDEX = 'dist/index.html'
const DESTINO = 'dist/_headers'

/* Orígenes que la tienda necesita de verdad. Todo lo demás se bloquea. */
const SUPABASE = 'https://wtwrqdqlntcixaoojkbf.supabase.co'
const TASA = 'https://ve.dolarapi.com'
const FUENTES_CSS = 'https://fonts.googleapis.com'
/*
  El medidor de visitas que Cloudflare inyecta solo en los dominios propios.
  No usa cookies ni sigue a nadie entre sitios: sólo cuenta visitas, y saber
  cuánta gente entra a la tienda vale más que ahorrarse cinco kilobytes. Sin
  esta línea la política lo bloquea y el negocio se queda a ciegas.
*/
const MEDIDOR = 'https://static.cloudflareinsights.com'
const FUENTES_ARCHIVOS = 'https://fonts.gstatic.com'

const html = readFileSync(INDEX, 'utf8')

/* Cada guion sin `src` va autorizado por su huella, nunca con unsafe-inline:
   con unsafe-inline la política dejaría de proteger de lo único que importa
   aquí, que es la ejecución de guiones ajenos. */
const huellas = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)]
  .map(m => `'sha256-${createHash('sha256').update(m[1], 'utf8').digest('base64')}'`)

if (huellas.length === 0) {
  console.warn('[cabeceras] no hay guiones en línea; revisa si el index cambió')
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${MEDIDOR} ${huellas.join(' ')}`,
  /* Los estilos en línea sí se permiten: React escribe atributos `style` en
     varios sitios y la alternativa sería reescribirlos todos para protegerse
     de algo mucho menos grave que un guion ajeno. */
  `style-src 'self' 'unsafe-inline' ${FUENTES_CSS}`,
  `font-src 'self' ${FUENTES_ARCHIVOS}`,
  "img-src 'self' data:",
  `connect-src 'self' ${SUPABASE} ${TASA}`,
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const cabeceras = `# Generado por scripts/cabeceras.mjs — no editar a mano.
/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Cross-Origin-Opener-Policy: same-origin

# El programa lleva huella en el nombre: ese archivo no cambia nunca.
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Las fotos NO llevan huella: se llaman como el producto. Cuando se reemplaza
# una foto —ha pasado ya varias veces— la dirección sigue siendo la misma, así
# que declararlas "immutable" condenaba a quien ya la hubiera visto a quedarse
# un año con la vieja. Una semana, y revalidando: la respuesta trae etiqueta,
# así que revalidar cuesta una respuesta vacía, no los cuarenta kilobytes.
/productos/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
`

writeFileSync(DESTINO, cabeceras)

/*
  Cualquier dirección desconocida devuelve la tienda en vez de la página de
  error de Cloudflare: la tienda navega con almohadilla (#/panel, #/pedido/…),
  así que sólo existe la raíz de verdad, pero alguien que escriba a mano algo
  detrás —de un volante, de un mensaje mal copiado— tiene que caer de pie.

  Se hace con un 404.html y NO con un comodín `/*  /index.html  200`.

  El comodín parecía más limpio y era una trampa: contestaba 200 a cualquier
  cosa, también a una foto que aún no existía. Al publicar, mientras la foto
  nueva subía, una sola visita a su dirección se traía la página entera con un
  200 —y la caché de Cloudflare, que para las fotos guardaba un año, se quedaba
  con esa página creyendo que era la foto. La foto llegaba a los diez minutos;
  el visitante seguía recibiendo texto donde esperaba una imagen. Pasó de
  verdad, con la mortadela de pollo de 1 KG.

  Con 404.html la página se sirve igual, pero con estado 404: una foto que
  falta ya no puede disfrazarse de foto que está.
*/
copyFileSync(INDEX, 'dist/404.html')

console.log(`_headers escrito con ${huellas.length} huella(s) de guion en línea, y 404.html copiado`)
