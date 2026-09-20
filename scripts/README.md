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

## Un producto sin foto

En `catalogo.py` se pone `None` en la columna del archivo. El producto se
publica con su nombre y precio, y la ficha muestra "Foto próximamente" hasta
que llegue la fotografía.
