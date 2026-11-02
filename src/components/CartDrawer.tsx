import React from 'react';
import { X, Trash2, Calendar, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, DeliverySlot } from '../types/bakery';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  selectedDeliveryDate: string;
  onSelectDeliveryDate: (dateStr: string) => void;
  slots: DeliverySlot[];
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  selectedDeliveryDate,
  onSelectDeliveryDate,
  slots,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 20 || subtotal === 0 ? 0 : 4.50;
  const total = subtotal + deliveryFee;

  const selectedSlot = slots.find((s) => s.dateStr === selectedDeliveryDate) || slots[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] text-[#241D17] h-full shadow-2xl flex flex-col border-l border-[#E5DACB] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8DEC8] bg-[#F4EDE3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#B85D19]" />
            <h3 className="font-display font-semibold text-lg text-[#1F1710]">
              Your Morning Drop Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#796755] hover:text-[#1F1710] hover:bg-[#EAE0D3] rounded-full transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Date Selection in Cart */}
        <div className="px-6 py-3.5 bg-[#F1E8DC] border-b border-[#E2D5C4]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#5A4839] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B85D19]" />
              <span>Target Delivery Date:</span>
            </span>
            <span className="text-[#847262] text-[11px]">7:00am – 10:30am</span>
          </div>
          <select
            value={selectedDeliveryDate}
            onChange={(e) => onSelectDeliveryDate(e.target.value)}
            className="w-full bg-white border border-[#D5C5B1] rounded-lg px-3 py-1.5 text-xs font-medium text-[#201913] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
          >
            {slots.map((s) => (
              <option key={s.dateStr} value={s.dateStr}>
                {s.dayOfWeek}, {s.displayDate} ({s.spotsRemaining} loaf spots open)
              </option>
            ))}
          </select>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#EFE6D8] flex items-center justify-center text-[#9E8E7E] mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-display font-semibold text-lg text-[#201913]">
                Your bread bag is empty
              </h4>
              <p className="text-xs text-[#716151] mt-1 max-w-xs">
                Explore our signature organic sourdough loaves or craft a custom loaf in our baker's lab.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 bg-[#B85D19] text-white text-xs font-semibold rounded-lg hover:bg-[#A04E12] transition-colors"
              >
                Browse Hearth Breads
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-xl border border-[#E3D6C5] flex gap-3 items-start justify-between"
              >
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-sm text-[#201913]">
                    {item.title}
                  </h4>
                  
                  {item.details && (
                    <div className="text-[11px] text-[#716151] mt-1 space-y-0.5">
                      <div className="text-[#A36024] font-medium">{item.details.flourName}</div>
                      <div>
                        {item.details.sizeName} ({item.details.weight}) · {item.details.slicingName}
                      </div>
                      <div>Crust: {item.details.crustName}</div>
                      {item.details.inclusions && item.details.inclusions.length > 0 && (
                        <div className="text-[#3F763C]">
                          Inclusions: {item.details.inclusions.join(', ')}
                        </div>
                      )}
                      {item.details.specialNotes && (
                        <div className="italic text-[#877767]">
                          Note: "{item.details.specialNotes}"
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-2.5 flex items-center gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#D5C5B1] rounded-md bg-[#FAF7F2] overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-[#524436] hover:bg-[#EAE1D3]"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-[#201913]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-[#524436] hover:bg-[#EAE1D3]"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-[#1F1710] tabular-nums">
                      ${(item.unitPrice * item.quantity).toFixed(2)} AUD
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 text-[#9E8E7E] hover:text-[#B85D19] transition-colors"
                  aria-label={`Remove ${item.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Totals */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E8DEC8] bg-[#F5EEE4] space-y-3.5">
            <div className="space-y-1.5 text-xs text-[#635345]">
              <div className="flex justify-between">
                <span>Bread & Pantry Subtotal:</span>
                <span className="font-semibold tabular-nums text-[#201913]">${subtotal.toFixed(2)} AUD</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Adelaide Foothills Morning Drop:</span>
                <span className="font-semibold tabular-nums text-[#201913]">
                  {deliveryFee === 0 ? (
                    <span className="text-[#3F763C]">FREE (Order &ge; $20)</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)} AUD`
                  )}
                </span>
              </div>
              {subtotal < 20 && (
                <div className="text-[11px] text-[#A66324]">
                  Add ${(20 - subtotal).toFixed(2)} more for free morning porch drop!
                </div>
              )}
              <div className="pt-2 border-t border-[#E0D2C0] flex justify-between text-base font-bold text-[#1E1710]">
                <span>Total:</span>
                <span className="font-display tabular-nums">${total.toFixed(2)} AUD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-[#B85D19] hover:bg-[#A04E12] active:scale-[0.98] text-white font-medium text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A6959]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3F763C]" />
              <span>Baked fresh dawn of delivery · Porch hook/basket drop</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
