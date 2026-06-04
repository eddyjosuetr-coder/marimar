import { Truck, Shield, Package, Award } from 'lucide-react'

const STATS = [
  {
    icon: Package,
    stat: '500+',
    title: 'Productos',
    desc: 'Catálogo actualizado',
  },
  {
    icon: Award,
    stat: '50+',
    title: 'Marcas Premium',
    desc: 'Fritz · Heinz · La Viña',
  },
  {
    icon: Truck,
    stat: '24/7',
    title: 'Delivery Nacional',
    desc: 'Toda Venezuela',
  },
  {
    icon: Shield,
    stat: '100%',
    title: 'Pago Seguro',
    desc: 'Zelle · Pago Móvil · Efectivo',
  },
]

export function TrustBar() {
  return (
    <section className="bg-gradient-to-r from-orange-50 via-white to-orange-50 border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1">
                  <p className="text-lg md:text-xl font-extrabold text-[#FF6B00] leading-none">{item.stat}</p>
                  <p className="text-xs md:text-sm font-bold text-gray-800 truncate">{item.title}</p>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 truncate mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
