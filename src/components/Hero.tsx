import React, { useState } from 'react';
import { ArrowRight, MapPin, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { ADELAIDE_FOOTHILLS_SUBURBS, BREAD_IMAGES } from '../data/bakeryData';

interface HeroProps {
  onScrollToLoaves: () => void;
  onScrollToBuilder: () => void;
  onSelectDeliveryDate: (date: string) => void;
  selectedDeliveryDate: string;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToLoaves,
  onScrollToBuilder,
}) => {
  const [suburbQuery, setSuburbQuery] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState<{
    status: 'idle' | 'eligible' | 'ineligible';
    suburbName?: string;
    zone?: string;
    postcode?: string;
  }>({ status: 'idle' });

  const handleCheckSuburb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suburbQuery.trim()) return;

    const query = suburbQuery.trim().toLowerCase();
    const match = ADELAIDE_FOOTHILLS_SUBURBS.find(
      (s) => s.name.toLowerCase().includes(query) || s.postcode === query
    );

    if (match) {
      setEligibilityResult({
        status: 'eligible',
        suburbName: match.name,
        zone: match.zone,
        postcode: match.postcode,
      });
    } else {
      setEligibilityResult({
        status: 'ineligible',
        suburbName: suburbQuery,
      });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DEC8]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Split: Editorial Story & Atmospheric Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column: Headline, Story & Suburb Checker */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Clean unboxed metadata with subtle typographic separators (§1.A) */}
            <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-[#7D6B5A] mb-4">
              <span>Adelaide Foothills Micro-Bakery</span>
              <span aria-hidden="true">·</span>
              <span>100% Certified Organic SA Grains</span>
              <span aria-hidden="true">·</span>
              <span>36-Hour Wild Cold Retardation</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#1E1711] leading-[1.12] tracking-tight mb-6" style={{ textWrap: 'balance' }}>
              Living sourdough, stoneground flours, baked for the Foothills.
            </h1>

            <p className="text-base sm:text-lg text-[#524436] leading-relaxed max-w-2xl mb-8 font-normal">
              Small-batch hearth loaves crafted with certified organic spelt, dark Bavarian rye, and heirloom whole wheat. Fermented slowly over two days with pure wild leaven, and dropped warm onto Adelaide Foothills porches every Wednesday, Friday, and weekend dawn.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onScrollToLoaves}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#B85D19] hover:bg-[#A04E12] active:scale-[0.98] text-white font-medium text-sm rounded-lg transition-all shadow-sm group whitespace-nowrap"
              >
                <span>Choose Your Sourdough</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onScrollToBuilder}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EDE2D2] hover:bg-[#E4D5C2] text-[#2F261E] font-medium text-sm rounded-lg transition-all border border-[#DFD1BE] whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#B85D19]" />
                <span>Custom Flour & Size Builder</span>
              </button>
            </div>

            {/* Interactive Adelaide Foothills Suburb Checker */}
            <div className="bg-[#F3ECE1] border border-[#E4D7C4] rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#796756] mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#B85D19]" />
                <span>Adelaide Foothills Delivery Zone Checker</span>
              </div>
              
              <form onSubmit={handleCheckSuburb} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={suburbQuery}
                    onChange={(e) => setSuburbQuery(e.target.value)}
                    placeholder="Enter your suburb (e.g. Belair, Mitcham, Stirling, Blackwood)..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CABB] rounded-lg text-[#2A221A] placeholder:text-[#9B8C7E] focus:outline-none focus:ring-2 focus:ring-[#B85D19]/40 focus:border-[#B85D19]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#31271E] hover:bg-[#201913] text-[#FAF7F2] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Verify Porch Delivery
                </button>
              </form>

              {/* Instant Verification Feedback */}
              {eligibilityResult.status === 'eligible' && (
                <div className="mt-3 flex items-start gap-2 text-xs text-[#294B29] bg-[#E9F2E7] p-2.5 rounded-lg border border-[#CCE2C8]">
                  <CheckCircle2 className="w-4 h-4 text-[#3E7B3B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1F411C]">{eligibilityResult.suburbName} ({eligibilityResult.postcode}) is on our morning run!</span>
                    <p className="text-[#3A5D37] mt-0.5">
                      Zone: {eligibilityResult.zone}. Delivered warm between 7:00 AM – 10:30 AM on bake mornings. Free delivery over $20 AUD.
                    </p>
                  </div>
                </div>
              )}

              {eligibilityResult.status === 'ineligible' && (
                <div className="mt-3 flex items-start gap-2 text-xs text-[#7A3614] bg-[#FDF0E8] p-2.5 rounded-lg border border-[#F6D0BA]">
                  <AlertCircle className="w-4 h-4 text-[#B85D19] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#662C10]">Outside our daily run, but we may still reach you!</span>
                    <p className="text-[#884620] mt-0.5">
                      We focus on the Adelaide Foothills & Hills Face corridor (Mitcham to Stirling, Burnside to Blackwood). Contact our baker to arrange a pickup point or custom batch drop.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Hero Artisanal Sourdough Photography */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[500px] border border-[#E4D8C7] bg-[#E8DCCB]">
                <img
                  src={BREAD_IMAGES.hero}
                  alt="Freshly baked organic sourdough boules cooling on reclaimed timber bench in Adelaide Foothills micro-bakery"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle scrim & photo caption badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs pointer-events-none">
                  <div className="font-display font-medium text-base text-[#FDFBF7]">The Foothills Hearth Batch</div>
                  <div className="text-[#E2D5C3] mt-0.5">Stone-deck baked at 240°C with 100% Barossa organic flour & natural wild culture</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof & Philosophy Strip (§5.13: placed below hero split) */}
        <div className="mt-14 pt-10 border-t border-[#E8DEC8] grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8A7969] mb-1">100% Certified Organic</div>
            <div className="font-display text-lg sm:text-xl font-medium text-[#261E17]">Heritage Grains</div>
            <p className="text-xs text-[#635547] mt-1 leading-relaxed">
              Stoneground ancient spelt, Barossa rye, and whole wheat. Zero chemical fertilizers or synthetic additives.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8A7969] mb-1">Slow Fermentation</div>
            <div className="font-display text-lg sm:text-xl font-medium text-[#261E17]">36-Hour Wild Rest</div>
            <p className="text-xs text-[#635547] mt-1 leading-relaxed">
              Cold retarded for digestible gluten breakdown, deep blistered blisters, and complex lactic acidity.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8A7969] mb-1">Local Foothills Drops</div>
            <div className="font-display text-lg sm:text-xl font-medium text-[#261E17]">7am – 10:30am Porch Run</div>
            <p className="text-xs text-[#635547] mt-1 leading-relaxed">
              Delivered in breathable unbleached paper bags straight to your front porch hook or basket.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8A7969] mb-1">Pure Wild Culture</div>
            <div className="font-display text-lg sm:text-xl font-medium text-[#261E17]">Zero Baker's Yeast</div>
            <p className="text-xs text-[#635547] mt-1 leading-relaxed">
              Leavened exclusively by 'Matilda', our 45-year heirloom wild levain fed daily on spring water and rye.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
