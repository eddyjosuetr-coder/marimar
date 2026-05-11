import type { Promo } from '@/types'

export function PromoRow({ promos }: { promos: Promo[] }) {
  if (promos.length === 0) return null
  return (
    <section className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {promos.map(p => (
          <a key={p.id || p.title} href={p.link || '#'} className="group relative rounded-xl overflow-hidden aspect-[3/4] block shadow-sm border border-gray-100">
            {p.image ? (
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <div className={`w-full h-full ${p.color || 'bg-gray-200'} transition-transform duration-500 group-hover:scale-105`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col justify-end">
              <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-0.5">{p.title}</h3>
              <p className="text-white/80 text-[11px] md:text-xs font-medium leading-tight line-clamp-2">{p.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
