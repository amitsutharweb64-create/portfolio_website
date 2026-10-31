import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuing organization is required'],
      trim: true,
    },
    issueDate: {
      type: String,
      required: [true, 'Issue year or date is required'],
      trim: true,
    },
    verificationUrl: {
      type: String,
      default: '',
      trim: true,
    },
    highlight: {
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

export default mongoose.model('Certificate', CertificateSchema);
