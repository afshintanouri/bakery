import React from 'react';
import { ShoppingBag, Sparkles, ChefHat } from 'lucide-react';
import { CartItem } from '../types/bakery';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenBakerDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenBakerDashboard,
}) => {
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant with Top Bar Contract (§2): 1 Brand Zone, 4-5 Nav Links, 1 Primary Action */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-[#221B14] hover:text-[#B85D19] transition-colors whitespace-nowrap shrink-0"
          >
            Foothills Sourdough
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5F5144]">
            <a 
              href="#schedule" 
              className="hover:text-[#1F1914] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Bake Schedule
            </a>
            <a 
              href="#loaves" 
              className="hover:text-[#1F1914] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Organic Loaves
            </a>
            <a 
              href="#custom-builder" 
              className="hover:text-[#1F1914] transition-colors whitespace-nowrap shrink-0 py-1 inline-flex items-center gap-1.5"
            >
              <span>Custom Loaf</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#B85D19] bg-[#F7EBDC] px-1.5 py-0.5 rounded">Lab</span>
            </a>
            <a 
              href="#delivery-area" 
              className="hover:text-[#1F1914] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Foothills Delivery
            </a>
            <a 
              href="#provenance" 
              className="hover:text-[#1F1914] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Our Craft & Provenance
            </a>
          </nav>

          {/* Zone 3: 1 primary action (Bag / Order button) plus baker shortcut */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBakerDashboard}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#655547] hover:text-[#1F1914] bg-[#F0E6D8]/60 hover:bg-[#E8DCCB] rounded-lg transition-colors border border-[#E0D2C0]/70 whitespace-nowrap"
              title="View micro-bakery flour tally and bake schedule"
            >
              <ChefHat className="w-3.5 h-3.5 text-[#B85D19]" />
              <span>Baker's Log</span>
            </button>

            <button
              onClick={onOpenCart}
              type="button"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#2B231B] hover:bg-[#1A1410] active:scale-[0.98] text-[#FAF7F2] rounded-lg font-medium text-xs sm:text-sm transition-all shadow-sm whitespace-nowrap"
              aria-label={`View shopping cart with ${totalItemCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#D8B48D]" />
              <span className="hidden sm:inline">Morning Drop</span>
              <span className="inline font-bold tabular-nums">
                {totalItemCount > 0 ? `(${totalItemCount}) · $${cartSubtotal.toFixed(2)}` : 'Cart (0)'}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
