import { BreadProduct, FlourType, LoafSize, SlicingOption, CrustFinish, PantryItem, DeliverySlot } from '../types/bakery';
import heroSourdoughImg from '../assets/images/hero_sourdough_crust_1793579425992.jpg';
import breadSpeltImg from '../assets/images/bread_spelt_boule_1793579440211.jpg';
import breadRyeImg from '../assets/images/bread_dark_rye_1793579456773.jpg';
import breadSeededImg from '../assets/images/bread_seeded_country_1793579470546.jpg';

export const BREAD_IMAGES = {
  hero: heroSourdoughImg,
  spelt: breadSpeltImg,
  rye: breadRyeImg,
  seeded: breadSeededImg,
};

export const FLOUR_DEFINITIONS: Record<FlourType, {
  name: string;
  shortName: string;
  origin: string;
  flavorProfile: string;
  glutenProfile: string;
  colorHex: string;
  priceDelta: number;
  description: string;
}> = {
  'organic-spelt': {
    name: '100% Organic Heritage Spelt',
    shortName: 'Heritage Spelt',
    origin: 'Stoneground in Barossa Valley, SA',
    flavorProfile: 'Nutty, gentle sweetness, toasted cereal',
    glutenProfile: 'Ancient fragile gluten, exceptionally digestible',
    colorHex: '#D6A66B',
    priceDelta: 1.50,
    description: 'An ancient Roman grain preserved without modern hybridization. Yields an open, tender crumb with a delicate hazelnut aroma.',
  },
  'organic-rye': {
    name: '100% Certified Organic Dark Rye',
    shortName: 'Dark Rye',
    origin: 'Biodynamic grain from Upper Murray / Riverland, SA',
    flavorProfile: 'Earthy, deep malt, subtle tangy caraway notes',
    glutenProfile: 'Very low gluten, dense succulent crumb that stays fresh for 10+ days',
    colorHex: '#6F4E37',
    priceDelta: 1.00,
    description: 'Stoneground whole rye berries fermented for 40 hours. Characterized by its dense moist interior, complex acidity, and thick caramelized crust.',
  },
  'organic-wholewheat': {
    name: '100% Organic Stoneground Whole Wheat',
    shortName: 'Whole Wheat',
    origin: 'Flinders Ranges Heirloom Wheat, SA',
    flavorProfile: 'Toasted wheat germ, honeyed cereal, roasted sunflower',
    glutenProfile: 'Full fiber wholemeal with robust structured crumb',
    colorHex: '#9E6D38',
    priceDelta: 0.50,
    description: 'Milled slowly on natural granite stones to retain the nutrient-rich germ and fragrant bran oils. Rich in natural vitamins and minerals.',
  },
  'country-blend': {
    name: 'Foothills Country Blend (80% White, 20% Wholemeal)',
    shortName: 'Country Blend',
    origin: 'South Australian Certified Sustainable Mills',
    flavorProfile: 'Crisp, mild wild lactic tang, buttery hearth crumb',
    glutenProfile: 'High elasticity, large airy honeycomb pockets',
    colorHex: '#E2C799',
    priceDelta: 0.00,
    description: 'Our house standard: 80% unbleached stoneground organic bakers flour blended with 20% heritage whole wheat for ideal loft and crust blisters.',
  },
  'khorasan-blend': {
    name: 'Organic Khorasan (Kamut) & Spelt Blend',
    shortName: 'Kamut & Spelt',
    origin: 'Regenerative Certified grain, SA Mid North',
    flavorProfile: 'Golden buttery richness, silky sweet grain finish',
    glutenProfile: 'Smooth extensible ancient gluten, rich amber hue',
    colorHex: '#E5B25D',
    priceDelta: 2.00,
    description: 'Golden ancient Egyptian Khorasan grain renowned for its natural yellow hue, gentle digestion, and smooth velvety texture.',
  },
};

export const SIZE_DEFINITIONS: Record<LoafSize, {
  name: string;
  weight: string;
  priceDelta: number;
  servings: string;
  idealFor: string;
}> = {
  petit: {
    name: 'Petit Batard',
    weight: '550g',
    priceDelta: -3.50,
    servings: '6–8 generous slices',
    idealFor: 'Couples, single households, weekend indulgence',
  },
  standard: {
    name: 'Standard Hearth Boule',
    weight: '850g',
    priceDelta: 0.00,
    servings: '12–14 slices',
    idealFor: 'Our classic everyday size for family toast and sandwiches',
  },
  family: {
    name: 'Large Family Miche',
    weight: '1,250g',
    priceDelta: 4.50,
    servings: '18–22 slices',
    idealFor: 'Hearty bread lovers; retains moisture for over a week',
  },
};

export const SLICING_OPTIONS: Record<SlicingOption, { name: string; description: string }> = {
  whole: {
    name: 'Uncut Whole Loaf (Recommended)',
    description: 'Preserves peak moisture and crisp crust integrity. Keeps fresh longest.',
  },
  thick: {
    name: 'Artisan Toast Cut (~18mm)',
    description: 'Generous rustic cut ideal for butter, morning avocado, and dipping in winter stews.',
  },
  sandwich: {
    name: 'Table Sandwich Cut (~12mm)',
    description: 'Even slices ready for school lunchboxes and fresh toasties.',
  },
};

export const CRUST_FINISHES: Record<CrustFinish, { name: string; priceDelta: number; description: string }> = {
  classic: {
    name: 'Hearth Blistered & Rice Flour Dust',
    priceDelta: 0.00,
    description: 'Razor-scored wheat ear pattern with natural blistered bubbles from cold stone deck baking.',
  },
  seeds: {
    name: 'Toasted Organic Seeds Crust',
    priceDelta: 1.00,
    description: 'Generously encrusted with organic white & black sesame, golden flaxseed, and pumpkin pepitas.',
  },
  'rosemary-salt': {
    name: 'Adelaide Hills Wild Rosemary & Flaky Sea Salt',
    priceDelta: 1.20,
    description: 'Infused with fragrant organic rosemary needle sprigs and crunchy Kangaroo Island sea salt flakes.',
  },
  'dark-bake': {
    name: 'Deep Dark Continental Bake ("Bien Cuit")',
    priceDelta: 0.00,
    description: 'Baked an extra 8 minutes for deep mahogany caramelization and smoky roasted malt crust notes.',
  },
};

export const SIGNATURE_BREADS: BreadProduct[] = [
  {
    id: 'heritage-spelt-boule',
    name: 'Ancient Spelt Sourdough Boule',
    tagline: 'Delicate nutty crumb with certified Barossa organic spelt',
    description: 'Made from 100% stoneground heritage spelt grain, nurtured with our 45-year-old mother starter. It develops a tender, creamy honeycomb crumb and a blistered hazelnut-fragrant crust.',
    defaultFlour: 'organic-spelt',
    availableFlours: ['organic-spelt', 'khorasan-blend', 'country-blend'],
    image: BREAD_IMAGES.spelt,
    basePrice: 14.50,
    hydration: '78%',
    fermentationHours: 36,
    tastingNotes: ['Toasted hazelnut', 'Honeyed cereal', 'Mild lactic yogurt tang'],
    organicOrigin: '100% Certified Organic Barossa Valley Spelt',
    badge: 'Baker’s Pick',
  },
  {
    id: 'dark-bavarian-rye',
    name: 'Dark Bavarian Heritage Rye Batard',
    tagline: 'Deep, earthy 40-hour fermented biodynamic rye with roasted caraway',
    description: 'A genuine European-style dark sourdough with 100% stoneground whole rye flour, seasoned with toasted caraway and coriander seeds. Dense, succulent, and stays fresh for up to 12 days.',
    defaultFlour: 'organic-rye',
    availableFlours: ['organic-rye', 'organic-wholewheat', 'country-blend'],
    image: BREAD_IMAGES.rye,
    basePrice: 15.00,
    hydration: '82%',
    fermentationHours: 40,
    tastingNotes: ['Malted caramel', 'Roasted caraway', 'Dark cocoa finish'],
    organicOrigin: 'Riverland Biodynamic Demeter Rye',
    badge: '12-Day Freshness',
  },
  {
    id: 'seeded-country-hearth',
    name: 'Golden Seeded Country Loaf',
    tagline: 'Organic pumpkin seeds, toasted sesame and flax soaked in spring water',
    description: 'Our signature country dough loaded with a toasted seed soaker. Every slice is studded with nutty roasted pepitas, golden flax, and toasted white sesame, crowned with a crackling seeded crust.',
    defaultFlour: 'country-blend',
    availableFlours: ['country-blend', 'organic-wholewheat', 'organic-spelt'],
    image: BREAD_IMAGES.seeded,
    basePrice: 14.00,
    hydration: '80%',
    fermentationHours: 34,
    tastingNotes: ['Toasted sunflower', 'Crunchy seed crunch', 'Subtle wildflower honey'],
    organicOrigin: 'Flinders Ranges Organic Wheat & Local SA Seeds',
    badge: 'Popular',
  },
  {
    id: 'classic-foothills-country',
    name: 'Foothills Country Sourdough',
    tagline: 'The daily staple: crisp singing crust, open airy wild crumb',
    description: 'Our purest expression of South Australian grain and wild leaven. Blend of 80% unbleached stoneground organic flour and 20% stoneground whole wheat. Fermented cold over two nights for delicate wild tang.',
    defaultFlour: 'country-blend',
    availableFlours: ['country-blend', 'organic-wholewheat', 'organic-spelt'],
    image: BREAD_IMAGES.hero,
    basePrice: 13.00,
    hydration: '79%',
    fermentationHours: 36,
    tastingNotes: ['Cultured butter', 'Sweet grain sweetness', 'Subtle crisp acidity'],
    organicOrigin: 'Barossa Organic Roller & Stoneground Blend',
  },
];

export const PANTRY_ITEMS: PantryItem[] = [
  {
    id: 'pantry-honeycomb',
    name: 'Adelaide Hills Raw Honeycomb (300g)',
    description: 'Cut straight from untreated wooden hives nestled in Stirling eucalyptus and blackberry blossoms. Sublime paired with hot buttered sourdough.',
    price: 16.50,
    weight: '300g slab',
    producer: 'Stirling Foothills Apiary, SA',
  },
  {
    id: 'pantry-butter',
    name: 'Cultured Organic Butter with Fleur de Sel (200g)',
    description: 'Slow-churned organic cream cultured with live kefir strains for 48 hours, folded with crisp mineral sea salt flakes from Kangaroo Island.',
    price: 11.00,
    weight: '200g roll',
    producer: 'Paris Creek Meadows Bio-Farm, SA',
  },
  {
    id: 'pantry-starter',
    name: '45-Year "Matilda" Heirloom Sourdough Starter Kit',
    description: 'A living dehydrated portion of our mother starter culture born in 1982. Includes weck jar, organic rye feed flour, and step-by-step revival booklet.',
    price: 15.00,
    weight: 'Living culture jar',
    producer: 'Foothills Wild Micro-Bakery',
  },
  {
    id: 'pantry-linen-bag',
    name: 'Hand-Loomed Organic Linen Bread Bag',
    description: 'Natural unbleached French flax linen allows sourdough crust to breathe while preventing crumb drying. Machine washable and lasts a lifetime.',
    price: 22.00,
    weight: '40cm x 30cm',
    producer: 'Adelaide Hills Textile Studio',
  },
];

export const ADELAIDE_FOOTHILLS_SUBURBS = [
  { name: 'Mitcham', postcode: '5062', zone: 'Lower Foothills' },
  { name: 'Belair', postcode: '5052', zone: 'Upper Foothills' },
  { name: 'Blackwood', postcode: '5051', zone: 'Upper Foothills' },
  { name: 'Glen Osmond', postcode: '5064', zone: 'Foothills Corridor' },
  { name: 'Burnside', postcode: '5066', zone: 'Foothills Escarpment' },
  { name: 'Beaumont', postcode: '5066', zone: 'Foothills Escarpment' },
  { name: 'Highgate', postcode: '5063', zone: 'Lower Foothills' },
  { name: 'Netherby', postcode: '5062', zone: 'Lower Foothills' },
  { name: 'Torrens Park', postcode: '5062', zone: 'Lower Foothills' },
  { name: 'Hawthorndene', postcode: '5051', zone: 'Upper Foothills' },
  { name: 'Coromandel Valley', postcode: '5051', zone: 'Upper Foothills' },
  { name: 'Crafers', postcode: '5152', zone: 'Hills Face' },
  { name: 'Stirling', postcode: '5152', zone: 'Hills Face' },
  { name: 'Aldgate', postcode: '5154', zone: 'Hills Face' },
  { name: 'Bridgewater', postcode: '5155', zone: 'Hills Face' },
  { name: 'Uraidla', postcode: '5142', zone: 'Hills Face' },
  { name: 'Summertown', postcode: '5141', zone: 'Hills Face' },
  { name: 'St Georges', postcode: '5064', zone: 'Foothills Corridor' },
  { name: 'Stonyfell', postcode: '5066', zone: 'Foothills Escarpment' },
  { name: 'Skye', postcode: '5072', zone: 'Foothills Escarpment' },
  { name: 'Waterfall Gully', postcode: '5066', zone: 'Foothills Escarpment' },
  { name: 'Greenhill', postcode: '5140', zone: 'Hills Face' },
  { name: 'Brownhill Creek', postcode: '5062', zone: 'Lower Foothills' },
  { name: 'Upper Sturt', postcode: '5156', zone: 'Upper Foothills' },
  { name: 'Heathfield', postcode: '5153', zone: 'Hills Face' },
  { name: 'Eden Hills', postcode: '5050', zone: 'Upper Foothills' },
  { name: 'Bellevue Heights', postcode: '5050', zone: 'Upper Foothills' },
  { name: 'Lynton', postcode: '5062', zone: 'Lower Foothills' },
];

export function getUpcomingBakeDates(): DeliverySlot[] {
  // Adelaide micro-bakery operates on Wednesday, Friday, Saturday, Sunday morning drops
  const bakeDays = [3, 5, 6, 0]; // 0 = Sun, 3 = Wed, 5 = Fri, 6 = Sat
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const slots: DeliverySlot[] = [];
  const today = new Date();
  
  // Look ahead up to 14 days to find the next 6 baking drop mornings
  for (let i = 1; slots.length < 6 && i < 20; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const day = d.getDay();
    
    if (bakeDays.includes(day)) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const date = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${date}`;
      const dayOfWeek = dayNames[day];
      const displayDate = `${dayOfWeek.slice(0, 3)}, ${d.getDate()} ${monthNames[d.getMonth()]}`;
      
      // Realistic micro-bakery batch spots remaining
      const spotsRemaining = 5 + ((i * 7) % 9); // e.g. 5 to 13 loaves remaining
      const cutoffInfo = `Orders close 36h prior (at 5:00 PM ${dayNames[(day + 5) % 7]})`;
      
      slots.push({
        dateStr,
        dayOfWeek,
        displayDate,
        spotsRemaining,
        cutoffInfo,
        available: true,
      });
    }
  }
  
  return slots;
}
