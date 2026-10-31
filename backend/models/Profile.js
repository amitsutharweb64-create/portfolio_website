import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      default: 'Amit Suthar',
      trim: true,
    },
    title: {
      type: String,
      default: 'Full-Stack Developer & 3D Web Enthusiast',
      trim: true,
    },
    bio: {
      type: String,
      default: 'Building modern, accessible, and high-performance digital experiences.',
      trim: true,
    },
    about: {
      type: String,
      default: 'I am a developer driven by curiosity and craft.',
      trim: true,
    },
    learningJourney: {
      type: String,
      default: 'Constantly expanding knowledge across modern reactive architectures and Three.js pipelines.',
      trim: true,
    },
    careerGoals: {
      type: String,
      default: 'Aspiring to build scalable products and deliver intuitive web experiences.',
      trim: true,
    },
    email: {
      type: String,
      default: 'amit.suthar.dev@example.com',
      trim: true,
    },
    location: {
      type: String,
      default: 'India',
      trim: true,
    },
    status: {
      type: String,
      default: 'Available for full-time roles & projects',
      trim: true,
    },
    github: {
      type: String,
      default: 'https://github.com',
      trim: true,
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com',
      trim: true,
    },
    twitter: {
      type: String,
      default: '',
      trim: true,
    },
    resumeUrl: {
      type: String,
      default: '',
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Profile', ProfileSchema);
