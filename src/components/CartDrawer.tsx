import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import type { CartItem } from '@/types'
import { formatPrice } from '@/lib/utils'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  cartTotal: number
  updateQuantity: (id: number, delta: number) => void
  removeFromCart: (id: number) => void
}

export function CartDrawer({ isOpen, onClose, cart, cartTotal, updateQuantity, removeFromCart }: CartDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-[#FAFAFA]">
          <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            Tu Carrito <span className="bg-[#FF6B00] text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">
                <ShoppingCartIcon className="w-10 h-10 text-[#FF6B00] opacity-50" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500 mt-1">¡Agrega algunos productos para comenzar!</p>
              </div>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-[#1A1A1A] text-white rounded-full font-semibold hover:bg-black transition-colors">
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                  <div className="w-20 h-20 bg-[#FAFAFA] rounded-lg p-2 flex-shrink-0">
                    {item.image ? (
                       <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-300">Sin img</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{item.brand}</p>
                      <h4 className="text-sm font-semibold text-gray-800 leading-tight mt-0.5 line-clamp-2">{item.name}</h4>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[#FF6B00] font-extrabold">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 bg-[#FAFAFA] rounded-lg p-1 border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-[#FF6B00] disabled:opacity-50" disabled={item.quantity <= 1}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-[#FF6B00]">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="self-start p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 md:p-6 border-t border-gray-100 bg-white">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Envío estimado</span>
                <span className="text-green-600 font-semibold">Gratis</span>
              </div>
              <div className="h-px bg-gray-100 w-full" />
              <div className="flex justify-between text-lg font-extrabold text-gray-800">
                <span>Total</span>
                <span className="text-[#FF6B00]">{formatPrice(cartTotal)}</span>
              </div>
            </div>
            <button className="w-full bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center gap-2 group">
              Proceder al Pago <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
