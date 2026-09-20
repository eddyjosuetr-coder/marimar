# -*- coding: utf-8 -*-
"""Descripciones de producto.

Cada ficha lleva un texto corto que dice qué es el producto y para qué sirve.
Se arma por reglas (tipo de producto + tamaño + presentación) para que los
productos nuevos salgan descritos solos, y los que necesitan detalle exacto
(combos, salsas detalladas) se escriben a mano en ESPECIALES.

Criterio: sólo se afirma lo que se ve en la foto o se deduce del nombre. Nada
de "sin gluten", "orgánico" ni promesas que no consten en el empaque.
"""
import re

ESPECIALES = {
    # ── Combos: el contenido sale de la foto y de la publicación oficial ──
    'combo-perro-10und-con-salsas':
        'Combo listo para 10 perros calientes, sin tener que buscar nada más. Incluye 10 panes de perro, un paquete de 10 salchichas, papitas de 180 gr y 3 salsas detalladas de 370 gr que eliges tú al agregarlo al pedido.',
    'combo-perro-10und-sin-salsas':
        'Combo listo para 10 perros calientes. Incluye 10 panes de perro, un paquete de 10 salchichas y papitas de 180 gr. No trae salsas: si las quieres, las consigues sueltas en Salsas Detalladas.',
    'combo-perro-20und-con-salsas':
        'El combo rendidor para 20 perros calientes, ideal para fiestas, reuniones y ventas. Incluye 20 panes de perro, un paquete de 20 salchichas, papitas de 250 gr y 3 salsas detalladas de 370 gr que eliges tú al agregarlo al pedido.',
    'combo-perro-20und-sin-salsas':
        'El combo rendidor para 20 perros calientes, ideal para fiestas, reuniones y ventas. Incluye 20 panes de perro, un paquete de 20 salchichas y papitas de 250 gr. No trae salsas: si las quieres, las consigues sueltas en Salsas Detalladas.',
    'combo-hamburguesa-12und-con-salsas':
        'El combo rendidor para 12 hamburguesas, ideal para fiestas, reuniones y ventas. Incluye 12 panes de hamburguesa, 12 carnes Sabrocarne, papitas de 250 gr y 3 salsas detalladas de 370 gr que eliges tú al agregarlo al pedido.',
    'combo-hamburguesa-12und-sin-salsas':
        'El combo rendidor para 12 hamburguesas, ideal para fiestas, reuniones y ventas. Incluye 12 panes de hamburguesa, 12 carnes Sabrocarne y papitas de 250 gr. No trae salsas: si las quieres, las consigues sueltas en Salsas Detalladas.',
    'combo-hamburguesa-8und-con-salsas':
        'Combo listo para 8 hamburguesas, sin tener que buscar nada más. Incluye 8 panes de hamburguesa, 8 carnes para hamburguesa, papitas de 180 gr y 3 salsas detalladas de 370 gr que eliges tú al agregarlo al pedido.',
    'combo-hamburguesa-8und-sin-salsas':
        'Combo listo para 8 hamburguesas. Incluye 8 panes de hamburguesa, 8 carnes para hamburguesa y papitas de 180 gr. No trae salsas: si las quieres, las consigues sueltas en Salsas Detalladas.',

    # ── Salsas detalladas ──
    'mayonesa-detallada-370gr':
        'Mayonesa servida en envase con tapa de 370 gr. Práctica para el día a día y '
        'una de las opciones para elegir en los combos.',
    'salsa-tomate-detallada-370gr':
        'Salsa de tomate servida en envase con tapa de 370 gr. Ideal para perros, '
        'hamburguesas y papitas; también se puede elegir en los combos.',
    'mostaza-detallada-370gr':
        'Mostaza servida en envase con tapa de 370 gr. El toque clásico del perro '
        'caliente; también se puede elegir en los combos.',
    'salsa-bbq-detallada-370gr':
        'Salsa BBQ servida en envase con tapa de 370 gr, de sabor ahumado. Va con '
        'hamburguesas, alitas y parrillas; también se puede elegir en los combos.',
    'salsa-cheddar-detallada-370gr':
        'Salsa de queso cheddar servida en envase con tapa de 370 gr. Perfecta para '
        'papitas, nachos y perros; también se puede elegir en los combos.',
    'salsa-maiz-detallada-370gr':
        'Salsa de maíz servida en envase con tapa de 370 gr, cremosa y dulce. Un '
        'clásico del perro caliente venezolano; también se puede elegir en los combos.',
    'salsa-tocineta-detallada-370gr':
        'Salsa sabor tocineta servida en envase con tapa de 370 gr. Da sabor ahumado a '
        'hamburguesas y papitas; también se puede elegir en los combos.',

    # ── Casos que la regla general no describe bien ──
    'ketchup-heinz-sachet-10gr':
        'Caja de sobres individuales de kétchup Heinz de 10 gr. Porción justa para '
        'delivery, loncheras y locales de comida rápida.',
    'ketchup-heinz-volpack-12-7kg':
        'Kétchup Heinz en bolsa Volpack de 12,7 KG para dispensador. Formato de alto '
        'rendimiento para restaurantes y cadenas de comida rápida.',
    'porta-perro-grande':
        'Paquete de porta perros de cartón, tamaño grande. Sostiene el perro caliente '
        'para servir y llevar sin que se desarme.',
    'porta-perro-pequeno':
        'Paquete de porta perros de cartón, tamaño pequeño. Sostiene el perro caliente '
        'para servir y llevar sin que se desarme.',
    'ovomaltina-35gr':
        'Crema para untar Ovomaltina en tubo de 35 gr, a base de malta y cacao. Para pan, '
        'galletas y meriendas.',
    'cubitos-iberia-pollo':
        'Caja de cubitos de caldo de pollo Iberia. Realzan el sabor de sopas, arroces, '
        'guisos y cremas.',
    'sopa-iberia-pollo-fideos-60gr':
        'Mezcla deshidratada Iberia para sopa de pollo con fideos, sobre de 60 gr. Lista en '
        'minutos con solo agregar agua.',
}

PESO_TXT = ' Se vende al peso: pide desde 100 gr y los KG que necesites.'

_TAM = re.compile(r'(\d+(?:,\d+)?)\s*(gr|KG|L|ml|und)\b', re.I)


def _tam(nombre):
    m = _TAM.search(nombre)
    if not m:
        return ''
    unidad = m.group(2)
    unidad = {'kg': 'KG', 'l': 'L', 'und': 'und'}.get(unidad.lower(), unidad)
    return f'{m.group(1)} {unidad}'


def _grande(nombre):
    """Formatos de cocina: galones y bolsas de 3 KG en adelante."""
    m = re.search(r'(\d+(?:,\d+)?)\s*KG', nombre)
    return bool(m) and float(m.group(1).replace(',', '.')) >= 3


def _envase(pres):
    return {
        'Galón': 'galón', 'Bolsa': 'bolsa', 'Doypack': 'doypack', 'Frasco': 'frasco',
        'Pote': 'pote', 'Botella': 'botella', 'Lata': 'lata', 'Caja': 'caja',
        'Tetrapak': 'envase tetrapak', 'Garrafa': 'garrafa', 'Paquete': 'paquete',
        'Bidón': 'bidón', 'Tubo': 'tubo', 'Sobre': 'sobre', 'Barra': 'barra',
        'Unidad': 'pieza', 'Envase': 'envase', 'Combo': 'combo',
    }.get(pres, pres.lower())


def _formato(nombre, pres):
    tam = _tam(nombre)
    if pres == 'Al peso':
        return ''
    if tam:
        return f'Presentación en {_envase(pres)} de {tam}.'
    return f'Presentación en {_envase(pres)}.'


COCINA = ' Formato rendidor para cocinas, food trucks y locales de comida rápida.'


def _por_tipo(cat, marca, nombre, pres):
    n = nombre.lower()

    if cat == 'Mayonesas':
        if 'preparado' in n or 'aderezo' in n:
            base = f'Aderezo a base de mayonesa {marca}, cremoso y de sabor suave.'
        else:
            base = f'Mayonesa {marca} cremosa y de sabor balanceado.'
        uso = ' Para perros calientes, hamburguesas, sándwiches y ensaladas.'
        return base + uso + (COCINA if _grande(nombre) else '')

    if cat == 'Mostazas':
        return (f'Mostaza {marca} de sabor clásico, el complemento del perro caliente y '
                f'la hamburguesa.' + (COCINA if _grande(nombre) or pres == 'Galón' else ''))

    if cat == 'Salsas de Tomate':
        if 'base' in n:
            base = f'Salsa base de tomate {marca}, espesa, para preparar salsas y guisos.'
        elif 'kétchup' in n:
            base = f'Kétchup {marca} de sabor dulce y equilibrado, para perros, hamburguesas y papitas.'
        else:
            base = f'Salsa de tomate {marca} para perros, hamburguesas, papitas y pastas.'
        return base + (COCINA if _grande(nombre) else '')

    if cat == 'Salsas BBQ':
        base = f'Salsa BBQ {marca} de sabor ahumado'
        if 'hot' in n:
            base += ' con un toque picante'
        return base + ', para costillas, alitas, hamburguesas y parrillas.' + (COCINA if _grande(nombre) else '')

    if cat == 'Aderezos y Picantes':
        if 'cheddar' in n:
            base = f'Salsa de queso cheddar {marca}, cremosa, para papitas, nachos y perros.'
        elif 'maíz' in n or 'maíta' in n:
            base = f'Salsa de maíz {marca}, dulce y cremosa, infaltable en el perro caliente.'
        elif 'ahumadita' in n:
            base = f'Aderezo Ahumadita {marca} de sabor ahumado, para hamburguesas y carnes.'
        elif 'guasacaca' in n:
            base = f'Guasacaca {marca}, la salsa venezolana a base de aguacate y hierbas' + (
                ', en versión picante.' if 'picante' in n else '.')
        elif 'picante' in n or 'ají' in n:
            base = f'Salsa picante {marca} para dar fuego a perros, empanadas y comidas.'
        elif 'ajo' in n:
            base = f'Salsa de ajo {marca} para aderezar carnes, pollo, papas y sándwiches.'
        elif 'inglesa' in n:
            base = f'Salsa inglesa {marca} para marinar carnes y realzar guisos y salsas.'
        elif 'soya' in n:
            base = f'Salsa de soya {marca} para arroces, salteados, marinados y comida oriental.'
        else:
            base = f'Aderezo {marca} para dar sabor a tus comidas.'
        return base + (COCINA if _grande(nombre) or pres == 'Galón' else '')

    if cat == 'Pastas y Salsas Italianas':
        if 'passata' in n:
            return f'Passata {marca}: puré de tomate colado, base perfecta para salsas de pasta y pizza.'
        if 'boloñesa' in n:
            return f'Salsa boloñesa {marca} lista para servir sobre tu pasta favorita.'
        return f'Pasta de tomate {marca}, concentrada, para salsas, guisos y pizzas.' + (
            COCINA if pres == 'Galón' else '')

    if cat == 'Enlatados y Conservas':
        tabla = [
            ('atún', f'Atún {marca}' + (' en aceite de oliva' if 'oliva' in n else '') + ', listo para ensaladas, arepas, pastas y sándwiches.'),
            ('sardina', f'Sardinas {marca}' + (' en salsa de tomate' if 'tomate' in n else ' en aceite vegetal') + ', listas para comer o preparar con arroz y arepas.'),
            ('anchoa', f'Anchoas {marca} para pizzas, ensaladas y pastas.'),
            ('guisante', f'Guisantes {marca} tiernos, para ensaladas, arroces y guarniciones.'),
            ('maíz', f'Maíz dulce {marca} en granos, para ensaladas, perros y pizzas.'),
            ('champiñon', f'Champiñones {marca} listos para pizzas, pastas y salsas.'),
            ('aceituna', f'Aceitunas negras {marca} para pizzas, ensaladas y pasapalos.'),
            ('relish', f'Relish de pepinillo {marca}, dulce y picadito, clásico en perros y hamburguesas.'),
            ('pepinillo', f'Pepinillos agridulces {marca} para hamburguesas, sándwiches y pasapalos.'),
            ('tomates pelados', f'Tomates pelados {marca} para salsas caseras y guisos.'),
            ('compota', f'Compota {marca} de manzana, suave y lista para la merienda de los niños.'),
        ]
        for clave, texto in tabla:
            if clave in n:
                return texto + (COCINA if _grande(nombre) else '')
        return f'Conserva {marca} lista para usar.'

    if cat == 'Aceites y Vinagres':
        if 'vinagre' in n:
            return f'Vinagre {marca} para ensaladas, encurtidos y marinados.' + (COCINA if pres == 'Galón' else '')
        if 'oliva' in n:
            return f'Aceite de oliva {marca} para aliñar ensaladas y cocinar con sabor.'
        return f'Aceite {marca} para freír y cocinar a diario.' + (
            COCINA if pres in ('Bidón', 'Garrafa') else '')

    if cat == 'Margarinas y Untables':
        if 'margarina' in n:
            return f'Margarina {marca} para untar en pan y arepas, y para cocinar y hornear.'
        if 'mantequilla' in n:
            return f'Mantequilla {marca} para untar, cocinar y hornear.'
        if 'arequipe' in n:
            return f'Arequipe {marca}, dulce de leche cremoso para postres, tortas y untar.'
        if 'rikesa' in n:
            return f'Queso fundido para untar {marca}, cremoso, para pan, galletas y pasapalos.'
        return f'Producto para untar {marca}.'

    if cat == 'Lácteos':
        if 'polvo' in n:
            return f'Leche en polvo completa {marca}. Rinde para preparar leche líquida en casa y en recetas.'
        if 'condensada' in n:
            return f'Leche condensada {marca}, dulce y espesa, para postres, quesillos y bebidas.'
        if 'descremada' in n:
            return f'Leche descremada {marca} de larga duración, lista para tomar.'
        return f'Leche completa {marca} de larga duración, lista para tomar.'

    if cat == 'Quesos':
        if 'facilita' in n:
            return 'Queso amarillo Kraft en lonjas individuales, paquete de 24. Ideal para hamburguesas y sándwiches.'
        if 'mozzarella' in n:
            base = f'Queso mozzarella {marca}, de buen derretido para pizzas, pastelitos y sándwiches.'
        elif 'paisa' in n:
            base = f'Queso paisa {marca}, blanco y suave, para arepas, empanadas y desayunos.'
        elif 'munster' in n:
            base = f'Queso amarillo tipo munster {marca}, suave y cremoso, para sándwiches y tablas.'
        else:
            base = f'Queso amarillo {marca} para sándwiches, hamburguesas y pasapalos.'
        return base + PESO_TXT

    if cat == 'Jamones y Pechugas':
        if 'pechuga' in n:
            base = f'Pechuga de pavo {marca}' + (', ahumada' if 'ahumada' in n else '') + (
                ', con pimentón' if 'pimentón' in n else '') + ', magra y de sabor suave, para sándwiches.'
        elif 'espalda' in n:
            base = f'Jamón de espalda {marca} para sándwiches, pastelitos y cachitos.'
        elif 'ahumado' in n:
            base = f'Jamón ahumado {marca} de sabor intenso, para sándwiches y tablas.'
        else:
            base = f'Jamón cocido de pierna {marca} para sándwiches, pizzas y cachitos.'
        return base + PESO_TXT

    if cat == 'Mortadelas':
        if pres != 'Al peso':
            return (f'Mortadela de pollo {marca} para sándwiches, arepas y desayunos. '
                    f'Se vende por pieza completa.')
        tipo = 'de pollo' if 'pollo' in n else ('extra' if 'extra' in n else 'tipo tapara')
        return f'Mortadela {tipo} {marca} para sándwiches, arepas y desayunos.' + PESO_TXT

    if cat == 'Chorizos y Pepperoni':
        if 'pepperoni' in n:
            base = f'Pepperoni {marca}, curado y especiado, el infaltable de la pizza.'
        elif 'salchichón' in n:
            base = 'Salchichón curado para tablas, pasapalos y sándwiches.'
        else:
            tipo = 'Chorizo español' if 'español' in n else 'Chorizo'
            base = f'{tipo} {marca}' + (' ahumado' if 'ahumado' in n else '') + (
                ' con ajo' if 'ajo' in n else '') + ' para parrillas, arroces y guisos.'
        return base + PESO_TXT

    if cat == 'Salchichas y Polacas':
        uds = re.search(r'(\d+) und', nombre)
        if 'polaca' in n:
            base = f'Salchicha tipo polaca {marca}, gruesa y jugosa, para perros especiales y parrillas.'
        else:
            base = f'Salchicha {marca} para perros calientes, desayunos y pasapalos.'
        if pres == 'Al peso':
            return base + PESO_TXT
        if uds:
            return base + f' Paquete de {uds.group(1)} unidades.'
        return base + ' Se vende por paquete.'

    if cat == 'Refrescos y Maltas':
        if 'retornable' in n:
            return (f'Gavera de {_unidades(nombre)} botellas retornables de '
                    f'{productoLimpio(nombre)}. Pide con tu envase vacío para el cambio.')
        if 'maltín' in n:
            return f'Maltín Polar, la bebida de malta venezolana. {_formato(nombre, pres)}'
        return f'Refresco {marca} para acompañar comidas y reuniones. {_formato(nombre, pres)}'

    if cat == 'Aguas y Jugos':
        if 'agua' in n:
            return f'Agua mineral {marca}. {_formato(nombre, pres)}'
        if 'gatorade' in n:
            return f'Bebida hidratante Gatorade para después del ejercicio. {_formato(nombre, pres)}'
        if 'té' in n:
            return f'Té frío {marca} listo para tomar. {_formato(nombre, pres)}'
        if 'retornable' in n:
            return (f'Gavera de {_unidades(nombre)} botellas retornables de jugo {marca}. '
                    f'Pide con tu envase vacío para el cambio.')
        return f'Jugo {marca} listo para tomar. {_formato(nombre, pres)}'

    if cat == 'Café, Té e Infusiones':
        if 'café' in n:
            return f'Café molido {marca} para colar en casa o en el negocio. {_formato(nombre, pres)}'
        if 'mccormick' in n:
            sobres = re.search(r'(\d+) sobres', nombre)
            cant = f'{sobres.group(1)} sobres' if sobres else 'sobres'
            return f'Infusión McCormick en {cant}, para preparar en taza caliente o como té frío.'
        return f'Bebida en polvo {marca} para preparar té frío en jarra. {_formato(nombre, pres)}'

    if cat == 'Harinas y Despensa':
        if 'p.a.n' in n:
            return 'Harina de maíz precocida P.A.N., la de siempre para arepas, hallacas y empanadas.'
        if 'trigo' in n:
            return f'Harina de trigo {marca}' + (' leudante, para tortas y panquecas.' if 'leudante' in n else ' todo uso, para panes, tortas y rebozados.')
        if 'azúcar' in n:
            return f'Azúcar {marca} para endulzar bebidas, postres y recetas.'
        if 'sal ' in n + ' ':
            return f'Sal {marca} para cocinar y sazonar.'
        if 'avena' in n:
            return f'Avena en hojuelas {marca} para desayunos, batidos y galletas.'
        if 'cereal' in n:
            return 'Cereal de hojuelas de maíz para el desayuno con leche.'
        return f'Producto de despensa {marca}.'

    if cat == 'Panadería':
        if 'rapiditas' in n:
            return f'Tortillas de harina Bimbo Rapiditas' + (' en versión diet' if 'diet' in n else '') + ', para wraps, burritos y quesadillas.'
        if 'árabe' in n:
            return 'Pan árabe Piter, suave y plano, para shawarmas y sándwiches rellenos.'
        if 'sándwich' in n:
            return f'Pan de sándwich {marca}' + (' con mantequilla' if 'mantequilla' in n else ' blanco') + ', rebanado, para desayunos y meriendas.'
        uds = re.search(r'(\d+) und', nombre)
        cant = f' Bolsa de {uds.group(1)} unidades.' if uds else ''
        if 'hamburguesa' in n:
            return f'Pan de hamburguesa {marca}, suave y esponjoso.{cant}'
        return f'Pan de perro caliente {marca}, suave y alargado.{cant}'

    if cat == 'Congelados':
        if 'papa' in n:
            return f'Papas prefritas congeladas {marca}. Directo del congelador a la freidora u horno.'
        if 'tequeño' in n:
            return f'Tequeños congelados {marca}, rellenos de queso, listos para freír.'
        if 'masa' in n:
            return f'Masa {marca} para pastelitos, lista para rellenar y freír.'
        if 'hamburguesa' in n:
            return f'Carnes para hamburguesa {marca}, congeladas y listas para la plancha.'
        if 'nuggets' in n:
            return f'Nuggets de pollo empanizados {marca}, congelados, listos para freír u hornear.'
        if 'milanesa' in n:
            return f'Milanesas de pollo empanizadas {marca}, congeladas, listas para freír u hornear.'
        return f'Producto congelado {marca}.'

    if cat == 'Limpieza e Higiene':
        if 'cloro' in n:
            return f'Cloro {marca} para desinfectar pisos, baños y ropa blanca.'
        if 'desinfectante' in n:
            return f'Desinfectante {marca} para pisos, baños y superficies.'
        if 'crema' in n:
            return f'Jabón en crema {marca} para lavar platos, ollas y superficies.'
        if 'líquido' in n:
            return f'Jabón líquido {marca} para lavar platos y utensilios de cocina.'
        if 'bebé' in n:
            return f'Detergente en polvo {marca} para ropa de bebé, a mano o en lavadora.'
        return f'Detergente en polvo {marca} para lavar la ropa a mano o en lavadora.'

    if cat == 'Desechables y Papelería':
        if 'servilleta' in n:
            return f'Paquete de servilletas pequeñas{" " + marca if marca != "Genérico" else ""}, suaves y absorbentes, para mesas y dispensadores.'
        return 'Artículo desechable para servir comida.'

    if cat == 'Dulces y Galletas':
        if 'postres' in n:
            cacao = re.search(r'(\d+)%', nombre)
            tipo = 'con leche' if 'leche' in n else 'oscuro'
            return (f'Chocolate {tipo} Savoy para repostería' + (f' con {cacao.group(1)}% de cacao' if cacao else '') +
                    ', en trozos para derretir. Bolsa de 800 gr para tortas, bombones y postres.')
        if 'barra' in n or pres == 'Barra':
            return 'Barra de chocolate con leche Savoy de 70 gr para disfrutar en cualquier momento.'
        if 'chao' in n:
            sabor = 'fresa' if 'fresa' in n else 'menta'
            return f'Caramelos Chao sabor {sabor}, en bolsa para compartir o vender al detal.'
        if 'mr. brown' in n:
            return 'Mr. Brown de Marinela, brownie de chocolate para la merienda.'
        if 'panqué' in n:
            return 'Panqué Bimbo sabor vainilla y chocolate, porción individual para la lonchera.'
        if 'pingüinos' in n:
            return 'Pingüinos Marinela, pastelito de chocolate relleno de crema.'
        if 'polvorones' in n:
            return 'Galletas Polvorones Marinela, suaves y dulces, para la merienda.'
        if 'canelitas' in n:
            return 'Galletas Canelitas Marinela con sabor a canela, para la merienda.'
        if 'soda' in n:
            return 'Galletas de soda Puig, crujientes, para acompañar sopas, quesos y untables.'
        return f'Golosina {marca}.'

    return f'{productoLimpio(nombre)} de {marca}.'


def _unidades(nombre):
    m = re.search(r'(\d+)\s*und', nombre)
    return m.group(1) if m else '24'


def productoLimpio(nombre):
    return re.sub(r'\s*Retornable\s*\d*\s*und', '', nombre).strip()


def describir(cat, slug, marca, nombre, pres):
    if slug in ESPECIALES:
        return ESPECIALES[slug]
    texto = _por_tipo(cat, marca, nombre, pres).strip()
    # Formato al final cuando la regla no lo mencionó y aporta información
    if cat in ('Mayonesas', 'Mostazas', 'Salsas de Tomate', 'Salsas BBQ', 'Aderezos y Picantes',
               'Pastas y Salsas Italianas', 'Enlatados y Conservas', 'Aceites y Vinagres',
               'Margarinas y Untables', 'Lácteos', 'Harinas y Despensa', 'Limpieza e Higiene'):
        formato = _formato(nombre, pres)
        if formato:
            texto += ' ' + formato
    if pres == 'Al peso' and PESO_TXT.strip() not in texto:
        texto += PESO_TXT
    return re.sub(r'\s+', ' ', texto)
