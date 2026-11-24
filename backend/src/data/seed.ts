import { CoachingCourse } from '../models/course.types.js';

export const SEED_COURSES: CoachingCourse[] = [
  {
    id: 'course-the-source',
    slug: 'the-source-raiz-proposito',
    title: 'THE SOURCE: Raíz & Propósito',
    subtitle: 'Programa insignia de reconexión ontológica y liderazgo consciente',
    category: 'SERVICIOS',
    priceEur: 490,
    durationWeeks: 8,
    sessionsCount: 16,
    coachName: 'Elena Vance',
    shortDescription:
      'Viaje de 8 semanas para desmantelar bloqueos invisibles y diseñar una arquitectura vital alineada con tu esencia.',
  },
  {
    id: 'course-micelio-somatic',
    slug: 'micelio-regulacion-somatica',
    title: 'MICELIO: Regulación Somática & Sistema Nervioso',
    subtitle: 'Curso clínico-vivencial de liberación corporal',
    category: 'TERAPIAS',
    priceEur: 360,
    durationWeeks: 6,
    sessionsCount: 12,
    coachName: 'Dr. Mateo Soler',
    shortDescription:
      'Entrena a tu sistema nervioso para salir del estado de alerta crónica y habitar la calma creativa.',
  },
  {
    id: 'course-codice-kosmo',
    slug: 'codice-kosmo-kit-90-dias',
    title: 'CÓDICE KOSMO: Kit de Auto-Coaching 90 Días',
    subtitle: 'Sistema digital interactivo + 18 masterclasses',
    category: 'PRODUCTOS',
    priceEur: 180,
    durationWeeks: 12,
    sessionsCount: 18,
    coachName: 'Equipo Kosmo Key',
    shortDescription:
      'Programa auto-guiado con módulos grabados, plantillas de introspección profunda y sesiones mensuales en vivo.',
  },
  {
    id: 'course-sanctuary-membership',
    slug: 'sanctuary-membresia-trimestral',
    title: 'SANCTUARY: Membresía & Retiro Virtual',
    subtitle: 'Círculo continuo de práctica, coaching grupal e inmersiones',
    category: 'SANCTUARY',
    priceEur: 290,
    durationWeeks: 12,
    sessionsCount: 24,
    coachName: 'Clara & Mateo',
    shortDescription:
      'Refugio trimestral de crecimiento acompañado con dos encuentros semanales en vivo y talleres estacionales.',
  },
];
