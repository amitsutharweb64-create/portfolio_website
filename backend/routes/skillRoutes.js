import express from 'express';
import {
  getSkills,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
} from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, createSkillCategory);

router.route('/:id')
  .put(protect, updateSkillCategory)
  .delete(protect, deleteSkillCategory);

export default router;
