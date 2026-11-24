export type CourseCategory = 'SERVICIOS' | 'TERAPIAS' | 'PRODUCTOS' | 'SANCTUARY';

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CourseCategory;
  priceEur: number;
  durationWeeks: number;
  sessionsCount: number;
  coachName: string;
  shortDescription: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}
