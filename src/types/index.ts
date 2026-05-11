export interface Product {
  id: number;
  image: string;
  hoverImage?: string;
  brand: string;
  name: string;
  price: number;
  badge?: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Promo {
  id?: number;
  title: string;
  subtitle: string;
  color?: string;
  link?: string;
  image?: string;
}

export interface HeroSlide {
  image: string;
  title: string;
  highlight: string;
  eyebrow: string;
  description: string;
}
