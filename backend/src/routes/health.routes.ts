import { Router, Request, Response } from 'express';
import { env, isStripeConfigured } from '../config/env.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'kosmo-key-backend',
    stripeMode: isStripeConfigured
      ? env.STRIPE_SECRET_KEY.startsWith('sk_live_')
        ? 'stripe_live'
        : 'stripe_test'
      : 'mock',
    calendlyBaseUrl: env.CALENDLY_BASE_URL,
    timestamp: new Date().toISOString(),
  });
});

export default router;
