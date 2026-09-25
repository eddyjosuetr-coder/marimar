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
import { readFileSync, writeFileSync } from 'node:fs'

const INDEX = 'dist/index.html'
const DESTINO = 'dist/_headers'

/* Orígenes que la tienda necesita de verdad. Todo lo demás se bloquea. */
const SUPABASE = 'https://wtwrqdqlntcixaoojkbf.supabase.co'
const TASA = 'https://ve.dolarapi.com'
const FUENTES_CSS = 'https://fonts.googleapis.com'
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
  `script-src 'self' ${huellas.join(' ')}`,
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

# Las fotos y el programa llevan huella en el nombre: no cambian nunca.
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/productos/*
  Cache-Control: public, max-age=31536000, immutable
`

writeFileSync(DESTINO, cabeceras)

/*
  Cualquier dirección devuelve la tienda en vez de un 404 del servidor.

  La tienda navega con almohadilla (#/panel, #/pedido/…), así que sólo existe
  la raíz de verdad. Pero alguien que escriba a mano la dirección con algo
  detrás —de un volante, de un mensaje mal copiado— se encontraría con la
  página de error de Cloudflare en lugar del negocio.
*/
writeFileSync('dist/_redirects', `/*  /index.html  200
`)

console.log(`_headers escrito con ${huellas.length} huella(s) de guion en línea`)
