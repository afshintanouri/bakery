import React from 'react';
import { Wheat, Sparkles, Sprout, Heart } from 'lucide-react';

export const ProvenanceSection: React.FC = () => {
  return (
    <section id="provenance" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7D6B5A] mb-1.5">
          <Wheat className="w-4 h-4 text-[#B85D19]" />
          <span>Our Flour & Philosophy</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1E1710] tracking-tight">
          Slow fermentation, certified organic grains, zero shortcuts.
        </h2>
        <p className="text-sm sm:text-base text-[#615142] mt-3 leading-relaxed">
          We started Foothills Sourdough as a humble micro-bakery dedicated to reviving the ancient craft of long-fermented hearth bread in South Australia.
        </p>
      </div>

      {/* 3 Editorial Craft Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="bg-[#F8F3EC] p-7 rounded-2xl border border-[#E5DACB]">
          <div className="text-xs font-mono font-semibold text-[#B85D19] mb-2">01. STONEGROUND GRAINS</div>
          <h3 className="font-display font-semibold text-xl text-[#201913] mb-3">
            South Australian Organic Provenance
          </h3>
          <p className="text-xs sm:text-sm text-[#625243] leading-relaxed">
            All our flours are stoneground from certified organic and biodynamic grains grown across the Barossa Valley, Riverland, and Flinders Ranges. Unlike industrial white flour stripped of its germ and nutrients, our flours preserve fragrant germ oils, fiber, and deep roasted malt character.
          </p>
          <div className="mt-5 pt-4 border-t border-[#E8DEC8] text-xs text-[#7B6A5B] space-y-1">
            <div>· 100% Certified Organic & Non-GMO</div>
            <div>· Zero synthetic preservatives or dough conditioners</div>
            <div>· Cold-milled on natural granite millstones</div>
          </div>
        </div>

        <div className="bg-[#F8F3EC] p-7 rounded-2xl border border-[#E5DACB]">
          <div className="text-xs font-mono font-semibold text-[#B85D19] mb-2">02. PURE WILD LEAVEN</div>
          <h3 className="font-display font-semibold text-xl text-[#201913] mb-3">
            36-Hour Cold Wild Retardation
          </h3>
          <p className="text-xs sm:text-sm text-[#625243] leading-relaxed">
            We never introduce commercial brewer's yeast or rapid rising chemicals. Our leavening relies 100% on "Matilda"—our mother starter culture maintained for 45 years. Two days of low-temperature fermentation allow wild lactobacilli to break down complex sugars and gluten proteins.
          </p>
          <div className="mt-5 pt-4 border-t border-[#E8DEC8] text-xs text-[#7B6A5B] space-y-1">
            <div>· Dramatically lower glycemic response</div>
            <div>· Pre-digested gluten for gentle gut digestion</div>
            <div>· High lactic acidity for 7+ day natural shelf stability</div>
          </div>
        </div>

        <div className="bg-[#F8F3EC] p-7 rounded-2xl border border-[#E5DACB]">
          <div className="text-xs font-mono font-semibold text-[#B85D19] mb-2">03. COMMITTED TO THE FOOTHILLS</div>
          <h3 className="font-display font-semibold text-xl text-[#201913] mb-3">
            Local Micro-Drop Community
          </h3>
          <p className="text-xs sm:text-sm text-[#625243] leading-relaxed">
            By operating as a direct-to-porch micro-bakery, we eliminate supermarket shelf waste. We only bake what has been ordered 36 hours prior. Zero loaves are discarded. Unsold starter discards are gifted to home bakers or composted into local community gardens.
          </p>
          <div className="mt-5 pt-4 border-t border-[#E8DEC8] text-xs text-[#7B6A5B] space-y-1">
            <div>· Zero single-use plastic packaging</div>
            <div>· Solar-powered stone hearth ovens</div>
            <div>· Electric delivery vehicle across Foothills routes</div>
          </div>
        </div>

      </div>

    </section>
  );
};
