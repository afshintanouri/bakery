import React, { useState, useEffect } from 'react';
import { BreadProduct, CartItem, PlacedOrder, DeliverySlot } from './types/bakery';
import { getUpcomingBakeDates, SIGNATURE_BREADS } from './data/bakeryData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BakeScheduleBar } from './components/BakeScheduleBar';
import { BreadCatalog } from './components/BreadCatalog';
import { CustomLoafBuilder } from './components/CustomLoafBuilder';
import { ArtisanalPantry } from './components/ArtisanalPantry';
import { DeliveryAreaSection } from './components/DeliveryAreaSection';
import { ProvenanceSection } from './components/ProvenanceSection';
import { Footer } from './components/Footer';
import { BreadModal } from './components/BreadModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { BakerDashboardModal } from './components/BakerDashboardModal';
import { Check } from 'lucide-react';

export default function App() {
  const [slots] = useState<DeliverySlot[]>(() => getUpcomingBakeDates());
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<string>(
    slots[0]?.dateStr || ''
  );

  // Initialize cart from localStorage if present
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('foothills_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Start with 1 pre-configured favourite so the user immediately sees the experience
    return [
      {
        id: 'initial-heritage-spelt',
        type: 'bread',
        title: 'Ancient Spelt Sourdough Boule',
        details: {
          flourName: '100% Organic Heritage Spelt',
          sizeName: 'Standard Hearth Boule',
          weight: '850g',
          slicingName: 'Uncut Whole Loaf (Recommended)',
          crustName: 'Hearth Blistered & Rice Flour Dust',
          specialNotes: 'Extra blistered crust if possible',
        },
        unitPrice: 16.00,
        quantity: 1,
        image: '/src/assets/images/bread_spelt_boule_1793579440211.jpg',
      },
    ];
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('foothills_cart', JSON.stringify(cartItems));
    } catch (e) {
      // Ignore
    }
  }, [cartItems]);

  // Session placed orders
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>([]);
  const [currentConfirmationOrder, setCurrentConfirmationOrder] = useState<PlacedOrder | null>(null);

  // Modals & Drawers state
  const [customizingBread, setCustomizingBread] = useState<BreadProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBakerDashboardOpen, setIsBakerDashboardOpen] = useState(false);
  
  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // check if identical item exists
      const existingIdx = prev.findIndex(
        (i) =>
          i.title === item.title &&
          JSON.stringify(i.details) === JSON.stringify(item.details)
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        return next;
      }
      return [...prev, item];
    });

    showToast(`Added "${item.title}" to your morning delivery bag!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderPlaced = (order: PlacedOrder) => {
    setPlacedOrders((prev) => [order, ...prev]);
    setCurrentConfirmationOrder(order);
    setCartItems([]); // clear cart
  };

  // Smooth scroll helpers
  const scrollToLoaves = () => {
    document.getElementById('loaves')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBuilder = () => {
    document.getElementById('custom-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29231D] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D241C] text-white px-4 py-3 rounded-xl shadow-xl border border-[#483B2E] flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-bottom duration-200">
          <span className="w-5 h-5 rounded-full bg-[#3F763C] text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar (§2 Top Bar Contract) */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBakerDashboard={() => setIsBakerDashboardOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Adelaide Foothills Suburb Checker */}
        <Hero
          onScrollToLoaves={scrollToLoaves}
          onScrollToBuilder={scrollToBuilder}
          onSelectDeliveryDate={setSelectedDeliveryDate}
          selectedDeliveryDate={selectedDeliveryDate}
        />

        {/* Upcoming Hearth Bake Schedule */}
        <BakeScheduleBar
          slots={slots}
          selectedDate={selectedDeliveryDate}
          onSelectDate={(dateStr) => {
            setSelectedDeliveryDate(dateStr);
            showToast(`Target delivery set to ${slots.find((s) => s.dateStr === dateStr)?.displayDate}`);
          }}
        />

        {/* Signature Organic Sourdough Catalog */}
        <BreadCatalog
          onSelectBread={(bread) => setCustomizingBread(bread)}
          onOpenCustomBuilder={scrollToBuilder}
        />

        {/* Custom Loaf Lab (The Baker's Bench) */}
        <CustomLoafBuilder onAddToCart={handleAddToCart} />

        {/* Artisanal Accompaniments & Pantry */}
        <ArtisanalPantry
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />

        {/* Adelaide Foothills Delivery Suburbs & Details */}
        <DeliveryAreaSection />

        {/* Our Craft, 36h Fermentation & Organic SA Millers */}
        <ProvenanceSection />
      </main>

      {/* Footer */}
      <Footer onOpenBakerDashboard={() => setIsBakerDashboardOpen(true)} />

      {/* Bread Customization Modal */}
      {customizingBread && (
        <BreadModal
          bread={customizingBread}
          onClose={() => setCustomizingBread(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedDeliveryDate={selectedDeliveryDate}
        onSelectDeliveryDate={setSelectedDeliveryDate}
        slots={slots}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        selectedDeliveryDate={selectedDeliveryDate}
        slots={slots}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmation Modal */}
      {currentConfirmationOrder && (
        <OrderConfirmationModal
          order={currentConfirmationOrder}
          onClose={() => setCurrentConfirmationOrder(null)}
        />
      )}

      {/* Baker's Production Log Dashboard */}
      <BakerDashboardModal
        isOpen={isBakerDashboardOpen}
        onClose={() => setIsBakerDashboardOpen(false)}
        orders={placedOrders}
        slots={slots}
      />

    </div>
  );
}
