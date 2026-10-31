import mongoose from 'mongoose';

const SingleSkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 80,
    },
    icon: {
      type: String,
      default: 'Code2',
      trim: true,
    },
  },
  { _id: false }
);

const SkillGroupSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Skill category name is required'],
      trim: true,
    },
    skills: [SingleSkillSchema],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Skill', SkillGroupSchema);
