import Stripe from 'stripe';
import { env, isStripeConfigured } from '../config/env.js';
import {
  KOSMO_PRODUCTS,
  KOSMO_PROGRAMS,
  KOSMO_SERVICES,
  KOSMO_THERAPIES,
} from '../data/seed.js';
import {
  CheckoutLineItemInput,
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  OrderRecord,
  PurchasableItemType,
} from '../models/catalog.types.js';

const stripeClient = isStripeConfigured
  ? new Stripe(env.STRIPE_SECRET_KEY)
  : null;

const ordersStore: Map<string, OrderRecord> = new Map();

interface ResolvedLineItem {
  itemType: PurchasableItemType;
  itemId: string;
  slug: string;
  title: string;
  description: string;
  unitPriceEur: number;
  unitPriceCents: number;
  quantity: number;
  requiresShipping: boolean;
  calendlyUrl?: string;
}

export function resolveCatalogItem(
  input: CheckoutLineItemInput
): ResolvedLineItem | null {
  const key = input.itemId.trim().toLowerCase();
  const quantity = Math.max(1, Math.floor(Number(input.quantity) || 1));

  if (input.itemType === 'programa') {
    const prog = KOSMO_PROGRAMS.find(
      (p) => p.id.toLowerCase() === key || p.slug.toLowerCase() === key
    );
    if (!prog) return null;
    return {
      itemType: 'programa',
      itemId: prog.id,
      slug: prog.slug,
      title: prog.title,
      description: prog.subtitle,
      unitPriceEur: prog.priceEur,
      unitPriceCents: prog.priceCents,
      quantity,
      requiresShipping: false,
    };
  }

  if (input.itemType === 'producto') {
    const prod = KOSMO_PRODUCTS.find(
      (p) => p.id.toLowerCase() === key || p.slug.toLowerCase() === key
    );
    if (!prod) return null;
    return {
      itemType: 'producto',
      itemId: prod.id,
      slug: prod.slug,
      title: prod.title,
      description: prod.subtitle,
      unitPriceEur: prod.priceEur,
      unitPriceCents: prod.priceCents,
      quantity,
      requiresShipping: prod.requiresShipping,
      calendlyUrl: prod.calendlyUrl,
    };
  }

  if (input.itemType === 'terapia') {
    const ter = KOSMO_THERAPIES.find(
      (t) => t.id.toLowerCase() === key || t.slug.toLowerCase() === key
    );
    if (!ter) return null;
    return {
      itemType: 'terapia',
      itemId: ter.id,
      slug: ter.slug,
      title: `Terapia: ${ter.title} (${ter.facilitatorName})`,
      description: ter.subtitle,
      unitPriceEur: ter.priceEur,
      unitPriceCents: ter.priceCents,
      quantity,
      requiresShipping: false,
      calendlyUrl: ter.calendlyUrl,
    };
  }

  if (input.itemType === 'servicio') {
    const srv = KOSMO_SERVICES.find(
      (s) => s.id.toLowerCase() === key || s.slug.toLowerCase() === key
    );
    if (!srv || !srv.priceEur) return null;
    return {
      itemType: 'servicio',
      itemId: srv.id,
      slug: srv.slug,
      title: srv.title,
      description: srv.shortDescription,
      unitPriceEur: srv.priceEur,
      unitPriceCents: srv.priceEur * 100,
      quantity,
      requiresShipping: false,
      calendlyUrl: srv.calendlyUrl,
    };
  }

  return null;
}

export async function createStripeCheckoutSession(
  payload: CreateCheckoutSessionRequest
): Promise<CreateCheckoutSessionResponse> {
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error('At least one item is required to create a checkout session.');
  }

  const resolvedItems: ResolvedLineItem[] = [];
  for (const rawItem of payload.items) {
    const resolved = resolveCatalogItem(rawItem);
    if (!resolved) {
      throw new Error(
        `Invalid or non-purchasable catalog item: [${rawItem.itemType}] ${rawItem.itemId}`
      );
    }
    resolvedItems.push(resolved);
  }

  const totalCents = resolvedItems.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0
  );
  const totalEur = totalCents / 100;
  const requiresShipping = resolvedItems.some((item) => item.requiresShipping);
  const calendlyNextStepUrl = resolvedItems.find(
    (item) => item.calendlyUrl
  )?.calendlyUrl;

  const orderId = `KK-${Date.now().toString().slice(-6)}-${Math.random()
    .toString(36)
    .substring(2, 5)
    .toUpperCase()}`;

  const defaultSuccessUrl = `${env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`;
  const defaultCancelUrl = `${env.FRONTEND_URL}/checkout/cancel?order_id=${orderId}`;

  const successUrl = payload.successUrl || defaultSuccessUrl;
  const cancelUrl = payload.cancelUrl || defaultCancelUrl;

  if (stripeClient) {
    const mode: 'stripe_live' | 'stripe_test' = env.STRIPE_SECRET_KEY.startsWith(
      'sk_live_'
    )
      ? 'stripe_live'
      : 'stripe_test';

    const session = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      customer_email: payload.customerEmail || undefined,
      line_items: resolvedItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'eur',
          unit_amount: item.unitPriceCents,
          product_data: {
            name: item.title,
            description: item.description,
            metadata: {
              itemType: item.itemType,
              itemId: item.itemId,
              slug: item.slug,
            },
          },
        },
      })),
      shipping_address_collection: requiresShipping
        ? {
            allowed_countries: ['ES', 'PT', 'FR', 'IT', 'DE', 'NL', 'BE', 'GB', 'US'],
          }
        : undefined,
      metadata: {
        orderId,
        customerName: payload.customerName || '',
        calendlyNextStepUrl: calendlyNextStepUrl || '',
        ...(payload.metadata || {}),
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    const record: OrderRecord = {
      orderId,
      stripeSessionId: session.id,
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      items: resolvedItems.map((i) => ({
        itemType: i.itemType,
        itemId: i.itemId,
        title: i.title,
        unitPriceEur: i.unitPriceEur,
        quantity: i.quantity,
      })),
      totalEur,
      totalCents,
      currency: 'EUR',
      status: 'PENDING',
      mode,
      calendlyNextStepUrl,
      createdAt: new Date().toISOString(),
    };

    ordersStore.set(session.id, record);
    ordersStore.set(orderId, record);

    return {
      orderId,
      sessionId: session.id,
      checkoutUrl: session.url || successUrl,
      mode,
      currency: 'EUR',
      totalEur,
      totalCents,
      requiresShipping,
      calendlyNextStepUrl,
    };
  }

  // Fallback Mock Checkout Session when STRIPE_SECRET_KEY from Ona is not configured yet
  const mockSessionId = `cs_mock_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)}`;
  const mockCheckoutUrl = successUrl.replace(
    '{CHECKOUT_SESSION_ID}',
    mockSessionId
  );

  const mockRecord: OrderRecord = {
    orderId,
    stripeSessionId: mockSessionId,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    items: resolvedItems.map((i) => ({
      itemType: i.itemType,
      itemId: i.itemId,
      title: i.title,
      unitPriceEur: i.unitPriceEur,
      quantity: i.quantity,
    })),
    totalEur,
    totalCents,
    currency: 'EUR',
    status: 'PAID',
    mode: 'mock',
    calendlyNextStepUrl,
    createdAt: new Date().toISOString(),
    paidAt: new Date().toISOString(),
  };

  ordersStore.set(mockSessionId, mockRecord);
  ordersStore.set(orderId, mockRecord);

  return {
    orderId,
    sessionId: mockSessionId,
    checkoutUrl: mockCheckoutUrl,
    mode: 'mock',
    currency: 'EUR',
    totalEur,
    totalCents,
    requiresShipping,
    calendlyNextStepUrl,
  };
}

export function getOrderBySessionOrId(idOrSessionId: string): OrderRecord | null {
  return ordersStore.get(idOrSessionId) || null;
}

export function listAllOrders(): OrderRecord[] {
  const unique = new Map<string, OrderRecord>();
  for (const record of ordersStore.values()) {
    unique.set(record.orderId, record);
  }
  return Array.from(unique.values());
}

export function handleStripeWebhookEvent(
  rawBody: Buffer,
  signature: string | undefined
): { received: boolean; eventType: string; orderId?: string } {
  if (!stripeClient || !env.STRIPE_WEBHOOK_SECRET) {
    throw new Error(
      'Stripe webhook secret is not configured. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in .env.'
    );
  }
  if (!signature) {
    throw new Error('Missing stripe-signature header.');
  }

  const event = stripeClient.webhooks.constructEvent(
    rawBody,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  );

  let orderId: string | undefined;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    orderId = session.metadata?.orderId;
    const existing =
      ordersStore.get(session.id) || (orderId ? ordersStore.get(orderId) : null);

    if (existing) {
      existing.status = 'PAID';
      existing.paidAt = new Date().toISOString();
      if (session.customer_details?.email) {
        existing.customerEmail = session.customer_details.email;
      }
      if (session.customer_details?.name) {
        existing.customerName = session.customer_details.name;
      }
    }
  }

  return {
    received: true,
    eventType: event.type,
    orderId,
  };
}
