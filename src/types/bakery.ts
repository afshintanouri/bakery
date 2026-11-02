export type LoafSize = 'petit' | 'standard' | 'family';

export type FlourType = 
  | 'organic-spelt'
  | 'organic-rye'
  | 'organic-wholewheat'
  | 'country-blend'
  | 'khorasan-blend';

export type SlicingOption = 'whole' | 'thick' | 'sandwich';

export type CrustFinish = 'classic' | 'seeds' | 'rosemary-salt' | 'dark-bake';

export interface BreadProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  defaultFlour: FlourType;
  availableFlours: FlourType[];
  image: string;
  basePrice: number; // in AUD for standard size
  hydration: string;
  fermentationHours: number;
  tastingNotes: string[];
  organicOrigin: string;
  badge?: string;
}

export interface CustomLoafConfig {
  breadId?: string;
  name: string;
  flourType: FlourType;
  secondaryFlour?: FlourType;
  secondaryRatio?: number; // e.g. 20%
  size: LoafSize;
  slicing: SlicingOption;
  crustFinish: CrustFinish;
  inclusions: string[];
  specialInstructions?: string;
  unitPrice: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  type: 'bread' | 'pantry';
  title: string;
  details?: {
    flourName: string;
    sizeName: string;
    weight: string;
    slicingName: string;
    crustName: string;
    inclusions?: string[];
    specialNotes?: string;
  };
  unitPrice: number;
  quantity: number;
  image?: string;
}

export interface PantryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  producer: string;
  image?: string;
}

export interface DeliverySlot {
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: string; // e.g. "Wednesday"
  displayDate: string; // e.g. "Wed, Nov 5"
  spotsRemaining: number;
  cutoffInfo: string;
  available: boolean;
}

export interface OrderCustomerInfo {
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  deliveryDate: string;
  deliveryTimeWindow: string;
  porchInstructions: string;
  paymentMethod: 'card' | 'apple-pay' | 'porch-cash';
}

export interface PlacedOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  customer: OrderCustomerInfo;
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedDeliveryWindow: string;
}
