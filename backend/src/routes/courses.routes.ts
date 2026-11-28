import { Router } from 'express';
import {
  getCalendlyLinks,
  getFullCatalog,
  getProductoById,
  getProgramaById,
  getServicioById,
  getTeamMemberById,
  getTerapiaById,
  joinExperienciasWaitlist,
  listExperiencias,
  listProductos,
  listProgramas,
  listServicios,
  listTeamMembers,
  listTerapias,
  scheduleViaCalendly,
  submitServiceInquiry,
} from '../controllers/catalog.controller.js';
import {
  createCheckoutSessionHandler,
  enrollInProgramaHandler,
  getCheckoutSessionStatusHandler,
  listOrdersHandler,
} from '../controllers/checkout.controller.js';

const router = Router();

// Full catalog overview
router.get('/catalog', getFullCatalog);

// Team ("La Familia Kosmo" Slider)
router.get('/team', listTeamMembers);
router.get('/team/:id', getTeamMemberById);

// 1. Servicios (and English alias /services)
router.get('/servicios', listServicios);
router.get('/servicios/:id', getServicioById);
router.post('/servicios/inquiry', submitServiceInquiry);
router.get('/services', listServicios);
router.get('/services/:id', getServicioById);

// 2. Terapias (and English alias /therapies)
router.get('/terapias', listTerapias);
router.get('/terapias/:id', getTerapiaById);
router.get('/therapies', listTerapias);
router.get('/therapies/:id', getTerapiaById);

// 3. Programas — PROGRAMA ORIGEN (and aliases /programs, /courses)
router.get('/programas', listProgramas);
router.get('/programas/:id', getProgramaById);
router.post('/programas/:id/enroll', enrollInProgramaHandler);
router.get('/programs', listProgramas);
router.get('/programs/:id', getProgramaById);
router.get('/courses', listProgramas);
router.get('/courses/:id', getProgramaById);

// 4. Productos — Sylvia's Sensory Kit, Therapy Packs, E-books (and alias /products)
router.get('/productos', listProductos);
router.get('/productos/:id', getProductoById);
router.get('/products', listProductos);
router.get('/products/:id', getProductoById);

// 5. Experiencias — TBD & Waitlist (and alias /experiences)
router.get('/experiencias', listExperiencias);
router.post('/experiencias/waitlist', joinExperienciasWaitlist);
router.get('/experiences', listExperiencias);
router.post('/priority-access', joinExperienciasWaitlist);

// 6. Calendly Scheduling (Consultoría Personalizada & Terapias)
router.get('/calendly/links', getCalendlyLinks);
router.post('/calendly/schedule', scheduleViaCalendly);

// 7. Stripe Checkout & Orders
router.post('/checkout/session', createCheckoutSessionHandler);
router.post('/checkout', createCheckoutSessionHandler);
router.get('/checkout/session/:sessionId', getCheckoutSessionStatusHandler);
router.get('/orders', listOrdersHandler);

export default router;
