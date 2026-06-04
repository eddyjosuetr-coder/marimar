import type { Product, Promo, HeroSlide } from '@/types';

export const heroSlides: HeroSlide[] = [
  {
    image: '',
    isLogoSlide: true,
    eyebrow: 'Distribuidora Mayorista · Venezuela',
    title: 'El sabor del mayoreo,',
    highlight: 'en tu negocio',
    description: 'Más de 500 productos de las mejores marcas. Calidad garantizada, precios competitivos y entrega confiable en todo el país.',
  },
  {
    image: '/images/hero_warehouse.png',
    imageSlide: true,
    eyebrow: 'Calidad Garantizada',
    title: 'El mayoreo que',
    highlight: 'Venezuela elige',
    description: 'Fritz, Heinz, La Viña, Krystal, McCormick y más marcas líderes. Tu negocio siempre surtido con lo mejor.',
  },
  {
    image: '/images/hero_delivery.png',
    imageSlide: true,
    eyebrow: 'Delivery en toda Venezuela',
    title: 'Tu negocio,',
    highlight: 'nuestra misión',
    description: 'Aderezos, embutidos, bebidas y víveres con logística confiable a la puerta de tu negocio. Comprometidos con tu éxito.',
  },
];

export const promos: Promo[] = [
  { id: 1, image: '/images/publicidad1.JPG', title: 'Espalda Cocida', subtitle: 'Ibérico - Calidad Premium' },
  { id: 2, image: '/images/publicidad2.JPG', title: 'French Fries', subtitle: 'Mondelle - 10 unidades' },
  { id: 3, image: '/images/publicidad5.JPG', title: 'Infusiones McCormick', subtitle: 'Frutos del Bosque' },
  { id: 4, image: '/images/publicidad7.JPG', title: 'Leche en Polvo', subtitle: 'Purísima - Completa' },
  { id: 5, image: '/images/publicidad10.JPG', title: 'Papitas Cabello de Ángel', subtitle: 'La Viña - Premium' },
  { id: 6, image: '/images/publicidad12.JPG', title: 'Pepperoni', subtitle: 'Leyton - El mejor sabor' },
];

export const baseProducts: Product[] = [
  { id: 1, image: '/mayonesas/Mayonesa-Novo-Bolsa-4x3.350G-caja.png', hoverImage: '/mayonesas/Mayonesa-Novo-Bolsa-4x3.350G-unidad.png', brand: 'Novo', name: 'Mayonesa Novo Bolsa (4x3.350G) - Bulto', price: 15.34, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 2, image: '/mayonesas/Mayonesa-Doypack-Fritz-6x930g-caja.png', hoverImage: '/mayonesas/Mayonesa-Doypack-Fritz-6x930g-unidad.png', brand: 'Fritz', name: 'Mayonesa Doypack Fritz (6x930g) - Caja', price: 22.42, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 3, image: '/mayonesas/Mayonesa-Paraiso-Bolsa-4x3.30G-caja.png', hoverImage: '/mayonesas/Mayonesa-Paraiso-Bolsa-4x3.30G-unidad.png', brand: 'Paraíso', name: 'Mayonesa Paraíso Bolsa (4x3.30G) - Bulto', price: 23.86, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 4, image: '/mayonesas/Mayonesa-OBA-Galon-4x3.5KG-caja.png', hoverImage: '/mayonesas/Mayonesa-OBA-Galon-4x3.5KG-unidad.png', brand: 'OBA', name: 'Mayonesa OBA Galón (4x3.5KG) - Bulto', price: 30.00, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 5, image: '/mayonesas/Mayonesa-La-Vina-6x1KG-caja.png', hoverImage: '/mayonesas/Mayonesa-La-Vina-6x1KG-unidad.png', brand: 'La Viña', name: 'Mayonesa La Viña (6x1KG) - Bulto', price: 17.90, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 6, image: '/mayonesas/Mayonesa-Mayotropi-4x3.350G-caja.png', hoverImage: '/mayonesas/Mayonesa-Mayotropi-4x3.350G-unidad.png', brand: 'Mayotropi', name: 'Mayonesa Mayotropi (4x3.350G) - Bulto', price: 78.33, badge: 'Más Vendido', category: 'Mayonesas' },
  { id: 7, image: '/mayonesas/Preparado-La-Marca-4x4-caja.png', hoverImage: '/mayonesas/Preparado-La-Marca-4x4-unidad.png', brand: 'La Marca', name: 'Preparado La Marca (4x4) - Bulto', price: 62.50, category: 'Mayonesas' },
  { id: 8, image: '/mayonesas/Mayonesa-La-Marca-4undx4KG-caja.png', hoverImage: '/mayonesas/Mayonesa-La-Marca-4undx4KG-unidad.png', brand: 'La Marca', name: 'Mayonesa La Marca (4und x 4KG) - Bulto', price: 74.80, category: 'Mayonesas' },
  { id: 9, image: '/mayonesas/Mayonesa-La-Vina-Pote-4x3.65KG-caja.png', hoverImage: '/mayonesas/Mayonesa-La-Vina-Pote-4x3.65KG-unidad.png', brand: 'La Viña', name: 'Mayonesa La Viña Pote (4x3.65KG) - Bulto', price: 32.96, category: 'Mayonesas' },
  { id: 10, image: '/mayonesas/Preparado-Fritz-4unsdx4KG-caja.png', hoverImage: '/mayonesas/Preparado-Fritz-4unsdx4KG-unidad.png', brand: 'Fritz', name: 'Preparado Fritz (4unsd x 4KG) - Bulto', price: 39.80, category: 'Mayonesas' },
  { id: 11, image: '/mayonesas/Mayonesa-Dona-Nelly-4x4-caja.png', hoverImage: '/mayonesas/Mayonesa-Dona-Nelly-4x4-unidad.png', brand: 'Doña Nelly', name: 'Mayonesa Doña Nelly (4x4) - Bulto', price: 19.60, category: 'Mayonesas' },
  { id: 12, image: '/mayonesas/Preparado-de-Mayonesa-Deli-4x3.1KG-caja.png', hoverImage: '/mayonesas/Preparado-de-Mayonesa-Deli-4x3.1KG-unidad.png', brand: 'Deli', name: 'Preparado de Mayonesa Deli (4x3.1KG) - Bulto', price: 26.91, category: 'Mayonesas' },
  { id: 13, image: '/mayonesas/Mayonesa-LaColmena4x3.35KG-caja.png', hoverImage: '/mayonesas/Mayonesa-LaColmena4x3.35KG-unidad.png', brand: 'La Colmena', name: 'Mayonesa La Colmena (4x3.35KG) - Bulto', price: 26.35, category: 'Mayonesas' },
  { id: 53, image: '/mayonesas/Mayonesa-Fritz-4x4-caja.png', hoverImage: '/mayonesas/Mayonesa-Fritz-4x4-unidad.png', brand: 'Fritz', name: 'Mayonesa Fritz (4x4) - Bulto', price: 91.50, category: 'Mayonesas' },
  { id: 54, image: '/mayonesas/Mayonesa-La-Marca-6undx1.4KG-caja.png', hoverImage: '/mayonesas/Mayonesa-La-Marca-6undx1.4KG-unidad.png', brand: 'La Marca', name: 'Mayonesa La Marca (6und x 1.4KG) - Bulto', price: 55.80, category: 'Mayonesas' },
  { id: 55, image: '/mayonesas/Mayonesa-La-Vina-Bolsa-4x3.26G-caja.png', hoverImage: '/mayonesas/Mayonesa-La-Vina-Bolsa-4x3.26G-unidad.png', brand: 'La Viña', name: 'Mayonesa La Viña Bolsa (4x3.26G) - Bulto', price: 28.76, category: 'Mayonesas' },
  { id: 56, image: '/mayonesas/Mayonesa-Monti-4x3.50KG-caja.png', hoverImage: '/mayonesas/Mayonesa-Monti-4x3.50KG-unidad.png', brand: 'Monti', name: 'Mayonesa Monti (4x3.50KG) - Bulto', price: 32.10, category: 'Mayonesas' },
  { id: 14, image: '/mostazas/Mostaza-Coma-24x270g-caja.png', hoverImage: '/mostazas/Mostaza-Coma-24x270g-unidad.png', brand: 'Coma', name: 'Mostaza Coma (24 x 270gr) - Caja', price: 30.92, badge: 'Oferta', category: 'Mostazas' },
  { id: 15, image: '/mostazas/Mostaza-Doypack-Fritz-6x930g-caja.png', hoverImage: '/mostazas/Mostaza-Doypack-Fritz-6x930g-unidad.png', brand: 'Fritz', name: 'Mostaza Doypack Fritz (6x930g) - Caja', price: 16.34, badge: 'Oferta', category: 'Mostazas' },
  { id: 16, image: '/mostazas/Mostaza-Fritz-6x1K-caja.png', hoverImage: '/mostazas/Mostaza-Fritz-6x1K-unidad.png', brand: 'Fritz', name: 'Mostaza Fritz (6x1K) - Bulto', price: 22.11, category: 'Mostazas' },
  { id: 17, image: '/mostazas/Mostaza-Vina-1KG-6und-caja.png', hoverImage: '/mostazas/Mostaza-Vina-1KG-6und-unidad.png', brand: 'La Viña', name: 'Mostaza Viña 1KG (6 und) - Caja', price: 15.94, category: 'Mostazas' },
  { id: 18, image: '/mostazas/Mostaza-La-Vina-Bolsa-4x4-caja.png', hoverImage: '/mostazas/Mostaza-La-Vina-Bolsa-4x4-unidad.png', brand: 'La Viña', name: 'Mostaza La Viña Bolsa (4x4) - Bulto', price: 26.08, category: 'Mostazas' },
  { id: 19, image: '/mostazas/Mostaza-Coma-Galon-4x4-caja.png', hoverImage: '/mostazas/Mostaza-Coma-Galon-4x4-unidad.png', brand: 'Coma', name: 'Mostaza Coma Galón (4x4) - Bulto', price: 40.57, category: 'Mostazas' },
  { id: 20, image: '/mostazas/Mostaza-Coma-12x1KG-caja.png', hoverImage: '/mostazas/Mostaza-Coma-12x1KG-unidad.png', brand: 'Coma', name: 'Mostaza Coma (12 x 1 KG) - Caja', price: 33.51, category: 'Mostazas' },
  { id: 21, image: '/mostazas/Mostacita-La-Vina-Bolsa-4x3.8KG-caja.png', hoverImage: '/mostazas/Mostacita-La-Vina-Bolsa-4x3.8KG-unidad.png', brand: 'La Viña', name: 'Mostacita La Viña Bolsa (4x3.8KG) - Bulto', price: 21.93, category: 'Mostazas' },
  { id: 22, image: '/mostazas/Mostaza-Fritz-Bolsa-4x4-caja.png', hoverImage: '/mostazas/Mostaza-Fritz-Bolsa-4x4-unidad.png', brand: 'Fritz', name: 'Mostaza Fritz Bolsa (4x4) - Bulto', price: 39.53, category: 'Mostazas' },
  { id: 23, image: '/mostazas/Mostaza-Frenchs-4x2.98K-caja.png', hoverImage: '/mostazas/Mostaza-Frenchs-4x2.98K-unidad.png', brand: 'French\'s', name: 'Mostaza French\'s (4x2.98K) - Bulto', price: 96.80, badge: 'Más Vendido', category: 'Mostazas' },
  { id: 24, image: '/mostazas/Mostaza-La-Marca-4x3.65-caja.png', hoverImage: '/mostazas/Mostaza-La-Marca-4x3.65-unidad.png', brand: 'La Marca', name: 'Mostaza La Marca (4x3.65) - Bulto', price: 56.68, category: 'Mostazas' },
  { id: 25, image: '/mostazas/Mostaza-Oscarenota-4x4-caja.png', hoverImage: '/mostazas/Mostaza-Oscarenota-4x4-unidad.png', brand: 'Da Gusto', name: 'Mostaza Oscareñota (4x4) - Bulto', price: 15.07, category: 'Mostazas' },
  { id: 26, image: '/mostazas/Mostaza-La-Vina-Galon-Pote-4x4-caja.png', hoverImage: '/mostazas/Mostaza-La-Vina-Galon-Pote-4x4-unidad.png', brand: 'La Viña', name: 'Mostaza La Viña Galón Pote (4x4) - Bulto', price: 28.98, category: 'Mostazas' },
  { id: 57, image: '/mostazas/Mostaza-Coma-24x200g-caja.png', hoverImage: '/mostazas/Mostaza-Coma-24x200g-unidad.png', brand: 'Coma', name: 'Mostaza Coma (24 x 200g) - Caja', price: 27.04, category: 'Mostazas' },
  { id: 58, image: '/mostazas/Mostaza-Coma-500grx12-caja.png', hoverImage: '/mostazas/Mostaza-Coma-500grx12-unidad.png', brand: 'Coma', name: 'Mostaza Coma (500gr x 12) - Caja', price: 27.03, category: 'Mostazas' },
  { id: 59, image: '/mostazas/Mostaza-Doy-Pack-24x160g-caja.png', hoverImage: '/mostazas/Mostaza-Doy-Pack-24x160g-unidad.png', brand: 'Genérico', name: 'Mostaza Doy Pack (24 x 160g) - Caja', price: 21.64, category: 'Mostazas' },
  { id: 60, image: '/mostazas/Mostaza-Sachet-Heinz-408unds-caja.png', hoverImage: '/mostazas/Mostaza-Sachet-Heinz-408unds-unidad.png', brand: 'Heinz', name: 'Mostaza Sachet Heinz (408 unds) - Caja', price: 38.00, category: 'Mostazas' },
  { id: 61, image: '/mostazas/Mostaza-Vina-2KG-6und-caja.png', hoverImage: '/mostazas/Mostaza-Vina-2KG-6und-unidad.png', brand: 'La Viña', name: 'Mostaza Viña 2KG (6 und) - Caja', price: 25.26, category: 'Mostazas' },
  { id: 62, image: '/mostazas/Mostaza-da-gusto-4x4gl-caja.png', hoverImage: '/mostazas/Mostaza-da-gusto-4x4gl-unidad.png', brand: 'Da Gusto', name: 'Mostaza Da Gusto Galón (4x4) - Bulto', price: 56.68, category: 'Mostazas' },
  { id: 63, image: '/mostazas/Mostaza-da-gusto-6x1KG-caja.png', hoverImage: '/mostazas/Mostaza-da-gusto-6x1KG-unidad.png', brand: 'Da Gusto', name: 'Mostaza Da Gusto (6x1KG) - Bulto', price: 27.68, category: 'Mostazas' },
  { id: 27, image: '/salsas-de-tomate/Salsa-de-Tomate-Fritz-(12x397g)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-de-Tomate-Fritz-(12x397g)-unidad.png', brand: 'Fritz', name: 'Salsa de Tomate Fritz (12x397g) - Caja', price: 15.92, badge: 'Nuevo', category: 'Salsas' },
  { id: 28, image: '/salsas-de-tomate/Salsa-Coma-Ketchup-(12x1KG)caja.png', hoverImage: '/salsas-de-tomate/Salsa-Coma-Ketchup-(12x1KG)-unidad.png', brand: 'Coma', name: 'Salsa Coma Ketchup (12x1KG) - Caja', price: 43.26, category: 'Salsas' },
  { id: 29, image: '/salsas-de-tomate/Salsa-BaseComa-(4x4)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-BaseComa-(4x4)-unidad.png', brand: 'Coma', name: 'Salsa Base Coma (4x4) - Bulto', price: 36.36, category: 'Salsas' },
  { id: 30, image: '/salsas-de-tomate/Ketchup-Heinz-Sachet10G-(396unds)-caja.png', hoverImage: '/salsas-de-tomate/Ketchup-Heinz-Sachet10G-(396unds)-unidad.png', brand: 'Heinz', name: 'Ketchup Heinz Sachet 10G (396 unds) - Caja', price: 33.61, badge: 'Más Vendido', category: 'Salsas' },
  { id: 31, image: '/salsas-de-tomate/Ketchup-Volpack-Heinz-12.7KG-caja.png', hoverImage: '/salsas-de-tomate/Ketchup-Volpack-Heinz-12.7KG-unidad.png', brand: 'Heinz', name: 'Ketchup Volpack Heinz 12.7KG - Unidad', price: 54.06, category: 'Salsas' },
  { id: 32, image: '/salsas-de-tomate/Pasta-de-Tomate-(4undx4KG)-caja.png', hoverImage: '/salsas-de-tomate/Pasta-de-Tomate-(4undx4KG)-unidad.png', brand: 'Coma', name: 'Pasta de Tomate (4und x 4KG) - Bulto', price: 63.96, category: 'Salsas' },
  { id: 33, image: '/salsas-de-tomate/Pasta-de-Tomate-(12undx1KG)-caja.png', hoverImage: '/salsas-de-tomate/Pasta-de-Tomate-(12undx1KG)-unidad.png', brand: 'Genérico', name: 'Pasta de Tomate (12und x 1KG) - Bulto', price: 35.14, category: 'Salsas' },
  { id: 34, image: '/salsas-de-tomate/PastadeTomate-(12undx500gr)-caja.png', hoverImage: '/salsas-de-tomate/PastadeTomate-(12undx500gr)-unidad.png', brand: 'Genérico', name: 'Pasta de Tomate (12und x 500gr) - Bulto', price: 35.04, category: 'Salsas' },
  { id: 35, image: '/salsas-de-tomate/Pasta-de-Tomate-(24undx200gr)-caja.png', hoverImage: '/salsas-de-tomate/Pasta-de-Tomate-(24undx200gr)-unidad.png', brand: 'Genérico', name: 'Pasta de Tomate (24und x 200gr) - Bulto', price: 34.07, category: 'Salsas' },
  { id: 36, image: '/salsas-de-tomate/Base-Fritz-Bolsa-(6x1KG)-caja.png', hoverImage: '/salsas-de-tomate/Base-Fritz-Bolsa-(6x1KG)-unidad.png', brand: 'Fritz', name: 'Base Fritz Bolsa (6x1KG) - Bulto', price: 19.70, category: 'Salsas' },
  { id: 37, image: '/salsas-de-tomate/SalsaKetchup-Heinz397gr-(16undplastico)-caja.png', hoverImage: '/salsas-de-tomate/SalsaKetchup-Heinz397gr-(16undplastico)-unidad.png', brand: 'Heinz', name: 'Salsa Ketchup Heinz 397gr (16und plástico) - Caja', price: 38.98, category: 'Salsas' },
  { id: 38, image: '/salsas-de-tomate/SalsaKetchup-Heinz397gr-(24undvidrio)-caja.png', hoverImage: '/salsas-de-tomate/SalsaKetchup-Heinz397gr-(24undvidrio)-unidad.png', brand: 'Heinz', name: 'Salsa Ketchup Heinz 397gr (24und vidrio) - Caja', price: 51.41, category: 'Salsas' },
  { id: 39, image: '/images/salsadetomate13.png', hoverImage: '/images/productosalsa13.png', brand: 'Fritz', name: 'Salsa Doypack Fritz (24x165g) - Caja', price: 16.58, category: 'Salsas' },
  { id: 40, image: '/salsas-de-tomate/Ketchup-Dona-Nelly(5und-x-4KG)-caja.png', hoverImage: '/salsas-de-tomate/Ketchup-Dona-Nelly(5und-x-4KG)-unidad.png', brand: 'Doña Nelly', name: 'Ketchup Doña Nelly (5und x 4KG) - Bulto', price: 17.06, category: 'Salsas' },
  { id: 41, image: '/salsas-de-tomate/Base-Fritz-(4x4)-caja.png', hoverImage: '/salsas-de-tomate/Base-Fritz-(4x4)-unidad.png', brand: 'Fritz', name: 'Base Fritz (4x4) - Bulto', price: 36.90, category: 'Salsas' },
  { id: 42, image: '/salsas-de-tomate/Salsa-Ketchup-La-Vina-(1KG-x-6-Bolsa)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-Ketchup-La-Vina-(1KG-x-6-Bolsa)-unidad.png', brand: 'La Viña', name: 'Salsa Ketchup La Viña (1KG x 6 Bolsa) - Bulto', price: 16.32, category: 'Salsas' },
  { id: 43, image: '/salsas-de-tomate/Salsa-Base-TomaticoVina-(4x4)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-Base-TomaticoVina-(4x4)-unidad.png', brand: 'La Viña', name: 'Salsa Base Tomatico Viña (4x4) - Bulto', price: 17.24, category: 'Salsas' },
  { id: 44, image: '/salsas-de-tomate/Salsa-de-Tomate-Paraiso(4x4)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-de-Tomate-Paraiso(4x4)-unidad.png', brand: 'Paraíso', name: 'Salsa de Tomate Paraíso (4x4) - Bulto', price: 17.05, category: 'Salsas' },
  { id: 45, image: '/salsas-de-tomate/Salsa-La-Ideal-Ketchup-(1KGx6unds)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-La-Ideal-Ketchup-(1KGx6unds)-unidad.png', brand: 'La Ideal', name: 'Salsa La Ideal Ketchup (1KG x 6unds) - Bulto', price: 22.99, category: 'Salsas' },
  { id: 46, image: '/salsas-de-tomate/Pasta-de-Tomate-Venato-(12x375g)-caja.png', hoverImage: '/salsas-de-tomate/Pasta-de-Tomate-Venato-(12x375g)-unidad.png', brand: 'Venato', name: 'Pasta de Tomate Venato (12x375g) - Caja', price: 31.11, category: 'Salsas' },
  { id: 47, image: '/salsas-de-tomate/Salsa-Tomate-Doypack-Fritz-(6x930g)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-Tomate-Doypack-Fritz-(6x930g)-unidad.png', brand: 'Fritz', name: 'Salsa Tomate Doypack Fritz (6x930g) - Caja', price: 20.02, category: 'Salsas' },
  { id: 48, image: '/salsas-de-tomate/Salsa-Coma-Ketchup-Plastico-(4x4)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-Coma-Ketchup-Plastico-(4x4)-unidad.png', brand: 'Coma', name: 'Salsa Coma Ketchup Plástico (4x4) - Bulto', price: 47.18, category: 'Salsas' },
  { id: 49, image: '/salsas-de-tomate/Salsa-Mayotropi-(4x4und)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-Mayotropi-(4x4und)-unidad.png', brand: 'Mayotropi', name: 'Salsa Mayotropi (4x4 und) - Bulto', price: 35.80, category: 'Salsas' },
  { id: 50, image: '/salsas-de-tomate/Salsa-Tomatico-(12x397gr)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-Tomatico-(12x397gr)-unidad.png', brand: 'Tomatico', name: 'Salsa Tomatico (12 x 397gr) - Caja', price: 14.01, category: 'Salsas' },
  { id: 51, image: '/salsas-de-tomate/Salsa-Base-Coma-(12x1KG)-caja.png', hoverImage: '/salsas-de-tomate/Salsa-Base-Coma-(12x1KG)-unidad.png', brand: 'Coma', name: 'Salsa Base Coma (12 x 1KG) - Caja', price: 35.82, category: 'Salsas' },
  { id: 52, image: '/images/salsadetomate26.png', hoverImage: '/images/productosalsa26.png', brand: 'Fragua', name: 'Salsa para Pizza Fragua 4KG - Lata', price: 21.93, category: 'Salsas' },
  { id: 64, image: '/bbq/BBQ-La-Vina-12x397g-caja.png', hoverImage: '/bbq/BBQ-La-Vina-12x397g-unidad.png', brand: 'La Viña', name: 'BBQ La Viña (12x397g) - Caja', price: 18.35, category: 'Salsas BBQ' },
  { id: 65, image: '/bbq/BBQ-McCormick-Galon-unidad.png', hoverImage: '/bbq/BBQ-McCormick-Galon-unidad.png', brand: 'McCormick', name: 'BBQ McCormick Galón - Unidad', price: 20.15, category: 'Salsas BBQ' },
  { id: 66, image: '/bbq/BBQ-Fritz-290x12-caja.png', hoverImage: '/bbq/BBQ-Fritz-290x12-unidad.png', brand: 'Fritz', name: 'BBQ Fritz (290x12) - Caja', price: 25.83, category: 'Salsas BBQ' },
  { id: 67, image: '/bbq/BBQ-McCormick-24x230g-caja.png', hoverImage: '/bbq/BBQ-McCormick-24x230g-unidad.png', brand: 'McCormick', name: 'BBQ McCormick (24x230g) - Caja', price: 69.49, category: 'Salsas BBQ' },
  { id: 68, image: '/bbq/BBQ-Bolsa-Vina-4x3.85-caja.png', hoverImage: '/bbq/BBQ-Bolsa-Vina-4x3.85-unidad.png', brand: 'La Viña', name: 'BBQ Bolsa Viña (4x3.85) - Bulto', price: 27.70, category: 'Salsas BBQ' },
  { id: 69, image: '/bbq/BBQ-La-Vina-2KGx6-caja.png', hoverImage: '/bbq/BBQ-La-Vina-2KGx6-unidad.png', brand: 'La Viña', name: 'BBQ La Viña (2KG x 6) - Bulto', price: 25.80, category: 'Salsas BBQ' },
  { id: 70, image: '/bbq/BBQ-Fritz-4x4GL-caja.png', hoverImage: '/bbq/BBQ-Fritz-4x4GL-unidad.png', brand: 'Fritz', name: 'BBQ Fritz (4x4 GL) - Bulto', price: 63.16, category: 'Salsas BBQ' },
  { id: 71, image: '/bbq/BBQ-Deli-Fritz-4x3.5KG-caja.png', hoverImage: '/bbq/BBQ-Deli-Fritz-4x3.5KG-unidad.png', brand: 'Fritz', name: 'BBQ Deli Fritz (4x3.5KG) - Bulto', price: 37.06, category: 'Salsas BBQ' },
  { id: 72, image: '/bbq/BBQ-La-Vina-6x1KG-caja.png', hoverImage: '/bbq/BBQ-La-Vina-6x1KG-unidad.png', brand: 'La Viña', name: 'BBQ La Viña (6x1KG) - Bulto', price: 19.92, category: 'Salsas BBQ' },
  { id: 73, image: '/bbq/BBQ-Hot-Fritz-12x930g-caja.png', hoverImage: '/bbq/BBQ-Hot-Fritz-12x930g-unidad.png', brand: 'Fritz', name: 'BBQ Hot Fritz (12x930g) - Caja', price: 56.14, category: 'Salsas BBQ' },
  { id: 74, image: '/bbq/BBQ-SauceSweetBabyRays-Galon-4.5KG-unidad.png', hoverImage: '/bbq/BBQ-SauceSweetBabyRays-Galon-4.5KG-unidad.png', brand: 'Sweet Baby Ray\'s', name: 'BBQ Sauce Sweet Baby Ray\'s Galón (4.5KG) - Unidad', price: 40.00, category: 'Salsas BBQ' },
  { id: 75, image: '/bbq/BBQ-Deli-Fritz-6x1K-caja.png', hoverImage: '/bbq/BBQ-Deli-Fritz-6x1K-unidad.png', brand: 'Fritz', name: 'BBQ Deli Fritz (6x1K) - Bulto', price: 19.00, category: 'Salsas BBQ' },
];

export const catalogProducts: Product[] = [
  {
    "id": 1000,
    "image": "",
    "brand": "Aceites de Cocina",
    "name": "Aceite de Palma Reyes 17KG - Bidón",
    "price": 59.5,
    "category": "Aceites de Cocina"
  },
  {
    "id": 1001,
    "image": "",
    "brand": "Aceites de Cocina",
    "name": "Aceite Palma Ixora 17L - Bidón",
    "price": 59.9,
    "category": "Aceites de Cocina"
  },
  {
    "id": 1002,
    "image": "",
    "brand": "Aceites de Cocina",
    "name": "Aceite Oliva Extra Virgen Pedriza 250ml - Unidad",
    "price": 5.88,
    "category": "Aceites de Cocina",
    "badge": "Oferta"
  },
  {
    "id": 1003,
    "image": "",
    "brand": "Aceites de Cocina",
    "name": "Aceite de Oliva Virgen 500ml - Unidad",
    "price": 11.8,
    "category": "Aceites de Cocina"
  },
  {
    "id": 1004,
    "image": "",
    "brand": "Aceites de Cocina",
    "name": "Aceite de Oliva Virgen 750ml - Unidad",
    "price": 15.29,
    "category": "Aceites de Cocina"
  },
  {
    "id": 1005,
    "image": "",
    "brand": "Aceites de Cocina",
    "name": "Aceite para Cocina Spray Coco 170gr - Unidad",
    "price": 2.03,
    "category": "Aceites de Cocina",
    "badge": "Oferta"
  },
  {
    "id": 1006,
    "image": "",
    "brand": "Aceites de Cocina",
    "name": "Aceite para Cocina Spray Mantequilla 170gr - Unidad",
    "price": 2.03,
    "category": "Aceites de Cocina",
    "badge": "Oferta"
  },
  {
    "id": 1007,
    "image": "",
    "brand": "Aceites de Cocina",
    "name": "Aceite para Cocina Spray Canola 170gr - Unidad",
    "price": 2.03,
    "category": "Aceites de Cocina",
    "badge": "Oferta"
  },
  {
    "id": 1008,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Salsa Tocineta Viña (12x290gr) - Caja",
    "price": 18.84,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1009,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa para Pizza Fritz (24x310gr) - Caja",
    "price": 22.78,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1010,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Rosada Fritz (12x240gr) - Caja",
    "price": 20.96,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1011,
    "image": "",
    "brand": "Fritz",
    "name": "Base Fritz Tocineta (8und x 45gr) - Caja",
    "price": 12.59,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1012,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Salsa Cheddar Galón (4x4 Pote) - Bulto",
    "price": 100.16,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1013,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Maíz Fritz Bolsa (24x145g) - Caja",
    "price": 31.7,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1014,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Boloñesa Fritz (24x310g) - Caja",
    "price": 25.51,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1015,
    "image": "",
    "brand": "Fritz",
    "name": "Picante Fritz (250x12) - Caja",
    "price": 22.67,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1016,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Guasacaca Picante/Rezept (24x310g) - Caja",
    "price": 44.13,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1017,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Cheddar Viña (12x290gr) - Caja",
    "price": 18.86,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1018,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Aderezo Maíz Viña (12x290gr) - Caja",
    "price": 18.86,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1019,
    "image": "/aderezos/Cheddar-Fritz-caja.png",
    "hoverImage": "/aderezos/Cheddar-Fritz-unidad.png",
    "brand": "Fritz",
    "name": "Salsa Cheddar Fritz (12x240g) - Caja",
    "price": 30.93,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1020,
    "image": "",
    "brand": "Fritz",
    "name": "Aderezo Maíz Fritz Galón (4x3KG) - Bulto",
    "price": 36.15,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1021,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Guasacaca Caribbean/Rezept (24x310g) - Caja",
    "price": 43.5,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1022,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Napolitana Fritz (24x310gr) - Caja",
    "price": 24.6,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1023,
    "image": "",
    "brand": "La Viña",
    "name": "Aderezo Cheddar La Viña (4x3.3KG) - Bulto",
    "price": 26.08,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1024,
    "image": "",
    "brand": "Fritz",
    "name": "Aderezo Maíz Fritz (6x1KG) - Bulto",
    "price": 22.23,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1025,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Maíz Fritz (12x240) - Caja",
    "price": 33.05,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1026,
    "image": "",
    "brand": "La Viña",
    "name": "Aderezo Maíz La Viña (4x3.3G) - Bulto",
    "price": 26.08,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1027,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Tocineta Fritz (12x240g) - Caja",
    "price": 30.54,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1028,
    "image": "",
    "brand": "Fritz",
    "name": "Aderezo Cheddar Fritz (6x1KG) - Bulto",
    "price": 24.84,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1029,
    "image": "",
    "brand": "Fritz",
    "name": "Aderezo Tocineta Fritz (6x1KG) - Bulto",
    "price": 21.98,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1030,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Combo Salsa-Mayo-Mostaza (4x330g) - Unidad",
    "price": 16.17,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1031,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Aderezo Tocineta Viña (4x4) - Bulto",
    "price": 26.08,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1032,
    "image": "",
    "brand": "Fritz",
    "name": "Aderezo Cheddar Fritz (4x3KG) - Bulto",
    "price": 39.48,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1033,
    "image": "",
    "brand": "Fritz",
    "name": "Aderezo Tocineta Fritz Galón (4x4) - Bulto",
    "price": 35.83,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1034,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Tocineta Fritz Bolsa (24x145g) - Caja",
    "price": 30.36,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1035,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Sriracha (793g) - Unidad",
    "price": 13.93,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1036,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Salsa Roro Ajo Perejil (12x226g) - Caja",
    "price": 28.12,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1037,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Salsa Roro Cheddar (12x226g) - Caja",
    "price": 28.77,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1038,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Salsa Roro Maíz (12x226g) - Caja",
    "price": 27.5,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1039,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Cheddar Fritz Bolsa (24x145g) - Caja",
    "price": 30.02,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1040,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Salsa Roro Tocineta (12x226g) - Caja",
    "price": 28.12,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1041,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Albahaca Fritz (24x310g) - Caja",
    "price": 24.6,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1042,
    "image": "",
    "brand": "Fritz",
    "name": "Hot Salsa Maíz Fritz (12x750g) - Caja",
    "price": 91.71,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1043,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Cheddar Hot Fritz (12x740g) - Caja",
    "price": 72.03,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1044,
    "image": "",
    "brand": "La Viña",
    "name": "Aderezo Cheddar La Viña (6x1KG) - Bulto",
    "price": 18.48,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1045,
    "image": "",
    "brand": "Aderezos Especiales",
    "name": "Salsa Ají Picante Piri Piri (24x150) - Caja",
    "price": 45.87,
    "category": "Aderezos Especiales"
  },
  {
    "id": 1046,
    "image": "",
    "brand": "Mados",
    "name": "Base Mados Maíz (8x8undx30g) - Caja",
    "price": 10.43,
    "category": "Bases en Polvo"
  },
  {
    "id": 1047,
    "image": "",
    "brand": "Mados",
    "name": "Base Mados Cheddar (8x8undx30g) - Caja",
    "price": 10.43,
    "category": "Bases en Polvo"
  },
  {
    "id": 1048,
    "image": "",
    "brand": "Fritz",
    "name": "Base Fritz Cheddar (8unds 45g) - Caja",
    "price": 11.62,
    "category": "Bases en Polvo"
  },
  {
    "id": 1049,
    "image": "",
    "brand": "Fritz",
    "name": "Base Fritz Maíz (8unds 45g) - Caja",
    "price": 12.17,
    "category": "Bases en Polvo"
  },
  {
    "id": 1050,
    "image": "",
    "brand": "Bases en Polvo",
    "name": "Base Roro Ajo c/Perejil 45g (Cajita 8unds) - Caja",
    "price": 11.2,
    "category": "Bases en Polvo"
  },
  {
    "id": 1051,
    "image": "",
    "brand": "Bases en Polvo",
    "name": "Base Roro Maíz 45gr (Cajita 8unds) - Caja",
    "price": 11.2,
    "category": "Bases en Polvo"
  },
  {
    "id": 1052,
    "image": "",
    "brand": "Bases en Polvo",
    "name": "Base Roro Cheddar 45g (Cajita 8unds) - Caja",
    "price": 11.2,
    "category": "Bases en Polvo"
  },
  {
    "id": 1053,
    "image": "",
    "brand": "Bases en Polvo",
    "name": "Base Roro Tocineta 54g (Cajita 8und) - Caja",
    "price": 11.2,
    "category": "Bases en Polvo"
  },
  {
    "id": 1054,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Papelón c/Limón Mi Tierra (10x170g) - Bulto",
    "price": 15.73,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1055,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Papelón Natural (10x170g) - Bulto",
    "price": 18.04,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1056,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Gatorade (12x50ml) - Caja",
    "price": 17.8,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1057,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Speed Max (24x310ml) - Caja",
    "price": 16.5,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1058,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Crystal Durazno (12x500ml) - Caja",
    "price": 8.67,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1059,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Crystal Durazno (6x1.5L) - Caja",
    "price": 8.7,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1060,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Jugo de Manzana Tripack Tunal (9x200ml) - Caja",
    "price": 19.61,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1061,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Jugo de Durazno Tripack Tunal (9x200ml) - Caja",
    "price": 19.61,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1062,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Jugo de Pera Tunal (12x1LTS) - Caja",
    "price": 23.14,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1063,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Jugo de Manzana Tunal (12x1LTS) - Caja",
    "price": 23.14,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1064,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Jugo de Naranja Tunal (12x1LTS) - Caja",
    "price": 31.04,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1065,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Jugo de Durazno Tunal (12x1Lts) - Caja",
    "price": 27.68,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1066,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Agua Cristal (24x330cc) - Caja",
    "price": 6.07,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1067,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Agua Cristal 600ml (12UND) - Caja",
    "price": 5.21,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1068,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Agua Cristal 1.5L (6UND) - Caja",
    "price": 3.37,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1069,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Agua Cristal 4.8L (2UND) - Caja",
    "price": 4.03,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1070,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Manzanilla MC (20 Sobres) - Caja",
    "price": 3.73,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1071,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Rosa de Jamaica MC (20 Unds) - Caja",
    "price": 3.73,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1072,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Rosa de Jamaica MC (10 Unds) - Caja",
    "price": 2,
    "category": "Bebidas e Infusiones",
    "badge": "Oferta"
  },
  {
    "id": 1073,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Dulces Sueños MC (1x20 Unds) - Caja",
    "price": 4.23,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1074,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Verde MC (20 Sobres) - Caja",
    "price": 3.25,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1075,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Verde MC (10 Sobres) - Caja",
    "price": 2,
    "category": "Bebidas e Infusiones",
    "badge": "Oferta"
  },
  {
    "id": 1076,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té con Canela Cítrica (20 Sobres) - Caja",
    "price": 2.99,
    "category": "Bebidas e Infusiones",
    "badge": "Oferta"
  },
  {
    "id": 1077,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Frutos del Bosque MC (20 Sobres) - Caja",
    "price": 3.54,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1078,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Frutos del Bosque MC (10 Sobres) - Caja",
    "price": 2,
    "category": "Bebidas e Infusiones",
    "badge": "Oferta"
  },
  {
    "id": 1079,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Frutos Rojos MC (20 Sobres) - Caja",
    "price": 3.72,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1080,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Infusión Cúrcuma MC (20 Sobres) - Caja",
    "price": 3.36,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1081,
    "image": "",
    "brand": "Bebidas e Infusiones",
    "name": "Té Negro MC (20 Sobres) - Caja",
    "price": 3.37,
    "category": "Bebidas e Infusiones"
  },
  {
    "id": 1082,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsa Fondo Cuadrado Extra Grande - Unidad",
    "price": 0.56,
    "category": "Bolsas de Papel",
    "badge": "Oferta"
  },
  {
    "id": 1083,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsa Fondo Cuadrado Grande - Unidad",
    "price": 0.42,
    "category": "Bolsas de Papel",
    "badge": "Oferta"
  },
  {
    "id": 1084,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsas Fondo Cuadrado Mediana - Unidad",
    "price": 0.38,
    "category": "Bolsas de Papel",
    "badge": "Oferta"
  },
  {
    "id": 1085,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsa Fondo Cuadrado Pequeña - Unidad",
    "price": 0.31,
    "category": "Bolsas de Papel",
    "badge": "Oferta"
  },
  {
    "id": 1086,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsa Fondo Cuadrado Asa Torcida - Unidad",
    "price": 0.46,
    "category": "Bolsas de Papel",
    "badge": "Oferta"
  },
  {
    "id": 1087,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsa Fondo Cuadrado S/Asa - Unidad",
    "price": 0.37,
    "category": "Bolsas de Papel",
    "badge": "Oferta"
  },
  {
    "id": 1088,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsa Papel 1/2 - Bulto (1000 Unds)",
    "price": 22.93,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1089,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsas de Papel 1KG Marrón - Bulto (1000 Unds)",
    "price": 25.78,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1090,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsas de Papel 1KG Blanca - Bulto (1000 Unds)",
    "price": 23.53,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1091,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsas Papel 2Kg - Bulto (1000 Unds)",
    "price": 31.76,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1092,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsas de Papel 3KG Marrón - Bulto (1000 Unds)",
    "price": 42.35,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1093,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsas de Papel 3KG Blanca - Bulto (1000 Unds)",
    "price": 41.86,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1094,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsa de Papel 4KG - Bulto (1000 Unds)",
    "price": 67.44,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1095,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsa de Papel 5KG - Bulto (1000 Unds)",
    "price": 96.23,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1096,
    "image": "",
    "brand": "Bolsas de Papel",
    "name": "Bolsas Papel 10Kg - Bulto (500 Unds)",
    "price": 55.92,
    "category": "Bolsas de Papel"
  },
  {
    "id": 1097,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsas c/Asa 2Kg - Bulto (1000 Unds)",
    "price": 6.88,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1098,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsa c/Asas 3Kg - Bulto (1000 Unds)",
    "price": 9.8,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1099,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsas c/Asa 5Kg - Bulto (1000 Unds)",
    "price": 10.9,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1100,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsa c/Asa 10 Kilos - Bulto (1000 Unds)",
    "price": 15.42,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1101,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsa c/Asa 15KG - Bulto/Unds",
    "price": 24.16,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1102,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsa c/Asa 20KG - Bulto (500 Unds)",
    "price": 21.21,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1103,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsa c/Asa 25KG Blancas - Bulto (500 Unds)",
    "price": 33.75,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1104,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsa c/Asa 25KG Negras - Bulto (500 Unds)",
    "price": 28.49,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1105,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsa Basura 30KG - Bulto (300 Unds)",
    "price": 25,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1106,
    "image": "",
    "brand": "Bolsas Plásticas",
    "name": "Bolsa Basura 40KG - Bulto (200 Unds)",
    "price": 47.06,
    "category": "Bolsas Plásticas"
  },
  {
    "id": 1107,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Caja de Pizza 40x40 - Bulto (50 Unds)",
    "price": 46,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1108,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Caja de Pizza 33x33 - Bulto (50 Unds)",
    "price": 33.1,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1109,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Caja de Pizza 25x25 - Bulto (50 Unds)",
    "price": 21.25,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1110,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Plato Térmico PT-9 - Bulto",
    "price": 7.07,
    "category": "Cajas y Platos de Cartón",
    "badge": "Oferta"
  },
  {
    "id": 1111,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Platos Térmicos PT-10 - Bulto (200 Unds)",
    "price": 15.97,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1112,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Platos N° 11 - Bulto",
    "price": 13.41,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1113,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Plato de Cartón N° 5 Cinco - Bulto",
    "price": 19.17,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1114,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Platos de Cartón N° 7 - Bulto",
    "price": 27.17,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1115,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Platos Cartón N° 8 - Bulto (1000 Unds)",
    "price": 31.31,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1116,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Plato de Cartón N° 6 - Bulto (1000 Unds)",
    "price": 17.35,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1117,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Bandejas de Cartón Grandes - Bulto (500 Unds)",
    "price": 52.72,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1118,
    "image": "",
    "brand": "Cajas y Platos de Cartón",
    "name": "Bandejas de Cartón Mediana - Bulto (750 Unds)",
    "price": 49.7,
    "category": "Cajas y Platos de Cartón"
  },
  {
    "id": 1119,
    "image": "",
    "brand": "Deli",
    "name": "Delicias d/Cerdo t/Espalda Don Ramon - Kilo",
    "price": 4.33,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1120,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Arepero Drago - Kilo",
    "price": 5.91,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1121,
    "image": "",
    "brand": "Milenium",
    "name": "Arepero Milenium - Kilo",
    "price": 4.64,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1122,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Mini Tocineta Rebanada - Kilo",
    "price": 5.86,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1123,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Tocineta Ahumada Boutique - Kilo",
    "price": 13,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1124,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Tocineta Drago - Kilo",
    "price": 10.79,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1125,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Tocineta Bigcerdy - Kilo",
    "price": 10.34,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1126,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Tocineta Ahumada Toscana - Kilo",
    "price": 11.21,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1127,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Tocineta Ahumada Purolomo - Kilo",
    "price": 11.82,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1128,
    "image": "",
    "brand": "Cumbre Fresca",
    "name": "Tocineta Cumbre Fresca Especial - Kilo",
    "price": 12.21,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1129,
    "image": "",
    "brand": "Ahulux",
    "name": "Tocineta Ahulux - Kilo",
    "price": 12.3,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1130,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Tocineta Rebanada Majestad - Kilo",
    "price": 12.73,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1131,
    "image": "",
    "brand": "Cerdo y Tocinetas",
    "name": "Hueso de Cerdo Ahumado Monarca - Kilo",
    "price": 4.47,
    "category": "Cerdo y Tocinetas"
  },
  {
    "id": 1132,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Flips Leche (20x120gr) - Caja",
    "price": 33.7,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1133,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Flips Chocolate (20x120gr) - Caja",
    "price": 34.08,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1134,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Flips Leche (24x220gr) - Caja",
    "price": 69.71,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1135,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Flips Chocolate (24x220gr) - Caja",
    "price": 69.71,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1136,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Galleta Mini María Bolsa (16x200g) - Bulto",
    "price": 22.16,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1137,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Galleta Soda Puig 240g (36x10) - Caja",
    "price": 40.55,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1138,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Galleta María Selecta (24x250gr) - Bulto",
    "price": 40.57,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1139,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Galleta María Selecta (36x240gr) - Bulto",
    "price": 55.21,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1140,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Azucaradas Maizoritos (12x240g) - Bulto",
    "price": 30.92,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1141,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Cronch Flakes Maizoritos (12x300g) - Bulto",
    "price": 30.93,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1142,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Fruty Aros Maizoritos (12x240gr) - Bulto",
    "price": 32.08,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1143,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Zucaritas Kelloggs (12x250g) - Bulto",
    "price": 27.39,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1144,
    "image": "",
    "brand": "Cereales y Galletas",
    "name": "Corn Flakes Kelloggs (12x230g) - Bulto",
    "price": 24.17,
    "category": "Cereales y Galletas"
  },
  {
    "id": 1145,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Anchoas Tomodore 1KG - Frasco",
    "price": 47.56,
    "category": "Conservas y Untables"
  },
  {
    "id": 1146,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Diablitos Under Wood (24x50gr) - Caja",
    "price": 42.51,
    "category": "Conservas y Untables"
  },
  {
    "id": 1147,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Diablitos Under Wood (115g x 12) - Caja",
    "price": 38.42,
    "category": "Conservas y Untables"
  },
  {
    "id": 1148,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Atún Eveba Aceite (24x140g) - Caja",
    "price": 65.61,
    "category": "Conservas y Untables"
  },
  {
    "id": 1149,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Atún Eveba Aceite Oliva (24x140g) - Caja",
    "price": 91.69,
    "category": "Conservas y Untables"
  },
  {
    "id": 1150,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Atún en Aceite Dimare (12und x 172gr) - Caja",
    "price": 22.55,
    "category": "Conservas y Untables"
  },
  {
    "id": 1151,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Atún en Aceite Eveba (24und x 170gr) - Caja",
    "price": 22.55,
    "category": "Conservas y Untables"
  },
  {
    "id": 1152,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Sardina Oriente en Tomate (24x170g) - Caja",
    "price": 17.39,
    "category": "Conservas y Untables"
  },
  {
    "id": 1153,
    "image": "",
    "brand": "Conservas y Untables",
    "name": "Sardina Oriente en Aceite (24x170g) - Caja",
    "price": 17.59,
    "category": "Conservas y Untables"
  },
  {
    "id": 1154,
    "image": "",
    "brand": "Curados",
    "name": "Pepperoni Leyton - Kilo",
    "price": 10.98,
    "category": "Curados"
  },
  {
    "id": 1155,
    "image": "",
    "brand": "Curados",
    "name": "Pepperoni Picante Gran Cebu - Kilo",
    "price": 10.72,
    "category": "Curados"
  },
  {
    "id": 1156,
    "image": "",
    "brand": "Curados",
    "name": "Pepperoni Bigcerdy - Kilo",
    "price": 8.96,
    "category": "Curados"
  },
  {
    "id": 1157,
    "image": "",
    "brand": "Curados",
    "name": "Pepperoni Alimetca - Kilo",
    "price": 5.69,
    "category": "Curados"
  },
  {
    "id": 1158,
    "image": "",
    "brand": "Curados",
    "name": "Pepperoni L' Prado - Kilo",
    "price": 9.9,
    "category": "Curados"
  },
  {
    "id": 1159,
    "image": "",
    "brand": "Curados",
    "name": "Pepperoni Gran Cebu - Kilo",
    "price": 10.72,
    "category": "Curados"
  },
  {
    "id": 1160,
    "image": "",
    "brand": "Curados",
    "name": "Salchichón Napoli Gran Cebu - Kilo",
    "price": 27.71,
    "category": "Curados"
  },
  {
    "id": 1161,
    "image": "",
    "brand": "Curados",
    "name": "Salchichón Monserratina - Kilo",
    "price": 41.65,
    "category": "Curados"
  },
  {
    "id": 1162,
    "image": "",
    "brand": "Curados",
    "name": "Salchichón Italguarico Milano/Napoli - Kilo",
    "price": 39.8,
    "category": "Curados"
  },
  {
    "id": 1163,
    "image": "",
    "brand": "Dulces y Chocolates",
    "name": "Ovomaltina (1x24x35g) - Display",
    "price": 28.61,
    "category": "Dulces y Chocolates"
  },
  {
    "id": 1164,
    "image": "",
    "brand": "Dulces y Chocolates",
    "name": "Samba Fresa (20x32gr) - Display",
    "price": 16.87,
    "category": "Dulces y Chocolates"
  },
  {
    "id": 1165,
    "image": "",
    "brand": "Dulces y Chocolates",
    "name": "Chocolate Carré Avellana (10x100g) - Display",
    "price": 42.92,
    "category": "Dulces y Chocolates"
  },
  {
    "id": 1166,
    "image": "",
    "brand": "Dulces y Chocolates",
    "name": "Brownie (175gr und) - Unidad",
    "price": 1.76,
    "category": "Dulces y Chocolates",
    "badge": "Oferta"
  },
  {
    "id": 1167,
    "image": "",
    "brand": "Dulces y Chocolates",
    "name": "Chocolate Savoy (9x70gr) - Display",
    "price": 21,
    "category": "Dulces y Chocolates"
  },
  {
    "id": 1168,
    "image": "",
    "brand": "Dulces y Chocolates",
    "name": "Toronto Chocolate (36x9gr) - Display",
    "price": 18.98,
    "category": "Dulces y Chocolates"
  },
  {
    "id": 1169,
    "image": "",
    "brand": "Ahulux",
    "name": "Chorizo Picante Ahulux al Vacío - Kilo",
    "price": 6.41,
    "category": "Embutidos - Chorizos"
  },
  {
    "id": 1170,
    "image": "",
    "brand": "Ahulux",
    "name": "Chorizo Ahumado Ahulux - Kilo",
    "price": 5.79,
    "category": "Embutidos - Chorizos"
  },
  {
    "id": 1171,
    "image": "",
    "brand": "Embutidos - Chorizos",
    "name": "Chorizo Ajo Monserratina - Kilo",
    "price": 12.19,
    "category": "Embutidos - Chorizos"
  },
  {
    "id": 1172,
    "image": "",
    "brand": "Embutidos - Chorizos",
    "name": "Chorizo Ahumado Monserratina - Kilo",
    "price": 12.52,
    "category": "Embutidos - Chorizos"
  },
  {
    "id": 1173,
    "image": "",
    "brand": "Embutidos - Chorizos",
    "name": "Chorizo Picante Monserratina - Paquete",
    "price": 3.95,
    "category": "Embutidos - Chorizos",
    "badge": "Oferta"
  },
  {
    "id": 1174,
    "image": "",
    "brand": "Embutidos - Chorizos",
    "name": "Chorizo Español Monserratina - Kilo",
    "price": 35.06,
    "category": "Embutidos - Chorizos"
  },
  {
    "id": 1175,
    "image": "",
    "brand": "Embutidos - Chorizos",
    "name": "Chistorra Monserratina - Kilo",
    "price": 26.97,
    "category": "Embutidos - Chorizos"
  },
  {
    "id": 1176,
    "image": "",
    "brand": "Embutidos - Chorizos",
    "name": "Chistorra Bulk Monserratina - Kilo",
    "price": 24.82,
    "category": "Embutidos - Chorizos"
  },
  {
    "id": 1177,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Wiener Plum Larga - Caja (8 paq)",
    "price": 61.47,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1178,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Wiener Plum Corta - Caja (8 paq)",
    "price": 40.71,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1179,
    "image": "",
    "brand": "Don Ramon",
    "name": "Polaca Don Ramon (60 und x 4 paq) - Bulto",
    "price": 33.5,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1180,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Hot Dog Meister - Kilo",
    "price": 10.04,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1181,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Wiener Kaiser - Kilo",
    "price": 11.25,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1182,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Alimex 800g - Paquete",
    "price": 8.88,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1183,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Alimex 450g - Paquete",
    "price": 5.17,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1184,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Tovar - Kilo",
    "price": 15.64,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1185,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Purolomo al Vacío - Kilo",
    "price": 5.22,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1186,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Bulk Meister al Vacío - Kilo",
    "price": 13.83,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1187,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Burguer Kaiser - Kilo",
    "price": 15.59,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1188,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Kaiser - Kilo",
    "price": 16.3,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1189,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha T/Viena Arichuna (12x450g) - Caja",
    "price": 56.96,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1190,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha T/Viena Arichuna (8x800g) - Caja",
    "price": 71.3,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1191,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Tinajas - Kilo",
    "price": 4.96,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1192,
    "image": "",
    "brand": "Don Ramon",
    "name": "Polaca Don Ramon (20 und x paq) - Kilo",
    "price": 2.75,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1193,
    "image": "",
    "brand": "Cumbre Fresca",
    "name": "Salchicha Pollo Cumbre Fresca Granel - Kilo",
    "price": 3.47,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1194,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Paquita 60 unds - Paquete",
    "price": 7.8,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1195,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Wiener L' Prado (10x440g) - Caja",
    "price": 42.28,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1196,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchiprado de Pollo (10x440g) - Caja",
    "price": 40,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1197,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Bulk Fiesta - Kilo",
    "price": 12.72,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1198,
    "image": "",
    "brand": "Don Ramon",
    "name": "Salchicha de Pollo Don Ramon Granel - Kilo",
    "price": 2.77,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1199,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Purolomo Granel - Kilo",
    "price": 4.88,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1200,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Meister - Paquete",
    "price": 5.51,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1201,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchipollo (16x450g) - Caja",
    "price": 65.4,
    "category": "Embutidos - Salchichas"
  },
  {
    "id": 1202,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Prosciutti - Unidad",
    "price": 5.09,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1203,
    "image": "",
    "brand": "Embutidos - Salchichas",
    "name": "Salchicha Polaca Leyton - Unidad",
    "price": 4.16,
    "category": "Embutidos - Salchichas",
    "badge": "Oferta"
  },
  {
    "id": 1204,
    "image": "",
    "brand": "Enlatados",
    "name": "Maíz Del Monte (12x248G) - Caja",
    "price": 25.21,
    "category": "Enlatados"
  },
  {
    "id": 1205,
    "image": "",
    "brand": "Enlatados",
    "name": "Maíz Del Monte (12x432gr) - Caja",
    "price": 39.14,
    "category": "Enlatados"
  },
  {
    "id": 1206,
    "image": "",
    "brand": "Enlatados",
    "name": "Maíz Dulce La Fragua 2.6KG - Lata",
    "price": 13.69,
    "category": "Enlatados"
  },
  {
    "id": 1207,
    "image": "",
    "brand": "Enlatados",
    "name": "Maíz en Grano Best Valve (12x300G) - Caja",
    "price": 21.26,
    "category": "Enlatados"
  },
  {
    "id": 1208,
    "image": "",
    "brand": "Enlatados",
    "name": "Maíz Dulce Del Monte 3KG - Lata",
    "price": 18.1,
    "category": "Enlatados"
  },
  {
    "id": 1209,
    "image": "",
    "brand": "Enlatados",
    "name": "Maíz Dulce Artesano 2.4KG - Lata",
    "price": 14.22,
    "category": "Enlatados"
  },
  {
    "id": 1210,
    "image": "",
    "brand": "Enlatados",
    "name": "Champiñón Rebanado Setas 3KG - Lata",
    "price": 12.81,
    "category": "Enlatados"
  },
  {
    "id": 1211,
    "image": "",
    "brand": "Enlatados",
    "name": "Champiñón Fragua 2.5KG - Lata",
    "price": 14.44,
    "category": "Enlatados"
  },
  {
    "id": 1212,
    "image": "",
    "brand": "Enlatados",
    "name": "Champiñones Santaniello 2.5KG - Lata",
    "price": 15.43,
    "category": "Enlatados"
  },
  {
    "id": 1213,
    "image": "",
    "brand": "Enlatados",
    "name": "Aceituna Negra Frauga 3.100KG - Lata",
    "price": 27.64,
    "category": "Enlatados"
  },
  {
    "id": 1214,
    "image": "",
    "brand": "Enlatados",
    "name": "Guisantes Del Monte (12x425G) - Caja",
    "price": 48.95,
    "category": "Enlatados"
  },
  {
    "id": 1215,
    "image": "",
    "brand": "Enlatados",
    "name": "Guisantes Del Monte (24x241G) - Caja",
    "price": 30.73,
    "category": "Enlatados"
  },
  {
    "id": 1216,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Envase CT1 S/D Europlast - Bulto (200 Pzas)",
    "price": 9.91,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1217,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Envase CTK1 S/D - Bulto (200 Pzas)",
    "price": 21.74,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1218,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Envase CT2 S/D Europlast - Bulto (200 Pzas)",
    "price": 20.92,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1219,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Envase CT2 S/D Maxiplast - Bulto (200 Pzas)",
    "price": 23.95,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1220,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Envase CT3 S/D - Bulto (200 Pzas)",
    "price": 42.07,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1221,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Envase CT4 S/D - Bulto (200 Pzas)",
    "price": 13.19,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1222,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandejas A1 Europlast - Bulto (500 Unds)",
    "price": 14.79,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1223,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandeja Zupla A2 Blanca Plástica - Bulto (150 Unds)",
    "price": 12.27,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1224,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandeja Zupla A2 Negra Plástica - Bulto (150 Unds)",
    "price": 12.27,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1225,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandejas A2 Europlast Anime - Bulto (500 Unds)",
    "price": 14.7,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1226,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandeja BT1 Corta Europlast Anime - Bulto (500 Pzas)",
    "price": 12.1,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1227,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandeja B1-G Largas Anime - Bulto (500 Unds)",
    "price": 27.5,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1228,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandejas T.B2-G Anime - Bulto (500 Pzas)",
    "price": 24,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1229,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandeja Zupla B2 Blanca Plástica - Bulto (150 Unds)",
    "price": 24.55,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1230,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandeja Zupla B2 Negra Plástica - Bulto (150 Unds)",
    "price": 20.45,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1231,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Envase C1 Maxiplast - Bulto (500 Pzas)",
    "price": 18.62,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1232,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Envase C1 Europlast - Bulto (500 Pzas)",
    "price": 13.63,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1233,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bandeja H2 - Bulto (500 Unds)",
    "price": 47.84,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1234,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bowl Salad 16 Oz - Bulto (200 Unds)",
    "price": 37.85,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1235,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Bowl Salad 48 Oz - Bulto (200 Unds)",
    "price": 58.17,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1236,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Togo (Contenedor c/Tapa) - Bulto (20 Unds)",
    "price": 2.27,
    "category": "Envases Plásticos / Anime",
    "badge": "Oferta"
  },
  {
    "id": 1237,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Triangular Baja - Bulto (100 Unds)",
    "price": 10.47,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1238,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Triangular Alto - Bulto (100 Unds)",
    "price": 16.31,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1239,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Tinas 32 Onzas - Bulto (300 Unds)",
    "price": 77.86,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1240,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Tina 8 Zupla c/Tapa - Bulto (50 Unds)",
    "price": 30.68,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1241,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Tina 200 N° 16 Oz - Bulto",
    "price": 46.02,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1242,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Tinas 23 Onzas - Bulto (300 Unds)",
    "price": 63.37,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1243,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Porta Perro Estampado Económico - Bulto (1000 Unds)",
    "price": 26.74,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1244,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Porta Perros Estampados - Bulto (1000 Unds)",
    "price": 23.26,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1245,
    "image": "",
    "brand": "Envases Plásticos / Anime",
    "name": "Porta Perro Negro 18x8.5 - Bulto (50 Unds)",
    "price": 14.23,
    "category": "Envases Plásticos / Anime"
  },
  {
    "id": 1246,
    "image": "",
    "brand": "Harinas y Almidones",
    "name": "Maizina Americana (40x200gr) - Caja",
    "price": 49.67,
    "category": "Harinas y Almidones"
  },
  {
    "id": 1247,
    "image": "",
    "brand": "Harinas y Almidones",
    "name": "Maizina Americana (50x90gr) - Caja",
    "price": 31.97,
    "category": "Harinas y Almidones"
  },
  {
    "id": 1248,
    "image": "",
    "brand": "Harinas y Almidones",
    "name": "Maizina Americana (25x400gr) - Caja",
    "price": 60.52,
    "category": "Harinas y Almidones"
  },
  {
    "id": 1249,
    "image": "",
    "brand": "Milenium",
    "name": "Mini Mortadela Polaca Milenium - Kilo",
    "price": 3.99,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1250,
    "image": "",
    "brand": "Cumbre Fresca",
    "name": "Mini Mortadela Tipo Salchicha Cumbre Fresca - Kilo",
    "price": 4.47,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1251,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Mini Mortadela T/ Salchicha Villa Julia - Kilo",
    "price": 3.85,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1252,
    "image": "",
    "brand": "Ahulux",
    "name": "Mortadela Tipo Chorizo Ajo Ahulux - Kilo",
    "price": 6.41,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1253,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Mortadela Extra L' Prado - Kilo",
    "price": 6.12,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1254,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Mortadela Extra Arichuna - Kilo",
    "price": 5.81,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1255,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Espalda El Drago - Kilo",
    "price": 5.28,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1256,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Espalda Cocida Arichuna - Kilo",
    "price": 8.56,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1257,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Espalda Premier Cerdopack - Kilo",
    "price": 5.95,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1258,
    "image": "",
    "brand": "Cumbre Fresca",
    "name": "Jamón Ahumado Cumbre Fresca - Kilo",
    "price": 7.82,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1259,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Pierna Estándar Villa Julia - Kilo",
    "price": 5.87,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1260,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Espalda Mid West - Kilo",
    "price": 5.81,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1261,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Espalda Vigor - Kilo",
    "price": 6,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1262,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Ahumado Tinajas - Kilo",
    "price": 6.64,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1263,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Pierna Estándar Drago - Kilo",
    "price": 5.39,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1264,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Espalda Prosciutti - Kilo",
    "price": 6.52,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1265,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Pierna Arichuna - Kilo",
    "price": 10.32,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1266,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Espalda C. Superior Alinieves - Kilo",
    "price": 6.23,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1267,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Pierna Superior Alinieves - Kilo",
    "price": 7.15,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1268,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Espalda Tinajas - Kilo",
    "price": 7.47,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1269,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Cocido Estándar L' Prado - Kilo",
    "price": 8.32,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1270,
    "image": "",
    "brand": "Ahulux",
    "name": "Jamón de Espalda Ahulux - Kilo",
    "price": 6.6,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1271,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Estándar La Suprema - Kilo",
    "price": 5.11,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1272,
    "image": "",
    "brand": "Milenium",
    "name": "Jamón de Espalda Milenium - Kilo",
    "price": 7.33,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1273,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Pierna Superior Plumrose - Kilo",
    "price": 11.87,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1274,
    "image": "",
    "brand": "Cumbre Fresca",
    "name": "Fiambre Cumbre Fresca - Kilo",
    "price": 6.02,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1275,
    "image": "",
    "brand": "Cumbre Fresca",
    "name": "Jamón de Espalda Cumbre Fresca - Kilo",
    "price": 5.91,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1276,
    "image": "",
    "brand": "Cumbre Fresca",
    "name": "Jamón Pierna Cumbre Fresca - Kilo",
    "price": 6.7,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1277,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Espalda L' Prado - Kilo",
    "price": 6.93,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1278,
    "image": "",
    "brand": "Milenium",
    "name": "Jamón de Pierna Estándar Milenium - Kilo",
    "price": 7.36,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1279,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón Espalda Plumrose - Kilo",
    "price": 10.08,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1280,
    "image": "",
    "brand": "Ahulux",
    "name": "Jamón de Pierna Estándar Ahulux - Kilo",
    "price": 6.82,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1281,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Jamón de Espalda Cerdiking - Kilo",
    "price": 5.8,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1282,
    "image": "",
    "brand": "Jamones y Fiambres",
    "name": "Fiambre de Carne Arichuna - Kilo",
    "price": 6.65,
    "category": "Jamones y Fiambres"
  },
  {
    "id": 1283,
    "image": "",
    "brand": "Lácteos",
    "name": "Leche Deslactosada Tunal (12 LTS) - Caja",
    "price": 33.54,
    "category": "Lácteos"
  },
  {
    "id": 1284,
    "image": "",
    "brand": "Lácteos",
    "name": "Leche Descremada Tunal (12 LTS) - Caja",
    "price": 31.84,
    "category": "Lácteos"
  },
  {
    "id": 1285,
    "image": "",
    "brand": "Lácteos",
    "name": "Leche Completa Tunal (12x1LT) - Caja",
    "price": 31.77,
    "category": "Lácteos"
  },
  {
    "id": 1286,
    "image": "",
    "brand": "Lácteos y Bebidas",
    "name": "Leche Evaporada Tigo (12x354ml) - Caja",
    "price": 27.08,
    "category": "Lácteos y Bebidas"
  },
  {
    "id": 1287,
    "image": "",
    "brand": "Lácteos y Bebidas",
    "name": "Crema de Leche Culinaria Tigo 1LT - Unidad",
    "price": 5.18,
    "category": "Lácteos y Bebidas",
    "badge": "Oferta"
  },
  {
    "id": 1288,
    "image": "",
    "brand": "Lácteos y Bebidas",
    "name": "Chantilly Tigo 1LTS - Unidad",
    "price": 8.97,
    "category": "Lácteos y Bebidas",
    "badge": "Oferta"
  },
  {
    "id": 1289,
    "image": "",
    "brand": "Lácteos y Bebidas",
    "name": "Crema Chantilly Hole Whipping 1LT - Unidad",
    "price": 7.98,
    "category": "Lácteos y Bebidas",
    "badge": "Oferta"
  },
  {
    "id": 1290,
    "image": "",
    "brand": "Heinz",
    "name": "Compota Heinz Pera (24x113g) - Caja",
    "price": 22.49,
    "category": "Lácteos y Bebidas"
  },
  {
    "id": 1291,
    "image": "",
    "brand": "Heinz",
    "name": "Compota Heinz Manzana (24x113g) - Caja",
    "price": 22.49,
    "category": "Lácteos y Bebidas"
  },
  {
    "id": 1292,
    "image": "",
    "brand": "Lácteos y Bebidas",
    "name": "Nestea Limón (1KG x 6 und) - Bulto",
    "price": 94.36,
    "category": "Lácteos y Bebidas"
  },
  {
    "id": 1293,
    "image": "",
    "brand": "Lácteos y Bebidas",
    "name": "Nestea Durazno (1KG x 6 und) - Bulto",
    "price": 94.36,
    "category": "Lácteos y Bebidas"
  },
  {
    "id": 1294,
    "image": "",
    "brand": "Da Gusto",
    "name": "Té Da Gusto Limón (1KG x 6) - Bulto",
    "price": 37.76,
    "category": "Lácteos y Bebidas"
  },
  {
    "id": 1295,
    "image": "",
    "brand": "Da Gusto",
    "name": "Té Da Gusto Durazno (1KG x 6) - Bulto",
    "price": 0,
    "category": "Lácteos y Bebidas",
    "badge": "Oferta"
  },
  {
    "id": 1296,
    "image": "",
    "brand": "Lácteos y Bebidas",
    "name": "Leche en Polvo Completa Purísima 900g - Unidad",
    "price": 11.99,
    "category": "Lácteos y Bebidas"
  },
  {
    "id": 1297,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Toallín Rosal Rollo (20 Unds) - Bulto",
    "price": 24.36,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1298,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Paños Amarillos - Docena",
    "price": 10.28,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1299,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Papel Rosal Plus 215 hojas - Bulto",
    "price": 17.08,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1300,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Esponja Acero Inoxidable - Docena",
    "price": 8.72,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1301,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Esponja Dorada - Docena",
    "price": 8.15,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1302,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Esponja Plata - Docena",
    "price": 8.15,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1303,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Esponja Doble Uso - Docena",
    "price": 8.52,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1304,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Esponja Salvauña - Docena",
    "price": 8.52,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1305,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Desinfectante Lavanda DKSA (8x1 LTS) - Caja",
    "price": 9.28,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1306,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Cloro DKSA Ultra (1x8 Unds) - Caja",
    "price": 10.55,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1307,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Desengrasante Pistola Simple - Caja",
    "price": 14.77,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1308,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Detergente Ropa Fresh - Bulto",
    "price": 15.98,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1309,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Desinfectante Cherry DKSA (8x1 LTS) - Caja",
    "price": 8.45,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1310,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Desinfectante Bosque Tropical DKSA - Caja",
    "price": 9.49,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1311,
    "image": "",
    "brand": "Limpieza e Higiene",
    "name": "Jabón Líquido Multiuso Citrus DKSA - Caja",
    "price": 15.4,
    "category": "Limpieza e Higiene"
  },
  {
    "id": 1312,
    "image": "",
    "brand": "Mantequillas",
    "name": "Mantequilla c/s 200G Torondoy - Unidad",
    "price": 5.81,
    "category": "Mantequillas",
    "badge": "Oferta"
  },
  {
    "id": 1313,
    "image": "",
    "brand": "Mantequillas",
    "name": "Mantequilla Lactuario Maracay c/sal (250gr) - Unidad",
    "price": 10.41,
    "category": "Mantequillas"
  },
  {
    "id": 1314,
    "image": "",
    "brand": "Mantequillas",
    "name": "Mantequilla Lactuario Maracay c/sal (24x100gr) - Caja",
    "price": 97.64,
    "category": "Mantequillas"
  },
  {
    "id": 1315,
    "image": "",
    "brand": "Mantequillas",
    "name": "Mantequilla Tunal c/sal 200G - Unidad",
    "price": 6.32,
    "category": "Mantequillas",
    "badge": "Oferta"
  },
  {
    "id": 1316,
    "image": "",
    "brand": "Mantequillas",
    "name": "Mantequilla Palmira 5KG - Unidad",
    "price": 38.89,
    "category": "Mantequillas"
  },
  {
    "id": 1317,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesita (4x4) - Bulto",
    "price": 20.9,
    "category": "Mayonesas"
  },
  {
    "id": 1318,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesa Ideal (900g x 6unds) - Caja",
    "price": 14.73,
    "category": "Mayonesas"
  },
  {
    "id": 1319,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesa Monti (900gr x 12) - Caja",
    "price": 30.5,
    "category": "Mayonesas"
  },
  {
    "id": 1320,
    "image": "",
    "brand": "Mayonesas",
    "name": "Prep Mayonesa Doypack (24x150g) - Caja",
    "price": 29.34,
    "category": "Mayonesas"
  },
  {
    "id": 1321,
    "image": "",
    "brand": "Fritz",
    "name": "Preparado Fritz (6x1KG) - Bulto",
    "price": 22.08,
    "category": "Mayonesas"
  },
  {
    "id": 1322,
    "image": "",
    "brand": "Fritz",
    "name": "Preparado Fritz (4unsd x 4KG) - Bulto",
    "price": 39.8,
    "category": "Mayonesas"
  },
  {
    "id": 1323,
    "image": "",
    "brand": "La Viña",
    "name": "Mayonesa La Viña Pote (4x3.65KG) - Bulto",
    "price": 32.96,
    "category": "Mayonesas"
  },
  {
    "id": 1324,
    "image": "",
    "brand": "La Viña",
    "name": "Mayonesa La Viña Bolsa (4x3.26G) - Bulto",
    "price": 28.76,
    "category": "Mayonesas"
  },
  {
    "id": 1325,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesa Monti (4x3.50KG) - Bulto",
    "price": 32.1,
    "category": "Mayonesas"
  },
  {
    "id": 1326,
    "image": "",
    "brand": "La Ideal",
    "name": "Mayo La Ideal (4x4) - Bulto",
    "price": 33.33,
    "category": "Mayonesas"
  },
  {
    "id": 1327,
    "image": "",
    "brand": "La Viña",
    "name": "Mayonesa La Viña (6x1KG) - Bulto",
    "price": 17.9,
    "category": "Mayonesas"
  },
  {
    "id": 1328,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesa La Colmena (4x3.35KG) - Bulto",
    "price": 26.35,
    "category": "Mayonesas"
  },
  {
    "id": 1329,
    "image": "",
    "brand": "Deli",
    "name": "Preparado de Mayonesa Deli (4x3.1KG) - Bulto",
    "price": 26.91,
    "category": "Mayonesas"
  },
  {
    "id": 1330,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesa Novo Bolsa (4x3.350G) - Bulto",
    "price": 15.34,
    "category": "Mayonesas"
  },
  {
    "id": 1331,
    "image": "",
    "brand": "OBA",
    "name": "Mayonesa OBA Galón (4x3.5KG) - Bulto",
    "price": 30,
    "category": "Mayonesas"
  },
  {
    "id": 1332,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesa La Marca (4und x 4KG) - Bulto",
    "price": 74.8,
    "category": "Mayonesas"
  },
  {
    "id": 1333,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesa La Marca (6und x 1.4KG) - Bulto",
    "price": 55.8,
    "category": "Mayonesas"
  },
  {
    "id": 1334,
    "image": "",
    "brand": "Paraíso",
    "name": "Mayonesa Paraíso Bolsa (4x3.30G) - Bulto",
    "price": 23.86,
    "category": "Mayonesas"
  },
  {
    "id": 1335,
    "image": "",
    "brand": "Mayonesas",
    "name": "Preparado La Marca (4x4) - Bulto",
    "price": 62.5,
    "category": "Mayonesas"
  },
  {
    "id": 1336,
    "image": "",
    "brand": "Mayotropi",
    "name": "Mayonesa Mayotropi (4x3.350G) - Bulto",
    "price": 78.33,
    "category": "Mayonesas"
  },
  {
    "id": 1337,
    "image": "",
    "brand": "Fritz",
    "name": "Mayonesa Doypack Fritz (6x930g) - Caja",
    "price": 22.42,
    "category": "Mayonesas"
  },
  {
    "id": 1338,
    "image": "",
    "brand": "Mayonesas",
    "name": "Mayonesa Doña Nelly (4x4) - Bulto",
    "price": 19.6,
    "category": "Mayonesas"
  },
  {
    "id": 1339,
    "image": "",
    "brand": "Fritz",
    "name": "Mayonesa Fritz (4x4) - Bulto",
    "price": 91.5,
    "category": "Mayonesas"
  },
  {
    "id": 1340,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Tapara Arichuna - Kilo",
    "price": 12.24,
    "category": "Mortadelas"
  },
  {
    "id": 1341,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela c/Pimentón Corral - Kilo",
    "price": 4.92,
    "category": "Mortadelas"
  },
  {
    "id": 1342,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Tipo Espalda Ibérico - Kilo",
    "price": 5.87,
    "category": "Mortadelas"
  },
  {
    "id": 1343,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela t/Pierna Estándar Ibérico - Kilo",
    "price": 6.05,
    "category": "Mortadelas"
  },
  {
    "id": 1344,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Extra t/Tapara Ahumada Nieves - Kilo",
    "price": 7.99,
    "category": "Mortadelas"
  },
  {
    "id": 1345,
    "image": "",
    "brand": "Don Ramon",
    "name": "Mortadela t/Fiambre Don Ramon - Kilo",
    "price": 3.99,
    "category": "Mortadelas"
  },
  {
    "id": 1346,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Extra Tinajas - Kilo",
    "price": 6.53,
    "category": "Mortadelas"
  },
  {
    "id": 1347,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Alibal 1 KG - Unidad",
    "price": 3.7,
    "category": "Mortadelas"
  },
  {
    "id": 1348,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Alibal 500 GR - Unidad",
    "price": 2.06,
    "category": "Mortadelas"
  },
  {
    "id": 1349,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Alibal 700 GR - Unidad",
    "price": 2.6,
    "category": "Mortadelas"
  },
  {
    "id": 1350,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Alibal 2.5 KG - Kilo",
    "price": 3.8,
    "category": "Mortadelas"
  },
  {
    "id": 1351,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Extra Prosciutti - Kilo",
    "price": 4.92,
    "category": "Mortadelas"
  },
  {
    "id": 1352,
    "image": "",
    "brand": "Don Ramon",
    "name": "Mortadela de Pollo Don Ramon 400g - Unidad",
    "price": 1.18,
    "category": "Mortadelas",
    "badge": "Oferta"
  },
  {
    "id": 1353,
    "image": "",
    "brand": "Don Ramon",
    "name": "Mortadela de Pollo Don Ramon 600g - Unidad",
    "price": 1.86,
    "category": "Mortadelas"
  },
  {
    "id": 1354,
    "image": "",
    "brand": "Don Ramon",
    "name": "Mortadela de Pollo Don Ramon 900g - Unidad",
    "price": 2.59,
    "category": "Mortadelas"
  },
  {
    "id": 1355,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Especial Arichuna - Kilo",
    "price": 4.87,
    "category": "Mortadelas"
  },
  {
    "id": 1356,
    "image": "",
    "brand": "Ahulux",
    "name": "Mortadela Tapara Ahulux - Kilo",
    "price": 9.61,
    "category": "Mortadelas"
  },
  {
    "id": 1357,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Punta de Monte - Kilo",
    "price": 5.23,
    "category": "Mortadelas"
  },
  {
    "id": 1358,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Punta de Monte 3 KG - Kilo",
    "price": 5.4,
    "category": "Mortadelas"
  },
  {
    "id": 1359,
    "image": "",
    "brand": "Ahulux",
    "name": "Mortadela Extra Ahulux c/Tocino - Kilo",
    "price": 6.34,
    "category": "Mortadelas"
  },
  {
    "id": 1360,
    "image": "",
    "brand": "Mortadelas",
    "name": "Mortadela Especial Corral 1KG - Unidad",
    "price": 4.13,
    "category": "Mortadelas"
  },
  {
    "id": 1361,
    "image": "",
    "brand": "Coma",
    "name": "Mostaza Coma (500gr x 12) - Caja",
    "price": 27.03,
    "category": "Mostazas"
  },
  {
    "id": 1362,
    "image": "",
    "brand": "Heinz",
    "name": "Mostaza Heinz (4x4) - Bulto",
    "price": 80.33,
    "category": "Mostazas"
  },
  {
    "id": 1363,
    "image": "",
    "brand": "La Viña",
    "name": "Mostaza La Viña Galón Pote (4x4) - Bulto",
    "price": 28.98,
    "category": "Mostazas"
  },
  {
    "id": 1364,
    "image": "",
    "brand": "Fritz",
    "name": "Mostaza Fritz (12 x 240gr) - Caja",
    "price": 25.2,
    "category": "Mostazas"
  },
  {
    "id": 1365,
    "image": "",
    "brand": "Fritz",
    "name": "Mostaza Miel Fritz (12 x 240gr) - Caja",
    "price": 26.16,
    "category": "Mostazas"
  },
  {
    "id": 1366,
    "image": "",
    "brand": "Fritz",
    "name": "Mostaza Fritz Bolsa (4x4) - Bulto",
    "price": 39.53,
    "category": "Mostazas"
  },
  {
    "id": 1367,
    "image": "",
    "brand": "Coma",
    "name": "Mostaza Coma (24 x 200g) - Caja",
    "price": 27.04,
    "category": "Mostazas"
  },
  {
    "id": 1368,
    "image": "",
    "brand": "Coma",
    "name": "Mostaza Coma (24 x 270gr) - Caja",
    "price": 30.92,
    "category": "Mostazas"
  },
  {
    "id": 1369,
    "image": "",
    "brand": "La Viña",
    "name": "Mostaza La Viña Bolsa (4x4) - Bulto",
    "price": 26.08,
    "category": "Mostazas"
  },
  {
    "id": 1370,
    "image": "",
    "brand": "Mostazas",
    "name": "Mostaza Viña 1KG (6 und) - Caja",
    "price": 15.94,
    "category": "Mostazas"
  },
  {
    "id": 1371,
    "image": "",
    "brand": "Mostazas",
    "name": "Mostaza Viña 2KG (6 und) - Caja",
    "price": 25.26,
    "category": "Mostazas"
  },
  {
    "id": 1372,
    "image": "",
    "brand": "Mostazas",
    "name": "Mostaza La Marca (4x3.65) - Bulto",
    "price": 56.68,
    "category": "Mostazas"
  },
  {
    "id": 1373,
    "image": "",
    "brand": "Coma",
    "name": "Mostaza Coma Galón (4x4) - Bulto",
    "price": 40.57,
    "category": "Mostazas"
  },
  {
    "id": 1374,
    "image": "",
    "brand": "Coma",
    "name": "Mostaza Coma (12 x 1 KG) - Caja",
    "price": 33.51,
    "category": "Mostazas"
  },
  {
    "id": 1375,
    "image": "",
    "brand": "Mostazas",
    "name": "Mostaza French's (4x2.98K) - Bulto",
    "price": 96.8,
    "category": "Mostazas"
  },
  {
    "id": 1376,
    "image": "",
    "brand": "Mostazas",
    "name": "Mostaza Doy Pack (24 x 160g) - Caja",
    "price": 21.64,
    "category": "Mostazas"
  },
  {
    "id": 1377,
    "image": "",
    "brand": "Mostazas",
    "name": "Mostaza Oscareñota (4x4) - Bulto",
    "price": 15.07,
    "category": "Mostazas"
  },
  {
    "id": 1378,
    "image": "",
    "brand": "La Viña",
    "name": "Mostacita La Viña Bolsa (4x3.8KG) - Bulto",
    "price": 21.93,
    "category": "Mostazas"
  },
  {
    "id": 1379,
    "image": "",
    "brand": "Fritz",
    "name": "Mostaza Fritz (6x1K) - Bulto",
    "price": 22.11,
    "category": "Mostazas"
  },
  {
    "id": 1380,
    "image": "",
    "brand": "Heinz",
    "name": "Mostaza Sachet Heinz (408 unds) - Caja",
    "price": 38,
    "category": "Mostazas"
  },
  {
    "id": 1381,
    "image": "",
    "brand": "Fritz",
    "name": "Mostaza Doypack Fritz (6x930g) - Caja",
    "price": 16.34,
    "category": "Mostazas"
  },
  {
    "id": 1382,
    "image": "",
    "brand": "Da Gusto",
    "name": "Mostaza da gusto 6x1KG - Caja",
    "price": 27.68,
    "category": "Mostazas"
  },
  {
    "id": 1383,
    "image": "",
    "brand": "Da Gusto",
    "name": "Mostaza da gusto 4x4 gl - Caja",
    "price": 56.68,
    "category": "Mostazas"
  },
  {
    "id": 1384,
    "image": "",
    "brand": "Papelería e Higiene",
    "name": "Servilleta Z Peq (20x160) - Bulto (3200 Unds)",
    "price": 18.07,
    "category": "Papelería e Higiene"
  },
  {
    "id": 1385,
    "image": "",
    "brand": "Brilux",
    "name": "Servilleta Brilux (12x120) - Bulto (1440 Unds)",
    "price": 19.54,
    "category": "Papelería e Higiene"
  },
  {
    "id": 1386,
    "image": "",
    "brand": "Brilux",
    "name": "Servilleta Brilux (16x200) - Bulto (3200 Unds)",
    "price": 15.6,
    "category": "Papelería e Higiene"
  },
  {
    "id": 1387,
    "image": "",
    "brand": "Papelería e Higiene",
    "name": "Guantes de Nitrilo Negro - Caja (100 Unds)",
    "price": 8.99,
    "category": "Papelería e Higiene"
  },
  {
    "id": 1388,
    "image": "",
    "brand": "Papelería e Higiene",
    "name": "Guantes para Charcutero - Bulto (1000 Unds)",
    "price": 24.7,
    "category": "Papelería e Higiene"
  },
  {
    "id": 1389,
    "image": "",
    "brand": "Papelería e Higiene",
    "name": "Separadores Transparentes 1KG - Unidad",
    "price": 14.8,
    "category": "Papelería e Higiene"
  },
  {
    "id": 1390,
    "image": "",
    "brand": "Encfoil",
    "name": "Papel de Aluminio Encfoil 15m x 30cm - Caja (12 Unds)",
    "price": 19.66,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1391,
    "image": "",
    "brand": "Bompack",
    "name": "Papel de Aluminio Bompack 100Mts - Unidad",
    "price": 13.52,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1392,
    "image": "",
    "brand": "Papeles de Envoltura",
    "name": "Papel de Aluminio Extra Fuerte XL 80 Mts - Unidad",
    "price": 32.82,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1393,
    "image": "",
    "brand": "Papeles de Envoltura",
    "name": "Papel de Aluminio 6Mts - Caja (12 Unds)",
    "price": 17.39,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1394,
    "image": "",
    "brand": "Dispaq",
    "name": "Envoplast Dispaq 1500Mts - Unidad",
    "price": 25.11,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1395,
    "image": "",
    "brand": "Envofresh",
    "name": "Envoplast Envofresh 1500Mts - Unidad",
    "price": 23.9,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1396,
    "image": "",
    "brand": "Bompack",
    "name": "Envoplast Bompack 100Mts x 28cm - Unidad",
    "price": 3.18,
    "category": "Papeles de Envoltura",
    "badge": "Oferta"
  },
  {
    "id": 1397,
    "image": "",
    "brand": "Envofresh",
    "name": "Envoplast Envofresh 30Mts - Unidad",
    "price": 7.99,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1398,
    "image": "",
    "brand": "Papeles de Envoltura",
    "name": "Papel Tipo \\\"B\\\" 2KG - Unidad",
    "price": 4.94,
    "category": "Papeles de Envoltura",
    "badge": "Oferta"
  },
  {
    "id": 1399,
    "image": "",
    "brand": "Papeles de Envoltura",
    "name": "Papel Térmico - Paquete (500 Hjas)",
    "price": 53.5,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1400,
    "image": "",
    "brand": "Papeles de Envoltura",
    "name": "Rollos de Papel 100 Pliegos - Rollo",
    "price": 4.18,
    "category": "Papeles de Envoltura",
    "badge": "Oferta"
  },
  {
    "id": 1401,
    "image": "",
    "brand": "Papeles de Envoltura",
    "name": "Papel Parafinado Estampado 30x30 - Paquete (1000 Hjs)",
    "price": 43.86,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1402,
    "image": "",
    "brand": "Papeles de Envoltura",
    "name": "Papel Parafinado Wax - Paquete (500 Hjas)",
    "price": 43.5,
    "category": "Papeles de Envoltura"
  },
  {
    "id": 1403,
    "image": "",
    "brand": "Milenium",
    "name": "Pechuga Pavo Milenium - Kilo",
    "price": 7.33,
    "category": "Pechugas y Pavos"
  },
  {
    "id": 1404,
    "image": "",
    "brand": "Cumbre Fresca",
    "name": "Pechuga de Pavo Cumbre Fresca - Kilo",
    "price": 6.78,
    "category": "Pechugas y Pavos"
  },
  {
    "id": 1405,
    "image": "",
    "brand": "Ahulux",
    "name": "Pechuga de Pavo Ahulux - Kilo",
    "price": 6.34,
    "category": "Pechugas y Pavos"
  },
  {
    "id": 1406,
    "image": "",
    "brand": "Ahulux",
    "name": "Pechuga de Pavo Ahumada Ahulux - Kilo",
    "price": 6.75,
    "category": "Pechugas y Pavos"
  },
  {
    "id": 1407,
    "image": "",
    "brand": "Ahulux",
    "name": "Pechuga de Pavo c/Pimentón Ahulux - Kilo",
    "price": 5.83,
    "category": "Pechugas y Pavos"
  },
  {
    "id": 1408,
    "image": "",
    "brand": "Pechugas y Pavos",
    "name": "Pechuga de Pavo L' Prado - Kilo",
    "price": 7.54,
    "category": "Pechugas y Pavos"
  },
  {
    "id": 1409,
    "image": "",
    "brand": "Deli",
    "name": "Delicias d/Pollo t/Pavo Don Ramon - Kilo",
    "price": 4.33,
    "category": "Pechugas y Pavos"
  },
  {
    "id": 1410,
    "image": "",
    "brand": "Deli",
    "name": "Delicias d/Pollo t/Pavo Don Ramon 600g - Unidad",
    "price": 1.75,
    "category": "Pechugas y Pavos"
  },
  {
    "id": 1411,
    "image": "",
    "brand": "Fritz",
    "name": "Queso de Año Fritz (8x50g) - Caja",
    "price": 6.02,
    "category": "Quesos",
    "badge": "Oferta"
  },
  {
    "id": 1412,
    "image": "",
    "brand": "Kraft",
    "name": "Kraft American Slices 72 - Display",
    "price": 27.5,
    "category": "Quesos"
  },
  {
    "id": 1413,
    "image": "",
    "brand": "Mados",
    "name": "Queso de Año Mados 1 Kg - Unidad",
    "price": 8.14,
    "category": "Quesos"
  },
  {
    "id": 1414,
    "image": "",
    "brand": "Mados",
    "name": "Queso de Año Mados (12x200g) - Caja",
    "price": 39.26,
    "category": "Quesos"
  },
  {
    "id": 1415,
    "image": "",
    "brand": "Zedeño",
    "name": "Pecorino Zedeño - Unidad/Kilo",
    "price": 27.57,
    "category": "Quesos"
  },
  {
    "id": 1416,
    "image": "",
    "brand": "Montesano",
    "name": "Parmesano Montesano - Unidad/Kilo",
    "price": 33.06,
    "category": "Quesos"
  },
  {
    "id": 1417,
    "image": "",
    "brand": "Zedeño",
    "name": "Queso Paisa Zedeño - Unidad/Kilo",
    "price": 11.07,
    "category": "Quesos"
  },
  {
    "id": 1418,
    "image": "",
    "brand": "Quesos",
    "name": "Pecorino Doña Flora Sin Pimienta - Unidad/Kilo",
    "price": 25.05,
    "category": "Quesos"
  },
  {
    "id": 1419,
    "image": "",
    "brand": "Quesos",
    "name": "Pecorino Doña Flora Con Pimienta - Unidad/Kilo",
    "price": 28.34,
    "category": "Quesos"
  },
  {
    "id": 1420,
    "image": "",
    "brand": "Quesos",
    "name": "Queso de Año Palmira 900gr - Unidad",
    "price": 7.4,
    "category": "Quesos"
  },
  {
    "id": 1421,
    "image": "",
    "brand": "Quesos",
    "name": "Pecorino Palmira Entero - Unidad",
    "price": 20.35,
    "category": "Quesos"
  },
  {
    "id": 1422,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Frailes Pirineo - Unidad",
    "price": 21.98,
    "category": "Quesos"
  },
  {
    "id": 1423,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Amarillo Gouda Tachira Contreras - Unidad/Kilo",
    "price": 9.78,
    "category": "Quesos"
  },
  {
    "id": 1424,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Amarillo Sortilegio - Unidad/Kilo",
    "price": 14.24,
    "category": "Quesos"
  },
  {
    "id": 1425,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Gouda La Abuela - Unidad/Kilo",
    "price": 12.39,
    "category": "Quesos"
  },
  {
    "id": 1426,
    "image": "",
    "brand": "Quesos",
    "name": "Pecorino Sortilegio Entero - Unidad",
    "price": 25.06,
    "category": "Quesos"
  },
  {
    "id": 1427,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Amarillo Edam Palmira - Unidad/Kilo",
    "price": 11.91,
    "category": "Quesos"
  },
  {
    "id": 1428,
    "image": "",
    "brand": "Quesos",
    "name": "Pecorino Toscano Flor de Aragua - Unidad/Kilo",
    "price": 38.95,
    "category": "Quesos"
  },
  {
    "id": 1429,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Mozzarella Napolitana Flor de Aragua - Unidad/Kilo",
    "price": 14.9,
    "category": "Quesos"
  },
  {
    "id": 1430,
    "image": "",
    "brand": "Quesos",
    "name": "Queso de Año Roro (12x180g) - Caja",
    "price": 51.71,
    "category": "Quesos"
  },
  {
    "id": 1431,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Mozzarella La Andina - Unidad/Kilo",
    "price": 8.88,
    "category": "Quesos"
  },
  {
    "id": 1432,
    "image": "",
    "brand": "Fritz",
    "name": "Queso de Año Fritz (12x180gr) - Caja",
    "price": 42.22,
    "category": "Quesos"
  },
  {
    "id": 1433,
    "image": "",
    "brand": "Fritz",
    "name": "Queso de Año Fritz 1Kg Bolsa - Unidad",
    "price": 10.07,
    "category": "Quesos"
  },
  {
    "id": 1434,
    "image": "",
    "brand": "Quesos",
    "name": "Pecorino Mi Tierra (10und x 95g) - Paquete",
    "price": 23.42,
    "category": "Quesos"
  },
  {
    "id": 1435,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Crema Palmira 5Kg - Unidad",
    "price": 51.14,
    "category": "Quesos"
  },
  {
    "id": 1436,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Mozzarella Monay - Unidad/Kilo",
    "price": 9.5,
    "category": "Quesos"
  },
  {
    "id": 1437,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Cheddar Member 3Kg - Lata",
    "price": 36.9,
    "category": "Quesos"
  },
  {
    "id": 1438,
    "image": "",
    "brand": "Kraft",
    "name": "Parmesano Kraft 24oz - Unidad",
    "price": 29.5,
    "category": "Quesos"
  },
  {
    "id": 1439,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Gouda Vallecito - Unidad/Kilo",
    "price": 11.93,
    "category": "Quesos"
  },
  {
    "id": 1440,
    "image": "",
    "brand": "Zedeño",
    "name": "Queso Amarillo Zedeño Bufala - Unidad/Kilo",
    "price": 14.25,
    "category": "Quesos"
  },
  {
    "id": 1441,
    "image": "",
    "brand": "Quesos",
    "name": "Cheddys Normal para rebanar - Unidad/Kilo",
    "price": 12.2,
    "category": "Quesos"
  },
  {
    "id": 1442,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Amarillo Enmanuel - Unidad/Kilo",
    "price": 12.61,
    "category": "Quesos"
  },
  {
    "id": 1443,
    "image": "",
    "brand": "Quesos",
    "name": "Queso de Año 5Kg Resca - Unidad",
    "price": 41,
    "category": "Quesos"
  },
  {
    "id": 1444,
    "image": "",
    "brand": "Mados",
    "name": "Queso de Año 5Kg Mados - Unidad",
    "price": 39.87,
    "category": "Quesos"
  },
  {
    "id": 1445,
    "image": "",
    "brand": "Quesos",
    "name": "Parmesano Ducal Rallado 100gr - Unidad",
    "price": 5.51,
    "category": "Quesos",
    "badge": "Oferta"
  },
  {
    "id": 1446,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Paisa Palmira - Unidad/Kilo",
    "price": 9.44,
    "category": "Quesos"
  },
  {
    "id": 1447,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Paisa Bravone - Unidad/Kilo",
    "price": 10.23,
    "category": "Quesos"
  },
  {
    "id": 1448,
    "image": "",
    "brand": "Quesos",
    "name": "Queso de Año Quesaño (180x12) - Caja",
    "price": 28.57,
    "category": "Quesos"
  },
  {
    "id": 1449,
    "image": "",
    "brand": "Quesos",
    "name": "Pecorino Rallado Sortilegio - Unidad/Kilo",
    "price": 27.74,
    "category": "Quesos"
  },
  {
    "id": 1450,
    "image": "",
    "brand": "Quesos",
    "name": "Parmesano Don Pelayo - Unidad/Kilo",
    "price": 35.5,
    "category": "Quesos"
  },
  {
    "id": 1451,
    "image": "",
    "brand": "Quesos",
    "name": "Pecorino Toscano Rallado 100gr - Unidad",
    "price": 4.41,
    "category": "Quesos",
    "badge": "Oferta"
  },
  {
    "id": 1452,
    "image": "",
    "brand": "Quesos",
    "name": "Queso Mozzarella Don Pito - Unidad/Kilo",
    "price": 7.78,
    "category": "Quesos"
  },
  {
    "id": 1453,
    "image": "",
    "brand": "Salsas BBQ",
    "name": "BBQ Ideal (4x4 GL) - Bulto",
    "price": 33.2,
    "category": "Salsas BBQ"
  },
  {
    "id": 1454,
    "image": "",
    "brand": "La Viña",
    "name": "BBQ La Viña (12x397g) - Caja",
    "price": 18.35,
    "category": "Salsas BBQ"
  },
  {
    "id": 1455,
    "image": "",
    "brand": "McCormick",
    "name": "BBQ McCormick Galón - Unidad",
    "price": 20.15,
    "category": "Salsas BBQ"
  },
  {
    "id": 1456,
    "image": "",
    "brand": "Fritz",
    "name": "BBQ Fritz (290x12) - Caja",
    "price": 25.83,
    "category": "Salsas BBQ"
  },
  {
    "id": 1457,
    "image": "",
    "brand": "McCormick",
    "name": "BBQ McCormick (24x230g) - Caja",
    "price": 69.49,
    "category": "Salsas BBQ"
  },
  {
    "id": 1458,
    "image": "",
    "brand": "Salsas BBQ",
    "name": "BBQ Bolsa Viña (4x3.85) - Bulto",
    "price": 27.7,
    "category": "Salsas BBQ"
  },
  {
    "id": 1459,
    "image": "",
    "brand": "La Viña",
    "name": "BBQ La Viña (2KG x 6) - Bulto",
    "price": 25.8,
    "category": "Salsas BBQ"
  },
  {
    "id": 1460,
    "image": "",
    "brand": "Fritz",
    "name": "BBQ Fritz (4x4 GL) - Bulto",
    "price": 63.16,
    "category": "Salsas BBQ"
  },
  {
    "id": 1461,
    "image": "",
    "brand": "Fritz",
    "name": "BBQ Fritz (6x2KG) - Bulto",
    "price": 46.36,
    "category": "Salsas BBQ"
  },
  {
    "id": 1462,
    "image": "",
    "brand": "Fritz",
    "name": "BBQ Deli Fritz (4x3.5KG) - Bulto",
    "price": 37.06,
    "category": "Salsas BBQ"
  },
  {
    "id": 1463,
    "image": "",
    "brand": "La Viña",
    "name": "BBQ La Viña (6x1KG) - Bulto",
    "price": 19.92,
    "category": "Salsas BBQ"
  },
  {
    "id": 1464,
    "image": "",
    "brand": "Fritz",
    "name": "BBQ Hot Fritz (12x930g) - Caja",
    "price": 56.14,
    "category": "Salsas BBQ"
  },
  {
    "id": 1465,
    "image": "",
    "brand": "Sweet Baby Ray's",
    "name": "BBQ Sauce Sweet Baby Ray's Galón (4.5KG) - Unidad",
    "price": 40,
    "category": "Salsas BBQ"
  },
  {
    "id": 1466,
    "image": "",
    "brand": "Salsas BBQ",
    "name": "BBQ Roro (12x300ml) - Caja",
    "price": 18.53,
    "category": "Salsas BBQ"
  },
  {
    "id": 1467,
    "image": "",
    "brand": "Fritz",
    "name": "BBQ Deli Fritz (6x1K) - Bulto",
    "price": 19,
    "category": "Salsas BBQ"
  },
  {
    "id": 1468,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa de Tomate Fritz (12x397g) - Caja",
    "price": 15.92,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1469,
    "image": "",
    "brand": "Coma",
    "name": "Salsa Coma Ketchup (12x1KG) - Caja",
    "price": 43.26,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1470,
    "image": "",
    "brand": "Coma",
    "name": "Salsa Base Coma (4x4) - Bulto",
    "price": 36.36,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1471,
    "image": "",
    "brand": "Heinz",
    "name": "Ketchup Heinz Sachet 10G (396 unds) - Caja",
    "price": 33.61,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1472,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Salsa de Tomate Los Lirios Bolsa (4x4 Gal) - Bulto",
    "price": 14.9,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1473,
    "image": "",
    "brand": "La Viña",
    "name": "Salsa La Viña Bolsa (4x4) Ketchup - Bulto",
    "price": 23.86,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1474,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Salsa Ideal (4x4) - Bulto",
    "price": 30.47,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1475,
    "image": "",
    "brand": "Heinz",
    "name": "Ketchup Volpack Heinz 12.7KG - Unidad",
    "price": 54.06,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1476,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Pasta de Tomate (4und x 4KG) - Bulto",
    "price": 63.96,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1477,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Pasta de Tomate (12und x 1KG) - Bulto",
    "price": 35.14,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1478,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Pasta de Tomate (12und x 500gr) - Bulto",
    "price": 35.04,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1479,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Pasta de Tomate (24und x 200gr) - Bulto",
    "price": 34.07,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1480,
    "image": "",
    "brand": "Fritz",
    "name": "Base Fritz Bolsa (6x1KG) - Bulto",
    "price": 19.7,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1481,
    "image": "",
    "brand": "Heinz",
    "name": "Salsa Ketchup Heinz 397gr (16und plástico) - Caja",
    "price": 38.98,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1482,
    "image": "",
    "brand": "Heinz",
    "name": "Salsa Ketchup Heinz 397gr (24und vidrio) - Caja",
    "price": 51.41,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1483,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Doypack Fritz (24x165g) - Caja",
    "price": 16.58,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1484,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Ketchup Doña Nelly (5und x 4KG) - Bulto",
    "price": 17.06,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1485,
    "image": "",
    "brand": "Fritz",
    "name": "Base Fritz (4x4) - Bulto",
    "price": 36.9,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1486,
    "image": "",
    "brand": "La Viña",
    "name": "Salsa Ketchup La Viña (1KG x 6 Bolsa) - Bulto",
    "price": 16.32,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1487,
    "image": "",
    "brand": "Tomatico",
    "name": "Salsa Base Tomatico Viña (4x4) - Bulto",
    "price": 17.24,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1488,
    "image": "",
    "brand": "Paraíso",
    "name": "Salsa de Tomate Paraíso (4x4) - Bulto",
    "price": 17.05,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1489,
    "image": "",
    "brand": "La Ideal",
    "name": "Salsa La Ideal Ketchup (1KG x 6unds) - Bulto",
    "price": 22.99,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1490,
    "image": "",
    "brand": "Venato",
    "name": "Pasta de Tomate Venato (12x375g) - Caja",
    "price": 31.11,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1491,
    "image": "",
    "brand": "Fritz",
    "name": "Salsa Tomate Doypack Fritz (6x930g) - Caja",
    "price": 20.02,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1492,
    "image": "",
    "brand": "Coma",
    "name": "Salsa Coma Ketchup Plástico (4x4) - Bulto",
    "price": 47.18,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1493,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Ketchup Members Galón - Unidad",
    "price": 23,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1494,
    "image": "",
    "brand": "Mayotropi",
    "name": "Salsa Mayotropi (4x4 und) - Bulto",
    "price": 35.8,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1495,
    "image": "",
    "brand": "Tomatico",
    "name": "Salsa Tomatico (12 x 397gr) - Caja",
    "price": 14.01,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1496,
    "image": "",
    "brand": "Coma",
    "name": "Salsa Base Coma (12 x 1KG) - Caja",
    "price": 35.82,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1497,
    "image": "",
    "brand": "Salsas de Tomate",
    "name": "Salsa para Pizza Fragua 4KG - Lata",
    "price": 21.93,
    "category": "Salsas de Tomate"
  },
  {
    "id": 1498,
    "image": "",
    "brand": "Salsas Oscuras y Ajo",
    "name": "Salsa Inglesa Avila (4x4 GL) - Bulto",
    "price": 25.7,
    "category": "Salsas Oscuras y Ajo"
  },
  {
    "id": 1499,
    "image": "",
    "brand": "Salsas Oscuras y Ajo",
    "name": "Salsa Ajo Avila (4x4 GL) - Bulto",
    "price": 25.7,
    "category": "Salsas Oscuras y Ajo"
  },
  {
    "id": 1500,
    "image": "",
    "brand": "Salsas Oscuras y Ajo",
    "name": "Salsa Soya Avila (4x4) - Bulto",
    "price": 25.7,
    "category": "Salsas Oscuras y Ajo"
  },
  {
    "id": 1501,
    "image": "",
    "brand": "La Viña",
    "name": "Salsa Inglesa La Viña (4x4) - Bulto",
    "price": 18.84,
    "category": "Salsas Oscuras y Ajo"
  },
  {
    "id": 1502,
    "image": "",
    "brand": "Salsas Oscuras y Ajo",
    "name": "Salsa Soya China Viña (4x4 GL) - Bulto",
    "price": 18.26,
    "category": "Salsas Oscuras y Ajo"
  },
  {
    "id": 1503,
    "image": "",
    "brand": "Da Gusto",
    "name": "Salsa Ajo Da Gusto (4x4) - Bulto",
    "price": 23.67,
    "category": "Salsas Oscuras y Ajo"
  },
  {
    "id": 1504,
    "image": "",
    "brand": "Salsas Oscuras y Ajo",
    "name": "Salsa Soya Viña (4x3.85 GL) - Bulto",
    "price": 18.84,
    "category": "Salsas Oscuras y Ajo"
  },
  {
    "id": 1505,
    "image": "",
    "brand": "Salsas Oscuras y Ajo",
    "name": "Salsa de Ajo Viña Galón (4x4) - Bulto",
    "price": 18.84,
    "category": "Salsas Oscuras y Ajo"
  },
  {
    "id": 1506,
    "image": "",
    "brand": "Semillas y Especias",
    "name": "Quinoa Real 500G - Unidad",
    "price": 7.18,
    "category": "Semillas y Especias"
  },
  {
    "id": 1507,
    "image": "",
    "brand": "Semillas y Especias",
    "name": "Semillas de Chía 500G - Unidad",
    "price": 9.61,
    "category": "Semillas y Especias"
  },
  {
    "id": 1508,
    "image": "",
    "brand": "La Viña",
    "name": "Vainilla Viña GL (4x3.8 KG) - Bulto",
    "price": 17.8,
    "category": "Semillas y Especias"
  },
  {
    "id": 1509,
    "image": "",
    "brand": "Semillas y Especias",
    "name": "Panko El Molino 5KG - Unidad",
    "price": 34.09,
    "category": "Semillas y Especias"
  },
  {
    "id": 1510,
    "image": "",
    "brand": "Semillas y Especias",
    "name": "Sal Monte Blanco (25und x 1KG) - Bulto",
    "price": 17.5,
    "category": "Semillas y Especias"
  },
  {
    "id": 1511,
    "image": "",
    "brand": "Semillas y Especias",
    "name": "Sal Bahía (25und x 1KG) - Bulto",
    "price": 20.52,
    "category": "Semillas y Especias"
  },
  {
    "id": 1512,
    "image": "",
    "brand": "Sopas y Cubitos",
    "name": "Cubito de Pollo Iberia (30paq x 8und x 96g) - Bulto",
    "price": 12.5,
    "category": "Sopas y Cubitos"
  },
  {
    "id": 1513,
    "image": "",
    "brand": "Sopas y Cubitos",
    "name": "Maggi Caldo Cubito (250 Tabletas) - Display",
    "price": 46.81,
    "category": "Sopas y Cubitos"
  },
  {
    "id": 1514,
    "image": "",
    "brand": "Sopas y Cubitos",
    "name": "Maggi Sopa de Pollo Fideos (12x65G) - Caja",
    "price": 15.82,
    "category": "Sopas y Cubitos"
  },
  {
    "id": 1515,
    "image": "",
    "brand": "Sopas y Cubitos",
    "name": "Sopa de Pollo con Fideos Iberia (12x60G) - Caja",
    "price": 12.49,
    "category": "Sopas y Cubitos"
  },
  {
    "id": 1516,
    "image": "",
    "brand": "Tomates Pelados y Passata",
    "name": "Passata Molisana (12x690g) - Caja",
    "price": 54.94,
    "category": "Tomates Pelados y Passata"
  },
  {
    "id": 1517,
    "image": "",
    "brand": "Tomates Pelados y Passata",
    "name": "Pasta de Tomate Tigo (12x880gr) - Caja",
    "price": 52.33,
    "category": "Tomates Pelados y Passata"
  },
  {
    "id": 1518,
    "image": "",
    "brand": "Tomates Pelados y Passata",
    "name": "Passata Risscosa (12x680gr) - Caja",
    "price": 36.47,
    "category": "Tomates Pelados y Passata"
  },
  {
    "id": 1519,
    "image": "",
    "brand": "Tomates Pelados y Passata",
    "name": "Tomate Pelado Fragua (12x800g) - Caja",
    "price": 44,
    "category": "Tomates Pelados y Passata"
  },
  {
    "id": 1520,
    "image": "",
    "brand": "Tomates Pelados y Passata",
    "name": "Tomate Pelado Artesano (800g x 12) - Caja",
    "price": 44,
    "category": "Tomates Pelados y Passata"
  },
  {
    "id": 1521,
    "image": "",
    "brand": "Tomates Pelados y Passata",
    "name": "Tomate Pelado Molisana 2.5KG - Lata",
    "price": 12.99,
    "category": "Tomates Pelados y Passata"
  },
  {
    "id": 1522,
    "image": "",
    "brand": "Tomates Pelados y Passata",
    "name": "Tomate Pelado Fragua 2.5KG - Lata",
    "price": 13.26,
    "category": "Tomates Pelados y Passata"
  },
  {
    "id": 1523,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Verde Grande - Docena",
    "price": 6.25,
    "category": "Utensilios"
  },
  {
    "id": 1524,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Verde Pequeño - Docena",
    "price": 6.25,
    "category": "Utensilios"
  },
  {
    "id": 1525,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Blanco Grande - Docena",
    "price": 6.25,
    "category": "Utensilios"
  },
  {
    "id": 1526,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Blanco Pequeño - Docena",
    "price": 6.25,
    "category": "Utensilios"
  },
  {
    "id": 1527,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Amarillo Grande - Docena",
    "price": 6.25,
    "category": "Utensilios"
  },
  {
    "id": 1528,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Amarillo Pequeño - Docena",
    "price": 6.25,
    "category": "Utensilios"
  },
  {
    "id": 1529,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Rojo Grande - Docena",
    "price": 6.25,
    "category": "Utensilios"
  },
  {
    "id": 1530,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Rojo Pequeño - Docena",
    "price": 6.25,
    "category": "Utensilios"
  },
  {
    "id": 1531,
    "image": "",
    "brand": "Utensilios",
    "name": "Dispensador Transparente Grande - Docena",
    "price": 9.98,
    "category": "Utensilios"
  },
  {
    "id": 1532,
    "image": "",
    "brand": "Utensilios",
    "name": "Espátula Parrilla - Unidad",
    "price": 5.21,
    "category": "Utensilios"
  },
  {
    "id": 1533,
    "image": "",
    "brand": "Utensilios",
    "name": "Pinzas Lisa Grande - Unidad",
    "price": 4.19,
    "category": "Utensilios"
  },
  {
    "id": 1534,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Kit Negro 3 Pzas - Bulto (150 Unds)",
    "price": 14.77,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1535,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Cucharillas Sopera - Bulto (1000 Unds)",
    "price": 17.44,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1536,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Cuchillo Mega - Bulto (1000 Unds)",
    "price": 13.37,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1537,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Kit Negro 2 Pzas - Bulto (150 Unds)",
    "price": 9.88,
    "category": "Vasos y Cubiertos",
    "badge": "Oferta"
  },
  {
    "id": 1538,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos Maxiplast 227 (20x30) - Bulto (600 Unds)",
    "price": 41.77,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1539,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vaso 17 Maxiplast (50x100) - Bulto (5000 Unds)",
    "price": 43.17,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1540,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos 27 Maxiplast (50x100) - Bulto (5000 Unds)",
    "price": 46.42,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1541,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos N° 57 Maxiplas (25x100) - Bulto (2500 Unds)",
    "price": 47.07,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1542,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos N° 67 Maxiplas (25x100) - Bulto (2500 Unds)",
    "price": 42.42,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1543,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos N° 77 Maxiplas (25x100) - Bulto (2500 Unds)",
    "price": 43.07,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1544,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos N° 89 Maxiplas (20x50) - Bulto (1000 Unds)",
    "price": 22.22,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1545,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos N° 107 Maxiplas (20x50) - Bulto (1000 Unds)",
    "price": 24.45,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1546,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos N° 127 Maxiplas (20x50) - Bulto (1000 Unds)",
    "price": 32.93,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1547,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos N° 147 Maxiplas (20x50) - Bulto (1000 Unds)",
    "price": 42.41,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1548,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vaso 167 Maxuplas (20x50) - Bulto (1000 Unds)",
    "price": 45.98,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1549,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos Zupla 107 (20x50) - Bulto (1000 Unds)",
    "price": 30.3,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1550,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vasos Zupla 127 (20x50) - Bulto (1000 Unds)",
    "price": 28.88,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1551,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Vaso 147 Zupla (20x50) - Bulto (1000 Unds)",
    "price": 42.04,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1552,
    "image": "",
    "brand": "Vasos y Cubiertos",
    "name": "Pitillo Zupla 10 1/2 (25x150) - Bulto (3750 Unds)",
    "price": 38.67,
    "category": "Vasos y Cubiertos"
  },
  {
    "id": 1553,
    "image": "",
    "brand": "Fritz",
    "name": "Vinagre Fritz (4x3.78LT) - Bulto",
    "price": 17.21,
    "category": "Vinagres"
  },
  {
    "id": 1554,
    "image": "",
    "brand": "Fritz",
    "name": "Vinagre Fritz (12x1LT) - Caja",
    "price": 15.98,
    "category": "Vinagres"
  },
  {
    "id": 1555,
    "image": "",
    "brand": "Fritz",
    "name": "Vinagre Fritz (12x500ml) - Caja",
    "price": 11.49,
    "category": "Vinagres"
  },
  {
    "id": 1556,
    "image": "",
    "brand": "La Viña",
    "name": "Vinagre La Viña Galón (4x4) - Bulto",
    "price": 17.39,
    "category": "Vinagres"
  },
  {
    "id": 1557,
    "image": "",
    "brand": "La Viña",
    "name": "Vinagre La Viña (12x1LT) - Caja",
    "price": 13.23,
    "category": "Vinagres"
  },
  {
    "id": 1558,
    "image": "",
    "brand": "Vinagres",
    "name": "Vinagre Viña (12x500ml) - Caja",
    "price": 13.39,
    "category": "Vinagres"
  },
  {
    "id": 1559,
    "image": "",
    "brand": "Vinagres",
    "name": "Vinagre Avila (12x500ml) - Caja",
    "price": 10.05,
    "category": "Vinagres"
  },
  {
    "id": 1560,
    "image": "",
    "brand": "Vinagres",
    "name": "Vinagre Avila Galón - Unidad",
    "price": 24.4,
    "category": "Vinagres"
  },
  {
    "id": 1561,
    "image": "",
    "brand": "Coma",
    "name": "Vinagre Coma (4x3.5LTS) - Bulto",
    "price": 18.29,
    "category": "Vinagres"
  }
];

export const products: Product[] = [...baseProducts, ...catalogProducts];

export const PER_PAGE = 24;

export const CATEGORIES = ['Todos', ...Array.from(new Set(products.map(p => p.category)))].sort();
