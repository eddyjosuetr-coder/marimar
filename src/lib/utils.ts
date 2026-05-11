import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('es-VE', { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 2 
  }).format(price)
}

export function scrollToCatalog() {
  const el = document.getElementById('catalogo')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
