import React from 'react';
import { X, ChefHat, Wheat, Truck, Calendar, CheckCircle, Package } from 'lucide-react';
import { PlacedOrder, CartItem, DeliverySlot } from '../types/bakery';
import { ADELAIDE_FOOTHILLS_SUBURBS } from '../data/bakeryData';

interface BakerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: PlacedOrder[];
  slots: DeliverySlot[];
}

export const BakerDashboardModal: React.FC<BakerDashboardModalProps> = ({
  isOpen,
  onClose,
  orders,
  slots,
}) => {
  if (!isOpen) return null;

  // Calculate grain milling requirements based on orders
  let speltKg = 6.4; // Base baseline pre-orders
  let ryeKg = 4.8;
  let wholeWheatKg = 5.2;
  let countryWhiteKg = 8.5;

  orders.forEach((ord) => {
    ord.items.forEach((item) => {
      if (item.type === 'bread') {
        const weightG = item.details?.weight.includes('1,250')
          ? 1250
          : item.details?.weight.includes('550')
          ? 550
          : 850;
        const totalG = weightG * item.quantity;
        const flourG = totalG * 0.58; // approx flour weight accounting for ~78% hydration

        const flourName = (item.details?.flourName || '').toLowerCase();
        if (flourName.includes('spelt')) {
          speltKg += flourG / 1000;
        } else if (flourName.includes('rye')) {
          ryeKg += flourG / 1000;
        } else if (flourName.includes('whole wheat')) {
          wholeWheatKg += flourG / 1000;
        } else {
          countryWhiteKg += (flourG * 0.8) / 1000;
          wholeWheatKg += (flourG * 0.2) / 1000;
        }
      }
    });
  });

  // Calculate delivery route stops by suburb
  const suburbTally: Record<string, number> = {};
  ADELAIDE_FOOTHILLS_SUBURBS.forEach((s) => {
    suburbTally[s.name] = 0;
  });
  
  // Seed initial baseline stops
  suburbTally['Mitcham'] = 4;
  suburbTally['Belair'] = 3;
  suburbTally['Stirling'] = 5;
  suburbTally['Blackwood'] = 3;
  suburbTally['Burnside'] = 2;
  suburbTally['Crafers'] = 2;

  orders.forEach((ord) => {
    const sName = ord.customer.suburb;
    suburbTally[sName] = (suburbTally[sName] || 0) + ord.items.reduce((sum, i) => sum + i.quantity, 0);
  });

  const activeSuburbs = Object.entries(suburbTally).filter(([_, count]) => count > 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-[#FAF7F2] text-[#241D17] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#E3D6C5] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DEC8] bg-[#2D241C] text-white">
          <div className="flex items-center gap-2.5">
            <ChefHat className="w-5 h-5 text-[#D8B48D]" />
            <div>
              <h3 className="font-display text-lg sm:text-xl font-semibold">
                Baker's Production Log & Milling Tally
              </h3>
              <p className="text-xs text-[#CFC1B2]">
                Adelaide Foothills small-batch hearth schedule & morning drop runs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#BFAF9F] hover:text-white rounded-full transition-colors"
            aria-label="Close baker dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Milling Grain Calculator */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5DACB]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display font-semibold text-base text-[#201913] flex items-center gap-2">
                <Wheat className="w-4 h-4 text-[#B85D19]" />
                <span>Flour Milling Requirements (Organic Stoneground Grains)</span>
              </h4>
              <span className="text-[11px] text-[#7B6A5A]">Calculated from active orders</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DCB8]">
                <div className="text-[11px] text-[#8C7A6A] font-medium">Barossa Heritage Spelt</div>
                <div className="font-display text-2xl font-bold text-[#B85D19] mt-0.5 tabular-nums">
                  {speltKg.toFixed(1)} <span className="text-xs font-sans font-normal text-[#655444]">kg</span>
                </div>
                <div className="text-[10px] text-[#7E6D5D] mt-1">Stoneground whole grain</div>
              </div>

              <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DCB8]">
                <div className="text-[11px] text-[#8C7A6A] font-medium">Biodynamic Dark Rye</div>
                <div className="font-display text-2xl font-bold text-[#8A4F1D] mt-0.5 tabular-nums">
                  {ryeKg.toFixed(1)} <span className="text-xs font-sans font-normal text-[#655444]">kg</span>
                </div>
                <div className="text-[10px] text-[#7E6D5D] mt-1">Upper Murray Demeter</div>
              </div>

              <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DCB8]">
                <div className="text-[11px] text-[#8C7A6A] font-medium">Flinders Ranges Wholemeal</div>
                <div className="font-display text-2xl font-bold text-[#725433] mt-0.5 tabular-nums">
                  {wholeWheatKg.toFixed(1)} <span className="text-xs font-sans font-normal text-[#655444]">kg</span>
                </div>
                <div className="text-[10px] text-[#7E6D5D] mt-1">High protein heritage berry</div>
              </div>

              <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DCB8]">
                <div className="text-[11px] text-[#8C7A6A] font-medium">Organic Unbleached White</div>
                <div className="font-display text-2xl font-bold text-[#55473A] mt-0.5 tabular-nums">
                  {countryWhiteKg.toFixed(1)} <span className="text-xs font-sans font-normal text-[#655444]">kg</span>
                </div>
                <div className="text-[10px] text-[#7E6D5D] mt-1">High loft roller-milled</div>
              </div>
            </div>
          </div>

          {/* Delivery Drops Route by Suburb */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5DACB]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display font-semibold text-base text-[#201913] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B85D19]" />
                <span>Delivery Stops by Adelaide Foothills Suburb</span>
              </h4>
              <span className="text-[11px] text-[#7B6A5A]">7:00 AM – 10:30 AM Porch Route</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {activeSuburbs.map(([suburb, count]) => (
                <div key={suburb} className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E3D6C5] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-[#201913]">{suburb}</div>
                    <div className="text-[10px] text-[#877666]">Foothills Zone</div>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-[#B85D19] text-white flex items-center justify-center text-xs font-bold tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Placed Orders in Current Session */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#695747] mb-2 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#B85D19]" />
              <span>Orders in Current Session ({orders.length})</span>
            </h4>

            {orders.length === 0 ? (
              <div className="p-4 bg-white rounded-xl border border-[#E3D6C5] text-xs text-[#7A6959] text-center">
                No orders placed in this browser session yet. Place a test order through the storefront to see live live milling updates here!
              </div>
            ) : (
              <div className="space-y-2">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="p-3.5 bg-white rounded-xl border border-[#E3D6C5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-semibold text-[#201913]">
                        Order #{ord.orderId} · {ord.customer.name}
                      </div>
                      <div className="text-[#6D5C4C] text-[11px] mt-0.5">
                        {ord.customer.streetAddress}, {ord.customer.suburb} · Deliver: {ord.estimatedDeliveryWindow}
                      </div>
                      <div className="text-[10px] text-[#8A7969] mt-0.5">
                        {ord.items.map((i) => `${i.quantity}× ${i.title}`).join(', ')}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-sm text-[#B85D19] tabular-nums">
                        ${ord.total.toFixed(2)} AUD
                      </span>
                      <div className="text-[10px] text-[#42773F] font-semibold">
                        {ord.customer.paymentMethod === 'porch-cash' ? 'Cash on Porch' : 'Paid Online'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4EDE3] border-t border-[#E8DEC8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#2D241C] hover:bg-[#1E1711] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Baker's Log
          </button>
        </div>

      </div>
    </div>
  );
};
