import React from 'react';
import { Plus, Check, HeartHandshake } from 'lucide-react';
import { PantryItem, CartItem } from '../types/bakery';
import { PANTRY_ITEMS } from '../data/bakeryData';

interface ArtisanalPantryProps {
  onAddToCart: (item: CartItem) => void;
  cartItems: CartItem[];
}

export const ArtisanalPantry: React.FC<ArtisanalPantryProps> = ({
  onAddToCart,
  cartItems,
}) => {
  const handleAddPantry = (item: PantryItem) => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      type: 'pantry',
      title: item.name,
      details: {
        flourName: 'Artisanal Pantry Item',
        sizeName: item.weight,
        weight: item.weight,
        slicingName: item.producer,
        crustName: 'Adelaide Foothills Local',
      },
      unitPrice: item.price,
      quantity: 1,
    };
    onAddToCart(cartItem);
  };

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8DEC8]">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#7D6B5A] mb-1">
            <span>Foothills Table & Pantry</span>
            <span aria-hidden="true">·</span>
            <span>Small-Batch Local Producers</span>
            <span aria-hidden="true">·</span>
            <span>Zero Plastic Packaging</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1E1710] tracking-tight">
            Artisanal Accompaniments
          </h2>
          <p className="text-sm sm:text-base text-[#615142] mt-1.5 max-w-2xl">
            Sourced from organic beekeepers, bio-dynamic dairies, and craft makers nestled along the Adelaide Foothills and Hills Face.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PANTRY_ITEMS.map((item) => {
          const inCartCount = cartItems
            .filter((c) => c.title === item.name)
            .reduce((sum, c) => sum + c.quantity, 0);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E5DACB] p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#D5C3AF] hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8A7969] mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[11px] text-[#A66324]">{item.weight}</span>
                  <span>{item.producer}</span>
                </div>

                <h3 className="font-display font-semibold text-lg text-[#201913] leading-snug">
                  {item.name}
                </h3>

                <p className="text-xs text-[#635345] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-[#F0E6D8] flex items-center justify-between gap-2">
                <span className="font-display font-semibold text-base text-[#1E1711] tabular-nums">
                  ${item.price.toFixed(2)} AUD
                </span>

                <button
                  type="button"
                  onClick={() => handleAddPantry(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FAF4EC] hover:bg-[#B85D19] hover:text-white text-[#74451D] text-xs font-semibold rounded-lg border border-[#E6D4BF] hover:border-[#B85D19] transition-all whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{inCartCount > 0 ? `Add Another (${inCartCount})` : 'Add to Drop'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
