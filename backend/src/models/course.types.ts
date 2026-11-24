export type CourseCategory = 'SERVICIOS' | 'TERAPIAS' | 'PRODUCTOS' | 'SANCTUARY';

export interface CoachingCourse {
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

export interface PriorityAccessRequest {
  fullName: string;
  email: string;
  interestCategory?: CourseCategory;
}

export interface CheckoutOrderRequest {
  customerName: string;
  customerEmail: string;
  items: Array<{
    courseId: string;
    quantity: number;
  }>;
}
