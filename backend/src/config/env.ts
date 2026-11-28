import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT) || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Stripe credentials (from Ona). When empty, backend runs in Mock Stripe mode for local frontend testing.
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',

  // Calendly booking URLs
  CALENDLY_BASE_URL:
    process.env.CALENDLY_BASE_URL || 'https://calendly.com/kosmokey',
  CALENDLY_CONSULTING_URL:
    process.env.CALENDLY_CONSULTING_URL ||
    'https://calendly.com/kosmokey/consultoria-personalizada',
  CALENDLY_THERAPY_DEFAULT_URL:
    process.env.CALENDLY_THERAPY_DEFAULT_URL ||
    'https://calendly.com/kosmokey/sesion-terapia',
};

export const isStripeConfigured = Boolean(
  env.STRIPE_SECRET_KEY && env.STRIPE_SECRET_KEY.startsWith('sk_')
);
