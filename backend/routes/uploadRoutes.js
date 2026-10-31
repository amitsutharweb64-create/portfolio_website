import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const router = express.Router();

// Memory storage for buffer processing
const storage = multer.memoryStorage();

// File filter with validation for images and PDF
const fileFilter = (req, file, cb) => {
  const allowedImageMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedDocMimes = ['application/pdf'];

  if (allowedImageMimes.includes(file.mimetype) || allowedDocMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP images and PDF documents are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter,
});

// @desc    Upload image or resume file (Cloudinary with local filesystem fallback)
// @route   POST /api/upload
// @access  Private (Admin only)
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please attach a file to upload' });
    }

    const isPdf = req.file.mimetype === 'application/pdf';
    const folderName = isPdf ? 'portfolio_resumes' : 'portfolio_uploads';
    const resourceType = isPdf ? 'raw' : 'image';

    const hasCloudinary =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'demo' &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_KEY !== '123456789012345';

    // If Cloudinary is configured with real credentials, upload to cloud
    if (hasCloudinary) {
      try {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: folderName,
              resource_type: resourceType,
              use_filename: true,
            },
            (error, res) => {
              if (error) reject(error);
              else resolve(res);
            }
          );
          uploadStream.end(req.file.buffer);
        });

        return res.status(200).json({
          success: true,
          message: 'File uploaded successfully to Cloudinary',
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format || (isPdf ? 'pdf' : 'png'),
          bytes: result.bytes,
        });
      } catch (cloudErr) {
        console.warn('Cloudinary upload failed, falling back to local storage:', cloudErr.message);
      }
    }

    // Local file fallback
    const ext = path.extname(req.file.originalname) || (isPdf ? '.pdf' : '.png');
    const safeBase = path.basename(req.file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${Date.now()}_${safeBase}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.promises.writeFile(filePath, req.file.buffer);

    // Keep local URLs portable across frontend hosts and browser tabs.
    const fileUrl = `/uploads/${fileName}`;

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully (local storage)',
      url: fileUrl,
      public_id: fileName,
      format: ext.replace('.', ''),
      bytes: req.file.size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during file upload',
    });
  }
});

export default router;
