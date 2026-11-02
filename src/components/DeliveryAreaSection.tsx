import React, { useState } from 'react';
import { MapPin, Search, Truck, Clock, ShieldCheck, Sun } from 'lucide-react';
import { ADELAIDE_FOOTHILLS_SUBURBS } from '../data/bakeryData';

export const DeliveryAreaSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuburbs = ADELAIDE_FOOTHILLS_SUBURBS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.postcode.includes(searchTerm) ||
      s.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="delivery-area" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7D6B5A] mb-1.5">
            <Truck className="w-4 h-4 text-[#B85D19]" />
            <span>Adelaide Foothills Morning Porch Run</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1E1710] tracking-tight">
            Delivering from Mitcham to Stirling at Dawn
          </h2>
          <p className="text-sm sm:text-base text-[#615142] mt-2">
            We bake our loaves in the early morning hours and deliver them straight to your doorstep before breakfast. All deliveries are made using our dedicated electric delivery van across the eastern and southern Foothills.
          </p>
        </div>

        {/* 3 Pillars of Foothills Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-[#E4D8C8]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] flex items-center justify-center text-[#B85D19] mb-3.5">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-[#201913] mb-1">
              7:00 AM – 10:30 AM Porch Drop
            </h3>
            <p className="text-xs text-[#655547] leading-relaxed">
              Arrives fresh for morning breakfast. You don’t need to be awake—our runner places your loaf in your designated porch basket or door hook.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E4D8C8]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] flex items-center justify-center text-[#B85D19] mb-3.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-[#201913] mb-1">
              Protected Packaging
            </h3>
            <p className="text-xs text-[#655547] leading-relaxed">
              Wrapped in breathable, compostable unbleached brown kraft paper that allows crust micro-ventilation while protecting against morning dew.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E4D8C8]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] flex items-center justify-center text-[#B85D19] mb-3.5">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-[#201913] mb-1">
              Free Over $20 AUD
            </h3>
            <p className="text-xs text-[#655547] leading-relaxed">
              Orders of $20 or more qualify for complimentary morning porch delivery, or $4.50 standard Foothills drop.
            </p>
          </div>
        </div>

        {/* Suburbs Directory with Search */}
        <div className="bg-[#F4ECE0] rounded-2xl p-6 sm:p-8 border border-[#DFD1BF]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-[#201913]">
                Eligible Adelaide Foothills Suburbs ({ADELAIDE_FOOTHILLS_SUBURBS.length})
              </h3>
              <p className="text-xs text-[#6D5C4C]">
                Check below or search your suburb / postcode:
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#968474] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search suburb (e.g. Belair)..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-[#D5C4B0] rounded-lg text-[#241D17] placeholder:text-[#9B8C7E] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {filteredSuburbs.map((suburb) => (
              <div
                key={suburb.name}
                className="bg-white/90 hover:bg-white p-2.5 rounded-lg border border-[#E0D2C0] transition-colors"
              >
                <div className="font-semibold text-xs text-[#201913] truncate">
                  {suburb.name}
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#7A6959] mt-0.5">
                  <span className="font-mono">{suburb.postcode}</span>
                  <span className="truncate text-[#9E8E7E]">{suburb.zone}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredSuburbs.length === 0 && (
            <div className="text-center py-8 text-xs text-[#7B6A5A]">
              No suburbs found matching "{searchTerm}". If you live nearby in the Adelaide Hills or eastern fringes, contact us for special drop arrangements!
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
