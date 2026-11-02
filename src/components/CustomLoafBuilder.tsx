import React, { useState } from 'react';
import { Sparkles, Sliders, Check, Wheat, Plus, CheckCircle, ShieldCheck } from 'lucide-react';
import { FlourType, LoafSize, SlicingOption, CrustFinish, CartItem } from '../types/bakery';
import { FLOUR_DEFINITIONS, SIZE_DEFINITIONS, SLICING_OPTIONS, CRUST_FINISHES } from '../data/bakeryData';

interface CustomLoafBuilderProps {
  onAddToCart: (item: CartItem) => void;
}

const INCLUSION_OPTIONS = [
  { id: 'walnuts', name: 'Roasted Adelaide Hills Walnuts', price: 2.50, description: 'Earthy rich crunch with tannic depth' },
  { id: 'olives', name: 'Kalamata Olives & Wild Thyme', price: 2.80, description: 'Sun-ripened South Australian kalamata chunks' },
  { id: 'seeds', name: 'Soaked Organic 3-Seed Medley', price: 1.80, description: 'Hydrated golden flax, chia & pumpkin pepitas' },
  { id: 'choc-salt', name: '70% Dark Chocolate & Sea Salt', price: 3.00, description: 'Decadent bitter-sweet pockets with flaky salt' },
];

export const CustomLoafBuilder: React.FC<CustomLoafBuilderProps> = ({ onAddToCart }) => {
  const [baseFlour, setBaseFlour] = useState<FlourType>('organic-spelt');
  const [hasSecondary, setHasSecondary] = useState(false);
  const [secondaryFlour, setSecondaryFlour] = useState<FlourType>('organic-rye');
  const [secondaryRatio, setSecondaryRatio] = useState<number>(25); // percentage
  
  const [loafSize, setLoafSize] = useState<LoafSize>('standard');
  const [slicing, setSlicing] = useState<SlicingOption>('whole');
  const [crust, setCrust] = useState<CrustFinish>('classic');
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([]);
  const [bakerNote, setBakerNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Price Calculation
  const baseFlourData = FLOUR_DEFINITIONS[baseFlour];
  const sizeData = SIZE_DEFINITIONS[loafSize];
  const crustData = CRUST_FINISHES[crust];

  let calculatedPrice = 13.00; // Base artisan fee
  calculatedPrice += baseFlourData.priceDelta;
  calculatedPrice += sizeData.priceDelta;
  calculatedPrice += crustData.priceDelta;

  if (hasSecondary) {
    calculatedPrice += 0.80; // Custom stone mill blending fee
  }

  // Add inclusions
  selectedInclusions.forEach((incId) => {
    const inc = INCLUSION_OPTIONS.find((i) => i.id === incId);
    if (inc) calculatedPrice += inc.price;
  });

  const totalPrice = calculatedPrice * quantity;

  const toggleInclusion = (id: string) => {
    setSelectedInclusions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    const flourDescription = hasSecondary
      ? `${100 - secondaryRatio}% ${baseFlourData.shortName} + ${secondaryRatio}% ${FLOUR_DEFINITIONS[secondaryFlour].shortName}`
      : baseFlourData.name;

    const inclusionNames = selectedInclusions.map(
      (id) => INCLUSION_OPTIONS.find((i) => i.id === id)?.name || ''
    );

    const item: CartItem = {
      id: `custom-loaf-${Date.now()}`,
      type: 'bread',
      title: `Bespoke ${baseFlourData.shortName} Sourdough`,
      details: {
        flourName: flourDescription,
        sizeName: sizeData.name,
        weight: sizeData.weight,
        slicingName: SLICING_OPTIONS[slicing].name,
        crustName: crustData.name,
        inclusions: inclusionNames.length > 0 ? inclusionNames : undefined,
        specialNotes: bakerNote.trim() || undefined,
      },
      unitPrice: calculatedPrice,
      quantity,
      image: '/src/assets/images/bread_spelt_boule_1793579440211.jpg',
    };

    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2400);
  };

  return (
    <section id="custom-builder" className="py-16 sm:py-20 bg-[#F5EFEB] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B85D19] mb-1.5">
            <Sparkles className="w-4 h-4 text-[#B85D19]" />
            <span>Interactive Baker's Bench</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1E1710] tracking-tight">
            Build Your Custom Organic Sourdough
          </h2>
          <p className="text-sm sm:text-base text-[#615142] mt-2">
            Tailor every variable of your loaf. Choose single-origin or blended certified organic South Australian grains, dial in loaf size, select slicing, and fold in local artisan inclusions.
          </p>
        </div>

        {/* Builder Workstation: Form (Left) & Real-time Loaf Specimen (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#E3D6C5] shadow-xs">
            
            {/* Step 1: Base Flour */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-base text-[#201913] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FAF3E8] border border-[#DFCBB5] text-xs flex items-center justify-center font-sans font-bold text-[#8A5020]">1</span>
                  <span>Primary Organic Flour</span>
                </h3>
                <span className="text-xs text-[#7B6A5B]">Stoneground in SA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(FLOUR_DEFINITIONS) as FlourType[]).map((fKey) => {
                  const f = FLOUR_DEFINITIONS[fKey];
                  const isSelected = baseFlour === fKey;
                  return (
                    <button
                      key={fKey}
                      type="button"
                      onClick={() => setBaseFlour(fKey)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#B85D19] bg-[#FAF1E6] ring-1 ring-[#B85D19]'
                          : 'border-[#E2D5C4] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#201913]">{f.shortName}</span>
                        <span className="text-[11px] font-medium text-[#8A5624]">
                          {f.priceDelta === 0 ? 'Base' : `+$${f.priceDelta.toFixed(2)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#69584A] mt-1 line-clamp-1">{f.flavorProfile}</p>
                    </button>
                  );
                })}
              </div>

              {/* Flour Blend Toggle */}
              <div className="mt-4 pt-3 border-t border-[#F0E6D8]">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#504134]">
                  <input
                    type="checkbox"
                    checked={hasSecondary}
                    onChange={(e) => setHasSecondary(e.target.checked)}
                    className="w-4 h-4 text-[#B85D19] rounded border-[#CEBFAF] focus:ring-[#B85D19]"
                  />
                  <span>Blend with a secondary grain (e.g. Spelt + Dark Rye or Whole Wheat) (+$0.80)</span>
                </label>

                {hasSecondary && (
                  <div className="mt-3 p-3.5 bg-[#FAF4ED] rounded-xl border border-[#E9DCB8] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#655343]">Secondary Flour:</span>
                      <select
                        value={secondaryFlour}
                        onChange={(e) => setSecondaryFlour(e.target.value as FlourType)}
                        className="bg-white border border-[#D9CBB9] rounded-lg px-2.5 py-1 text-xs text-[#221B14] font-medium"
                      >
                        {(Object.keys(FLOUR_DEFINITIONS) as FlourType[])
                          .filter((k) => k !== baseFlour)
                          .map((k) => (
                            <option key={k} value={k}>
                              {FLOUR_DEFINITIONS[k].name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-[#715F4F] mb-1">
                        <span>Blend ratio:</span>
                        <span className="font-semibold text-[#B85D19]">
                          {100 - secondaryRatio}% {baseFlourData.shortName} / {secondaryRatio}% {FLOUR_DEFINITIONS[secondaryFlour].shortName}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={secondaryRatio}
                        onChange={(e) => setSecondaryRatio(Number(e.target.value))}
                        className="w-full accent-[#B85D19]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Loaf Form & Weight */}
            <div>
              <h3 className="font-display font-semibold text-base text-[#201913] flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#FAF3E8] border border-[#DFCBB5] text-xs flex items-center justify-center font-sans font-bold text-[#8A5020]">2</span>
                <span>Loaf Size & Weight</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(SIZE_DEFINITIONS) as LoafSize[]).map((sKey) => {
                  const s = SIZE_DEFINITIONS[sKey];
                  const isSelected = loafSize === sKey;
                  return (
                    <button
                      key={sKey}
                      type="button"
                      onClick={() => setLoafSize(sKey)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#2D241C] bg-[#2D241C] text-white shadow-sm'
                          : 'border-[#E2D5C4] hover:bg-[#FAF7F2] text-[#241D17]'
                      }`}
                    >
                      <div className="font-display font-semibold text-sm">{s.name}</div>
                      <div className={`text-xs tabular-nums mt-0.5 ${isSelected ? 'text-[#D6B58F]' : 'text-[#857361]'}`}>
                        {s.weight}
                      </div>
                      <div className={`text-[11px] mt-1.5 ${isSelected ? 'text-[#C5B5A5]' : 'text-[#69584A]'}`}>
                        {s.servings}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Wild Artisan Inclusions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-base text-[#201913] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FAF3E8] border border-[#DFCBB5] text-xs flex items-center justify-center font-sans font-bold text-[#8A5020]">3</span>
                  <span>Artisan Inclusions (Optional)</span>
                </h3>
                <span className="text-xs text-[#7B6A5B]">Folded during 2nd turn</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INCLUSION_OPTIONS.map((inc) => {
                  const isSelected = selectedInclusions.includes(inc.id);
                  return (
                    <button
                      key={inc.id}
                      type="button"
                      onClick={() => toggleInclusion(inc.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'border-[#B85D19] bg-[#FAF1E6] ring-1 ring-[#B85D19]'
                          : 'border-[#E2D5C4] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-xs text-[#201913]">{inc.name}</div>
                        <div className="text-[11px] text-[#69584A] mt-0.5">{inc.description}</div>
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-[#8A5624] shrink-0">
                        +${inc.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Slicing & Crust Finish */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#695747] mb-2">
                  4. Slicing
                </label>
                <select
                  value={slicing}
                  onChange={(e) => setSlicing(e.target.value as SlicingOption)}
                  className="w-full bg-[#FAF7F2] border border-[#D9CBB9] rounded-lg px-3 py-2 text-xs text-[#201913] font-medium"
                >
                  {(Object.keys(SLICING_OPTIONS) as SlicingOption[]).map((k) => (
                    <option key={k} value={k}>
                      {SLICING_OPTIONS[k].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#695747] mb-2">
                  5. Hearth Crust Finish
                </label>
                <select
                  value={crust}
                  onChange={(e) => setCrust(e.target.value as CrustFinish)}
                  className="w-full bg-[#FAF7F2] border border-[#D9CBB9] rounded-lg px-3 py-2 text-xs text-[#201913] font-medium"
                >
                  {(Object.keys(CRUST_FINISHES) as CrustFinish[]).map((k) => (
                    <option key={k} value={k}>
                      {CRUST_FINISHES[k].name} ({CRUST_FINISHES[k].priceDelta === 0 ? 'Free' : `+$${CRUST_FINISHES[k].priceDelta.toFixed(2)}`})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#695747] mb-1">
                Baker's Note
              </label>
              <input
                type="text"
                value={bakerNote}
                onChange={(e) => setBakerNote(e.target.value)}
                placeholder="e.g. Please score with deep ear, lightly bake..."
                className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#D9CBB9] rounded-lg text-[#2A221A] placeholder:text-[#A09081] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
              />
            </div>

          </div>

          {/* Real-time Loaf Specimen Card (Right Column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#2B231B] text-[#FAF7F2] rounded-2xl p-6 sm:p-7 shadow-xl border border-[#3E342B]">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#43372B]">
                <div className="flex items-center gap-2 text-xs text-[#D6B58F]">
                  <Wheat className="w-4 h-4 text-[#B85D19]" />
                  <span>Baker's Work Ticket</span>
                </div>
                <span className="text-[11px] bg-[#3B3026] text-[#E0D2C2] px-2 py-0.5 rounded font-mono">
                  #CUSTOM-BATCH
                </span>
              </div>

              {/* Loaf Preview Headline */}
              <div className="my-5">
                <span className="text-xs uppercase tracking-wider text-[#D8B48D] font-medium">
                  {sizeData.name} ({sizeData.weight})
                </span>
                <h3 className="font-display text-2xl font-semibold text-white mt-1">
                  Bespoke {baseFlourData.shortName} Sourdough
                </h3>
              </div>

              {/* Grain & Process Specifications */}
              <div className="space-y-2.5 text-xs text-[#D8CBBD] py-4 border-y border-[#43372B]">
                <div className="flex justify-between">
                  <span className="text-[#A39282]">Flour Composition:</span>
                  <span className="font-medium text-right text-[#FAF7F2]">
                    {hasSecondary
                      ? `${100 - secondaryRatio}% ${baseFlourData.shortName} + ${secondaryRatio}% ${FLOUR_DEFINITIONS[secondaryFlour].shortName}`
                      : baseFlourData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A39282]">Grain Origin:</span>
                  <span className="font-medium text-right text-[#FAF7F2]">
                    {baseFlourData.origin}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A39282]">Fermentation Profile:</span>
                  <span className="font-medium text-right text-[#FAF7F2]">
                    36h Cold Retardation · 79% Hydration
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A39282]">Crust Finish:</span>
                  <span className="font-medium text-right text-[#FAF7F2]">
                    {crustData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A39282]">Slicing:</span>
                  <span className="font-medium text-right text-[#FAF7F2]">
                    {SLICING_OPTIONS[slicing].name}
                  </span>
                </div>
                {selectedInclusions.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#A39282]">Inclusions:</span>
                    <span className="font-medium text-right text-[#FAF7F2]">
                      {selectedInclusions.map((id) => INCLUSION_OPTIONS.find((i) => i.id === id)?.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Price & Add Module */}
              <div className="mt-6 pt-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-[#A89888] block">Price per custom loaf</span>
                    <span className="font-display text-2xl font-bold text-white tabular-nums">
                      ${calculatedPrice.toFixed(2)} AUD
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-[#524436] rounded-lg bg-[#382E24] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-xs text-[#D6C5B3] hover:bg-[#483B2F]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-semibold tabular-nums text-white min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-xs text-[#D6C5B3] hover:bg-[#483B2F]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    justAdded
                      ? 'bg-[#3F763C] text-white'
                      : 'bg-[#B85D19] hover:bg-[#A04E12] active:scale-[0.98] text-white shadow-md'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Added Custom Loaf to Delivery!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Custom Loaf to Bag · ${(calculatedPrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#A69585] text-center mt-3">
                  Stoneground fresh & hand-shaped on order. Adelaide Foothills porch drop.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
