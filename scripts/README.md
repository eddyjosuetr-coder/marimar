# Cómo se genera el catálogo

`src/data/products.ts` y las fotos de `public/productos/` **no se editan a
mano**: los genera este cuatro de scripts desde una sola tabla maestra. Si se
edita el resultado a mano, el siguiente generado lo borra.

## Los archivos

| Archivo | Qué es |
|---|---|
| `catalogo.py` | La tabla maestra: los 290 productos con su carpeta, foto, marca, nombre, presentación y precio. **Aquí se agrega o corrige un producto.** |
| `descripciones.py` | Las reglas que escriben la descripción de cada producto según su tipo, marca y presentación. |
| `build_catalogo.py` | El generador: recorta y optimiza las fotos y escribe `src/data/products.ts`. |
| `verificar_encuadre.py` | Revisa que las 277 fotos estén centradas y que ninguna se vea pequeña. |
| `ids.json` | El número permanente de cada producto. **No se edita a mano ni se borra.** |

## Para regenerarlo

Hace falta Python con Pillow (`pip install pillow`). Desde la raíz del
proyecto:

```bash
python scripts/build_catalogo.py      # fotos + products.ts
python scripts/verificar_encuadre.py  # comprobación del encuadre
npm run build
```

Las fotos ya optimizadas no se vuelven a procesar: el generador salta las que
ya existen en `public/productos/`. Para rehacer una, se borra ese `.webp` y se
ejecuta de nuevo.

## Las fotos originales

`build_catalogo.py` busca los originales en `public/<carpeta>/` y, al
terminar, los archiva en `originales/`. Esa carpeta **no está en GitHub**: son
cientos de MB de material del cliente y hay que respaldarla aparte (Drive o un
disco). Sin ella no se pueden regenerar las fotos desde cero, pero la tienda
funciona igual, porque usa las de `public/productos/`.

## Por qué existe `ids.json`

El panel del dueño guarda sus ofertas y precios usando el número del
producto. Antes esos números salían de la posición en el catálogo, así que
agregar una mayonesa corría todos los siguientes: las ofertas se habrían
aplicado a productos distintos, en silencio.

Ahora cada producto conserva su número aunque el catálogo se reordene, y los
nuevos toman el siguiente libre. Si se borra ese archivo, todas las ofertas y
precios que el dueño tenga guardados se aplicarían al producto equivocado.

Un producto que cambia de `slug` cuenta como nuevo y recibe otro número: sus
ajustes anteriores quedan huérfanos, que es lo correcto, porque ya no es el
mismo producto.

## El titular de la portada también se genera

`src/data/products.ts` no sólo trae los productos: trae el titular, el
antetítulo y el texto de la portada. Están escritos dentro de
`build_catalogo.py`, en la plantilla `cabecera`. **Editarlos en
`src/data/products.ts` no sirve de nada**: el siguiente generado los borra, y
eso ya pasó una vez — la tienda volvió sola a un eslogan viejo sin que nadie
tocara la portada. Se cambian en `build_catalogo.py`.

## Un producto en varios colores

Cuando el mismo producto se vende en varios colores —el papel encerado— no se
hacen tres fichas: se pone una y se declara en `VARIANTES`, en `catalogo.py`:

```python
VARIANTES = {
    'papel-encerado-grande-10und': [
        ('Amarillo', 'variedad', 'Papel-encerado-grande-10und.png'),
        ('Rojo', 'variedad', 'Papel-encerado-rojo-grande-10und.png'),
    ],
}
```

El primer color es el que se enseña de entrada y su foto es la del producto;
los demás se guardan como `<slug>--<color>.webp`. La ficha del catálogo sale
con muestras para elegir, y el color viaja al carrito, al mensaje de WhatsApp
y a la vista del pedido.

## Un producto sin foto

En `catalogo.py` se pone `None` en la columna del archivo. El producto se
publica con su nombre y precio, y la ficha muestra "Foto próximamente" hasta
que llegue la fotografía.
