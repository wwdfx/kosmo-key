import express from 'express';
import cors from 'cors';
import { env, isStripeConfigured } from './config/env.js';
import healthRouter from './routes/health.routes.js';
import apiRouter from './routes/courses.routes.js';
import { stripeWebhookHandler } from './controllers/checkout.controller.js';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  })
);

// Stripe webhook requires the raw request body for signature verification
app.post(
  '/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhookHandler
);

app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api', apiRouter);

app.listen(env.PORT, () => {
  console.log(
    `[kosmo-key-backend] API listening on http://localhost:${env.PORT} (Stripe mode: ${
      isStripeConfigured ? 'Configured' : 'Mock fallback until Ona provides keys'
    })`
  );
});
