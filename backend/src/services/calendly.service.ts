import { env } from '../config/env.js';
import { KOSMO_SERVICES, KOSMO_TEAM, KOSMO_THERAPIES } from '../data/seed.js';
import {
  CalendlyScheduleRequest,
  CalendlyScheduleResponse,
} from '../models/catalog.types.js';

const bookingIntents: CalendlyScheduleResponse[] = [];

export function buildPrefilledCalendlyUrl(
  baseUrl: string,
  params: { name?: string; email?: string; notes?: string }
): string {
  const url = new URL(baseUrl);
  if (params.name) url.searchParams.set('name', params.name.trim());
  if (params.email) url.searchParams.set('email', params.email.trim());
  if (params.notes) url.searchParams.set('a1', params.notes.trim());
  return url.toString();
}

export function createCalendlyScheduleIntent(
  payload: CalendlyScheduleRequest
): CalendlyScheduleResponse {
  const slugKey = payload.targetIdOrSlug?.trim().toLowerCase();

  let title = 'Consultoría Personalizada — Kosmo Key';
  let facilitatorName = 'Equipo Kosmo Key';
  let calendlyUrl = env.CALENDLY_CONSULTING_URL;

  if (payload.type === 'THERAPY' || slugKey) {
    const matchedTherapy = KOSMO_THERAPIES.find(
      (t) => t.id.toLowerCase() === slugKey || t.slug.toLowerCase() === slugKey
    );

    if (matchedTherapy) {
      title = `Terapia: ${matchedTherapy.title}`;
      facilitatorName = matchedTherapy.facilitatorName;
      calendlyUrl = matchedTherapy.calendlyUrl;
    } else {
      const matchedService = KOSMO_SERVICES.find(
        (s) => s.id.toLowerCase() === slugKey || s.slug.toLowerCase() === slugKey
      );
      if (matchedService) {
        title = matchedService.title;
        facilitatorName = matchedService.leadFacilitators.join(', ');
        calendlyUrl = matchedService.calendlyUrl || env.CALENDLY_CONSULTING_URL;
      } else {
        const matchedMember = KOSMO_TEAM.find(
          (m) => m.id.toLowerCase() === slugKey || m.slug.toLowerCase() === slugKey
        );
        if (matchedMember && matchedMember.calendlyUrl) {
          title = `Sesión con ${matchedMember.name}`;
          facilitatorName = matchedMember.name;
          calendlyUrl = matchedMember.calendlyUrl;
        }
      }
    }
  }

  const prefilledCalendlyUrl = buildPrefilledCalendlyUrl(calendlyUrl, {
    name: payload.name,
    email: payload.email,
    notes: payload.notes,
  });

  const record: CalendlyScheduleResponse = {
    bookingIntentId: `cal-${Date.now().toString().slice(-6)}`,
    title,
    facilitatorName,
    calendlyUrl,
    prefilledCalendlyUrl,
    createdAt: new Date().toISOString(),
  };

  bookingIntents.unshift(record);
  return record;
}

export function listCalendlyBookingIntents(): CalendlyScheduleResponse[] {
  return bookingIntents;
}
