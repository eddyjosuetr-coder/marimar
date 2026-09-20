# -*- coding: utf-8 -*-
"""Audita el encuadre de todas las fotos del catálogo.

Comprueba dos cosas en cada webp:
  · CENTRADO: el margen izquierdo debe ser igual al derecho, y el de arriba
    igual al de abajo (con 2 px de tolerancia).
  · TAMAÑO: el producto debe ocupar al menos el 88% del lienzo en su lado
    largo; si no, se ve pequeño dentro de la ficha.
"""
import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

CARPETA = 'public/productos'
OPACO = 200
TOLERANCIA = 2      # px de diferencia admitida entre márgenes opuestos
MINIMO = 0.88       # fracción mínima del lienzo en el lado largo

descentrados, pequenos = [], []

for nombre in sorted(os.listdir(CARPETA)):
    im = Image.open(os.path.join(CARPETA, nombre)).convert('RGBA')
    ancho, alto = im.size
    caja = im.getchannel('A').point(lambda v: 255 if v >= OPACO else 0).getbbox()
    if not caja:
        continue
    izq, arr, der, aba = caja
    dx = abs(izq - (ancho - der))
    dy = abs(arr - (alto - aba))
    if dx > TOLERANCIA or dy > TOLERANCIA:
        descentrados.append((nombre, dx, dy))

    lado_largo = max(der - izq, aba - arr) / ancho
    if lado_largo < MINIMO:
        pequenos.append((nombre, round(lado_largo * 100)))

print(f'fotos revisadas: {len(os.listdir(CARPETA))}')
print(f'descentradas (>{TOLERANCIA}px): {len(descentrados)}')
for n, dx, dy in descentrados[:12]:
    print(f'   {n}  dx={dx} dy={dy}')
print(f'pequeñas (<{int(MINIMO*100)}% del lienzo): {len(pequenos)}')
for n, pct in sorted(pequenos, key=lambda x: x[1])[:12]:
    print(f'   {n}  {pct}%')
