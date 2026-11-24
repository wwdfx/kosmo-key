import { Router } from 'express';
import {
  createCheckoutOrder,
  getCourseById,
  listCourses,
  registerPriorityAccess,
} from '../controllers/courses.controller.js';

const router = Router();

router.get('/courses', listCourses);
router.get('/courses/:id', getCourseById);
router.post('/priority-access', registerPriorityAccess);
router.post('/checkout', createCheckoutOrder);

export default router;
