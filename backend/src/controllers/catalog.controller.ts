import { Request, Response } from 'express';
import { env } from '../config/env.js';
import {
  KOSMO_EXPERIENCES,
  KOSMO_PRODUCTS,
  KOSMO_PROGRAMS,
  KOSMO_SERVICES,
  KOSMO_TEAM,
  KOSMO_THERAPIES,
} from '../data/seed.js';
import {
  CalendlyScheduleRequest,
  ServiceInquiryRequest,
} from '../models/catalog.types.js';
import {
  buildPrefilledCalendlyUrl,
  createCalendlyScheduleIntent,
} from '../services/calendly.service.js';

const serviceInquiries: Array<
  ServiceInquiryRequest & { id: string; createdAt: string; calendlyUrl: string }
> = [];

const experienceWaitlist: Array<{
  id: string;
  fullName: string;
  email: string;
  experienceSlug?: string;
  createdAt: string;
}> = [];

/**
 * Full catalog overview endpoint: GET /api/catalog
 */
export function getFullCatalog(_req: Request, res: Response): void {
  res.json({
    team: KOSMO_TEAM,
    servicios: KOSMO_SERVICES,
    terapias: KOSMO_THERAPIES,
    programas: KOSMO_PROGRAMS,
    productos: KOSMO_PRODUCTS,
    experiencias: KOSMO_EXPERIENCES,
  });
}

/**
 * TEAM ("La Familia Kosmo")
 */
export function listTeamMembers(_req: Request, res: Response): void {
  res.json({
    team: KOSMO_TEAM,
    total: KOSMO_TEAM.length,
  });
}

export function getTeamMemberById(req: Request, res: Response): void {
  const key = String(req.params.id || '').toLowerCase();
  const member = KOSMO_TEAM.find(
    (m) => m.id.toLowerCase() === key || m.slug.toLowerCase() === key
  );
  if (!member) {
    res.status(404).json({ error: 'Team member not found' });
    return;
  }
  res.json({ member });
}

/**
 * 1. SERVICIOS (/api/servicios)
 */
export function listServicios(req: Request, res: Response): void {
  const { category } = req.query;
  let items = [...KOSMO_SERVICES];

  if (typeof category === 'string' && category.trim()) {
    items = items.filter(
      (s) => s.category.toUpperCase() === category.trim().toUpperCase()
    );
  }

  res.json({
    servicios: items,
    total: items.length,
  });
}

export function getServicioById(req: Request, res: Response): void {
  const key = String(req.params.id || '').toLowerCase();
  const servicio = KOSMO_SERVICES.find(
    (s) => s.id.toLowerCase() === key || s.slug.toLowerCase() === key
  );
  if (!servicio) {
    res.status(404).json({ error: 'Servicio no encontrado' });
    return;
  }
  res.json({ servicio });
}

export function submitServiceInquiry(req: Request, res: Response): void {
  const { serviceIdOrSlug, fullName, email, companyName, phone, message } =
    req.body as Partial<ServiceInquiryRequest>;

  if (!fullName || !email || !email.includes('@')) {
    res.status(400).json({
      error: 'fullName and a valid email are required.',
    });
    return;
  }

  const key = (serviceIdOrSlug || 'consultoria-personalizada').toLowerCase();
  const matched = KOSMO_SERVICES.find(
    (s) => s.id.toLowerCase() === key || s.slug.toLowerCase() === key
  );

  const baseCalendly = matched?.calendlyUrl || env.CALENDLY_CONSULTING_URL;
  const prefilledCalendlyUrl = buildPrefilledCalendlyUrl(baseCalendly, {
    name: fullName,
    email,
    notes: message,
  });

  const record = {
    id: `inq-${Date.now().toString().slice(-6)}`,
    serviceIdOrSlug: matched?.slug || key,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    companyName: companyName?.trim(),
    phone: phone?.trim(),
    message: message?.trim() || '',
    calendlyUrl: prefilledCalendlyUrl,
    createdAt: new Date().toISOString(),
  };

  serviceInquiries.unshift(record);

  res.status(201).json({
    message: 'Consulta registrada correctamente.',
    inquiry: record,
    calendlyUrl: prefilledCalendlyUrl,
  });
}

/**
 * 2. TERAPIAS (/api/terapias)
 */
export function listTerapias(_req: Request, res: Response): void {
  res.json({
    terapias: KOSMO_THERAPIES,
    total: KOSMO_THERAPIES.length,
  });
}

export function getTerapiaById(req: Request, res: Response): void {
  const key = String(req.params.id || '').toLowerCase();
  const terapia = KOSMO_THERAPIES.find(
    (t) => t.id.toLowerCase() === key || t.slug.toLowerCase() === key
  );
  if (!terapia) {
    res.status(404).json({ error: 'Terapia no encontrada' });
    return;
  }
  res.json({ terapia });
}

/**
 * 3. PROGRAMAS (/api/programas — PROGRAMA ORIGEN)
 */
export function listProgramas(_req: Request, res: Response): void {
  res.json({
    programas: KOSMO_PROGRAMS,
    // Alias `courses` for backwards compatibility with initial template client.ts
    courses: KOSMO_PROGRAMS,
    total: KOSMO_PROGRAMS.length,
  });
}

export function getProgramaById(req: Request, res: Response): void {
  const key = String(req.params.id || '').toLowerCase();
  const programa = KOSMO_PROGRAMS.find(
    (p) => p.id.toLowerCase() === key || p.slug.toLowerCase() === key
  );
  if (!programa) {
    res.status(404).json({ error: 'Programa no encontrado' });
    return;
  }
  res.json({ programa });
}

/**
 * 4. PRODUCTOS (/api/productos — Sylvia's Sensory Kit, Therapy Packs, E-books)
 */
export function listProductos(req: Request, res: Response): void {
  const { type } = req.query;
  let items = [...KOSMO_PRODUCTS];

  if (typeof type === 'string' && type.trim()) {
    items = items.filter(
      (p) => p.productType.toLowerCase() === type.trim().toLowerCase()
    );
  }

  res.json({
    productos: items,
    total: items.length,
  });
}

export function getProductoById(req: Request, res: Response): void {
  const key = String(req.params.id || '').toLowerCase();
  const producto = KOSMO_PRODUCTS.find(
    (p) => p.id.toLowerCase() === key || p.slug.toLowerCase() === key
  );
  if (!producto) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }
  res.json({ producto });
}

/**
 * 5. EXPERIENCIAS (/api/experiencias — TBD & Waitlist)
 */
export function listExperiencias(_req: Request, res: Response): void {
  res.json({
    status: 'TBD',
    experiencias: KOSMO_EXPERIENCES,
    total: KOSMO_EXPERIENCES.length,
  });
}

export function joinExperienciasWaitlist(req: Request, res: Response): void {
  const { fullName, email, experienceSlug } = req.body as {
    fullName?: string;
    email?: string;
    experienceSlug?: string;
  };

  if (!fullName || !email || !email.includes('@')) {
    res.status(400).json({
      error: 'fullName and a valid email are required.',
    });
    return;
  }

  const entry = {
    id: `wl-${Date.now().toString().slice(-6)}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    experienceSlug: experienceSlug || 'inmersion-presencial-the-source',
    createdAt: new Date().toISOString(),
  };

  experienceWaitlist.unshift(entry);

  res.status(201).json({
    message: 'Te has unido a la lista prioritaria de Experiencias Kosmo Key.',
    registration: entry,
  });
}

/**
 * 6. CALENDLY SCHEDULING (/api/calendly)
 */
export function getCalendlyLinks(_req: Request, res: Response): void {
  res.json({
    baseUrl: env.CALENDLY_BASE_URL,
    consultingUrl: env.CALENDLY_CONSULTING_URL,
    therapyDefaultUrl: env.CALENDLY_THERAPY_DEFAULT_URL,
    terapias: KOSMO_THERAPIES.map((t) => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      facilitatorName: t.facilitatorName,
      durationMinutes: t.durationMinutes,
      priceEur: t.priceEur,
      calendlyUrl: t.calendlyUrl,
    })),
    servicios: KOSMO_SERVICES.filter((s) => s.calendlyUrl).map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      calendlyUrl: s.calendlyUrl,
    })),
  });
}

export function scheduleViaCalendly(req: Request, res: Response): void {
  const { type, targetIdOrSlug, name, email, notes } =
    req.body as Partial<CalendlyScheduleRequest>;

  if (!name || !email || !email.includes('@')) {
    res.status(400).json({
      error: 'name and a valid email are required to generate a Calendly booking link.',
    });
    return;
  }

  const booking = createCalendlyScheduleIntent({
    type: type || 'THERAPY',
    targetIdOrSlug,
    name,
    email,
    notes,
  });

  res.status(201).json(booking);
}
