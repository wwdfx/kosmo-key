import { Request, Response } from 'express';
import { SEED_COURSES } from '../data/seed.js';
import {
  CheckoutOrderRequest,
  PriorityAccessRequest,
} from '../models/course.types.js';

export function listCourses(req: Request, res: Response): void {
  const { category } = req.query;
  let courses = [...SEED_COURSES];

  if (typeof category === 'string' && category.trim().length > 0 && category !== 'ALL') {
    courses = courses.filter(
      (course) => course.category.toUpperCase() === category.toUpperCase()
    );
  }

  res.json({
    courses,
    total: courses.length,
  });
}

export function getCourseById(req: Request, res: Response): void {
  const course = SEED_COURSES.find(
    (c) => c.id === req.params.id || c.slug === req.params.id
  );
  if (!course) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }
  res.json({ course });
}

export function registerPriorityAccess(req: Request, res: Response): void {
  const { fullName, email, interestCategory } = req.body as PriorityAccessRequest;

  if (!fullName || !email || !email.includes('@')) {
    res.status(400).json({ error: 'Valid fullName and email are required.' });
    return;
  }

  res.status(201).json({
    message: 'Priority access registered successfully.',
    registration: {
      id: `pa-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      interestCategory: interestCategory || 'SERVICIOS',
      createdAt: new Date().toISOString(),
    },
  });
}

export function createCheckoutOrder(req: Request, res: Response): void {
  const { customerName, customerEmail, items } = req.body as CheckoutOrderRequest;

  if (!customerName || !customerEmail || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({
      error: 'customerName, customerEmail, and at least one course item are required.',
    });
    return;
  }

  res.status(201).json({
    message: 'Order created successfully.',
    orderId: `KK-${Date.now().toString().slice(-6)}`,
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
  });
}
