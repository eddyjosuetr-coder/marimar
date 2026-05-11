import { Truck, CreditCard, Headphones, ShoppingCart } from 'lucide-react'

export function TrustBar() {
  const items = [
    { icon: Truck, title: 'Delivery Nacional', desc: 'Toda Venezuela' },
    { icon: CreditCard, title: 'Pago Seguro', desc: 'Múltiples métodos' },
    { icon: Headphones, title: 'Soporte 24/7', desc: 'Atención directa' },
    { icon: ShoppingCart, title: 'Mayorista', desc: 'Precios al por mayor' },
  ]
  return (
    <section className="bg-[#FAFAFA] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-[#FF6B00]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-bold text-gray-800 truncate">{item.title}</p>
                <p className="text-[11px] md:text-xs text-gray-500 truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
