export interface Product {
  id: number;
  image: string;
  hoverImage?: string;
  brand: string;
  name: string;
  /** En USD. Vale 0 cuando `priceOnRequest` está activo: no es un precio real. */
  price: number;
  /**
   * El producto se muestra en el catálogo pero todavía no tiene precio de
   * lista. La ficha pide consultar por WhatsApp en vez de mostrar una cifra,
   * y el producto no puede agregarse al carrito: mejor sin precio que con
   * uno inventado.
   */
  priceOnRequest?: boolean;
  /**
   * Charcutería: se vende al peso. `price` es el precio por KG y la cantidad
   * del carrito se cuenta en GRAMOS, desde 100 gr y de cien en cien.
   */
  soldByWeight?: boolean;
  /**
   * Combos: cuántas salsas elige el cliente. Las opciones son las salsas
   * detalladas que existen en el catálogo, nunca una lista escrita a mano.
   */
  comboSalsas?: number;
  /**
   * El mismo producto en varios colores: una sola ficha y el cliente elige.
   * El primero es el que se enseña de entrada, y al elegir otro su foto pasa
   * a ser la principal. Cuatro fichas idénticas cambiando una palabra ocupan
   * la cuadrícula sin decir nada nuevo.
   */
  colores?: { nombre: string; imagen: string }[];
  /** Qué es el producto y para qué sirve. Se muestra en la vista rápida. */
  description?: string;
  /**
   * Precio anterior, sólo cuando el producto está en oferta: se muestra
   * tachado al lado del precio vigente. Lo pone el panel del dueño, nunca
   * el catálogo generado.
   */
  listPrice?: number;
  badge?: string;
  category: string;
}

export interface CartItem extends Product {
  /**
   * Identifica la línea del pedido. Es el id del producto, salvo en los
   * combos, donde incluye las salsas elegidas: el mismo combo con salsas
   * distintas son dos líneas.
   */
  lineId: string;
  /** Unidades, o gramos cuando `soldByWeight` está activo. */
  quantity: number;
  /** Salsas elegidas para un combo, en el orden en que se eligieron. */
  salsas?: string[];
  /** Color elegido, en los productos que se venden en varios. */
  variante?: string;
}


export interface HeroSlide {
  title: string;
  highlight: string;
  eyebrow: string;
  description: string;
  /** Cifras del pie de la portada. Se generan desde el catálogo. */
  stats?: { value: string; label: string }[];
}
