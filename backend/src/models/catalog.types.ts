export type KosmoSection =
  | 'SERVICIOS'
  | 'TERAPIAS'
  | 'PROGRAMAS'
  | 'PRODUCTOS'
  | 'EXPERIENCIAS';

export type BookingActionType =
  | 'CALENDLY'
  | 'STRIPE_CHECKOUT'
  | 'INQUIRY_FORM'
  | 'WAITLIST';

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  calendlyUrl?: string;
}

/**
 * 1. SERVICIOS (/api/servicios)
 * Matches the 4 core B2B & consulting blocks on ServiciosPage:
 * - Kosmo Architecture (Customer Architecture Strategy building)
 * - Digitalización de Negocio (website, e-commerce, CRMs, etc.)
 * - Estrategia Redes Sociales (Strategies for SMM)
 * - Consultoría Personalizada (Connected to Calendly)
 */
export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'STRATEGY' | 'DIGITALIZATION' | 'SMM' | 'CONSULTING';
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  leadFacilitators: string[];
  actionType: BookingActionType;
  calendlyUrl?: string;
  priceEur?: number;
  priceDisplay?: string;
  ctaText: string;
}

/**
 * 2. TERAPIAS (/api/terapias)
 * Landing page items for therapy sessions connected to Calendly
 * (and optionally purchasable via Stripe).
 */
export interface TherapySession {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  facilitatorName: string;
  facilitatorSlug: string;
  durationMinutes: number;
  format: 'Online' | 'Presencial' | 'Online / Presencial';
  priceEur: number;
  priceCents: number;
  currency: 'EUR';
  calendlyUrl: string;
  calendlyEventSlug: string;
  benefits: string[];
  ctaText: string;
}

/**
 * 3. PROGRAMAS (/api/programas)
 * Structured around Sylvia's template for PROGRAMA ORIGEN with Lluís Espinosa.
 */
export interface ProgramItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  instructorName: string;
  instructorSlug: string;
  summary: string;
  description: string;
  includes: string[];
  format: string;
  priceEur: number;
  priceCents: number;
  currency: 'EUR';
  paymentType: 'one_time' | 'subscription';
  priceDisplay: string;
  guaranteeDays: number;
  guaranteeText: string;
  ctaText: string;
  featured: boolean;
  status: 'OPEN' | 'COMING_SOON' | 'CLOSED';
}

/**
 * 4. PRODUCTOS (/api/productos)
 * E-commerce items for the "Productos" page: physical kits (Sylvia's Sensory Kit),
 * digital guides, and therapy session bundles payable via Stripe.
 */
export type ProductType = 'physical' | 'digital' | 'therapy_bundle';

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  productType: ProductType;
  priceEur: number;
  priceCents: number;
  currency: 'EUR';
  priceDisplay: string;
  inStock: boolean;
  stockCount?: number;
  requiresShipping: boolean;
  status: 'AVAILABLE' | 'PREORDER' | 'TBD';
  creatorName?: string;
  highlights: string[];
  calendlyUrl?: string;
}

/**
 * 5. EXPERIENCIAS (/api/experiencias)
 * Currently TBD; provides structured placeholders and waitlist support.
 */
export interface ExperienceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  dateDisplay: string;
  status: 'TBD' | 'COMING_SOON' | 'OPEN';
  priceEur?: number;
  ctaText: string;
}

/**
 * E-Commerce Cart & Stripe Checkout Types
 */
export type PurchasableItemType = 'programa' | 'producto' | 'terapia' | 'servicio';

export interface CheckoutLineItemInput {
  itemType: PurchasableItemType;
  itemId: string; // ID or slug of the programa, producto, terapia, or servicio
  quantity?: number;
}

export interface CreateCheckoutSessionRequest {
  customerEmail?: string;
  customerName?: string;
  items: CheckoutLineItemInput[];
  successUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}

export interface CreateCheckoutSessionResponse {
  orderId: string;
  sessionId: string;
  checkoutUrl: string;
  mode: 'stripe_live' | 'stripe_test' | 'mock';
  currency: 'EUR';
  totalEur: number;
  totalCents: number;
  requiresShipping: boolean;
  calendlyNextStepUrl?: string;
}

export interface OrderRecord {
  orderId: string;
  stripeSessionId: string;
  customerName?: string;
  customerEmail?: string;
  items: Array<{
    itemType: PurchasableItemType;
    itemId: string;
    title: string;
    unitPriceEur: number;
    quantity: number;
  }>;
  totalEur: number;
  totalCents: number;
  currency: 'EUR';
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  mode: 'stripe_live' | 'stripe_test' | 'mock';
  calendlyNextStepUrl?: string;
  createdAt: string;
  paidAt?: string;
}

export interface CalendlyScheduleRequest {
  type: 'CONSULTING' | 'THERAPY';
  targetIdOrSlug?: string; // e.g., 'biodescodificacion' or 'consultoria-personalizada'
  name: string;
  email: string;
  notes?: string;
}

export interface CalendlyScheduleResponse {
  bookingIntentId: string;
  title: string;
  facilitatorName: string;
  calendlyUrl: string;
  prefilledCalendlyUrl: string;
  createdAt: string;
}

export interface ServiceInquiryRequest {
  serviceIdOrSlug: string;
  fullName: string;
  email: string;
  companyName?: string;
  phone?: string;
  message: string;
}
