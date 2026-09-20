import { useEffect, useRef } from 'react'

/**
 * Revela un elemento al entrar en el viewport.
 *
 * El elemento debe llevar `data-reveal` (los estilos viven en App.css).
 * Al intersectar se cambia a `data-reveal="shown"` una sola vez.
 * Si el usuario pidió movimiento reducido, se muestra de inmediato.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  /** Fracción visible necesaria para disparar el revelado. */
  threshold?: number
  /** Margen extra alrededor del viewport. */
  rootMargin?: string
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Sin IntersectionObserver o con movimiento reducido: mostrar sin animar.
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-reveal', 'shown')
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-reveal', 'shown')
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: options?.threshold ?? 0.12,
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin])

  return ref
}
