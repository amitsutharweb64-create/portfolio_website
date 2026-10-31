import mongoose from 'mongoose';

const TimelineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Organization or Institution is required'],
      trim: true,
    },
    period: {
      type: String,
      required: [true, 'Period is required (e.g. 2024 — Present)'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Type must be experience or education'],
      enum: ['experience', 'education'],
      default: 'experience',
    },
    badge: {
      type: String,
      default: '',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Timeline', TimelineSchema);
