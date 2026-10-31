import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitContactMessage,
  getContactMessages,
  markMessageRead,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Strict rate limit on message submission (max 5 submissions per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many contact messages sent from this IP. Please wait 15 minutes before submitting again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.route('/')
  .post(contactLimiter, submitContactMessage)
  .get(protect, getContactMessages);

router.route('/:id/read')
  .patch(protect, markMessageRead);

router.route('/:id')
  .delete(protect, deleteContactMessage);

export default router;
