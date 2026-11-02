import React from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { BreadProduct } from '../types/bakery';
import { SIGNATURE_BREADS, FLOUR_DEFINITIONS } from '../data/bakeryData';

interface BreadCatalogProps {
  onSelectBread: (bread: BreadProduct) => void;
  onOpenCustomBuilder: () => void;
}

export const BreadCatalog: React.FC<BreadCatalogProps> = ({
  onSelectBread,
  onOpenCustomBuilder,
}) => {
  return (
    <section id="loaves" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header with quiet unboxed metadata */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#7D6B5A] mb-1">
            <span>Signature Hearth Collection</span>
            <span aria-hidden="true">·</span>
            <span>Natural Stone Deck Bake</span>
            <span aria-hidden="true">·</span>
            <span>Adelaide Hills Water & Kangaroo Island Salt</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1E1710] tracking-tight">
            Certified Organic Sourdough Loaves
          </h2>
          <p className="text-sm sm:text-base text-[#615142] mt-1.5 max-w-2xl">
            Every loaf is naturally fermented for 34–40 hours using ancient grains and unbleached stoneground flours. Click any bread to customize its size, grain blend, or crust finish.
          </p>
        </div>

        <button
          onClick={onOpenCustomBuilder}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF3E8] hover:bg-[#F2E5D3] text-[#784318] text-xs font-semibold rounded-lg border border-[#E8D4BE] transition-colors whitespace-nowrap self-start md:self-auto shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B85D19]" />
          <span>Need a unique grain mix? Custom Loaf Lab</span>
        </button>
      </div>

      {/* Product Cards Grid: 3-column / 2-column with uniform aspect ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {SIGNATURE_BREADS.map((bread) => {
          const defaultFlourInfo = FLOUR_DEFINITIONS[bread.defaultFlour];

          return (
            <div
              key={bread.id}
              className="group bg-white rounded-2xl border border-[#E5DACB] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#D5C3AF]"
            >
              {/* Product Imagery: 65-75% visual prominence */}
              <div className="relative aspect-[4/3] bg-[#EBE1D3] overflow-hidden">
                <img
                  src={bread.image}
                  alt={bread.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Max 1 subtle text tag per §2.B */}
                {bread.badge && (
                  <div className="absolute top-3 left-3 bg-[#241D17]/85 backdrop-blur-sm text-[#FAF7F2] text-[11px] font-medium px-2.5 py-1 rounded-md">
                    {bread.badge}
                  </div>
                )}

                <div className="absolute bottom-2.5 right-3 bg-white/90 backdrop-blur-sm text-[#3E3227] text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs tabular-nums">
                  {bread.fermentationHours}h Ferment
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed category label */}
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C7A6A] mb-1">
                    {defaultFlourInfo.shortName} Sourdough
                  </div>

                  <h3 className="font-display font-semibold text-lg text-[#1F1710] group-hover:text-[#B85D19] transition-colors leading-snug">
                    {bread.name}
                  </h3>

                  <p className="text-xs text-[#635345] mt-1.5 line-clamp-2 leading-relaxed">
                    {bread.description}
                  </p>

                  {/* Tasting notes as quiet unboxed text with bullets */}
                  <div className="mt-3 text-[11px] text-[#7A6959] flex items-center flex-wrap gap-1.5">
                    <span className="font-medium text-[#524436]">Notes:</span>
                    {bread.tastingNotes.map((note, idx) => (
                      <React.Fragment key={note}>
                        <span>{note}</span>
                        {idx < bread.tastingNotes.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Action & Price Baseline */}
                <div className="mt-5 pt-3.5 border-t border-[#F0E6D8] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#8A7969] block">Standard 850g from</span>
                    <span className="font-display font-semibold text-base text-[#1E1711] tabular-nums">
                      ${bread.basePrice.toFixed(2)} AUD
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectBread(bread)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#2D241C] hover:bg-[#B85D19] active:scale-[0.98] text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Customize & Add</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
