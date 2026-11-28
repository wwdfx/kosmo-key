import { env } from '../config/env.js';
import {
  ExperienceItem,
  ProductItem,
  ProgramItem,
  ServiceItem,
  TeamMember,
  TherapySession,
} from '../models/catalog.types.js';

/**
 * TEAM ("La Familia Kosmo")
 * Matches the 9 team members displayed in the frontend Slider component.
 */
export const KOSMO_TEAM: TeamMember[] = [
  {
    id: 'team-ona',
    slug: 'ona-di-stefano',
    name: 'Ona di Stefano',
    role: 'Fundadora y estrategia de marca',
    bio: 'Fundadora de Kosmo Key. Especialista en arquitectura de marca, visión estratégica y dirección de negocios conscientes.',
    specialties: ['Kosmo Architecture', 'Estrategia de Marca', 'Consultoría Personalizada'],
    calendlyUrl: `${env.CALENDLY_BASE_URL}/ona-di-stefano`,
  },
  {
    id: 'team-sylvia',
    slug: 'sylvia-gon',
    name: 'Sylvia Gon',
    role: 'Diseño de marca y presencia digital',
    bio: 'Directora creativa y diseñadora de experiencias sensoriales y digitales para marcas con propósito.',
    specialties: ['Identidad Visual', 'Presencia Digital', 'Sensory Kit'],
    calendlyUrl: `${env.CALENDLY_BASE_URL}/sylvia-gon`,
  },
  {
    id: 'team-daniela',
    slug: 'daniela-rojas',
    name: 'Daniela Rojas',
    role: 'Edición de video y creación de contenido',
    bio: 'Narradora visual especializada en producción audiovisual y contenido estratégico para redes sociales.',
    specialties: ['Estrategia Redes Sociales', 'Producción Audiovisual'],
  },
  {
    id: 'team-viktor',
    slug: 'viktor-ihnatiev',
    name: 'Viktor Ihnatiev',
    role: 'Desarrollo web y automatización de procesos',
    bio: 'Arquitecto de software y especialista en digitalización de negocios, plataformas e-commerce, CRMs y automatizaciones.',
    specialties: ['Digitalización de Negocio', 'E-Commerce', 'CRM & Automatización'],
  },
  {
    id: 'team-ani',
    slug: 'ani-basualdo',
    name: 'Ani Basualdo',
    role: 'Terapia integral y automatización de procesos',
    bio: 'Terapeuta integral que une el acompañamiento humano con la organización y fluidez de sistemas.',
    specialties: ['Terapia Integral', 'Acompañamiento Holístico'],
    calendlyUrl: `${env.CALENDLY_BASE_URL}/ani-basualdo`,
  },
  {
    id: 'team-lluis',
    slug: 'lluis-espinosa',
    name: 'Lluís Espinosa',
    role: 'Terapia en biodescodificación y transgeneracional',
    bio: 'Especialista en Biodescodificación y análisis transgeneracional. Director del Programa ORIGEN en Kosmo Key.',
    specialties: ['Biodescodificación', 'Transgeneracional', 'Programa ORIGEN'],
    calendlyUrl: `${env.CALENDLY_BASE_URL}/lluis-espinosa`,
  },
  {
    id: 'team-fernando',
    slug: 'fernando-respira',
    name: 'Fernando Respira',
    role: 'Instructor de breathwork y bienestar metabólico',
    bio: 'Facilitador de Respiración Conectada y protocolos de regulación fisiológica y salud metabólica.',
    specialties: ['Respiración Conectada', 'Breathwork', 'Bienestar Metabólico'],
    calendlyUrl: `${env.CALENDLY_BASE_URL}/fernando-respira`,
  },
  {
    id: 'team-jana',
    slug: 'jana-transition',
    name: 'Jana Transition',
    role: 'Facilitadora de meditación y transformación energética',
    bio: 'Guía de Meditación Cuántica y procesos de transformación energética e integración interior.',
    specialties: ['Meditación Cuántica', 'Transformación Energética'],
    calendlyUrl: `${env.CALENDLY_BASE_URL}/jana-transition`,
  },
  {
    id: 'team-laura',
    slug: 'laura-kattar',
    name: 'Laura Kattar',
    role: 'Especialista en yoga y en bienestar integral',
    bio: 'Instructora de yoga terapéutico y prácticas de presencia corporal para el equilibrio físico y emocional.',
    specialties: ['Yoga Integral', 'Presencia Corporal'],
    calendlyUrl: `${env.CALENDLY_BASE_URL}/laura-kattar`,
  },
];

/**
 * 1. SERVICIOS (/api/servicios)
 * Aligns 1:1 with the 4 sections on ServiciosPage.tsx:
 * - Kosmo Architecture
 * - Digitalización de Negocio
 * - Estrategia Redes Sociales
 * - Consultoría Personalizada (Connected to Calendly)
 */
export const KOSMO_SERVICES: ServiceItem[] = [
  {
    id: 'srv-kosmo-architecture',
    slug: 'kosmo-architecture',
    title: 'KOSMO ARCHITECTURE',
    category: 'STRATEGY',
    shortDescription:
      'Estrategia de marca para dejar de tomar decisiones a ciegas y empieces a construir tu negocio con dirección.',
    fullDescription:
      'Construimos la arquitectura estratégica de tu marca y de tu ecosistema de clientes. Definimos posicionamiento, propuesta de valor, recorrido del cliente y modelo de negocio para que cada decisión tenga propósito y retorno.',
    deliverables: [
      'Auditoría profunda de modelo de negocio y posicionamiento',
      'Arquitectura de cliente ideal (Customer Architecture Strategy)',
      'Manual de identidad verbal, narrativa y dirección estratégica',
      'Hoja de ruta de implementación a 90 días',
    ],
    leadFacilitators: ['Ona di Stefano', 'Sylvia Gon'],
    actionType: 'CALENDLY',
    calendlyUrl: env.CALENDLY_CONSULTING_URL,
    ctaText: 'Agendar sesión estratégica',
  },
  {
    id: 'srv-digitalizacion-negocio',
    slug: 'digitalizacion-de-negocio',
    title: 'DIGITALIZACIÓN DE NEGOCIO',
    category: 'DIGITALIZATION',
    shortDescription:
      'Transformamos tu negocio en una experiencia digital. Diseñamos tu web, desarrollamos tu presencia en redes sociales y conectamos tus canales digitales para que tu marca gane visibilidad, llegue a nuevas audiencias y crezca en el entorno online.',
    fullDescription:
      'Desarrollo integral de tu infraestructura digital: diseño y programación web a medida, tiendas e-commerce con pasarelas de pago (Stripe), implementación de CRMs, embudos de captación y automatización de procesos operativos.',
    deliverables: [
      'Diseño y desarrollo de sitio web o plataforma E-Commerce a medida',
      'Implementación e integración de CRM y gestión de clientes',
      'Automatización de reservas (Calendly), pagos (Stripe) y flujos de email',
      'Optimización técnica, rendimiento y analítica digital',
    ],
    leadFacilitators: ['Viktor Ihnatiev', 'Sylvia Gon', 'Ani Basualdo'],
    actionType: 'CALENDLY',
    calendlyUrl: env.CALENDLY_CONSULTING_URL,
    ctaText: 'Solicitar diagnóstico digital',
  },
  {
    id: 'srv-estrategia-redes-sociales',
    slug: 'estrategia-redes-sociales',
    title: 'ESTRATEGIA REDES SOCIALES',
    category: 'SMM',
    shortDescription:
      'Diseñamos una estrategia de comunicación para que tus redes sociales trabajen a favor de tu negocio. Definimos tu mensaje, contenido y dirección creativa para conectar con tu audiencia, fortalecer tu marca y transformar tu presencia digital en oportunidades de crecimiento.',
    fullDescription:
      'Estrategia Social Media Marketing (SMM) orientada a conversión y comunidad. Creamos pilares de contenido, guiones, dirección de arte y edición de vídeo profesional para posicionar tu voz de forma auténtica.',
    deliverables: [
      'Estrategia editorial y pilares de comunicación mensuales',
      'Dirección creativa, guionización y edición de video (Reels / Shorts)',
      'Optimización de perfiles y embudo orgánico de conversión',
      'Informe mensual de métricas, alcance y crecimiento de comunidad',
    ],
    leadFacilitators: ['Ona di Stefano', 'Daniela Rojas', 'Sylvia Gon'],
    actionType: 'CALENDLY',
    calendlyUrl: env.CALENDLY_CONSULTING_URL,
    ctaText: 'Impulsar mis redes sociales',
  },
  {
    id: 'srv-consultoria-personalizada',
    slug: 'consultoria-personalizada',
    title: 'CONSULTORÍA PERSONALIZADA',
    category: 'CONSULTING',
    shortDescription:
      'Sesiones individuales de asesoramiento para resolver dudas, explorar oportunidades y encontrar soluciones a los retos de tu negocio. Claridad, orientación y acciones concretas para avanzar con confianza.',
    fullDescription:
      'Sesión intensiva 1:1 reservada directamente a través de Calendly para desbloquear cuellos de botella estratégicos, digitales o comunicacionales de tu proyecto con el equipo experto de Kosmo Key.',
    deliverables: [
      'Sesión 1:1 en directo de 60 minutos por videollamada',
      'Diagnóstico accionable sobre tu reto principal de negocio',
      'Grabación de la sesión y resumen con próximos pasos concretos',
      'Reserva inmediata de fecha y hora vía Calendly',
    ],
    leadFacilitators: ['Ona di Stefano', 'Viktor Ihnatiev'],
    actionType: 'CALENDLY',
    calendlyUrl: env.CALENDLY_CONSULTING_URL,
    priceEur: 120,
    priceDisplay: '120 € / sesión',
    ctaText: 'Reservar en Calendly',
  },
];

/**
 * 2. TERAPIAS (/api/terapias)
 * Landing page catalog for therapy sessions connected to Calendly.
 * Matches the 4 sections on TerapiasPage.tsx plus integral therapies.
 */
export const KOSMO_THERAPIES: TherapySession[] = [
  {
    id: 'ter-biodescodificacion',
    slug: 'biodescodificacion',
    title: 'BIODESCODIFICACIÓN',
    subtitle: 'Terapia en biodescodificación y análisis transgeneracional',
    shortDescription:
      'Explora el origen emocional e inconsciente de tus bloqueos, síntomas físicos y patrones familiares repetitivos para liberar tu potencial vital.',
    fullDescription:
      'Acompañamiento terapéutico individual con Lluís Espinosa para identificar las memorias emocionales y programas transgeneracionales que condicionan tu bienestar actual, integrando recursos prácticos de toma de conciencia y liberación.',
    facilitatorName: 'Lluís Espinosa',
    facilitatorSlug: 'lluis-espinosa',
    durationMinutes: 60,
    format: 'Online',
    priceEur: 90,
    priceCents: 9000,
    currency: 'EUR',
    calendlyUrl: `${env.CALENDLY_BASE_URL}/biodescodificacion-lluis`,
    calendlyEventSlug: 'biodescodificacion-lluis',
    benefits: [
      'Identificación de patrones inconscientes y lealtades familiares',
      'Comprensión del sentido biológico y emocional de bloqueos recurrentes',
      'Herramientas personalizadas de integración para tu vida diaria',
    ],
    ctaText: 'Reservar sesión en Calendly',
  },
  {
    id: 'ter-constelaciones',
    slug: 'constelaciones',
    title: 'CONSTELACIONES',
    subtitle: 'Constelaciones familiares y mirada sistémica',
    shortDescription:
      'Ordena tu sistema familiar y vincular para recuperar tu lugar, tu fuerza vital y la armonía en tus relaciones personales y profesionales.',
    fullDescription:
      'Sesiones individuales de configuración sistémica donde hacemos visible las dinámicas ocultas de tu árbol familiar o proyecto, restaurando el orden y liberando cargas que no te corresponden.',
    facilitatorName: 'Lluís Espinosa',
    facilitatorSlug: 'lluis-espinosa',
    durationMinutes: 75,
    format: 'Online / Presencial',
    priceEur: 95,
    priceCents: 9500,
    currency: 'EUR',
    calendlyUrl: `${env.CALENDLY_BASE_URL}/constelaciones`,
    calendlyEventSlug: 'constelaciones',
    benefits: [
      'Resolución de conflictos vinculares de pareja, familia o trabajo',
      'Liberación de cargas sistémicas heredadas',
      'Reconexión con tu fuerza y claridad para avanzar',
    ],
    ctaText: 'Reservar sesión en Calendly',
  },
  {
    id: 'ter-respiracion-conectada',
    slug: 'respiracion-conectada',
    title: 'RESPIRACIÓN CONECTADA',
    subtitle: 'Breathwork consciente y regulación del sistema nervioso',
    shortDescription:
      'Libera tensiones acumuladas, oxigena tu cuerpo y regula tu sistema nervioso y bienestar metabólico a través del poder de tu respiración.',
    fullDescription:
      'Sesiones guiadas de Breathwork y Respiración Conectada con Fernando Respira para desbloquear el diafragma, reducir el estrés crónico, mejorar la flexibilidad metabólica y alcanzar estados profundos de claridad mental.',
    facilitatorName: 'Fernando Respira',
    facilitatorSlug: 'fernando-respira',
    durationMinutes: 60,
    format: 'Online',
    priceEur: 80,
    priceCents: 8000,
    currency: 'EUR',
    calendlyUrl: `${env.CALENDLY_BASE_URL}/respiracion-conectada`,
    calendlyEventSlug: 'respiracion-conectada',
    benefits: [
      'Descarga profunda de estrés físico y emocional acumulado',
      'Optimización de la capacidad respiratoria y energía vital',
      'Protocolo práctico de respiración para aplicar en casa',
    ],
    ctaText: 'Reservar sesión en Calendly',
  },
  {
    id: 'ter-meditacion-cuantica',
    slug: 'meditacion-cuantica',
    title: 'MEDITACIÓN CUÁNTICA',
    subtitle: 'Transformación energética y coherencia interior',
    shortDescription:
      'Alinea mente, emoción y campo energético para salir del piloto automático y sintonizar con una nueva frecuencia de presencia y creación.',
    fullDescription:
      'Sesión individual guiada por Jana Transition que combina meditación profunda, visualización cuántica y armonización energética para disolver resistencias internas y elevar tu estado de coherencia.',
    facilitatorName: 'Jana Transition',
    facilitatorSlug: 'jana-transition',
    durationMinutes: 60,
    format: 'Online',
    priceEur: 85,
    priceCents: 8500,
    currency: 'EUR',
    calendlyUrl: `${env.CALENDLY_BASE_URL}/meditacion-cuantica`,
    calendlyEventSlug: 'meditacion-cuantica',
    benefits: [
      'Calma mental profunda y reducción de ruido interior',
      'Reprogramación de enfoque e intención consciente',
      'Audio de meditación personalizada para práctica continua',
    ],
    ctaText: 'Reservar sesión en Calendly',
  },
];

/**
 * 3. PROGRAMAS (/api/programas)
 * Sylvia's exact template for PROGRAMA ORIGEN with Lluís Espinosa.
 */
export const KOSMO_PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-origen',
    slug: 'programa-origen',
    title: 'PROGRAMA ORIGEN',
    subtitle: 'Programa de Biodescodificación con Lluís Espinosa',
    instructorName: 'Lluís Espinosa',
    instructorSlug: 'lluis-espinosa',
    summary:
      'Un viaje de autoconocimiento y aprendizaje para explorar tu historia familiar, comprender la influencia del inconsciente e identificar los patrones que se repiten en tu vida.',
    description:
      'Integra herramientas de Biodescodificación para tu desarrollo personal y el acompañamiento de otras personas.',
    includes: [
      '8 sesiones online en directo con Lluís.',
      'Formación teórica completa.',
      'Sesiones grupales de preguntas y resolución de dudas.',
      'Prácticas entre compañeros.',
      'Sesiones terapéuticas reales grabadas.',
      'E-books y material descargable.',
      'Acompañamiento durante el programa.',
      '3 años de acceso a la plataforma.',
      'Diploma acreditativo de participación.',
    ],
    format: 'online, en grupo reducido.',
    priceEur: 799,
    priceCents: 79900,
    currency: 'EUR',
    paymentType: 'one_time',
    priceDisplay: '799 € en pago único',
    guaranteeDays: 7,
    guaranteeText: 'Garantía: 7 días.',
    ctaText: 'Inscríbete en ORIGEN.',
    featured: true,
    status: 'OPEN',
  },
];

/**
 * 4. PRODUCTOS (/api/productos)
 * E-commerce base for the "Productos" page with Stripe payment options,
 * featuring Sylvia's Sensory Kit, digital e-books, and therapy bundles.
 */
export const KOSMO_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-sylvia-sensory-kit',
    slug: 'sylvias-sensory-kit',
    title: "SYLVIA'S SENSORY KIT",
    subtitle: 'Kit sensorial de conexión, presencia y ritual diario por Sylvia Gon',
    description:
      'Una experiencia física y sensorial curada por Sylvia Gon para anclar momentos de pausa, creatividad y reconexión en tu espacio cotidiano. Incluye elementos botánicos, aromáticos y guía de rituales conscientes.',
    productType: 'physical',
    priceEur: 145,
    priceCents: 14500,
    currency: 'EUR',
    priceDisplay: '145 €',
    inStock: true,
    stockCount: 20,
    requiresShipping: true,
    status: 'AVAILABLE',
    creatorName: 'Sylvia Gon',
    highlights: [
      'Edición limitada curada artesanalmente por Sylvia Gon',
      'Elementos aromáticos, táctiles y guía impresa de rituales sensoriales',
      'Acceso a audio-guía de inmersión sensorial',
      'Envío incluido en península',
    ],
  },
  {
    id: 'prod-bono-terapia-3',
    slug: 'pack-3-sesiones-terapia',
    title: 'PACK 3 SESIONES DE TERAPIA',
    subtitle: 'Bono de acompañamiento terapéutico (Biodescodificación, Breathwork o Meditación)',
    description:
      'Pack de 3 sesiones individuales a elegir entre nuestros terapeutas de Kosmo Key para sostener un proceso profundo de transformación con tarifa reducida y reserva prioritaria en Calendly.',
    productType: 'therapy_bundle',
    priceEur: 235,
    priceCents: 23500,
    currency: 'EUR',
    priceDisplay: '235 € (Pack 3 sesiones)',
    inStock: true,
    requiresShipping: false,
    status: 'AVAILABLE',
    creatorName: 'Equipo Terapéutico Kosmo Key',
    highlights: [
      '3 sesiones individuales de 60 minutos con tu terapeuta elegido',
      'Enlace directo a Calendly tras el pago para agendar tus horarios',
      'Validez de 6 meses desde la fecha de compra',
    ],
    calendlyUrl: env.CALENDLY_THERAPY_DEFAULT_URL,
  },
  {
    id: 'prod-ebook-transgeneracional',
    slug: 'ebook-mapa-transgeneracional',
    title: 'E-BOOK: MAPA TRANSGENERACIONAL',
    subtitle: 'Guía práctica de auto-indagación familiar por Lluís Espinosa',
    description:
      'Manual digital descargable con ejercicios prácticos para construir y analizar tu árbol genealógico, detectar repeticiones y preparar tu camino hacia la Biodescodificación.',
    productType: 'digital',
    priceEur: 39,
    priceCents: 3900,
    currency: 'EUR',
    priceDisplay: '39 €',
    inStock: true,
    requiresShipping: false,
    status: 'AVAILABLE',
    creatorName: 'Lluís Espinosa',
    highlights: [
      'Descarga digital inmediata en formato PDF interactivo',
      'Plantillas de árbol transgeneracional y ejercicios guiados',
      'Introducción perfecta al Programa ORIGEN',
    ],
  },
];

/**
 * 5. EXPERIENCIAS (/api/experiencias)
 * Currently TBD — structured so the trainee can render an upcoming experiences view
 * and capture waitlist signups.
 */
export const KOSMO_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-retiro-the-source',
    slug: 'inmersion-presencial-the-source',
    title: 'INMERSIÓN PRESENCIAL: THE SOURCE',
    subtitle: 'Encuentro vivencial de naturaleza, respiración, biodescodificación y comunidad',
    description:
      'Próximamente anunciaremos las fechas y localización de nuestra primera experiencia inmersiva presencial con la familia Kosmo Key. Únete a la lista prioritaria para recibir la invitación antes de la apertura pública.',
    location: 'Por confirmar (TBD)',
    dateDisplay: 'Próximamente (TBD)',
    status: 'TBD',
    ctaText: 'Unirme a la lista de espera',
  },
];
