import React from 'react';
import { ChefHat, Wheat, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBakerDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBakerDashboard }) => {
  return (
    <footer className="bg-[#241D17] text-[#FAF7F2] border-t border-[#3B3026]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5">
            <h3 className="text-2xl font-display font-medium tracking-tight text-white mb-3">
              Foothills Sourdough
            </h3>
            <p className="text-xs sm:text-sm text-[#C4B4A4] leading-relaxed max-w-sm mb-6">
              An independent Adelaide micro-bakery honoring ancient grains, natural cold wild fermentation, and zero synthetic shortcuts. Delivered fresh at dawn across the Adelaide Foothills.
            </p>
            <div className="text-xs text-[#9E8E7E] space-y-1">
              <div>Bakehouse: Adelaide Hills Face, South Australia</div>
              <div>Bake Mornings: Wednesday, Friday, Saturday & Sunday</div>
              <div>Morning Porch Runs: 7:00 AM – 10:30 AM</div>
            </div>
          </div>

          {/* Grain Provenance */}
          <div className="md:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D8B48D] mb-3">
              Certified Organic South Australian Grains
            </div>
            <ul className="text-xs text-[#C4B4A4] space-y-2">
              <li>· 100% Organic Heritage Spelt (Barossa Valley, SA)</li>
              <li>· Biodynamic Demeter Dark Rye (Riverland, SA)</li>
              <li>· Stoneground Whole Wheat (Flinders Ranges, SA)</li>
              <li>· Kangaroo Island Cold Mineral Sea Salt</li>
              <li>· Pure Filtered Adelaide Hills Spring Water</li>
            </ul>
          </div>

          {/* Quick Actions & Baker Access */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D8B48D] mb-3">
                Bakery Operations
              </div>
              <ul className="text-xs text-[#C4B4A4] space-y-2">
                <li><a href="#loaves" className="hover:text-white transition-colors">Organic Loaf Menu</a></li>
                <li><a href="#custom-builder" className="hover:text-white transition-colors">Custom Flour Lab</a></li>
                <li><a href="#delivery-area" className="hover:text-white transition-colors">Foothills Delivery Suburbs</a></li>
                <li><a href="#schedule" className="hover:text-white transition-colors">Upcoming Bake Schedule</a></li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3D3126]">
              <button
                type="button"
                onClick={onOpenBakerDashboard}
                className="inline-flex items-center gap-1.5 text-xs text-[#D8B48D] hover:text-white transition-colors"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Open Baker's Production Log</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet and elegant */}
        <div className="mt-12 pt-8 border-t border-[#382E25] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7A6B]">
          <div>
            &copy; {new Date().getFullYear()} Foothills Sourdough Micro-Bakery. Adelaide Foothills, South Australia.
          </div>
          <div className="flex items-center gap-4">
            <span>All certified organic flours</span>
            <span aria-hidden="true">·</span>
            <span>Zero commercial yeast</span>
            <span aria-hidden="true">·</span>
            <span>100% solar stone deck oven</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
