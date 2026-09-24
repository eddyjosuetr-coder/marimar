# -*- coding: utf-8 -*-
"""Tabla maestra del catálogo: foto <-> producto <-> precio de lista.

Cada fila es (categoría, carpeta origen, archivo origen, slug web, marca,
nombre, presentación, precio). El precio sale de las listas de
Lista-de-Precios-Completa-Marimar/; sólo entra el producto que tiene foto
Y precio confirmado.
"""

MAY = 'Mayonesas'
MOS = 'Mostazas'
TOM = 'Salsas de Tomate'
BBQ = 'Salsas BBQ'
ADE = 'Aderezos y Picantes'
CON = 'Congelados'
ACE = 'Aceites y Vinagres'
ENL = 'Enlatados y Conservas'
ITA = 'Pastas y Salsas Italianas'
UNT = 'Margarinas y Untables'
CAF = 'Café, Té e Infusiones'
DES = 'Harinas y Despensa'
LAC = 'Lácteos'
LIM = 'Limpieza e Higiene'
PAN = 'Panadería'
DES2 = 'Desechables y Papelería'
QUE = 'Quesos'
JAM = 'Jamones y Pechugas'
MOR = 'Mortadelas'
CHO = 'Chorizos y Pepperoni'
SAL = 'Salchichas y Polacas'
COM = 'Combos'
SDT = 'Salsas Detalladas'
DUL = 'Dulces y Galletas'

REF = 'Refrescos y Maltas'
AGJ = 'Aguas y Jugos'

# El orden de esta lista es el orden por defecto ("Relevancia") del catálogo.
ORDEN_CATEGORIAS = [MAY, MOS, TOM, BBQ, ADE, SDT, ITA, ENL, ACE, UNT,
                    LAC, QUE, JAM, MOR, CHO, SAL,
                    REF, AGJ, CAF, DES, DUL, PAN, COM, CON, LIM, DES2]

# Presentación que marca la venta por KG: el generador la traduce a
# soldByWeight y la tienda pasa a contar ese producto en gramos.
PESO = 'Al peso'

MEMBERS = "Member's"
FARMERS = "Farmer's Friends"
ROMYS = "Romy's"
ROROS = "Roro's"
FRIGOS = "Frigo's"
LPRADO = "L'Prado"

CATALOGO = [
    # -- Mayonesas (ya optimizadas en public/mayonesas) --------------------
    (MAY, 'mayonesas', 'mayonesa-mavesa-910gr.webp', 'mayonesa-mavesa-910gr', 'Mavesa', 'Mayonesa Mavesa 910 gr', 'Frasco', 8.50),
    (MAY, 'mayonesas', 'mayonesa-mavesa-445gr.webp', 'mayonesa-mavesa-445gr', 'Mavesa', 'Mayonesa Mavesa 445 gr', 'Frasco', 4.20),
    (MAY, 'mayonesas', 'mayonesa-mavesa-175gr.webp', 'mayonesa-mavesa-175gr', 'Mavesa', 'Mayonesa Mavesa 175 gr', 'Frasco', 2.27),
    (MAY, 'mayonesas', 'mayonesa-mavesa-galon.webp', 'mayonesa-mavesa-galon', 'Mavesa', 'Mayonesa Mavesa 3,36 KG', 'Galón', 32.00),
    (MAY, 'mayonesas', 'mayonesa-fritz-galon.webp', 'mayonesa-fritz-galon', 'Fritz', 'Mayonesa Fritz 3,35 KG', 'Galón', 22.80),
    (MAY, 'mayonesas', 'mayonesa-doypack-fritz-930gr.webp', 'mayonesa-fritz-doypack-930gr', 'Fritz', 'Mayonesa Fritz 930 gr', 'Doypack', 3.99),
    (MAY, 'mayonesas', 'preparado-doypack-fritz-150gr.webp', 'preparado-fritz-doypack-150gr', 'Fritz', 'Preparado de Mayonesa Fritz 150 gr', 'Doypack', 1.15),
    (MAY, 'mayonesas', 'preparado-fritz-bolsa-3-35kg.webp', 'preparado-fritz-bolsa-3-35kg', 'Fritz', 'Preparado de Mayonesa Fritz 3,35 KG', 'Bolsa', 10.30),
    (MAY, 'mayonesas', 'preparado-deli-fritz-3-1kg.webp', 'preparado-deli-fritz-3-1kg', 'Fritz', 'Preparado Mayo Deli Fritz 3,1 KG', 'Bolsa', 6.85),
    (MAY, 'mayonesas', 'mayonesa-la-vina-1kg.webp', 'mayonesa-la-vina-1kg', 'La Viña', 'Mayonesa La Viña 1 KG', 'Doypack', 3.30),
    (MAY, 'mayonesas', 'mayonesa-la-vina-galon.webp', 'mayonesa-la-vina-galon', 'La Viña', 'Mayonesa La Viña 3,65 KG', 'Galón', 8.60),
    (MAY, 'mayonesas', 'mayonesa-la-marca-1-4kg.webp', 'mayonesa-la-marca-1-4kg', 'La Marca', 'Mayonesa La Marca 1,4 KG', 'Pote', 8.90),
    (MAY, 'mayonesas', 'mayonesa-la-marca-galon.webp', 'mayonesa-la-marca-galon', 'La Marca', 'Mayonesa La Marca 3,30 KG', 'Galón', 18.70),
    (MAY, 'mayonesas', 'preparado-la-marca-galon.webp', 'preparado-la-marca-galon', 'La Marca', 'Preparado La Marca 3,30 KG', 'Galón', 14.80),
    (MAY, 'mayonesas', 'mayonesa-mayotropi-galon.webp', 'mayonesa-mayotropi-galon', 'Mayotropi', 'Mayonesa Mayotropi 3,35 KG', 'Galón', 19.50),
    (MAY, 'mayonesas', 'mayonesa-dona-nelly-3-35kg.webp', 'mayonesa-dona-nelly-3-35kg', 'Doña Nelly', 'Mayonesa Doña Nelly 3,35 KG', 'Bolsa', 4.90),
    (MAY, 'mayonesas', 'mayonesa-la-colmena-3-35kg.webp', 'mayonesa-la-colmena-3-35kg', 'La Colmena', 'Mayonesa La Colmena 3,35 KG', 'Bolsa', 6.50),
    (MAY, 'mayonesas', 'mayonesa-paraiso-bolsa-3-35kg.webp', 'mayonesa-paraiso-3-35kg', 'Paraíso', 'Mayonesa Paraíso 3,35 KG', 'Bolsa', 6.50),
    (MAY, 'variedad', 'mayonesa-ideal-3-35kg.png', 'mayonesa-ideal-3-35kg', 'Ideal', 'Mayonesa Ideal 3,35 KG', 'Bolsa', 8.90),
    (MAY, 'mayonesas', 'aderezo-mayonesa-monti-3-35kg.webp', 'aderezo-mayonesa-monti-3-35kg', 'Monti', 'Aderezo de Mayonesa Monti 3,35 KG', 'Bolsa', 7.70),
    (MAY, 'mayonesas', 'mayonesa-monti-900gr.webp', 'mayonesa-monti-900gr', 'Monti', 'Mayonesa Monti 900 gr', 'Doypack', 2.85),
    (MAY, 'mayonesas', 'mayonesa-ragah-3-35kg.webp', 'mayonesa-ragah-3-35kg', 'Ragah', 'Mayonesa Ragah 3,35 KG', 'Bolsa', 7.80),
    (MAY, 'mayonesas', 'mayonesa-novo-bolsa-3-5kg.webp', 'mayonesa-novo-3-5kg', 'Novo', 'Mayonesa Novo 3,5 KG', 'Bolsa', 4.20),

    # -- Mostazas ----------------------------------------------------------
    (MOS, 'mostazas', 'Mostaza-Coma-12x1KG-unidad.png', 'mostaza-coma-1kg', 'Coma', 'Mostaza Coma 1 KG', 'Pote', 2.80),
    (MOS, 'mostazas', 'Mostaza-Coma-24x270g-unidad.png', 'mostaza-coma-270gr', 'Coma', 'Mostaza Coma 270 gr', 'Botella', 1.28),
    (MOS, 'mostazas', 'Mostaza-Coma-500grx12-unidad.png', 'mostaza-coma-500gr', 'Coma', 'Mostaza Coma 500 gr', 'Frasco', 2.55),
    (MOS, 'mostazas', 'Mostaza-Coma-Galon-4x4-unidad.png', 'mostaza-coma-galon', 'Coma', 'Mostaza Coma Galón', 'Galón', 11.00),
    (MOS, 'mostazas', 'Mostaza-Fritz-Bolsa-4x4-unidad.png', 'mostaza-fritz-4kg', 'Fritz', 'Mostaza Fritz 4 KG', 'Bolsa', 9.50),

    # -- Salsas de Tomate y Kétchup ---------------------------------------
    (TOM, 'salsas-de-tomate', 'Salsa-Tomate-Doypack-Fritz-165g-unidad.png', 'salsa-tomate-fritz-165gr', 'Fritz', 'Salsa de Tomate Fritz 165 gr', 'Doypack', 0.75),
    (TOM, 'salsas-de-tomate', 'Salsa-Tomate-Doypack-Fritz-930g-unidad.png', 'salsa-tomate-fritz-930gr', 'Fritz', 'Salsa de Tomate Fritz 930 gr', 'Doypack', 3.50),
    (TOM, 'salsas-de-tomate', 'Base-Fritz-3,85kg-unidad.png', 'salsa-base-fritz-3-85kg', 'Fritz', 'Salsa Base Fritz 3,85 KG', 'Bolsa', 9.80),
    (TOM, 'salsas-de-tomate', 'SalsaKetchup-Heinz397gr-unidad.png', 'ketchup-heinz-dispensador-397gr', 'Heinz', 'Kétchup Heinz Dispensador 397 gr', 'Botella', 2.45),
    (TOM, 'salsas-de-tomate', 'Ketchup-Heinz-Sachet10G-unidad.png', 'ketchup-heinz-sachet-10gr', 'Heinz', 'Kétchup Heinz Sachet 10 gr', 'Caja', 32.91),
    (TOM, 'salsas-de-tomate', 'Salsa-Coma-Ketchup-1KG-unidad.png', 'ketchup-coma-1kg', 'Coma', 'Kétchup Coma 1 KG', 'Pote', 3.50),
    (TOM, 'salsas-de-tomate', 'Salsa-Coma-Ketchup-Pote-4kg-unidad.png', 'ketchup-coma-galon-4kg', 'Coma', 'Kétchup Coma 4 KG', 'Galón', 11.50),
    (TOM, 'salsas-de-tomate', 'Salsa-Base-Coma-1KG-unidad.png', 'salsa-base-coma-1kg', 'Coma', 'Salsa Base Coma 1 KG', 'Pote', 2.70),
    (TOM, 'salsas-de-tomate', 'Salsa-BaseComa-4kg-unidad.png', 'salsa-base-coma-galon-4kg', 'Coma', 'Salsa Base Coma 4 KG', 'Galón', 8.80),
    (TOM, 'salsas-de-tomate', 'Salsa-Ketchup-La-Vina-1KG-unidad.png', 'ketchup-la-vina-1kg', 'La Viña', 'Kétchup La Viña 1 KG', 'Doypack', 2.80),
    (TOM, 'salsas-de-tomate', 'Ketchup-Dona-Nelly-3,35KG-unidad.png', 'ketchup-dona-nelly-3-35kg', 'Doña Nelly', 'Kétchup Doña Nelly 3,35 KG', 'Doypack', 3.50),
    (TOM, 'salsas-de-tomate', 'SalsaKetchup-pampero-198gr-vidrio-unidad.png', 'ketchup-pampero-198gr', 'Pampero', 'Kétchup Pampero 198 gr', 'Frasco', 1.67),
    (TOM, 'salsas-de-tomate', 'SalsaKetchup-pampero-397gr-vidrio-unidad.png', 'ketchup-pampero-397gr', 'Pampero', 'Kétchup Pampero 397 gr', 'Frasco', 2.52),
    (TOM, 'salsas-de-tomate', 'SalsaKetchup-pampero-4,2kg-unidad.png', 'ketchup-pampero-4-2kg', 'Pampero', 'Kétchup Pampero 4,2 KG', 'Galón', 17.50),
    (TOM, 'salsas-de-tomate', 'salsa-tomate-ideal-4kg-unidad.png', 'salsa-tomate-ideal-4kg', 'Ideal', 'Salsa de Tomate Ideal 4 KG', 'Bolsa', 8.50),
    (TOM, 'salsas-de-tomate', 'salsabase-tomate-ragah-3,80kg-unidad.png', 'salsa-base-ragah-3-80kg', 'Ragah', 'Salsa Base de Tomate Ragah 3,80 KG', 'Bolsa', 5.95),

    # -- Salsas BBQ --------------------------------------------------------
    (BBQ, 'bbq', 'BBQ-Deli-Fritz-6x1K-unidad.png', 'bbq-deli-fritz-1kg', 'Fritz', 'Salsa BBQ Deli Fritz 1 KG', 'Doypack', 3.50),
    (BBQ, 'bbq', 'BBQ-Deli-Fritz-4x3.5KG-unidad.png', 'bbq-fritz-3-5kg', 'Fritz', 'Salsa BBQ Fritz 3,5 KG', 'Bolsa', 9.60),
    (BBQ, 'bbq', 'BBQ-La-Vina-6x1KG-unidad.png', 'bbq-la-vina-1kg', 'La Viña', 'Salsa BBQ La Viña 1 KG', 'Doypack', 3.20),
    (BBQ, 'bbq', 'BBQ-La-Vina-2KG-unidad.png', 'bbq-la-vina-2kg', 'La Viña', 'Salsa BBQ La Viña 2 KG', 'Pote', 5.00),
    (BBQ, 'bbq', 'BBQ-McCormick-24x230g-unidad.png', 'bbq-mccormick-230gr', 'McCormick', 'Salsa BBQ McCormick 230 gr', 'Botella', 2.82),
    (BBQ, 'bbq', 'BBQ-monti-1kg-unidad.png', 'bbq-monti-1kg', 'Monti', 'Salsa BBQ Monti 1 KG', 'Doypack', 3.40),
    (BBQ, 'bbq', 'BBQ-monti-3,33kg-unidad.png', 'bbq-monti-3-33kg', 'Monti', 'Salsa BBQ Monti 3,33 KG', 'Bolsa', 8.50),
    (BBQ, 'bbq', 'BBQ-ideal-4KG-unidad.png', 'bbq-ideal-4kg', 'Ideal', 'Salsa BBQ Ideal 4 KG', 'Bolsa', 8.47),

    # -- Aderezos y Picantes -----------------------------------------------
    (ADE, 'aderezos', 'aderezo-cheddar-fritz-240g-unidad.png', 'aderezo-cheddar-fritz-240gr', 'Fritz', 'Aderezo Cheddar Fritz 240 gr', 'Botella', 2.95),
    (ADE, 'aderezos', 'aderezo-cheddar-fritz-740g-unidad.png', 'aderezo-cheddar-fritz-740gr', 'Fritz', 'Aderezo Cheddar Fritz 740 gr', 'Botella', 5.95),
    (ADE, 'aderezos', 'aderezo-cheddar-fritz-1kg-unidad.png', 'aderezo-cheddar-fritz-1kg', 'Fritz', 'Aderezo Cheddar Fritz 1 KG', 'Doypack', 4.42),
    (ADE, 'aderezos', 'aderezo-cheddar-fritz-3kg-unidad.png', 'aderezo-cheddar-fritz-3kg', 'Fritz', 'Aderezo Cheddar Fritz 3 KG', 'Bolsa', 10.50),
    (ADE, 'aderezos', 'aderezo-cheddar-la-vina-3,30kg-unidad.png', 'aderezo-cheddar-la-vina-3-30kg', 'La Viña', 'Aderezo Cheddar La Viña 3,30 KG', 'Bolsa', 6.50),
    (ADE, 'aderezos', 'aderezo-cheddar-menber-3kg-unidad.png', 'salsa-cheddar-members-3kg', MEMBERS, 'Salsa Cheddar ' + MEMBERS + ' 3 KG', 'Lata', 33.00),
    (ADE, 'aderezos', 'aderezo-maiz-fritz-240g-unidad.png', 'aderezo-maiz-fritz-240gr', 'Fritz', 'Aderezo de Maíz Fritz 240 gr', 'Botella', 3.00),
    (ADE, 'aderezos', 'aderezo-maita-fritz-740g-unidad.png', 'aderezo-maita-fritz-740gr', 'Fritz', 'Aderezo Maíta Fritz 740 gr', 'Botella', 7.65),
    (ADE, 'aderezos', 'aderezo-maiz-fritz-1kg-unidad.png', 'aderezo-maiz-fritz-1kg', 'Fritz', 'Aderezo de Maíz Fritz 1 KG', 'Doypack', 3.85),
    (ADE, 'aderezos', 'aderezo-maiz-fritz-3kg-unidad.png', 'aderezo-maiz-fritz-3kg', 'Fritz', 'Aderezo de Maíz Fritz 3 KG', 'Bolsa', 9.50),
    (ADE, 'aderezos', 'aderezo-maiz-la-vina-3,30kg-unidad.png', 'aderezo-maiz-la-vina-3-30kg', 'La Viña', 'Aderezo de Maíz La Viña 3,30 KG', 'Bolsa', 6.50),
    (ADE, 'aderezos', 'aderezo-ahumadita-fritz-240g-unidad.png', 'aderezo-ahumadita-fritz-240gr', 'Fritz', 'Aderezo Ahumadita Fritz 240 gr', 'Botella', 2.60),
    (ADE, 'aderezos', 'aderezo-ahumadita-fritz-1kg-unidad.png', 'aderezo-ahumadita-fritz-1kg', 'Fritz', 'Aderezo Ahumadita Fritz 1 KG', 'Doypack', 3.80),
    (ADE, 'aderezos', 'picante-fritz-240gr-unidad.png', 'picante-fritz-240gr', 'Fritz', 'Salsa Picante Fritz 240 gr', 'Botella', 2.12),
    (ADE, 'aderezos', 'picante-fritz-790gr-unidad.png', 'picante-fritz-790gr', 'Fritz', 'Salsa Picante Fritz 790 gr', 'Botella', 4.00),
    (ADE, 'aderezos', 'picante-iberia-piri-piri-unidad.png', 'picante-iberia-piri-piri', 'Iberia', 'Ají Picante Iberia Piri Piri', 'Botella', 1.90),
    (ADE, 'aderezos', 'guasacaca-rezet-verde-310gr-unidad.png', 'guasacaca-rezept-verde-310gr', 'Rezept', 'Guasacaca Rezept Verde 310 gr', 'Botella', 2.01),
    (ADE, 'aderezos', 'guasacaca-picante-rezet-rojo-310gr-unidad.png', 'guasacaca-rezept-picante-310gr', 'Rezept', 'Guasacaca Picante Rezept 310 gr', 'Botella', 2.01),
    (ADE, 'otros', 'salsa-ajo-galon-delavila-3,78lts-unidad.png', 'salsa-ajo-del-avila-galon', 'Del Ávila', 'Salsa de Ajo Del Ávila 3,78 L', 'Galón', 6.61),
    (ADE, 'otros', 'salsa-inglesa-galon-delavila-3,78lts-unidad.png', 'salsa-inglesa-del-avila-galon', 'Del Ávila', 'Salsa Inglesa Del Ávila 3,78 L', 'Galón', 6.61),
    (ADE, 'otros', 'salsa-soya-galon-delavila-3,78lts-unidad.png', 'salsa-soya-del-avila-galon', 'Del Ávila', 'Salsa de Soya Del Ávila 3,78 L', 'Galón', 6.03),

    # -- Pastas y Salsas Italianas ----------------------------------------
    (ITA, 'viveres', 'pastadetomate-lavina-500gr-unidad.png', 'pasta-tomate-la-vina-500gr', 'La Viña', 'Pasta de Tomate La Viña 500 gr', 'Frasco', 2.50),
    (ITA, 'viveres', 'pastadetomate-venato-375gr-unidad.png', 'pasta-tomate-venato-375gr', 'Venato', 'Pasta de Tomate Venato 375 gr', 'Frasco', 2.75),
    (ITA, 'viveres', 'pastadetomate-coma-4kg-unidad.png', 'pasta-tomate-coma-galon', 'Coma', 'Pasta de Tomate Coma 4 KG', 'Galón', 16.00),
    (ITA, 'viveres', 'passata-lamolisana-690gr-unidad.png', 'passata-la-molisana-690gr', 'La Molisana', 'Passata La Molisana Artesanal 690 gr', 'Frasco', 4.70),
    (ITA, 'viveres', 'salsa-bolognese-lavina-500gr-unidad.png', 'salsa-bolonesa-la-vina-500gr', 'La Viña', 'Salsa Boloñesa La Viña 500 gr', 'Frasco', 2.90),

    # -- Enlatados y Conservas ---------------------------------------------
    (ENL, 'viveres', 'atun-aveba-140gr-unidad.png', 'atun-eveba-140gr', 'Eveba', 'Atún Eveba 140 gr', 'Lata', 2.67),
    (ENL, 'viveres', 'atun-aveba-enaceitedeoliva-140gr-unidad.png', 'atun-eveba-oliva-140gr', 'Eveba', 'Atún Eveba en Aceite de Oliva 140 gr', 'Lata', 4.06),
    (ENL, 'viveres', 'sardina-margarita-enaceitevegetal-170gr-unidad.png', 'sardina-margarita-aceite-170gr', 'Margarita', 'Sardinas Margarita en Aceite Vegetal 170 gr', 'Lata', 1.29),
    (ENL, 'viveres', 'sardina-margarita-ensalsadetomate-170gr-unidad.png', 'sardina-margarita-tomate-170gr', 'Margarita', 'Sardinas Margarita en Salsa de Tomate 170 gr', 'Lata', 1.29),
    (ENL, 'viveres', 'anchoas-tomodote-1kg-unidad.png', 'anchoas-tomodore-1kg', 'Tomodore', 'Anchoas Tomodore 1 KG', 'Frasco', 25.01),
    (ENL, 'viveres', 'maiz-delmonte-220gr-unidad.png', 'maiz-del-monte-220gr', 'Del Monte', 'Maíz Del Monte 220 gr', 'Lata', 2.51),
    (ENL, 'viveres', 'maiz-delmonte-432gr-unidad.png', 'maiz-del-monte-432gr', 'Del Monte', 'Maíz Del Monte 432 gr', 'Lata', 3.50),
    (ENL, 'viveres', 'maiz-artesano-2,5kg-unidad.png', 'maiz-artesano-2-5kg', 'Artesano', 'Maíz Dulce Artesano 2,5 KG', 'Lata', 10.50),
    (ENL, 'viveres', 'guisantes-delmonte-sweetpeas-241gr-unidad.png', 'guisantes-del-monte-241gr', 'Del Monte', 'Guisantes Del Monte 241 gr', 'Lata', 2.09),
    (ENL, 'viveres', 'champinon-lafragua-2.5kg-unidad.png', 'champinones-la-fragua-2-5kg', 'La Fragua', 'Champiñones La Fragua 2,5 KG', 'Lata', 13.00),
    (ENL, 'viveres', 'aceitunas-fragua-3,10kg-unidad.png', 'aceitunas-negras-la-fragua-3-10kg', 'La Fragua', 'Aceitunas Negras La Fragua 3,10 KG', 'Lata', 22.50),
    (ENL, 'viveres', 'pepinillos-lesmi-500gr-unidad.png', 'pepinillos-lesmi-500gr', 'Lesmi', 'Pepinillos Agridulces Lesmi 500 gr', 'Frasco', 4.40),
    (ENL, 'viveres', 'pepinillo-lesmi-sweet-relish-255gr-unidad.png', 'sweet-relish-lesmi-255gr', 'Lesmi', 'Pepinillo Sweet Relish Lesmi 255 gr', 'Frasco', 2.95),
    (ENL, 'viveres', 'tomatespelados-artesano-800gr-unidad.png', 'tomates-pelados-artesano-800gr', 'Artesano', 'Tomates Pelados Artesano 800 gr', 'Lata', 3.50),

    # -- Aceites y Vinagres ------------------------------------------------
    (ACE, 'viveres', 'aceite-mazeite-1lts-unidad.png', 'aceite-mazeite-1l', 'Mazeite', 'Aceite Mazeite 1 L', 'Botella', 5.30),
    (ACE, 'viveres', 'aceite-vatel-1lts-unidad.png', 'aceite-vatel-1l', 'Vatel', 'Aceite Vegetal Vatel 1 L', 'Botella', 3.90),
    (ACE, 'viveres', 'aceite-vatel-500ml-unidad.png', 'aceite-vatel-500ml', 'Vatel', 'Aceite de Soya Vatel 500 ml', 'Botella', 2.00),
    (ACE, 'viveres', 'aceite-deoliva-lafragua-500ml-unidad.png', 'aceite-oliva-la-fragua-500ml', 'La Fragua', 'Aceite de Oliva La Fragua 500 ml', 'Botella', 11.50),
    (ACE, 'viveres', 'aceite-deoliva-lafragua-750ml-unidad.png', 'aceite-oliva-la-fragua-750ml', 'La Fragua', 'Aceite de Oliva La Fragua 750 ml', 'Botella', 16.50),
    (ACE, 'viveres', 'vinagre-fritz-1lts-unidad.png', 'vinagre-fritz-1l', 'Fritz', 'Vinagre Fritz 1 L', 'Botella', 1.37),

    # -- Margarinas y Untables ---------------------------------------------
    (UNT, 'viveres', 'margarina-mavesa-500gr-unidad.png', 'margarina-mavesa-500gr', 'Mavesa', 'Margarina Mavesa 500 gr', 'Pote', 3.12),
    (UNT, 'viveres', 'margarina-chiffon-454gr-unidad.png', 'margarina-chiffon-454gr', 'Chiffon', 'Margarina Chiffon 454 gr', 'Pote', 3.00),
    (UNT, 'viveres', 'margarina-nelly-500gr-unidad.png', 'margarina-nelly-500gr', 'Nelly', 'Margarina Nelly 500 gr', 'Pote', 2.40),
    (UNT, 'viveres', 'margarina-nelly-250gr-unidad.png', 'margarina-nelly-250gr', 'Nelly', 'Margarina Nelly 250 gr', 'Pote', 1.25),
    (UNT, 'viveres', 'rikesa-cheddar-300gr-unidad.png', 'rikesa-cheddar-300gr', 'Rikesa', 'Rikesa Cheddar 300 gr', 'Frasco', 5.80),
    (UNT, 'viveres', 'rikesa-tocineta-300gr-unidad.png', 'rikesa-tocineta-300gr', 'Rikesa', 'Rikesa Tocineta 300 gr', 'Frasco', 5.80),
    (UNT, 'otros', 'arequipe-la-vina-370gr-unidad.png', 'arequipe-la-vina-370gr', 'La Viña', 'Arequipe La Viña 370 gr', 'Doypack', 2.50),

    # -- Lácteos -----------------------------------------------------------
    (LAC, 'viveres', 'leche-purisima-completa-1lts-unidad.png', 'leche-purisima-completa-1l', 'Purísima', 'Leche Completa Purísima 1 L', 'Tetrapak', 2.90),
    (LAC, 'viveres', 'leche-purisima-descremada-1lts-unidad.webp', 'leche-purisima-descremada-1l', 'Purísima', 'Leche Descremada Purísima 1 L', 'Tetrapak', 2.60),
    (LAC, 'otros', 'leche-condensada-la-vina-370gr-unidad.png', 'leche-condensada-la-vina-370gr', 'La Viña', 'Leche Condensada La Viña 370 gr', 'Doypack', 2.25),

    # -- Café, Té e Infusiones ---------------------------------------------
    (CAF, 'viveres', 'cafe-amanecer-200gr-unidad.png', 'cafe-amanecer-200gr', 'Amanecer', 'Café Amanecer 200 gr', 'Bolsa', 2.90),
    (CAF, 'viveres', 'cafe-amanecer-alvacio-250gr-unidad.png', 'cafe-amanecer-vacio-250gr', 'Amanecer', 'Café Amanecer al Vacío 250 gr', 'Bolsa', 3.80),
    (CAF, 'viveres', 'cafe-amanecer-500gr-unidad.png', 'cafe-amanecer-500gr', 'Amanecer', 'Café Amanecer 500 gr', 'Bolsa', 7.00),
    (CAF, 'viveres', 'tea-tropical-durazno-450g-unidad.png', 'tropical-tea-durazno-450gr', 'Tropical Tea', 'Tropical Tea Durazno 450 gr', 'Bolsa', 4.50),
    (CAF, 'viveres', 'tea-tropical-durazno-1kg-unidad.png', 'tropical-tea-durazno-1kg', 'Tropical Tea', 'Tropical Tea Durazno 1 KG', 'Bolsa', 8.90),
    (CAF, 'viveres', 'te-nestea-durazno-1,3kg-unidad.png', 'nestea-durazno-1-3kg', 'Nestea', 'Té Nestea Durazno 1,3 KG', 'Bolsa', 15.95),

    # -- Harinas y Despensa ------------------------------------------------
    (DES, 'viveres', 'harina-pan-1kg-unidad.png', 'harina-pan-1kg', 'P.A.N.', 'Harina P.A.N. 1 KG', 'Bolsa', 1.53),
    (DES, 'viveres', 'harina-detrigo-todouso-dulcemar-1kg-unidad.png', 'harina-trigo-todo-uso-dulce-mar-1kg', 'Dulce Mar', 'Harina de Trigo Todo Uso Dulce Mar 1 KG', 'Bolsa', 1.80),
    (DES, 'viveres', 'harina-detrigo-leudante-dulcemar-1kg-unidad.png', 'harina-trigo-leudante-dulce-mar-1kg', 'Dulce Mar', 'Harina de Trigo Leudante Dulce Mar 1 KG', 'Bolsa', 1.80),
    (DES, 'viveres', 'azucar-amanecer-1kg-unidad.png', 'azucar-amanecer-1kg', 'Amanecer', 'Azúcar Amanecer 1 KG', 'Bolsa', 1.69),
    (DES, 'viveres', 'sal-bahia-1kg-unidad.png', 'sal-bahia-1kg', 'Bahía', 'Sal Bahía 1 KG', 'Bolsa', 0.90),
    (DES, 'viveres', 'cereal-cronch-flakes-30gr-unidad.png', 'cereal-cronch-flakes', 'Cronch Flakes', 'Cereal Cronch Flakes', 'Bolsa', 2.73),

    # -- Panadería -----------------------------------------------------------
    (PAN, 'panes', 'pan-sandwich-holsum-420gr-blanco-unidad.png', 'pan-sandwich-holsum-blanco-420gr', 'Holsum', 'Pan Sándwich Holsum Blanco 420 gr', 'Bolsa', 1.50),
    (PAN, 'panes', 'pan-sandwich-holsum-420gr-mantequilla-unidad.png', 'pan-sandwich-holsum-mantequilla-420gr', 'Holsum', 'Pan Sándwich Holsum con Mantequilla 420 gr', 'Bolsa', 2.95),
    (PAN, 'panes', 'pan-bimbo-rapiditas-clasicas-330gr-unidad.png', 'rapiditas-bimbo-clasicas-330gr', 'Bimbo', 'Tortillas Rapiditas Bimbo Clásicas 330 gr', 'Bolsa', 3.02),
    (PAN, 'panes', 'pan-bimbo-rapiditas-diet-330gr-unidad.png', 'rapiditas-bimbo-diet-330gr', 'Bimbo', 'Tortillas Rapiditas Bimbo Diet 330 gr', 'Bolsa', 3.57),
    (PAN, 'panes', 'pan-arabe-6und-unidad.png', 'pan-arabe-piter-6und', 'Piter', 'Pan Árabe Piter 6 und', 'Bolsa', 1.50),
    (PAN, 'panes', 'pan-hamburguesa-elvis-8und-unidad.png', 'pan-hamburguesa-elvis-8und', 'Elvis', 'Pan de Hamburguesa Elvis 8 und', 'Bolsa', 1.85),
    (PAN, 'panes', 'pan-perro-elvis-18und-unidad.png', 'pan-perro-elvis-grande-18und', 'Elvis', 'Pan de Perro Elvis Grande 18 und', 'Bolsa', 2.80),
    (PAN, 'panes', 'pan-perro-elvis-20und-unidad.png', 'pan-perro-elvis-pequeno-20und', 'Elvis', 'Pan de Perro Elvis Pequeño 20 und', 'Bolsa', 1.85),
    (PAN, 'panes', 'pan-perro-elvis-60und-unidad.png', 'pan-perro-elvis-pequeno-60und', 'Elvis', 'Pan de Perro Elvis Pequeño 60 und', 'Bolsa', 5.40),
    (PAN, 'panes', 'pan-perro-donfulgencio-18und-unidad.png', 'pan-perro-don-fulgencio-18und', 'Don Fulgencio', 'Pan de Perro Don Fulgencio Grande 18 und', 'Bolsa', 2.95),
    (PAN, 'panes', 'pan-perro-donfulgencio-20und-unidad.png', 'pan-perro-don-fulgencio-20und', 'Don Fulgencio', 'Pan de Perro Don Fulgencio Grande 20 und', 'Bolsa', 2.55),
    (PAN, 'panes', 'pan-perro-anthony-10und-unidad.png', 'pan-perro-anthony-10und', 'Anthony', 'Pan de Perro Anthony 10 und', 'Bolsa', 2.17),
    (PAN, 'panes', 'pan-perro-joston-10und-unidad.png', 'pan-perro-joston-10und', 'Joston', 'Pan de Perro Joston 10 und', 'Bolsa', 1.60),

    # Sin precio: la lista trae dos panes Don Fulgencio de hamburguesa de 12 und
    # ("MINI" a 2,15 y "GUAPO" a 3,00) y la foto no permite decidir cuál es.
    (PAN, 'panes', 'pan-hamburguesa-donfulgencio-12und-unidad.png', 'pan-hamburguesa-mini-don-fulgencio-12und', 'Don Fulgencio', 'Pan de Hamburguesa Mini Don Fulgencio 12 und', 'Bolsa', 2.15),

    # -- Congelados --------------------------------------------------------
    (CON, 'Productos_frios', 'papa-congelada-agrarfrost-2,5kg-unidad.png', 'papa-congelada-agrarfrost-2-5kg', 'Agrarfrost', 'Papa Congelada Agrarfrost 2,5 KG', 'Bolsa', 10.00),
    (CON, 'Productos_frios', 'papa-congelada-farmer' + "'" + 'sfriends-2,5kg-unidad.png', 'papa-congelada-farmers-friends-2-5kg', FARMERS, 'Papa Congelada ' + FARMERS + ' 2,5 KG', 'Bolsa', 6.50),
    (CON, 'Productos_frios', 'papa-congelada-interfries-2,3kg-unidad.png', 'papa-congelada-interfries-2-3kg', 'Interfries', 'Papa Congelada Interfries 2,3 KG', 'Bolsa', 7.35),
    (CON, 'Productos_frios', 'tequeno-fiestero-tequetrof-25und-unidad.png', 'tequenos-fiesteros-teque-trof-25und', 'Teque Trof', 'Tequeños Fiesteros Teque Trof 25 und', 'Bolsa', 2.35),
    (CON, 'Productos_frios', 'tequeno-escolares-tequetrof-20und-unidad.png', 'tequenos-escolares-teque-trof-20und', 'Teque Trof', 'Tequeños Escolares Teque Trof 20 und', 'Bolsa', 3.27),
    (CON, 'Productos_frios', 'masa-parapastelito-romy' + "'" + 's-1kg-unidad.png', 'masa-pastelitos-romys-1kg', ROMYS, 'Masa para Pastelitos ' + ROMYS + ' 1 KG', 'Bolsa', 1.40),
    (CON, 'Productos_frios', 'masa-parapastelito-tequetrof-1kg-unidad.png', 'masa-pastelitos-teque-trof-1kg', 'Teque Trof', 'Masa para Pastelitos Teque Trof 1 KG', 'Bolsa', 1.52),

    # -- Limpieza e Higiene ------------------------------------------------
    (LIM, 'producto-limpieza', 'jabon-enpolvo-ariel-800gr-unidad.png', 'detergente-ariel-800gr', 'Ariel', 'Detergente en Polvo Ariel 800 gr', 'Bolsa', 4.52),
    (LIM, 'producto-limpieza', 'jabon-enpolvo-bebe-lasllaves-900gr-unidad.png', 'detergente-las-llaves-bebe-900gr', 'Las Llaves', 'Detergente en Polvo Las Llaves Bebé 900 gr', 'Bolsa', 3.60),
    (LIM, 'producto-limpieza', 'jabon-enpolvo-lasllaves-400gr-unidad.png', 'detergente-las-llaves-activa-400gr', 'Las Llaves', 'Detergente Las Llaves Limpieza Activa 400 gr', 'Bolsa', 1.51),
    (LIM, 'producto-limpieza', 'jabon-encrema-lasllaves-500gr-unidad.png', 'jabon-crema-las-llaves-500gr', 'Las Llaves', 'Jabón en Crema Las Llaves 500 gr', 'Pote', 4.99),
    (LIM, 'producto-limpieza', 'jabon-liquido-lasllaves-0,5lts-unidad.png', 'jabon-liquido-las-llaves-500ml', 'Las Llaves', 'Jabón Líquido Las Llaves 500 ml', 'Botella', 5.34),
    (LIM, 'producto-limpieza', 'jabon-liquido-dks-1lts-unidad.png', 'jabon-liquido-dksa-1l', 'DKSA', 'Jabón Líquido DKSA 1 L', 'Botella', 2.09),
    (LIM, 'producto-limpieza', 'cloro-dks-1lts-unidad.png', 'cloro-dksa-1l', 'DKSA', 'Cloro DKSA 1 L', 'Botella', 1.60),
    (LIM, 'producto-limpieza', 'desinfectante-dks-1lts-unidad.png', 'desinfectante-dksa-1l', 'DKSA', 'Desinfectante DKSA 1 L', 'Botella', 1.28),
    # -- Refrescos y Maltas --------------------------------------------------
    (REF, 'bebidas', 'cocacola-lata-355ml-unidad.png', 'coca-cola-lata-355ml', 'Coca-Cola', 'Coca-Cola 355 ml', 'Lata', 1.01),
    (REF, 'bebidas', 'cocacola-1lts-unidad.png', 'coca-cola-1l', 'Coca-Cola', 'Coca-Cola 1 L', 'Botella', 1.01),
    (REF, 'bebidas', 'cocacola-1,5lts-unidad.png', 'coca-cola-1-5l', 'Coca-Cola', 'Coca-Cola 1,5 L', 'Botella', 1.30),
    (REF, 'bebidas', 'cocacola-2lts-unidad.png', 'coca-cola-2l', 'Coca-Cola', 'Coca-Cola 2 L', 'Botella', 1.65),
    (REF, 'bebidas', 'refresco-golden-kolita-1,5lts-unidad.png', 'golden-kolita-1-5l', 'Golden', 'Refresco Golden Kolita 1,5 L', 'Botella', 1.21),
    (REF, 'bebidas', 'refresco-golden-manzanita-1,5lts-unidad.png', 'golden-manzanita-1-5l', 'Golden', 'Refresco Golden Manzanita 1,5 L', 'Botella', 1.21),
    (REF, 'bebidas', 'refresco-golden-pina-1,5lts-unidad.png', 'golden-pina-1-5l', 'Golden', 'Refresco Golden Piña 1,5 L', 'Botella', 1.21),
    (REF, 'bebidas', 'refresco-golden-uva-1,5lts-unidad.png', 'golden-uva-1-5l', 'Golden', 'Refresco Golden Uva 1,5 L', 'Botella', 1.21),
    (REF, 'bebidas', 'maltin-polar-1,5lts-unidad.png', 'maltin-polar-1-5l', 'Maltín Polar', 'Maltín Polar 1,5 L', 'Botella', 2.01),

    # -- Aguas y Jugos -------------------------------------------------------
    (AGJ, 'bebidas', 'agua-minalba-355ml-unidad.png', 'agua-minalba-355ml', 'Minalba', 'Agua Mineral Minalba 355 ml', 'Botella', 0.80),
    (AGJ, 'bebidas', 'agua-minalba-600ml-unidad.png', 'agua-minalba-600ml', 'Minalba', 'Agua Mineral Minalba 600 ml', 'Botella', 1.01),
    (AGJ, 'bebidas', 'agua-minalba-5lts-unidad.png', 'agua-minalba-5l', 'Minalba', 'Agua Mineral Minalba 5 L', 'Garrafa', 5.48),
    (AGJ, 'bebidas', 'yukery-naranja-1,5lts-unidad.png', 'jugo-yukery-naranja-1-5l', 'Yukery', 'Jugo Yukery Naranja 1,5 L', 'Botella', 4.80),
    (AGJ, 'bebidas', 'yukery-manzana-1,5lts-unidad.png', 'jugo-yukery-manzana-1-5l', 'Yukery', 'Jugo Yukery Manzana 1,5 L', 'Botella', 4.80),
    (AGJ, 'bebidas', 'yuky-pack-250ml-manzana-unidad.png', 'yuky-pack-manzana-250ml', 'Yuky Pack', 'Yuky Pack Manzana 250 ml', 'Tetrapak', 1.10),
    (AGJ, 'bebidas', 'yuky-pack-250ml-pera-unidad.png', 'yuky-pack-pera-250ml', 'Yuky Pack', 'Yuky Pack Pera 250 ml', 'Tetrapak', 1.10),
    (AGJ, 'bebidas', 'lipton-durazno-500ml-unidad.png', 'te-lipton-durazno-500ml', 'Lipton', 'Té Lipton Durazno 500 ml', 'Botella', 2.06),
    (AGJ, 'bebidas', 'gatorade-frutastropicales-500ml-unidad.png', 'gatorade-frutas-tropicales-500ml', 'Gatorade', 'Gatorade Frutas Tropicales 500 ml', 'Botella', 2.19),
    (AGJ, 'bebidas', 'gatorade-mora-500ml-unidad.png', 'gatorade-mora-500ml', 'Gatorade', 'Gatorade Mora 500 ml', 'Botella', 2.19),

    # == SIN PRECIO DE LISTA (precio = None) =================================
    # Se publican con foto y ficha completa, pero la tarjeta pide consultar por
    # WhatsApp en vez de mostrar una cifra.

    (MAY, 'pendientes', 'mayonesa-la-vina-bolsa-3-65kg.webp', 'mayonesa-la-vina-bolsa-3-65kg', 'La Viña', 'Mayonesa La Viña 3,65 KG', 'Bolsa', 5.80),
    (MAY, 'pendientes', 'mayonesa-oba-bolsa-3-5kg.webp', 'mayonesa-oba-3-5kg', 'OBA', 'Mayonesa OBA 3,5 KG', 'Bolsa', 5.95),

    (TOM, 'pendientes', 'salsaketchup-heinz397gr-vidrio.webp', 'ketchup-heinz-397gr-vidrio', 'Heinz', 'Kétchup Heinz 397 gr en Vidrio', 'Frasco', 2.31),
    (TOM, 'pendientes', 'ketchup-volpack-heinz-12-7kg.webp', 'ketchup-heinz-volpack-12-7kg', 'Heinz', 'Kétchup Heinz Volpack 12,7 KG', 'Bolsa', 58.00),
    (TOM, 'pendientes', 'salsa-vina-tomatico-3-8kg.webp', 'salsa-vina-tomatico-3-8kg', 'La Viña', 'Salsa Viña Tomático 3,8 KG', 'Bolsa', 3.50),

    (BBQ, 'pendientes', 'bbq-hot-fritz-12x930g.webp', 'bbq-hot-fritz-930gr', 'Fritz', 'Salsa BBQ Hot Fritz 930 gr', 'Botella', 4.95),

    (UNT, 'pendientes', 'mantequilla-lactuario-maracay-250gr.webp', 'mantequilla-lactuario-maracay-250gr', 'Lactuario de Maracay', 'Mantequilla Lactuario de Maracay 250 gr', 'Pote', 10.64),

    (REF, 'pendientes', 'cocacola-24und-caja.webp', 'coca-cola-caja-24und', 'Coca-Cola', 'Coca-Cola Retornable 24 und', 'Caja', 10.86),
    (REF, 'pendientes', 'pepsi-24und-caja.webp', 'pepsi-caja-24und', 'Pepsi', 'Pepsi Retornable 24 und', 'Caja', 12.53),
    (REF, 'pendientes', '7up-24und-caja.webp', 'refresco-7up-caja-24und', '7up', 'Refresco 7up Retornable 24 und', 'Caja', 12.53),
    (REF, 'pendientes', 'refresco-7up-1-5lts.webp', 'refresco-7up-1-5l', '7up', 'Refresco 7up 1,5 L', 'Botella', 1.25),
    (REF, 'pendientes', 'chinotto-24und-caja.webp', 'refresco-chinotto-caja-24und', 'Chinotto', 'Refresco Chinotto Retornable 24 und', 'Caja', 10.86),
    (REF, 'pendientes', 'frescolita-24und-caja.webp', 'refresco-frescolita-caja-24und', 'Frescolita', 'Refresco Frescolita Retornable 24 und', 'Caja', 10.86),
    (REF, 'pendientes', 'fanta-toronja-1lts.webp', 'fanta-toronja-1l', 'Fanta', 'Fanta Toronja 1 L', 'Botella', 0.71),
    (REF, 'pendientes', 'golden-manzanita-24und-caja.webp', 'golden-manzanita-caja-24und', 'Golden', 'Refresco Golden Manzanita Retornable 24 und', 'Caja', 12.53),
    (REF, 'pendientes', 'golden-pina-24und-caja.webp', 'golden-pina-caja-24und', 'Golden', 'Refresco Golden Piña Retornable 24 und', 'Caja', 12.53),
    (REF, 'pendientes', 'golden-uva-24und-caja.webp', 'golden-uva-caja-24und', 'Golden', 'Refresco Golden Uva Retornable 24 und', 'Caja', 12.53),
    (REF, 'pendientes', 'maltin-polar-retornable-caja.webp', 'maltin-polar-caja-36und', 'Maltín Polar', 'Maltín Polar Retornable 36 und', 'Caja', 19.63),

    (AGJ, 'pendientes', 'hit-naranja-24und-caja.webp', 'hit-naranja-caja-24und', 'Hit', 'Jugo Hit Naranja Retornable 24 und', 'Caja', 10.86),

    (CAF, 'pendientes', 'te-dagusto-limon-1kg.webp', 'te-da-gusto-limon-1kg', 'Da Gusto', 'Té Da Gusto Limón 1 KG', 'Bolsa', 6.00),

    (ACE, 'pendientes', 'vinagre-fritz-500ml.webp', 'vinagre-fritz-500ml', 'Fritz', 'Vinagre Fritz 500 ml', 'Botella', 1.01),

    (CON, 'pendientes', 'carne-hamburguesa-alimentosbambuda-8und-60gr.webp', 'carne-hamburguesa-bambuda-8und', 'Bambuda', 'Carne para Hamburguesa Bambuda 8 und x 60 gr', 'Bolsa', 2.90),
    (CON, 'pendientes', 'carne-hamburguesa-quintbarr-12und-50gr.webp', 'carne-hamburguesa-quintbarr-12und', 'Quintbarr', 'Carne para Hamburguesa Quintbarr 12 und x 50 gr', 'Bolsa', 6.50),
    (CON, 'pendientes', 'carne-hamburguesa-quintbarr-6und-100gr.webp', 'carne-hamburguesa-quintbarr-6und', 'Quintbarr', 'Carne para Hamburguesa Quintbarr 6 und x 100 gr', 'Bolsa', 6.50),
    (CON, 'pendientes', 'carne-hamburguesa-sabrocarnes-12und-60gr.webp', 'carne-hamburguesa-sabrocarnes-12und', 'Sabrocarnes', 'Carne para Hamburguesa Sabrocarnes 12 und x 60 gr', 'Bolsa', 2.80),
    (CON, 'pendientes', 'milanesadepollo-delcorral-1kg.webp', 'nuggets-pollo-del-corral-1kg', 'Del Corral', 'Nuggets de Pollo Del Corral 1 KG', 'Bolsa', 11.88),
    (CON, 'pendientes', 'milanesadepollo-superfood.webp', 'milanesa-pollo-super-food', 'Super Food', 'Milanesa de Pollo Super Food', 'Al peso', 12.54),

    # ══ CHARCUTERÍA ═══════════════════════════════════════════════════════
    # Presentación 'Al peso' = se vende por KG, mínimo 100 gr.

    # -- Quesos --------------------------------------------------------------
    (QUE, 'queso', 'queso-mozzarella-palmira-unidad.png', 'queso-mozzarella-palmira', 'Palmira', 'Queso Mozzarella Palmira', PESO, 11.00),
    (QUE, 'queso', 'queso-paisa-palmira-unidad.png', 'queso-paisa-palmira', 'Palmira', 'Queso Paisa Palmira', PESO, 11.50),
    (QUE, 'queso', 'queso-mozzarella-napolitana-unidad.png', 'queso-mozzarella-napolitana', 'Napolitana', 'Queso Mozzarella Napolitana', PESO, 17.50),
    (QUE, 'queso', 'queso-amarillo-los-frailes-unidad.png', 'queso-amarillo-los-frailes', 'Los Frailes', 'Queso Amarillo Los Frailes', PESO, 24.59),
    (QUE, 'queso', 'queso-amarillo-los-frailes-munster-unidad.png', 'queso-amarillo-munster-los-frailes', 'Los Frailes', 'Queso Amarillo Munster Los Frailes', PESO, 26.07),
    (QUE, 'queso', 'queso-facilita-kraft-unidad.png', 'queso-facilita-kraft-24und', 'Kraft', 'Queso Facilita Kraft 24 und', 'Paquete', 7.80),
    (QUE, 'queso', 'queso-amarillo-monte-sano-unidad.png', 'queso-amarillo-monte-sano', 'Monte Sano', 'Queso Amarillo Monte Sano', PESO, 12.89),

    # -- Jamones y Pechugas --------------------------------------------------
    (JAM, 'jamones', 'jamon-pierna-villa-julia-unidad.png', 'jamon-pierna-villa-julia', 'Villa Julia', 'Jamón de Pierna Villa Julia', PESO, 4.95),
    (JAM, 'jamones', "jamon-pierna-l'prado-unidad.png", 'jamon-pierna-lprado', LPRADO, 'Jamón de Pierna ' + LPRADO, PESO, 8.80),
    (JAM, 'jamones', 'jamon-espalda-millennium-unidad.png', 'jamon-espalda-millennium', 'Millennium', 'Jamón de Espalda Millennium', PESO, 9.00),
    (JAM, 'jamones', 'jamon-ahumado-cumbrefresca-unidad.png', 'jamon-ahumado-cumbre-fresca', 'Cumbre Fresca', 'Jamón Ahumado Cumbre Fresca', PESO, 9.00),
    (JAM, 'jamones', 'jamon-pierna-alimex-unidad.png', 'jamon-pierna-alimex', 'Alimex', 'Jamón de Pierna Alimex', PESO, 10.51),
    (JAM, 'jamones', 'jamon-pierna-arichuna-unidad.png', 'jamon-pierna-arichuna', 'Arichuna', 'Jamón de Pierna Arichuna', PESO, 11.31),
    (JAM, 'jamones', 'jamon-pierna-plumrose-unidad.png', 'jamon-pierna-plumrose', 'Plumrose', 'Jamón de Pierna Plumrose', PESO, 13.80),
    (JAM, 'jamones', 'pechuga-de-pavo-ahulux-unidad.png', 'pechuga-pavo-pimenton-ahulux', 'Ahulux', 'Pechuga de Pavo con Pimentón Ahulux', PESO, 6.30),
    (JAM, 'jamones', 'jamon-pechuga-de-pavo-ahumada-ahulux-unidad.png', 'pechuga-pavo-ahumada-ahulux', 'Ahulux', 'Pechuga de Pavo Ahumada Ahulux', PESO, 8.50),
    (JAM, 'jamones', "jamon-pechuga-de-pavo-l'prado-unidad.png", 'pechuga-pavo-lprado', LPRADO, 'Pechuga de Pavo ' + LPRADO, PESO, 8.70),

    # -- Mortadelas ----------------------------------------------------------
    (MOR, 'jamones', 'mostadela-de-pollo-del-corral-unidad.png', 'mortadela-pollo-del-corral', 'Del Corral', 'Mortadela de Pollo Del Corral', 'Unidad', 2.70),
    (MOR, 'embutidos', 'mortadela-de-pollo-punta-de-monte-detallado.png', 'mortadela-pollo-punta-de-monte', 'Punta de Monte', 'Mortadela de Pollo Punta de Monte', PESO, 5.64),
    (MOR, 'jamones', 'mortadela-extra-ahulux-unidad.png', 'mortadela-extra-ahulux', 'Ahulux', 'Mortadela Extra Ahulux', PESO, 7.50),
    (MOR, 'embutidos', 'mortadela-de-pollo-la-patrona-detallado.png', 'mortadela-pollo-la-patrona-900gr', 'La Patrona', 'Mortadela de Pollo La Patrona 900 gr', 'Unidad', 2.30),

    # -- Chorizos y Pepperoni ------------------------------------------------
    (CHO, 'embutidos', 'chorizo-ahumado-ahulux-detallado.png', 'chorizo-ahumado-ahulux', 'Ahulux', 'Chorizo Ahumado Ahulux', PESO, 6.65),
    (CHO, 'embutidos', 'chorizo-de-ajo-ahulux-detallado.png', 'chorizo-de-ajo-ahulux', 'Ahulux', 'Chorizo de Ajo Ahulux', PESO, 6.65),
    (CHO, 'embutidos', 'pepperoni-leyton-detallado.png', 'pepperoni-leyton', 'Leyton', 'Pepperoni Leyton', PESO, 12.28),
    (CHO, 'embutidos', 'pepperoni-gran-cebu-detallado.png', 'pepperoni-gran-cebu', 'Gran Cebú', 'Pepperoni Gran Cebú', PESO, 12.28),
    (CHO, 'variedad', 'Chorizo-Español-La-Montserratina.png', 'chorizo-espanol-la-montserratina', 'La Montserratina', 'Chorizo Español La Montserratina', PESO, 40.02),
    (CHO, 'embutidos', 'salchichon-detallado.png', 'salchichon-italguarico', 'Italguárico', 'Salchichón Italguárico', PESO, 50.41),

    # -- Salchichas y Polacas ------------------------------------------------
    (SAL, 'embutidos', 'polaca-las-tinajas-detallado.png', 'polaca-las-tinajas', 'Las Tinajas', 'Polaca Las Tinajas', PESO, 4.98),
    (SAL, 'embutidos', 'salchicha-purolomo-detallado.png', 'salchicha-purolomo', 'Purolomo', 'Salchicha Purolomo', PESO, 5.30),
    (SAL, 'embutidos', 'polaca-meister-detallado.png', 'polaca-meister', 'Meister', 'Polaca Meister', PESO, 14.12),
    (SAL, 'embutidos', 'polaca-tovar-detallado.png', 'polaca-tovar', 'Tovar', 'Polaca Tovar', PESO, 15.51),
    (SAL, 'embutidos', 'salchica-de-pollo-prado-22und-paquete .png', 'salchicha-pollo-prado-22und', 'Prado', 'Salchicha de Pollo Prado 22 und', 'Paquete', 3.95),
    (SAL, 'embutidos', "salchicha-frigo's-20und-paquete.png", 'salchicha-frigos-20und', FRIGOS, 'Salchicha ' + FRIGOS + ' 20 und', 'Paquete', 5.70),
    (SAL, 'embutidos', 'salchicha-wiener-kaiser-pequeno-paquete .png', 'salchicha-wiener-kaiser-pequena', 'Kaiser', 'Salchicha Wiener Kaiser Pequeña', 'Paquete', 8.70),
    (SAL, 'embutidos', 'salchicha-wiener-kaiser-grande-paquete.png', 'salchicha-wiener-kaiser-grande', 'Kaiser', 'Salchicha Wiener Kaiser Grande', 'Paquete', 10.40),
    (SAL, 'embutidos', "salchicha-frigo's-40und-paquete.png", 'salchicha-frigos-40und', FRIGOS, 'Salchicha ' + FRIGOS + ' 40 und', 'Paquete', 11.30),
    (SAL, 'embutidos', 'polaca-tipo-kaiser-paquete.png', 'polaca-tipo-kaiser', 'Kaiser', 'Polaca Tipo Kaiser', 'Paquete', 12.75),
    (SAL, 'embutidos', 'salchicha-mega-polaca-prosciutti-detallado.png', 'salchicha-mega-polaca-prosciutti', 'Prosciutti', 'Salchicha Mega Polaca Prosciutti', PESO, 5.50),

    # -- Combos --------------------------------------------------------------
    (COM, 'combos', 'combo-de-perro-10und-con-salsas.png', 'combo-perro-10und-con-salsas', 'Marimar', 'Combo Perro 10 und con Salsas', 'Combo', 8.50),
    (COM, 'combos', 'combo-hamburguesa-8und-con-salsas.png', 'combo-hamburguesa-8und-con-salsas', 'Marimar', 'Combo Hamburguesa 8 und con Salsas', 'Combo', 9.50),
    (COM, 'combos', 'combo-de-perro-20und-con-salsas.png', 'combo-perro-20und-con-salsas', 'Marimar', 'Combo Perro 20 und con Salsas', 'Combo', 12.00),
    (COM, 'combos', 'combo-hamburguesa-12und-con-salsas.png', 'combo-hamburguesa-12und-con-salsas', 'Marimar', 'Combo Hamburguesa 12 und con Salsas', 'Combo', 11.50),
    (COM, 'combos', 'combo-de-perro-10und-sin-salsas.png', 'combo-perro-10und-sin-salsas', 'Marimar', 'Combo Perro 10 und sin Salsas', 'Combo', 5.00),
    (COM, 'combos', 'combo-de-perro-20und-sin-salsas.png', 'combo-perro-20und-sin-salsas', 'Marimar', 'Combo Perro 20 und sin Salsas', 'Combo', 8.00),
    (COM, 'combos', 'combo-hamburguesa-8und-sin-salsas.png', 'combo-hamburguesa-8und-sin-salsas', 'Marimar', 'Combo Hamburguesa 8 und sin Salsas', 'Combo', 5.50),
    (COM, 'combos', 'combo-hamburguesa-12und-sin-salsas.png', 'combo-hamburguesa-12und-sin-salsas', 'Marimar', 'Combo Hamburguesa 12 und sin Salsas', 'Combo', 7.00),

    # ══ LOTE 7 ═════════════════════════════════════════════════════════════
    # -- Salsas Detalladas: la lista trae un único precio, SALSAS DET. 370GR --
    (SDT, 'otros', 'mayonesa-detallada-370gr.png', 'mayonesa-detallada-370gr', 'Marimar', 'Mayonesa Detallada 370 gr', 'Envase', 1.50),
    (SDT, 'otros', 'salsa-detallada-salsadetomate-370gr.png', 'salsa-tomate-detallada-370gr', 'Marimar', 'Salsa de Tomate Detallada 370 gr', 'Envase', 1.50),
    (SDT, 'otros', 'mostaza-detallada-370gr.png', 'mostaza-detallada-370gr', 'Marimar', 'Mostaza Detallada 370 gr', 'Envase', 1.50),
    (SDT, 'otros', 'BBQ-detallada-370gr.png', 'salsa-bbq-detallada-370gr', 'Marimar', 'Salsa BBQ Detallada 370 gr', 'Envase', 1.50),
    (SDT, 'otros', 'salsa-detallada-cheddar-370gr.png', 'salsa-cheddar-detallada-370gr', 'Marimar', 'Salsa de Cheddar Detallada 370 gr', 'Envase', 1.50),
    (SDT, 'otros', 'salsa-detallada-maiz-370gr.png', 'salsa-maiz-detallada-370gr', 'Marimar', 'Salsa de Maíz Detallada 370 gr', 'Envase', 1.50),
    (SDT, 'variedad', 'salsa-tocineta-detallada-370gr.png', 'salsa-tocineta-detallada-370gr', 'Marimar', 'Salsa de Tocineta Detallada 370 gr', 'Envase', 1.50),

    # -- Aceites --
    (ACE, 'otros', 'aceite-ixora-4800ml.png', 'aceite-ixora-4-8l', 'Ixora', 'Aceite Ixora 4,8 L', 'Garrafa', 17.00),
    (ACE, 'otros', 'aceite-ixora-19lts.png', 'aceite-ixora-19l', 'Ixora', 'Aceite Ixora 19 L', 'Bidón', 62.00),

    # -- Despensa --
    (DES, 'otros', 'cubitos-iberia-pollo-paquete.png', 'cubitos-iberia-pollo', 'Iberia', 'Cubitos de Pollo Iberia', 'Caja', 1.93),
    (DES, 'otros', 'mezcla-deshidratada-para-sopa-sabor-pollo-60gr.png', 'sopa-iberia-pollo-fideos-60gr', 'Iberia', 'Sopa de Pollo con Fideos Iberia 60 gr', 'Sobre', 1.10),
    (DES, 'otros', 'avena-mil-hojuelas-340gr.png', 'avena-mil-hojuelas-340gr', 'Mil', 'Avena en Hojuelas Mil 340 gr', 'Bolsa', 1.00),

    # -- Tés McCormick --
    (CAF, 'otros', 'te-McCormick-frutos-del-bosque-10sobres-paquete.png', 'te-mccormick-frutos-bosque-10', 'McCormick', 'Té McCormick Frutos del Bosque 10 sobres', 'Caja', 1.89),
    (CAF, 'otros', 'te-McCormick-roja-jamaica-10sobres-paquete.png', 'te-mccormick-rosa-jamaica-10', 'McCormick', 'Té McCormick Rosa de Jamaica 10 sobres', 'Caja', 1.89),
    (CAF, 'otros', 'te-McCormick-verde-10sobres-paquete.png', 'te-mccormick-verde-10', 'McCormick', 'Té Verde McCormick 10 sobres', 'Caja', 1.89),
    (CAF, 'otros', 'te-McCormick-frutos-del-bosque-20sobres-paquete.png', 'te-mccormick-frutos-bosque-20', 'McCormick', 'Té McCormick Frutos del Bosque 20 sobres', 'Caja', 3.48),
    (CAF, 'otros', 'te-McCormick-frutos-rojos-20sobres-paquete.png', 'te-mccormick-frutos-rojos-20', 'McCormick', 'Té McCormick Frutos Rojos 20 sobres', 'Caja', 3.48),

    # -- Untables, lácteos y conservas --
    (UNT, 'otros', 'ovomaltina-35gr.png', 'ovomaltina-35gr', 'Ovomaltina', 'Ovomaltina Crema para Untar 35 gr', 'Tubo', 1.26),
    (LAC, 'otros', 'leche-purisima-completa-en polvo-900gr.png', 'leche-polvo-purisima-900gr', 'Purísima', 'Leche en Polvo Completa Purísima 900 gr', 'Bolsa', 12.00),
    (ENL, 'otros', 'compota-heinz-manzana-113gr.png', 'compota-heinz-manzana-113gr', 'Heinz', 'Compota Heinz de Manzana 113 gr', 'Frasco', 1.01),

    # -- Dulces y Galletas --
    (DUL, 'otros', 'pinguinos-20gr.png', 'pinguinos-marinela-20gr', 'Marinela', 'Pingüinos Marinela 20 gr', 'Paquete', 0.46),
    (DUL, 'otros', 'canelitas-marinela-60gr.png', 'canelitas-marinela-60gr', 'Marinela', 'Galletas Canelitas Marinela 60 gr', 'Paquete', 0.68),
    (DUL, 'otros', 'polvorones-marinela-75gr.png', 'polvorones-marinela-75gr', 'Marinela', 'Galletas Polvorones Marinela 75 gr', 'Paquete', 0.71),
    (DUL, 'otros', 'panque-bimbo-sabor-vainilla-y-chocolate-50gr.png', 'panque-bimbo-50gr', 'Bimbo', 'Panqué Bimbo Vainilla y Chocolate 50 gr', 'Paquete', 0.93),
    (DUL, 'otros', 'mr.-brown-chocolate-65gr.png', 'mr-brown-marinela-65gr', 'Marinela', 'Mr. Brown Marinela 65 gr', 'Paquete', 1.35),
    (DUL, 'otros', 'galletas-soda-paquete.png', 'galletas-soda-puig', 'Puig', 'Galletas de Soda Puig', 'Paquete', 1.73),
    (DUL, 'otros', 'chocolate-savoy-barra-70gr.png', 'chocolate-savoy-barra-70gr', 'Savoy', 'Chocolate Savoy 70 gr', 'Barra', 2.51),
    (DUL, 'otros', 'caramelo-chao-fresa-original-paquete.png', 'caramelos-chao-fresa', 'Chao', 'Caramelos Chao Fresa', 'Bolsa', 2.90),
    (DUL, 'otros', 'caramelo-chao-menta-original-paquete.png', 'caramelos-chao-menta', 'Chao', 'Caramelos Chao Menta Original', 'Bolsa', 2.90),
    (DUL, 'otros', 'chocolate-oscuro-savoy-postre-800gr-paquete-v.png', 'chocolate-savoy-postres-oscuro-40', 'Savoy', 'Chocolate Oscuro 40% Savoy Postres 800 gr', 'Bolsa', 18.50),
    (DUL, 'otros', 'chocolate-con-leche-savoy-postre-800gr-paquete.png', 'chocolate-savoy-postres-leche-26', 'Savoy', 'Chocolate con Leche 26% Savoy Postres 800 gr', 'Bolsa', 20.03),
    (DUL, 'otros', 'chocolate-oscuro-savoy-postre-800gr-paquete.png', 'chocolate-savoy-postres-oscuro-55', 'Savoy', 'Chocolate Oscuro 55% Savoy Postres 800 gr', 'Bolsa', 20.60),

    # ══ SIN FOTO (archivo None): publicados con nombre y precio ════════════
    (MOS, 'variedad', 'Mostaza-Heinz-galón.png', 'mostaza-heinz-galon', 'Heinz', 'Mostaza Heinz Galón', 'Galón', 17.50),
    (MOS, None, None, 'mostaza-la-marca', 'La Marca', 'Mostaza La Marca', 'Unidad', 12.50),
    (MOS, 'variedad', 'Mostaza-miel-fritz-250gr.png', 'mostaza-miel-fritz-250gr', 'Fritz', 'Mostaza con Miel Fritz 250 gr', 'Unidad', 2.10),
    (TOM, 'variedad', 'Kétchup-sachet-chef-caja-mil-und.png', 'ketchup-sachet-chef-1000und', 'Chef', 'Kétchup Sachet Chef 1.000 und', 'Caja', 63.00),
    (ADE, None, None, 'aderezo-tocineta-fritz-3kg', 'Fritz', 'Aderezo de Tocineta Fritz 3 KG', 'Bolsa', 9.85),
    (ACE, 'variedad', 'Vinagre-avila-500ml.png', 'vinagre-avila-500ml', 'Ávila', 'Vinagre Ávila 500 ml', 'Botella', 1.01),
    (ACE, 'variedad', 'Vinagre-fritz-3.7lts.png', 'vinagre-fritz-3-7l', 'Fritz', 'Vinagre Fritz 3,7 L', 'Galón', 6.26),
    (UNT, 'variedad', 'Margarina-mavesa-250gr.png', 'margarina-mavesa-250gr', 'Mavesa', 'Margarina Mavesa 250 gr', 'Pote', 1.50),
    (UNT, 'variedad', 'Margarina-mavesa-1kg.png', 'margarina-mavesa-1kg', 'Mavesa', 'Margarina Mavesa 1 KG', 'Pote', 5.80),
    (AGJ, 'variedad', 'Gatorade-naranja-500ml.png', 'gatorade-naranja', 'Gatorade', 'Gatorade Naranja 500 ml', 'Botella', 2.19),
    (AGJ, 'variedad', 'Agua-Mineral-Minalba-1.5lts.png', 'agua-minalba-1-5l', 'Minalba', 'Agua Mineral Minalba 1,5 L', 'Botella', 1.90),
    (AGJ, 'variedad', 'Jugo-Yukery-pera-1,5L.png', 'jugo-yukery-pera-1-5l', 'Yukery', 'Jugo Yukery Pera 1,5 L', 'Botella', 4.80),
    (JAM, 'variedad', 'ahumado-ahulux.png', 'jamon-ahumado-ahulux', 'Ahulux', 'Jamón Ahumado Ahulux', PESO, 8.35),

    # -- Desechables y Papelería ---------------------------------------------
    (DES2, 'otros', 'porta-perro-grande-unidad.png', 'porta-perro-grande', 'Genérico', 'Porta Perro Grande', 'Paquete', 1.70),
    (DES2, 'otros', 'porta-perro-pequeno-unidad.png', 'porta-perro-pequeno', 'Genérico', 'Porta Perro Pequeño', 'Paquete', 1.20),
    (DES2, 'otros', 'servilleta-z-unidad.png', 'servilletas-z-160und', 'Z', 'Servilletas Z Pequeñas 160 und', 'Paquete', 1.00),
    # Sin precio: la lista sólo trae "SERVILLETA Z"; estas de 200 no aparecen.
    (DES2, 'otros', 'servilletas-pequenas-unidad.png', 'servilletas-pequenas-200und', 'Britlux', 'Servilletas Pequeñas Britlux 200 und', 'Paquete', 1.08),
    # ══ Entrega "variedad" — 52 productos nuevos ═══════════════════════════
    # Precio None = la lista de precios no lo trae. La ficha manda a consultar
    # por WhatsApp en vez de enseñar una cifra inventada.

    # -- Vasos plásticos Maxiplast --
    (DES2, 'variedad', 'vasos-27-plasticos-maxiplast.png', 'vaso-maxiplast-27', 'Maxiplast', 'Vaso Plástico Maxiplast N° 27 · 2 oz · 100 und', 'Paquete', None),
    (DES2, 'variedad', 'vasos-57-plasticos-maxiplast.png', 'vaso-maxiplast-57', 'Maxiplast', 'Vaso Plástico Maxiplast N° 57 · 5 oz · 100 und', 'Paquete', 1.96),
    (DES2, 'variedad', 'vasos-67-plasticos-maxiplast.png', 'vaso-maxiplast-67', 'Maxiplast', 'Vaso Plástico Maxiplast N° 67 · 6 oz · 100 und', 'Paquete', 1.97),
    (DES2, 'variedad', 'vasos-77-plasticos-maxiplast.png', 'vaso-maxiplast-77', 'Maxiplast', 'Vaso Plástico Maxiplast N° 77 · 7 oz · 100 und', 'Paquete', 1.77),
    (DES2, 'variedad', 'vasos-89-plasticos-maxiplast.png', 'vaso-maxiplast-89', 'Maxiplast', 'Vaso Plástico Maxiplast N° 89 · 8,5 oz · 50 und', 'Paquete', 1.43),
    (DES2, 'variedad', 'vasos-107-plasticos-maxiplast.png', 'vaso-maxiplast-107', 'Maxiplast', 'Vaso Plástico Maxiplast N° 107 · 10 oz · 50 und', 'Paquete', 1.24),
    (DES2, 'variedad', 'vasos-127-plasticos-maxiplast.png', 'vaso-maxiplast-127', 'Maxiplast', 'Vaso Plástico Maxiplast N° 127 · 345 cc · 50 und', 'Paquete', 1.95),
    (DES2, 'variedad', 'vasos-147-plasticos-maxiplast.png', 'vaso-maxiplast-147', 'Maxiplast', 'Vaso Plástico Maxiplast N° 147 · 14 oz · 50 und', 'Paquete', 2.42),
    (DES2, 'variedad', 'vasos-227-plasticos-maxiplast.png', 'vaso-maxiplast-227', 'Maxiplast', 'Vaso Plástico Maxiplast N° 227 · 22 oz · 30 und', 'Paquete', 2.10),

    # -- Papel para charcutería y empaque --
    (DES2, 'variedad', 'Papel-encerado-grande-10und.png', 'papel-encerado-grande-10und', 'Genérico', 'Papel Encerado Grande 10 und', 'Paquete', None),
    (DES2, 'variedad', 'Papel-encerado-negro-grande-10und.png', 'papel-encerado-negro-grande-10und', 'Genérico', 'Papel Encerado Negro Grande 10 und', 'Paquete', None),
    (DES2, 'variedad', 'Papel-encerado-negro-pequeno-10und.png', 'papel-encerado-negro-pequeno-10und', 'Genérico', 'Papel Encerado Negro Pequeño 10 und', 'Paquete', None),
    (DES2, 'variedad', 'Papel-encerado-rojo-grande-10und.png', 'papel-encerado-rojo-grande-10und', 'Genérico', 'Papel Encerado Rojo Grande 10 und', 'Paquete', None),
    (DES2, 'variedad', 'Papel-estampado-100und.png', 'papel-estampado-100und', 'Genérico', 'Papel Estampado 100 und', 'Paquete', 7.00),
    (DES2, 'variedad', 'Papel-estampado-Navidad-100und.png', 'papel-estampado-navidad-100und', 'Genérico', 'Papel Estampado Navidad 100 und', 'Paquete', 7.00),
    (DES2, 'variedad', 'Papel-gris-2kg.png', 'papel-gris-2kg', 'Genérico', 'Papel Gris 2 KG', 'Paquete', 2.00),
    (DES2, 'variedad', 'Papel-gris-500gr.png', 'papel-gris-500gr', 'Genérico', 'Papel Gris 500 gr', 'Paquete', 1.25),
    (DES2, 'variedad', 'Papel-parafinado-Rollo-rojo-80und.png', 'papel-parafinado-rojo-80und', 'Genérico', 'Papel Parafinado Rojo 80 und', 'Rollo', 3.50),
    (DES2, 'variedad', 'Papel-parafinado-Rollo-verde-80und.png', 'papel-parafinado-verde-80und', 'Genérico', 'Papel Parafinado Verde 80 und', 'Rollo', 3.50),
    (DES2, 'variedad', 'Papel-térmico-10und.png', 'papel-termico-10und', 'Genérico', 'Papel Térmico 10 und', 'Paquete', 1.25),

    # -- Papel higiénico y toallín --
    (LIM, 'variedad', 'papel-higienico-jazmin.png', 'papel-higienico-jazmin', 'Jazmín', 'Papel Higiénico Jazmín 200 hojas', 'Paquete', 1.74),
    (LIM, 'variedad', 'papel-higienico-petalo.png', 'papel-higienico-petalo', 'Pétalo', 'Papel Higiénico Pétalo 300 hojas', 'Paquete', 2.20),
    (LIM, 'variedad', 'papel-higienico-rosal.png', 'papel-higienico-rosal', 'Rosal', 'Papel Higiénico Rosal', 'Paquete', 1.45),
    (LIM, 'variedad', 'toallin-rosal.png', 'toallin-rosal', 'Rosal', 'Toallín Rosal', 'Rollo', 1.36),

    # -- Papas para perros calientes --
    (CON, 'variedad', 'papa-para-perros-calientes-frito-mix-cabello-de-angel-1kg.png', 'papa-frito-mix-cabello-angel-1kg', 'Frito Mix', 'Papa Frito Mix Cabello de Ángel 1 KG', 'Bolsa', 4.72),
    (CON, 'variedad', 'papa-para-perros-calientes-frito-mix-cabello-de-angel-200gr.png', 'papa-frito-mix-cabello-angel-200gr', 'Frito Mix', 'Papa Frito Mix Cabello de Ángel 200 gr', 'Bolsa', None),
    (CON, 'variedad', 'papa-para-perros-calientes-frito-mix-corte-tradicional-1kg.png', 'papa-frito-mix-tradicional-1kg', 'Frito Mix', 'Papa Frito Mix Corte Tradicional 1 KG', 'Bolsa', 4.80),
    (CON, 'variedad', 'papa-para-perros-calientes-marly-corte-tradicional-1kg.png', 'papa-marly-tradicional-1kg', 'Marly', 'Papa Marly Corte Tradicional 1 KG', 'Bolsa', 6.00),
    (CON, 'variedad', 'papa-para-perros-calientes-novachips-cabello-de-angel-1kg.png', 'papa-novachips-cabello-angel-1kg', 'Nova Chips', 'Papa Nova Chips Cabello de Ángel 1 KG', 'Bolsa', 3.70),

    # -- Refrescos por bulto de 6 --
    (REF, 'variedad', '7up-bulto-6und-1lts.png', 'refresco-7up-1l-bulto-6und', '7up', 'Refresco 7up 1 L (bulto de 6)', 'Bulto', None),
    (REF, 'variedad', 'cocacola-bulto-6und-1,5lts.png', 'cocacola-1-5l-bulto-6und', 'Coca-Cola', 'Coca-Cola 1,5 L (bulto de 6)', 'Bulto', None),
    (REF, 'variedad', 'cocacola-bulto-6und-1lts.png', 'cocacola-1l-bulto-6und', 'Coca-Cola', 'Coca-Cola 1 L (bulto de 6)', 'Bulto', None),
    (REF, 'variedad', 'fanta-naranja-bulto-6und-1lts.png', 'fanta-naranja-1l-bulto-6und', 'Fanta', 'Fanta Naranja 1 L (bulto de 6)', 'Bulto', None),
    (REF, 'variedad', 'fanta-toronja-bulto-6und-1lts.png', 'fanta-toronja-1l-bulto-6und', 'Fanta', 'Fanta Toronja 1 L (bulto de 6)', 'Bulto', None),
    (REF, 'variedad', 'golden-kolita-bulto-6und-1lts.png', 'golden-kolita-1l-bulto-6und', 'Golden', 'Refresco Golden Kolita 1 L (bulto de 6)', 'Bulto', None),
    (REF, 'variedad', 'golden-manzanita-bulto-6und-1lts.png', 'golden-manzanita-1l-bulto-6und', 'Golden', 'Refresco Golden Manzanita 1 L (bulto de 6)', 'Bulto', None),

    # -- Panes de sándwich --
    (PAN, 'variedad', 'pan-bimbo-artesano-500gr.png', 'pan-sandwich-artesano-bimbo-500gr', 'Bimbo', 'Pan Sándwich Artesano Bimbo 500 gr', 'Bolsa', 3.00),
    (PAN, 'variedad', 'pan-bimbo-blanco-500gr.png', 'pan-sandwich-blanco-bimbo-500gr', 'Bimbo', 'Pan Sándwich Blanco Bimbo 500 gr', 'Bolsa', 1.98),
    (PAN, 'variedad', 'pan-holsum-integral-420gr.png', 'pan-sandwich-holsum-integral-420gr', 'Holsum', 'Pan Sándwich Holsum Integral 420 gr', 'Bolsa', 3.50),

    # -- Aderezos en sobre --
    (ADE, 'variedad', 'sobre-fritz-cheddar-45gr.png', 'sobre-cheddar-fritz-45gr', 'Fritz', 'Aderezo Cheddar Fritz 45 gr', 'Sobre', 1.55),
    (ADE, 'variedad', 'sobre-fritz-maiz-45gr.png', 'sobre-maiz-fritz-45gr', 'Fritz', 'Aderezo de Maíz Fritz 45 gr', 'Sobre', 1.55),
    (ADE, 'variedad', 'sobre-fritz-tocineta-45gr.png', 'sobre-tocineta-fritz-45gr', 'Fritz', 'Aderezo de Tocineta Fritz 45 gr', 'Sobre', 1.55),
    (ADE, 'variedad', "sobre-roro's-ajo-y-perejil-45gr.png", 'sobre-ajo-perejil-roros-45gr', ROROS, "Aderezo de Ajo y Perejil Roro's 45 gr", 'Sobre', 1.25),
    (ADE, 'variedad', "sobre-roro's-cheddar-45gr.png", 'sobre-cheddar-roros-45gr', ROROS, "Aderezo Cheddar Roro's 45 gr", 'Sobre', 1.48),
    (ADE, 'variedad', "sobre-roro's-maiz-45gr.png", 'sobre-maiz-roros-45gr', ROROS, "Aderezo de Maíz Roro's 45 gr", 'Sobre', 1.37),
    (ADE, 'variedad', "sobre-roro's-tocineta-54gr.png", 'sobre-tocineta-roros-54gr', ROROS, "Aderezo de Tocineta Roro's 54 gr", 'Sobre', 1.48),

    # -- Sueltos --
    (ADE, 'variedad', 'Aderezo-fritz-ahumadita-de-bolsa-3kg-galon.png', 'aderezo-ahumadita-fritz-3kg', 'Fritz', 'Aderezo Ahumadita Fritz 3 KG', 'Bolsa', None),
    (ADE, 'variedad', 'salsa-de-maiz-monti-1kg.png', 'salsa-maiz-monti-1kg', 'Monti', 'Salsa de Maíz Monti 1 KG', 'Doypack', None),
    (ITA, 'variedad', 'pasta-primor-1kg.png', 'pasta-primor-1kg', 'Primor', 'Pasta Primor 1 KG', 'Bolsa', 1.84),
    (LAC, 'variedad', 'leche-descremada-1lts.png', 'leche-deslactosada-purisima-1l', 'Purísima', 'Leche Deslactosada Purísima 1 L', 'Tetrapak', None),
    (LAC, 'variedad', 'medio-carton-de-huevo.png', 'medio-carton-huevos', 'Genérico', 'Medio Cartón de Huevos', 'Cartón', 2.40),
    (ENL, 'variedad', 'pepinillo-agridulces-lesmi-3.8kg.png', 'pepinillos-agridulces-lesmi-3-8kg', 'Lesmi', 'Pepinillos Agridulces Lesmi 3,8 KG', 'Pote', None),
    (ENL, 'variedad', 'pepinillo-mt.olive-3.78L.png', 'pepinillos-mt-olive-3-78l', 'Mt. Olive', 'Pepinillos Mt. Olive 3,78 L', 'Galón', 34.50),
]
