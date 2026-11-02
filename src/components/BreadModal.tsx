import React, { useState } from 'react';
import { X, Check, Info, ShieldCheck, Flame } from 'lucide-react';
import { BreadProduct, FlourType, LoafSize, SlicingOption, CrustFinish, CartItem } from '../types/bakery';
import { FLOUR_DEFINITIONS, SIZE_DEFINITIONS, SLICING_OPTIONS, CRUST_FINISHES } from '../data/bakeryData';

interface BreadModalProps {
  bread: BreadProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const BreadModal: React.FC<BreadModalProps> = ({
  bread,
  onClose,
  onAddToCart,
}) => {
  if (!bread) return null;

  const [selectedFlour, setSelectedFlour] = useState<FlourType>(bread.defaultFlour);
  const [selectedSize, setSelectedSize] = useState<LoafSize>('standard');
  const [selectedSlicing, setSelectedSlicing] = useState<SlicingOption>('whole');
  const [selectedCrust, setSelectedCrust] = useState<CrustFinish>('classic');
  const [bakerNote, setBakerNote] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Price Calculation
  const basePrice = bread.basePrice;
  const flourDelta = FLOUR_DEFINITIONS[selectedFlour].priceDelta;
  const sizeDelta = SIZE_DEFINITIONS[selectedSize].priceDelta;
  const crustDelta = CRUST_FINISHES[selectedCrust].priceDelta;
  const unitPrice = Math.max(8, basePrice + flourDelta + sizeDelta + crustDelta);
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const item: CartItem = {
      id: `${bread.id}-${selectedFlour}-${selectedSize}-${selectedSlicing}-${selectedCrust}-${Date.now()}`,
      type: 'bread',
      title: bread.name,
      details: {
        flourName: FLOUR_DEFINITIONS[selectedFlour].name,
        sizeName: SIZE_DEFINITIONS[selectedSize].name,
        weight: SIZE_DEFINITIONS[selectedSize].weight,
        slicingName: SLICING_OPTIONS[selectedSlicing].name,
        crustName: CRUST_FINISHES[selectedCrust].name,
        specialNotes: bakerNote.trim() || undefined,
      },
      unitPrice,
      quantity,
      image: bread.image,
    };

    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-[#FAF7F2] text-[#241D17] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E3D6C5] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DEC8] bg-[#F4EDE3]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7B6958]">
              <span>Small-Batch Sourdough</span>
              <span aria-hidden="true">·</span>
              <span>Barossa & Flinders Organic Flours</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1610] mt-0.5">
              {bread.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#796654] hover:text-[#1F1812] hover:bg-[#EAE0D3] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Bread Summary & Image */}
          <div className="flex flex-col sm:flex-row gap-4 items-start bg-white p-3.5 rounded-xl border border-[#E4D8C8]">
            <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden shrink-0 bg-[#E8DCCB]">
              <img
                src={bread.image}
                alt={bread.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-xs sm:text-sm text-[#5C4D40] leading-relaxed">
              <p className="font-medium text-[#201913] mb-1">{bread.tagline}</p>
              <p className="text-[#685749]">{bread.description}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-[#806E5E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3F763C]" />
                <span>{bread.organicOrigin}</span>
                <span aria-hidden="true">·</span>
                <span>{bread.fermentationHours}h Ferment</span>
              </div>
            </div>
          </div>

          {/* 1. Loaf Size Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695747] mb-2">
              1. Choose Loaf Size & Weight
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(Object.keys(SIZE_DEFINITIONS) as LoafSize[]).map((sizeKey) => {
                const s = SIZE_DEFINITIONS[sizeKey];
                const isSelected = selectedSize === sizeKey;
                return (
                  <button
                    key={sizeKey}
                    type="button"
                    onClick={() => setSelectedSize(sizeKey)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#2D241C] bg-[#2D241C] text-white shadow-sm ring-1 ring-[#2D241C]'
                        : 'border-[#E0D3C2] bg-white hover:bg-[#FAF7F2] text-[#29221B]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold text-sm">{s.name}</span>
                      <span className={`text-xs tabular-nums ${isSelected ? 'text-[#D9B994]' : 'text-[#877666]'}`}>
                        {s.weight}
                      </span>
                    </div>
                    <div className={`text-[11px] mt-1 ${isSelected ? 'text-[#D1C3B4]' : 'text-[#6A5A4B]'}`}>
                      {s.idealFor}
                    </div>
                    <div className="mt-2 text-xs font-medium">
                      {s.priceDelta === 0 ? 'Standard price' : s.priceDelta > 0 ? `+$${s.priceDelta.toFixed(2)} AUD` : `-$${Math.abs(s.priceDelta).toFixed(2)} AUD`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Flour Blend Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#695747]">
                2. Select Flour Variety
              </label>
              <span className="text-[11px] text-[#7B6856]">100% Certified Organic SA grains</span>
            </div>
            <div className="space-y-2">
              {(Object.keys(FLOUR_DEFINITIONS) as FlourType[]).map((flourKey) => {
                const f = FLOUR_DEFINITIONS[flourKey];
                const isSelected = selectedFlour === flourKey;
                return (
                  <button
                    key={flourKey}
                    type="button"
                    onClick={() => setSelectedFlour(flourKey)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isSelected
                        ? 'border-[#B85D19] bg-[#FBF3EA] text-[#29211A] ring-1 ring-[#B85D19]'
                        : 'border-[#E2D6C6] bg-white hover:bg-[#FAF7F2] text-[#30261E]'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-[#221B14]">{f.name}</span>
                        {flourKey === bread.defaultFlour && (
                          <span className="text-[10px] font-semibold text-[#3C6E39] bg-[#EAF3E9] px-1.5 py-0.5 rounded">
                            Original Recipe
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6F5E4F] mt-0.5">{f.description}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[#8C7B6B] mt-1">
                        <span>{f.origin}</span>
                        <span aria-hidden="true">·</span>
                        <span>{f.flavorProfile}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 pt-1.5 sm:pt-0 border-[#E8DEC8]">
                      <span className="text-xs font-semibold tabular-nums text-[#B85D19]">
                        {f.priceDelta === 0 ? 'Included' : `+$${f.priceDelta.toFixed(2)}`}
                      </span>
                      {isSelected && (
                        <span className="text-xs text-[#B85D19] flex items-center gap-1 font-medium mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Selected</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Slicing Preference */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695747] mb-2">
              3. Slicing Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(Object.keys(SLICING_OPTIONS) as SlicingOption[]).map((sliceKey) => {
                const s = SLICING_OPTIONS[sliceKey];
                const isSelected = selectedSlicing === sliceKey;
                return (
                  <button
                    key={sliceKey}
                    type="button"
                    onClick={() => setSelectedSlicing(sliceKey)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#2D241C] bg-[#2D241C] text-white shadow-sm'
                        : 'border-[#E0D3C2] bg-white hover:bg-[#FAF7F2] text-[#29221B]'
                    }`}
                  >
                    <div className="font-medium text-xs sm:text-sm">{s.name}</div>
                    <div className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-[#D1C3B4]' : 'text-[#6A5A4B]'}`}>
                      {s.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Crust Finish */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695747] mb-2">
              4. Hearth Crust & Seed Finish
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(CRUST_FINISHES) as CrustFinish[]).map((crustKey) => {
                const c = CRUST_FINISHES[crustKey];
                const isSelected = selectedCrust === crustKey;
                return (
                  <button
                    key={crustKey}
                    type="button"
                    onClick={() => setSelectedCrust(crustKey)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#B85D19] bg-[#FAF1E6] text-[#201812] ring-1 ring-[#B85D19]'
                        : 'border-[#E0D3C2] bg-white hover:bg-[#FAF7F2] text-[#29221B]'
                    }`}
                  >
                    <div className="pr-2">
                      <div className="font-medium text-xs">{c.name}</div>
                      <div className="text-[11px] text-[#716050] line-clamp-1">{c.description}</div>
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-[#8A5B30] shrink-0">
                      {c.priceDelta === 0 ? 'Free' : `+$${c.priceDelta.toFixed(2)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Baker Note */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695747] mb-1">
              Special Baker Note (Optional)
            </label>
            <input
              type="text"
              value={bakerNote}
              onChange={(e) => setBakerNote(e.target.value)}
              placeholder="e.g. Extra dark blistered bake, heavy flour dusting, cut ends..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-[#D9CABB] rounded-lg text-[#2A221A] placeholder:text-[#A09081] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
            />
          </div>

        </div>

        {/* Modal Sticky Bottom Purchase Module */}
        <div className="border-t border-[#E8DEC8] bg-[#F5EEE4] px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center border border-[#D6C5B3] rounded-lg bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-sm font-semibold text-[#5A493B] hover:bg-[#F2EAE0] transition-colors"
              >
                -
              </button>
              <span className="px-3 py-1.5 text-sm font-semibold text-[#201812] tabular-nums min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-sm font-semibold text-[#5A493B] hover:bg-[#F2EAE0] transition-colors"
              >
                +
              </button>
            </div>

            <div>
              <div className="text-[11px] text-[#786655]">Total for this loaf:</div>
              <div className="font-display text-xl font-bold text-[#1F1710] tabular-nums">
                ${totalPrice.toFixed(2)} AUD
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="px-6 py-3 bg-[#B85D19] hover:bg-[#A04E12] active:scale-[0.98] text-white font-medium text-sm rounded-lg transition-all shadow-sm whitespace-nowrap text-center"
          >
            Add to Morning Drop · ${totalPrice.toFixed(2)}
          </button>
        </div>

      </div>
    </div>
  );
};
