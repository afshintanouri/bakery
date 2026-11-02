import React from 'react';
import { CheckCircle2, Calendar, MapPin, Sparkles, Clock, Flame, Download, X } from 'lucide-react';
import { PlacedOrder } from '../types/bakery';

interface OrderConfirmationModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-[#FAF7F2] text-[#241D17] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E3D6C5] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-[#2D241C] text-[#FAF7F2] p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#BFAF9F] hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-[#B85D19] mx-auto flex items-center justify-center text-white mb-3 shadow-md">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#D8B48D]">
            Order #{order.orderId} Confirmed
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-white mt-1">
            We are preparing your wild batch!
          </h2>
          <p className="text-xs sm:text-sm text-[#D8CBBC] mt-1.5 max-w-md mx-auto">
            Thank you, {order.customer.name}. Your organic loaves are locked into our hearth schedule.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Delivery Snapshot */}
          <div className="bg-white p-4 rounded-xl border border-[#E3D6C5] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase text-[#7D6B5A] flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#B85D19]" />
                <span>Delivery Morning</span>
              </div>
              <div className="font-semibold text-sm text-[#1F1710]">
                {order.estimatedDeliveryWindow}
              </div>
              <div className="text-xs text-[#3F763C] font-medium mt-0.5">
                Porch Drop: 7:00 AM – 10:30 AM
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase text-[#7D6B5A] flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#B85D19]" />
                <span>Delivery Spot</span>
              </div>
              <div className="font-semibold text-sm text-[#1F1710]">
                {order.customer.streetAddress}, {order.customer.suburb} {order.customer.postcode}
              </div>
              <div className="text-xs text-[#736252] mt-0.5 italic">
                "{order.customer.porchInstructions}"
              </div>
            </div>
          </div>

          {/* 4-Stage Fermentation & Delivery Tracker */}
          <div className="bg-[#F5EFEB] p-4 sm:p-5 rounded-xl border border-[#E0D2C0]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6F5E4E] mb-3">
              Live Sourdough Fermentation Timeline
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#3F763C] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <div className="text-xs font-semibold text-[#1F1710]">Stage 1: Flour Milling & Starter Feeding</div>
                  <div className="text-[11px] text-[#69584A]">45-year mother culture Matilda fed with Barossa whole rye; grains measured.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#B85D19] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <div className="text-xs font-semibold text-[#1F1710]">Stage 2: 36-Hour Cold Wild Retardation (Active)</div>
                  <div className="text-[11px] text-[#69584A]">Slow cold fermentation at 4°C to develop wild flavor and gentle digestibility.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#D6C6B4] text-[#635345] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <div className="text-xs font-semibold text-[#665749]">Stage 3: Stone Hearth Dawn Bake (5:00 AM)</div>
                  <div className="text-[11px] text-[#806E5E]">Razor-scored and baked on firebrick stone deck with generous steam.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#D6C6B4] text-[#635345] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <div className="text-xs font-semibold text-[#665749]">Stage 4: Adelaide Foothills Porch Run (7:00 AM – 10:30 AM)</div>
                  <div className="text-[11px] text-[#806E5E]">Delivered warm in breathable kraft wrap to your designated doorstep spot.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Order Breakdown */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6F5E4E] mb-2">
              Itemized Loaves & Table Goods
            </div>
            <div className="divide-y divide-[#EAE0D3] bg-white rounded-xl border border-[#E3D6C5] overflow-hidden">
              {order.items.map((item) => (
                <div key={item.id} className="p-3 text-xs flex justify-between items-start gap-3">
                  <div>
                    <span className="font-semibold text-[#201913]">{item.quantity}× {item.title}</span>
                    {item.details && (
                      <div className="text-[11px] text-[#716151] mt-0.5">
                        {item.details.flourName} · {item.details.sizeName} ({item.details.weight}) · {item.details.slicingName}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold tabular-nums text-[#201913] shrink-0">
                    ${(item.unitPrice * item.quantity).toFixed(2)} AUD
                  </span>
                </div>
              ))}
              <div className="p-3 bg-[#FAF5EE] text-xs flex justify-between font-bold text-[#1F1710]">
                <span>Total Paid ({order.customer.paymentMethod === 'porch-cash' ? 'Cash on Porch' : 'Card'}):</span>
                <span className="tabular-nums font-display text-sm">${order.total.toFixed(2)} AUD</span>
              </div>
            </div>
          </div>

          {/* Sourdough Care Guide */}
          <div className="p-4 bg-[#F2EAE0] rounded-xl border border-[#DFD1BF] text-xs text-[#5C4C3E] space-y-1.5">
            <div className="font-semibold text-[#201913] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#B85D19]" />
              <span>Baker's Care & Reviving Note</span>
            </div>
            <p className="leading-relaxed">
              <strong>Day 1–3:</strong> Keep loaf cut-side down on a wooden bread board or inside our linen bread bag. Never store genuine sourdough in plastic!
            </p>
            <p className="leading-relaxed">
              <strong>Day 4+:</strong> To restore that bakery-crisp crust, splash the uncut loaf with a few droplets of cold water and place in a preheated 200°C oven for 6–8 minutes. The crust will sing like it just came out of our stone deck!
            </p>
          </div>

        </div>

        {/* Action Button */}
        <div className="p-4 bg-[#F4EDE3] border-t border-[#E8DEC8] flex items-center justify-between">
          <span className="text-xs text-[#7B6A5A]">
            Confirmation email sent to {order.customer.email}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#2D241C] hover:bg-[#B85D19] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Done & Return to Bakery
          </button>
        </div>

      </div>
    </div>
  );
};
