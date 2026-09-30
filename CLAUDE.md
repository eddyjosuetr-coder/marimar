# La tienda de Distribuidora Marimar C.A.

Tienda en línea de un distribuidor de víveres y charcutería de Maracay, Venezuela.
**Está en producción y el dueño la usa a diario**, así que no es un proyecto de
práctica: lo que se rompe aquí lo notan clientes reales.

- Tienda: <https://distribuidoramarimar.com>
- Panel del dueño: <https://distribuidoramarimar.com/#/panel>
- Hospedaje: Cloudflare Pages, conectado a la rama `main` de este repositorio.
  **Cada `git push` publica.** No hay entorno de pruebas.

El negocio vende **al detal**, no al mayor. Idioma: español de Venezuela.
Todo el código, los comentarios y los mensajes de commit están en español, y
conviene seguir así.

---

## Lo primero que hay que saber

### El catálogo se genera. Nunca se edita a mano.

`src/data/products.ts` es un **archivo generado**. Editarlo funciona hasta que
alguien vuelve a ejecutar el generador, y entonces el cambio desaparece sin
dejar rastro. Ha pasado tres veces y una de ellas borró el eslogan que el dueño
había elegido.

La fuente de verdad es `scripts/catalogo.py` — una tabla de 341 filas — y el
generador es `scripts/build_catalogo.py`.

```bash
python scripts/build_catalogo.py     # procesa fotos + escribe products.ts
python scripts/verificar_encuadre.py # comprueba que ninguna foto quedó torcida
npm run build
```

**`npm run build` NO regenera el catálogo.** Si tocas `catalogo.py`, ejecuta el
generador tú. Lee `scripts/README.md` antes de tocar nada de esto: documenta esa
trampa y otras dos que ya costaron despliegues.

### El texto de la portada también se genera

El titular, el eslogan y las cifras del pie de la portada viven en la plantilla
`cabecera` de `scripts/build_catalogo.py`, no en `products.ts` ni en `Hero.tsx`.

---

## Arrancar

```bash
npm install
npm run dev      # Vite en local
npm run build    # tsc -b && vite build && node scripts/cabeceras.mjs
npm run lint
```

Node 22 (`.nvmrc`). `tsconfig` tiene **`noUnusedLocals: true`**: un import que
sobra rompe el build, no avisa.

---

## La tecnología y por qué

| Pieza | Elección | Por qué |
|---|---|---|
| Interfaz | React 19 + TypeScript 5.9 | — |
| Empaquetado | Vite 7 | `base: './'`, salida estática |
| Estilos | Tailwind 3.4 + tokens CSS propios | ver *Diseño* |
| Componentes | shadcn/ui sobre Radix (53 en `src/components/ui/`) | accesibilidad ya resuelta |
| Iconos | lucide-react | |
| Tema claro/oscuro | next-themes + un guion en línea en `index.html` | el guion aplica el tema antes del primer pintado; sin él la página parpadea en blanco |
| Estado compartido | `useSyncExternalStore` a mano | son cuatro almacenes diminutos (ajustes, tasa, ruta, movimiento reducido); una librería de estado pesaría más que los cuatro |
| Base de datos | Supabase (PostgREST + GoTrue) **por `fetch` normal, sin el paquete oficial** | hacen falta dos lecturas y dos escrituras; el paquete pesa más que `src/lib/nube.ts` entero |
| Fotos | Python + Pillow | ver *Las fotos* |
| Verificación | Playwright (Python) | ver *Cómo se comprueba* |

Hay dependencias instaladas que **no se usan** (recharts, embla, react-hook-form,
zod, date-fns, vaul, sonner…): vienen de la plantilla inicial. No las tomes como
señal de cómo está hecho algo.

### Sin enrutador

Las rutas van por *hash* y las decide `src/Raiz.tsx`:

- `#/panel` → el panel del dueño (`React.lazy`, trozo aparte)
- `#/pedido/<base64url>` → la vista de un pedido (`React.lazy`)
- cualquier otra cosa → la tienda

Es por *hash* a propósito: la tienda son archivos estáticos, y `/panel` haría
que el servidor buscara una carpeta que no existe. Además el código del panel no
viaja en la descarga del cliente.

---

## Los precios: dólares arriba, bolívares abajo

El catálogo está **en dólares**, porque es lo que no se mueve. El bolívar sí, y
la tienda **muestra el bolívar como precio principal** con el dólar pequeño
debajo.

`src/lib/tasa.ts` resuelve la tasa en este orden:

1. la que el dueño publicó desde el panel, **mientras siga vigente**
2. la oficial del BCV, que se consulta sola al abrir (`ve.dolarapi.com/v1/dolares/oficial`)
3. la última que se pudo traer, guardada en el navegador
4. una de respaldo que viaja dentro del programa

Nunca se queda sin tasa, porque quedarse sin tasa sería quedarse sin precios.

**Detalle que no es un detalle:** la tasa manual **vence sola**. El sábado por
la mañana el dueño pone la tasa del fin de semana porque el BCV no publica hasta
el lunes; esa tasa manda hasta que el BCV publique una más nueva que la que había
cuando él la escribió. Sin ese vencimiento, una tasa de sábado seguiría rigiendo
el mes siguiente si a alguien se le olvida quitarla.

---

## El panel del dueño

`src/admin/` — se abre en `#/panel`.

### Cómo se entra

Correo y contraseña del dueño contra Supabase Auth (`Acceso.tsx`).
**La contraseña no está en este repositorio y no debe escribirse en ningún
archivo.** Antes era una clave dentro del propio programa; cualquiera que
supiera mirar el código la encontraba.

La clave de Supabase que sí está en `src/lib/nube.ts` es **pública a propósito**:
va dentro de la página y no protege nada. Lo que protege es la regla en el
servidor (Row Level Security): **cualquiera puede leer, sólo una sesión iniciada
puede escribir.** Está comprobado desde fuera: lectura 200, inserción 401,
modificación y borrado devuelven vacío, y el registro de cuentas nuevas está
desactivado.

### Qué puede hacer

| Pestaña / zona | Qué hace |
|---|---|
| Todos / En oferta / Ocultos / Con cambios | filtra el catálogo crudo |
| Por producto (`FilaAjuste.tsx`) | poner **oferta**, corregir **precio**, **ocultar** |
| Tasa del día (`TasaDelDia.tsx`) | publicar una tasa manual, volver a la del BCV, y una calculadora dólar↔bolívar |

Los cambios se ven **al instante** para todos los clientes.

### Dónde viven esos cambios

En Supabase, en una capa de **ajustes** (`src/lib/ajustes.ts`) que se aplica
*encima* del catálogo al mostrarlo:

```ts
interface Ajuste { precio?: number; oferta?: number; oculto?: boolean }
type Ajustes = Record<string /* id del producto */, Ajuste>
```

Vive aparte justamente para que el catálogo se pueda regenerar sin pisar el
trabajo del dueño. El navegador guarda además una copia, que es lo que se
muestra mientras llega la respuesta y lo que salva la tienda si el servidor no
responde.

> **Cuidado con los ids.** La llave del ajuste es el `id` del producto, y el
> `id` sale de `scripts/ids.json`, que asocia cada **slug** a un número para
> siempre. Si cambias el slug de un producto, se lleva un `id` nuevo y **el dueño
> pierde la oferta o el ocultado que le hubiera puesto**. Para cambiar sólo el
> nombre visible, no toques la columna del slug.

El panel trabaja sobre el catálogo **crudo**, no sobre el que ve el cliente: el
dueño tiene que poder ver lo que ocultó para devolverlo.

---

## El pedido: WhatsApp y un enlace que se explica solo

No hay pasarela de pago ni servidor de pedidos. El cliente arma su carrito y la
tienda le abre WhatsApp con el pedido escrito.

Como un enlace de WhatsApp sólo puede llevar texto (adjuntar fotos exigiría la
API de WhatsApp Business, con cuenta de Meta y plantillas aprobadas), el mensaje
incluye **un enlace que abre el pedido con las fotos de cada producto**. Los
datos viajan **dentro del propio enlace**, en base64url: `#/pedido/<datos>`. No
hace falta servidor ni base de datos, y quien lo abra ve exactamente lo que se
pidió.

Cada pedido lleva un código corto tipo `MM-0921-K7Q`, con un alfabeto sin `I`,
`O`, `0` ni `1` para que no se confundan al dictarlo por teléfono.

`src/lib/pedido.ts`, `src/pedido/VistaPedido.tsx`.

---

## Vender al peso y por monto

31 productos de charcutería se venden **al peso**: en ellos `price` es el precio
por kilo y `quantity` del carrito significa **gramos**.

- pasos de **50 gr**, mínimo **100 gr** (`PASO_PESO_GR`, `MINIMO_PESO_GR` en `src/lib/utils.ts`)
- el cliente puede pedir **por monto**: "quiero 2 mil bolívares de jamón" y la
  tienda calcula los gramos (`gramosDesdeBolivares`, que redondea **hacia abajo**
  para no pasarse de lo que pidió)
- el selector es `src/components/SelectorPeso.tsx`, con pestañas "Por peso" y
  "Por monto", y sale al pulsar *Agregar*

Toda la aritmética que depende de esa diferencia está en `lineTotal` y
`cantidadInicial`, para que ningún componente tenga que acordarse de dividir
entre mil.

Otros casos particulares del catálogo:

- **4 combos** dejan elegir salsas (`comboSalsas`); el mismo combo con salsas
  distintas son dos líneas del pedido
- **1 producto en varios colores** (papel encerado): una sola ficha, y al elegir
  color cambia la foto principal (`colores`, `SelectorColor.tsx`)
- **1 producto sin precio** (`priceOnRequest`): se muestra, pide consultar por
  WhatsApp y no se puede agregar al carrito. Mejor sin precio que con uno
  inventado
- **1 producto sin foto** (`Mostaza La Marca`, `None` en la tabla): sale con
  "Foto próximamente"

---

## El buscador

`src/lib/busqueda.ts`. Quien compra aquí no es un buscador experto. Reglas:

1. ignora tildes, mayúsculas y signos — "jamon" encuentra "Jamón"
2. entiende plurales — "panes" encuentra "Pan"
3. conoce las palabras del mostrador — "charcutería" trae jamones, quesos,
   mortadelas y salchichas
4. perdona erratas — "mostasa" encuentra "Mostaza"

Dos decisiones que evitan resultados absurdos, y que conviene no deshacer:

- **No busca en la descripción.** Con la descripción dentro, "perro" devolvía
  106 productos, porque media tienda menciona el perro caliente en su texto.
- **La tolerancia a erratas se aplica sólo a lo que la persona escribió, nunca a
  los sinónimos.** Si no, "limpieza" traía jamones: el sinónimo "jabón" está a
  una letra de "jamón".

El buscador y las categorías **se limpian el uno al otro** (`App.tsx`): buscar
"leche" y luego pulsar una categoría dejaba la pantalla vacía sin decir por qué,
y era el error que más confundía a la gente mayor.

---

## Diseño

Dirección: papel cálido, oro y naranja de brasa, tipografía editorial. No es
"minimalista limpio" y no debe volverse eso.

- Tokens en `src/index.css` como tripletes HSL (`--paper`, `--ink`, `--brand`,
  `--gold`, `--ember`, `--vitrina`…), con sus equivalentes para el tema oscuro
  bajo `.dark`. **No escribas colores a mano**: usa los tokens.
- Tipografía: **Bricolage Grotesque** para titulares, cifras y precios;
  **Instrument Sans** para el texto. Escalas fluidas con `clamp()` en
  `tailwind.config.js` (`display-xl` … `display-sm`).
- Los contrastes de los tokens `*-ink` están calculados para cumplir AA; están
  anotados en el propio CSS.
- Animación: sólo `transform`, `opacity`, `clip-path`.
- `src/components/FeaturedRail.tsx` es un carrusel que **se mueve solo y además
  se arrastra** con el dedo o el ratón. Cuidado: **todas sus pausas vencen**. La
  primera versión se detenía sin fecha de vuelta mientras el cursor estuviera
  encima, y en un portátil el cursor se queda quieto sobre el riel sin que nadie
  lo piense — el carrusel no volvía a andar nunca. En el teléfono era peor: un
  toque sintetiza un "cursor encima" que ya no se retira.

---

## Las fotos

Tubería en Python + Pillow, dentro de `scripts/build_catalogo.py`:

1. recorta por el canal alfa y quita las astillas de píxeles sueltos
2. escala a 810 px de lado máximo
3. centra en un lienzo cuadrado con 5 % de aire
4. guarda WebP calidad 84 → `public/productos/<slug>.webp`

946 MB de originales quedan en **19 MB** publicados. Los originales se archivan
fuera de `public/` (en `originales/`) para que no viajen en el build.

El generador **avisa** de las fotos que ya no usa ningún producto —las que deja
atrás un cambio de nombre— pero no las borra: un fallo al leer la tabla dejaría
el conjunto vacío y se llevaría el catálogo entero por delante.

---

## Publicación y seguridad

`scripts/cabeceras.mjs` corre **después** de compilar y escribe `dist/_headers` y
`dist/404.html`.

- **Content-Security-Policy** con las **huellas SHA-256 de los guiones en línea
  calculadas en cada build**. No se escribe a mano: escrita a mano, la huella se
  queda vieja en cuanto alguien toca el guion del tema, el navegador lo bloquea y
  la tienda abre con un parpadeo blanco que nadie relacionaría con ese archivo.
  Orígenes permitidos: Supabase, `ve.dolarapi.com`, Google Fonts y el medidor de
  visitas de Cloudflare.
- HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy`.
- `/assets/*` → un año, inmutable (llevan huella en el nombre).
- `/productos/*` → **una semana, revalidando**. Las fotos **no** llevan huella:
  se llaman como el producto, así que cuando se reemplaza una foto la dirección
  es la misma. Declararlas inmutables condenaba a quien ya la hubiera visto a
  quedarse un año con la vieja.
- **`404.html` en vez de un comodín `/*  /index.html  200`.** Esto importa más de
  lo que parece; está explicado abajo.

---

## Cómo se comprueba

Nada de "se ve bien". Todo se mide con **Playwright (Python)**, en scripts de un
solo uso que van al directorio temporal, no al repositorio:

- auditoría de desborde a 320 / 375 / 768 / 1024 / 1440 / 1920 px
- medida de los objetivos de toque
- captura de violaciones de CSP con la política real inyectada
- gestos táctiles por CDP
- comprobaciones contra el dominio **en producción**, no sólo en local
- carga real de las fotos con `img.decode()`, que es lo único que distingue una
  imagen buena de una página HTML disfrazada de imagen

---

## Trampas ya pisadas. No las repitas.

1. **Editar `src/data/products.ts`.** Se regenera y el cambio desaparece. Edita
   `scripts/catalogo.py`.
2. **Tocar `catalogo.py` y no ejecutar el generador.** Un producto retirado siguió
   en venta hasta que el dueño lo ocultó a mano.
3. **Editar el titular de la portada en `products.ts`.** Vive en
   `build_catalogo.py`; el generador revirtió el eslogan del dueño.
4. **Cambiar el slug de un producto.** Le cambia el `id` y el dueño pierde su
   oferta.
5. **Preguntar por una foto nueva en un bucle para ver si ya se publicó.** Hasta
   que el despliegue termina esa dirección no existe, y la respuesta que se
   recibe mientras tanto es la que se queda en la caché de Cloudflare durante
   toda la vigencia declarada. Con el comodín viejo eso significaba que la
   **página entera** se guardaba durante un año creyendo que era la foto: la foto
   llegaba diez minutos después y el visitante seguía recibiendo texto. Pasó con
   la mortadela de pollo de 1 KG. El `404.html` cierra esa puerta —una foto que
   falta contesta 404 y sin guardar nada—, pero para comprobar un despliegue
   **mira la portada**, nunca la foto.
6. **Borrar el original de una foto al reemplazarla.** Se perdió el original en
   alta resolución de la leche descremada; sólo se pudo recuperar el `.webp` ya
   publicado, desde el historial de git.
7. **Describir los productos con reglas demasiado sueltas.** `descripciones.py`
   llegó a describir una pasta como pasta de tomate, el papel higiénico como
   detergente en polvo y los huevos como leche completa. Cuando una descripción
   sale mal, **arregla la regla, no la fila**.
8. **Un import que sobra rompe el build** (`noUnusedLocals`).

---

## Decisiones del dueño que hay que respetar

- Eslogan: **"Somos tu mejor opción en ventas de charcutería, víveres y mucho más"**
- **36 años** surtiendo a Maracay
- Zona de entrega: **Maracay** (no "toda Venezuela")
- Formas de pago: **Pago Móvil, Efectivo, Transferencia** — nada más
- Contacto sólo por **WhatsApp**. Nada de Facebook, boletín, ni "envío gratis"
- **Sin** Términos, Privacidad ni Envíos: el dueño decidió quitarlos porque la
  tienda no cierra la venta, se cierra en WhatsApp
- El dueño **no quiso rotar la contraseña de Supabase**. Es su decisión; no la
  vuelvas a plantear.

Los datos del negocio (teléfono, correo, dirección, horario, coordenadas, formas
de pago) están en un solo sitio: **`src/lib/negocio.ts`**. No los repitas en
ningún componente.

---

## Pendiente

- **Google Business Profile**: existe una ficha con 4,6★ y 25 reseñas que maneja
  otra cuenta (`du…@gmail.com`). Hay que entrar con `Dmarimar04@gmail.com` y
  pulsar *Solicitar acceso*, con RIF, registro mercantil y fotos a mano. Una vez
  dentro, añadir `https://distribuidoramarimar.com`. **Nunca crear una ficha
  duplicada.** (El formulario de Google puso *India* como país por defecto:
  revísalo.)
- Añadir `www.distribuidoramarimar.com` como segundo dominio en Cloudflare.
- Borrar el proyecto viejo en Vercel: su plan gratuito prohíbe el uso comercial.
- Foto y confirmación de la **Mostaza La Marca** (hoy oculta por el dueño).
- Confirmar con el dueño los precios de las dos mortadelas Del Corral: las dos
  están a $2,70 y una es de 2,5 KG y la otra de 1 KG.

---

## Aviso

**`README.md` en la raíz está obsoleto.** Habla de "Marimar Milenium", de venta
**mayorista B2B** y de "600+ productos". Nada de eso es cierto: la tienda es
**Distribuidora Marimar C.A.**, vende **al detal** y tiene **341 productos en 26
categorías, de 129 marcas**. No te guíes por ese archivo.
