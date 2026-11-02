import React, { useState } from 'react';
import { X, Check, ShieldCheck, MapPin, Calendar, Clock, CreditCard, Banknote, Sparkles } from 'lucide-react';
import { CartItem, OrderCustomerInfo, PlacedOrder, DeliverySlot } from '../types/bakery';
import { ADELAIDE_FOOTHILLS_SUBURBS } from '../data/bakeryData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedDeliveryDate: string;
  slots: DeliverySlot[];
  onOrderPlaced: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  selectedDeliveryDate,
  slots,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [deliveryDate, setDeliveryDate] = useState(selectedDeliveryDate || slots[0]?.dateStr || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [selectedSuburb, setSelectedSuburb] = useState('Belair');
  const [porchInstructions, setPorchInstructions] = useState('Please leave in the shaded basket on the front verandah.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'porch-cash'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const currentSuburbData = ADELAIDE_FOOTHILLS_SUBURBS.find((s) => s.name === selectedSuburb) || ADELAIDE_FOOTHILLS_SUBURBS[0];
  const selectedSlot = slots.find((s) => s.dateStr === deliveryDate) || slots[0];

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 20 || subtotal === 0 ? 0 : 4.50;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Please provide a mobile phone number for delivery arrival SMS.');
      return;
    }
    if (!streetAddress.trim()) {
      setValidationError('Please provide your street address in the Adelaide Foothills.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderCustomer: OrderCustomerInfo = {
        name,
        email,
        phone,
        streetAddress,
        suburb: currentSuburbData.name,
        postcode: currentSuburbData.postcode,
        deliveryDate,
        deliveryTimeWindow: '7:00 AM – 10:30 AM',
        porchInstructions,
        paymentMethod,
      };

      const orderNumber = `FS-${Math.floor(1000 + Math.random() * 9000)}`;

      const placedOrder: PlacedOrder = {
        orderId: orderNumber,
        timestamp: new Date().toISOString(),
        items,
        customer: orderCustomer,
        subtotal,
        deliveryFee,
        total,
        estimatedDeliveryWindow: `${selectedSlot?.displayDate || deliveryDate} (7:00 AM – 10:30 AM)`,
      };

      setIsSubmitting(false);
      onOrderPlaced(placedOrder);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-[#FAF7F2] text-[#241D17] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E3D6C5] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DEC8] bg-[#F4EDE3]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7B6958]">
              <span>Direct Foothills Porch Run</span>
              <span aria-hidden="true">·</span>
              <span>Morning Delivery</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1610] mt-0.5">
              Complete Your Sourdough Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#796654] hover:text-[#1F1812] hover:bg-[#EAE0D3] rounded-full transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Target Delivery Date Confirmation */}
          <div className="bg-[#F2EAE0] p-4 rounded-xl border border-[#E0D2C0]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#695747] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#B85D19]" />
                <span>Confirm Delivery Morning</span>
              </label>
              <span className="text-[11px] text-[#3F763C] font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>7:00 AM – 10:30 AM Window</span>
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slots.map((slot) => {
                const isSelected = deliveryDate === slot.dateStr;
                return (
                  <button
                    key={slot.dateStr}
                    type="button"
                    onClick={() => setDeliveryDate(slot.dateStr)}
                    className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                      isSelected
                        ? 'border-[#2D241C] bg-[#2D241C] text-white shadow-xs'
                        : 'border-[#D9C9B6] bg-white text-[#29221B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="font-semibold">{slot.displayDate}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#D8B48D]' : 'text-[#7B6958]'}`}>
                      {slot.spotsRemaining} batch spots left
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#695747] mb-3">
              1. Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#5E4D3E] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Afshin Tanouri"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CABB] rounded-lg text-[#201913] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5E4D3E] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com.au"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CABB] rounded-lg text-[#201913] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-[#5E4D3E] mb-1">
                  Mobile Phone * (For early morning drop notification SMS)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0412 345 678"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CABB] rounded-lg text-[#201913] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
              </div>
            </div>
          </div>

          {/* Adelaide Foothills Delivery Address */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#695747] mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B85D19]" />
              <span>2. Adelaide Foothills Porch Address</span>
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#5E4D3E] mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. 42 Gloucester Avenue"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CABB] rounded-lg text-[#201913] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#5E4D3E] mb-1">
                    Adelaide Foothills Suburb *
                  </label>
                  <select
                    value={selectedSuburb}
                    onChange={(e) => setSelectedSuburb(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D9CABB] rounded-lg text-[#201913] font-medium focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                  >
                    {ADELAIDE_FOOTHILLS_SUBURBS.map((suburb) => (
                      <option key={suburb.name} value={suburb.name}>
                        {suburb.name} ({suburb.postcode}) - {suburb.zone}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#5E4D3E] mb-1">
                    State & Postcode
                  </label>
                  <div className="px-3 py-2 text-xs bg-[#F2EAE0] border border-[#D9CABB] rounded-lg text-[#4E4133] font-medium">
                    South Australia, {currentSuburbData.postcode}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5E4D3E] mb-1">
                  Porch Drop Instructions & Safe Spot
                </label>
                <textarea
                  rows={2}
                  value={porchInstructions}
                  onChange={(e) => setPorchInstructions(e.target.value)}
                  placeholder="e.g. Leave in basket near front door, hang on verandah hook, gate code 1234..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CABB] rounded-lg text-[#201913] focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#695747] mb-3">
              3. Payment Method
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#B85D19] bg-[#FAF1E6] ring-1 ring-[#B85D19]'
                    : 'border-[#E0D3C2] bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-[#B85D19]" />
                  <span className="font-medium text-xs text-[#201913]">Card / Online</span>
                </div>
                <p className="text-[11px] text-[#786655]">Visa, Mastercard, AMEX</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple-pay')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'apple-pay'
                    ? 'border-[#B85D19] bg-[#FAF1E6] ring-1 ring-[#B85D19]'
                    : 'border-[#E0D3C2] bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#B85D19]" />
                  <span className="font-medium text-xs text-[#201913]">Digital Wallet</span>
                </div>
                <p className="text-[11px] text-[#786655]">Apple Pay / Google Pay</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('porch-cash')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'porch-cash'
                    ? 'border-[#B85D19] bg-[#FAF1E6] ring-1 ring-[#B85D19]'
                    : 'border-[#E0D3C2] bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Banknote className="w-4 h-4 text-[#B85D19]" />
                  <span className="font-medium text-xs text-[#201913]">Porch Cash</span>
                </div>
                <p className="text-[11px] text-[#786655]">Envelope at drop spot</p>
              </button>
            </div>

            {/* Simulating card fields if card selected */}
            {paymentMethod === 'card' && (
              <div className="mt-3 p-3 bg-white border border-[#E0D3C2] rounded-xl space-y-2.5">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#806E5E] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    defaultValue="4564 •••• •••• 8821"
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#D9CABB] rounded-lg font-mono text-[#201913]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#806E5E] mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      defaultValue="08/28"
                      className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#D9CABB] rounded-lg font-mono text-[#201913]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#806E5E] mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      defaultValue="729"
                      className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#D9CABB] rounded-lg font-mono text-[#201913]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="p-3 bg-[#FDF0E8] border border-[#F6D0BA] rounded-xl text-xs text-[#8A3B18]">
              {validationError}
            </div>
          )}

          {/* Order Summary & Submit */}
          <div className="border-t border-[#E8DEC8] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#635345]">
              <span>Items ({items.reduce((s, i) => s + i.quantity, 0)}):</span>
              <span className="font-medium tabular-nums text-[#201913]">${subtotal.toFixed(2)} AUD</span>
            </div>
            <div className="flex justify-between text-[#635345]">
              <span>Adelaide Foothills Delivery:</span>
              <span className="font-medium tabular-nums text-[#201913]">
                {deliveryFee === 0 ? <span className="text-[#3F763C]">FREE</span> : `$${deliveryFee.toFixed(2)} AUD`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1E1710] pt-1 border-t border-[#E8DEC8]">
              <span>Total to Pay:</span>
              <span className="font-display tabular-nums">${total.toFixed(2)} AUD</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-[#B85D19] hover:bg-[#A04E12] active:scale-[0.98] disabled:opacity-60 text-white font-medium text-sm rounded-xl transition-all shadow-md text-center"
          >
            {isSubmitting ? 'Reserving Your Hearth Batch...' : `Place Foothills Sourdough Order · $${total.toFixed(2)}`}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#7C6C5C]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3F763C]" />
            <span>Guaranteed fresh morning bake · South Australian organic produce</span>
          </div>

        </form>

      </div>
    </div>
  );
};
