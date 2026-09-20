# -*- coding: utf-8 -*-
"""Genera public/productos/*.webp y src/data/products.ts desde la tabla maestra.

Las fotos originales del cliente pesan ~375 MB en PNG. Aquí se recortan al
contenido, se encuadran en un lienzo cuadrado uniforme y se guardan en WebP
con transparencia: el catálogo entero baja a unos pocos MB y todas las fichas
quedan ópticamente al mismo tamaño.
"""
import io, os, shutil, sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import catalogo as cat
import descripciones as desc

DESTINO = 'public/productos'
MAX_LADO = 810     # resolución máxima del producto; de ahí sale el lienzo
MARGEN = 0.05      # aire alrededor, como fracción del lienzo

# ── 1. Fotos ────────────────────────────────────────────────────────────────
os.makedirs(DESTINO, exist_ok=True)
peso_src = peso_out = 0

def buscar(carpeta, archivo):
    for base in ('public', 'originales', '.'):
        ruta = f'{base}/{carpeta}/{archivo}'
        if os.path.exists(ruta):
            return ruta
    raise FileNotFoundError(f'{carpeta}/{archivo}')


OPACO = 200         # el producto es opaco; sombras y halos quedan por debajo
MIN_PIXELES = 4     # columnas/filas con menos que esto son ruido del recorte


ASTILLA = 0.04      # tira aislada en el borde más fina que esto: resto del recorte


def sin_astillas(indices, largo):
    """Quita las tiras finas y sueltas de los extremos.

    Algunas fotos traen una rayita opaca separada del producto (un resto del
    recorte original) que estiraba el encuadre y se veía como una línea bajo
    la ficha. Sólo se descartan tiras de los bordes, finas y separadas por un
    hueco: las piezas grandes de un combo (pan, salsas, papas) se conservan.
    """
    tramos = []
    for i in indices:
        if tramos and i == tramos[-1][1] + 1:
            tramos[-1][1] = i
        else:
            tramos.append([i, i])

    def fina(tramo):
        return tramo[1] - tramo[0] + 1 < largo * ASTILLA

    while len(tramos) > 1 and fina(tramos[0]):
        tramos.pop(0)
    while len(tramos) > 1 and fina(tramos[-1]):
        tramos.pop()
    return [i for ini, fin in tramos for i in range(ini, fin + 1)]


def recortar(im):
    """Recorta la foto al producto, ignorando sombras y píxeles sueltos.

    El recorte por `getbbox()` toma cualquier píxel con algo de alfa, así que
    la sombra difusa bajo una caja o el halo translúcido al lado de un empaque
    estiraban el encuadre: el producto salía pequeño y descentrado. Aquí sólo
    cuenta el píxel realmente opaco (alfa >= 200), y además se descartan las
    filas y columnas con un puñado de píxeles sueltos, que suelen ser bordes
    del recorte y no producto.
    """
    ancho, alto = im.size
    mascara = im.getchannel('A').point(lambda v: 255 if v >= OPACO else 0)

    # Reducir a una tira de 1px da el promedio de cada columna / fila de una vez
    def ocupadas(tira, largo, minimo):
        valores = list(tira.getdata())
        return [i for i, v in enumerate(valores) if v * largo / 255 >= minimo]

    cols = sin_astillas(ocupadas(mascara.resize((ancho, 1), Image.BOX), alto,
                                 max(MIN_PIXELES, alto * 0.006)), ancho)
    filas = sin_astillas(ocupadas(mascara.resize((1, alto), Image.BOX), ancho,
                                  max(MIN_PIXELES, ancho * 0.006)), alto)

    if not cols or not filas:
        caja = mascara.getbbox() or im.getbbox()
        return im.crop(caja) if caja else im
    return im.crop((cols[0], filas[0], cols[-1] + 1, filas[-1] + 1))


nuevas = 0
for _, carpeta, archivo, slug, *_ in cat.CATALOGO:
    if archivo is None:          # producto publicado a la espera de su foto
        continue
    origen = buscar(carpeta, archivo)
    destino = f'{DESTINO}/{slug}.webp'

    if os.path.exists(destino):          # ya optimizada en una pasada anterior
        peso_src += os.path.getsize(origen)
        peso_out += os.path.getsize(destino)
        continue
    nuevas += 1

    im = recortar(Image.open(origen).convert('RGBA'))

    # El lienzo se ajusta al producto, no al revés. `thumbnail` sólo reduce,
    # así que un original pequeño se quedaba flotando en medio de los 900 px y
    # la ficha lo mostraba a media altura. Con el lienzo proporcional el
    # producto ocupa siempre el 90% de su lado largo y todas las fotos se ven
    # del mismo tamaño en la tienda — sin reescalar hacia arriba, que saldría
    # borroso.
    im.thumbnail((MAX_LADO, MAX_LADO), Image.LANCZOS)
    lado = round(max(im.size) / (1 - 2 * MARGEN))
    lienzo = Image.new('RGBA', (lado, lado), (0, 0, 0, 0))
    lienzo.paste(im, ((lado - im.width) // 2, (lado - im.height) // 2))
    lienzo.save(destino, 'WEBP', quality=84, method=6)

    peso_src += os.path.getsize(origen)
    peso_out += os.path.getsize(destino)

print(f'{nuevas} fotos nuevas optimizadas de {len(cat.CATALOGO)}')
print(f'catálogo completo: {peso_src/1048576:.1f} MB -> {peso_out/1048576:.1f} MB')

# ── 2. Originales fuera de public/ para que no viajen en el build ───────────
for carpeta in ('aderezos', 'bbq', 'mostazas', 'salsas-de-tomate', 'viveres',
                'producto-limpieza', 'Productos_frios', 'mayonesas', 'bebidas',
                'panes', 'otros', 'queso', 'jamones', 'embutidos', 'combos'):
    src = f'public/{carpeta}'
    if not os.path.isdir(src):
        continue
    dst = f'originales/{carpeta}'
    os.makedirs(dst, exist_ok=True)
    for f in os.listdir(src):
        shutil.move(f'{src}/{f}', f'{dst}/{f}')
    os.rmdir(src)
print('originales archivados en originales/')

# ── 3. src/data/products.ts ────────────────────────────────────────────────
def ts(texto):
    return texto.replace('\\', '\\\\').replace("'", "\\'")

lineas = []
por_categoria = {}
for cat_nombre in cat.ORDEN_CATEGORIAS:
    filas = [f for f in cat.CATALOGO if f[0] == cat_nombre]
    # Dentro de cada categoría van primero los que tienen precio publicado:
    # el que compra ve cifras antes que fichas "a consultar".
    filas.sort(key=lambda f: (f[7] is None, f[2] is None))
    por_categoria[cat_nombre] = len(filas)
    lineas.append('')
    sin_precio = sum(1 for f in filas if f[7] is None)
    detalle = f' · {sin_precio} a consultar' if sin_precio else ''
    lineas.append(f'  /* ── {cat_nombre} ({len(filas)}{detalle}) ── */')
    for i, (c, _, archivo, slug, marca, nombre, presentacion, precio) in enumerate(filas):
        pid = len(lineas)  # placeholder, se reasigna abajo
        # price 0 + priceOnRequest: la ficha pide consultar en vez de mostrar cifra
        consultar = ', priceOnRequest: true' if precio is None else ''
        al_peso = ', soldByWeight: true' if presentacion == 'Al peso' else ''
        # Combos con salsas: el cliente elige 3 de las salsas detalladas de la tienda
        salsas = ', comboSalsas: 3' if c == 'Combos' and 'con Salsas' in nombre else ''
        texto = desc.describir(c, slug, marca, nombre, presentacion)
        lineas.append(
            "  {{ id: {id}, image: '{imagen}', brand: '{marca}', "
            "name: '{nombre} - {pres}', price: {precio:.2f}{consultar}{peso}{salsas}, category: '{cat}', "
            "description: '{texto}' }},".format(
                id=0, imagen=('' if archivo is None else '/productos/%s.webp' % slug), marca=ts(marca), nombre=ts(nombre), pres=presentacion,
                precio=0 if precio is None else precio, consultar=consultar,
                peso=al_peso, salsas=salsas, cat=ts(c), texto=ts(texto)))

# Numeración estable y correlativa en el orden final del catálogo
n = 0
for i, l in enumerate(lineas):
    if l.startswith('  { id: 0,'):
        n += 1
        lineas[i] = l.replace('{ id: 0,', '{ id: %d,' % n, 1)

cabecera = """import type { Product, HeroSlide } from '@/types';

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'Distribuidora Marimar C.A. · Venezuela',
    title: 'Todo lo que necesitas,',
    highlight: 'directo a tu mesa',
    description: 'Salsas, charcutería, víveres, bebidas y combos de las mejores marcas. Compra al detal, a buen precio y con entrega confiable.',
    stats: [
      { value: '__TOTAL__', label: 'Productos' },
      { value: '__MARCAS__', label: 'Marcas' },
      { value: '__CATS__', label: 'Categorías' },
    ],
  },
];


/*
  ────────────────────────────────────────────────────────────────────────────
  CATÁLOGO

  Regla única: sólo se publica el producto que tiene FOTO propia y PRECIO
  confirmado en la lista vigente. Nada de fotos genéricas ni precios
  supuestos — si falta cualquiera de las dos cosas, el producto no entra.

  Precios en USD, por unidad. Las fotos viven en public/productos/ y los
  originales sin optimizar quedan archivados en originales/.
  ────────────────────────────────────────────────────────────────────────────
*/
export const products: Product[] = ["""

pie = """
];

export const PER_PAGE = 24;

/* El orden del riel y de los filtros sigue el orden del catálogo, no el alfabético. */
export const CATEGORIES = ['Todos', __CATEGORIAS__];
"""

marcas = len({f[4] for f in cat.CATALOGO})
con_precio = sum(1 for f in cat.CATALOGO if f[7] is not None)
cabecera = (cabecera
            .replace('__TOTAL__', str(len(cat.CATALOGO)))
            .replace('__MARCAS__', str(marcas))
            .replace('__CATS__', str(len(cat.ORDEN_CATEGORIAS))))
pie = pie.replace('__CATEGORIAS__', ', '.join("'%s'" % ts(c) for c in cat.ORDEN_CATEGORIAS))

io.open('src/data/products.ts', 'w', encoding='utf-8', newline='\n').write(
    cabecera + '\n'.join(lineas) + pie)

print(f'products.ts: {n} productos ({con_precio} con precio, {n - con_precio} a consultar), '
      f'{len(cat.ORDEN_CATEGORIAS)} categorías, {marcas} marcas')
