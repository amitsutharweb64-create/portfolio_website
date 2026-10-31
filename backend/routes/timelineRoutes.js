import express from 'express';
import {
  getTimeline,
  createTimeline,
  updateTimeline,
  deleteTimeline,
} from '../controllers/timelineController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getTimeline)
  .post(protect, createTimeline);

router.route('/:id')
  .put(protect, updateTimeline)
  .delete(protect, deleteTimeline);

export default router;
