import { Request, Response } from 'express';
import {
  CreateCheckoutSessionRequest,
  PurchasableItemType,
} from '../models/catalog.types.js';
import {
  createStripeCheckoutSession,
  getOrderBySessionOrId,
  handleStripeWebhookEvent,
  listAllOrders,
} from '../services/stripe.service.js';

/**
 * POST /api/checkout/session (and POST /api/checkout)
 * Creates a Stripe Checkout session (or mock checkout session in local dev)
 * for any combination of programas (PROGRAMA ORIGEN), productos (Sylvia's Sensory Kit),
 * terapias, or consulting services.
 */
export async function createCheckoutSessionHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const body = req.body as Omit<
      Partial<CreateCheckoutSessionRequest>,
      'items'
    > & {
      // Support legacy `{ courseId, quantity }` items from initial starter template
      items?: Array<{
        itemType?: PurchasableItemType;
        itemId?: string;
        courseId?: string;
        quantity?: number;
      }>;
    };

    const normalizedItems = (body.items || []).map((item) => ({
      itemType: (item.itemType || 'programa') as PurchasableItemType,
      itemId: (item.itemId || item.courseId || '').trim(),
      quantity: item.quantity || 1,
    }));

    const sessionResult = await createStripeCheckoutSession({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      items: normalizedItems,
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl,
      metadata: body.metadata,
    });

    res.status(201).json(sessionResult);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to create checkout session.';
    res.status(400).json({ error: message });
  }
}

/**
 * POST /api/programas/:id/enroll
 * Direct 1-click enrollment shortcut for a specific program (e.g., `/api/programas/programa-origen/enroll`)
 */
export async function enrollInProgramaHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { customerName, customerEmail, successUrl, cancelUrl } = req.body as {
      customerName?: string;
      customerEmail?: string;
      successUrl?: string;
      cancelUrl?: string;
    };

    const sessionResult = await createStripeCheckoutSession({
      customerName,
      customerEmail,
      items: [
        {
          itemType: 'programa',
          itemId: String(req.params.id || ''),
          quantity: 1,
        },
      ],
      successUrl,
      cancelUrl,
    });

    res.status(201).json(sessionResult);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to start program enrollment.';
    res.status(400).json({ error: message });
  }
}

/**
 * GET /api/checkout/session/:sessionId
 * Retrieves the order and payment status for a checkout session ID or orderId.
 */
export function getCheckoutSessionStatusHandler(
  req: Request,
  res: Response
): void {
  const order = getOrderBySessionOrId(String(req.params.sessionId || ''));
  if (!order) {
    res.status(404).json({ error: 'Checkout session or order not found.' });
    return;
  }
  res.json({ order });
}

/**
 * GET /api/orders
 */
export function listOrdersHandler(_req: Request, res: Response): void {
  const orders = listAllOrders();
  res.json({
    orders,
    total: orders.length,
  });
}

/**
 * POST /api/webhooks/stripe
 * Expects raw request buffer (mounted with `express.raw({ type: 'application/json' })`).
 */
export function stripeWebhookHandler(req: Request, res: Response): void {
  try {
    const signature = req.headers['stripe-signature'] as string | undefined;
    const rawBody = req.body as Buffer;
    const result = handleStripeWebhookEvent(rawBody, signature);
    res.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Webhook signature verification failed.';
    res.status(400).json({ error: message });
  }
}
