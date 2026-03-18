import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
  fileFilter(_req, file, cb) {
    if (file.mimetype && ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed: ${ALLOWED_MIMES.join(', ')}`));
    }
  },
}).array('images', MAX_FILES);

const singleUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
  fileFilter(_req, file, cb) {
    if (file.mimetype && ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed: ${ALLOWED_MIMES.join(', ')}`));
    }
  },
}).single('image');

/** Multer middleware that sends 400 on upload errors (file type, size, etc.). */
export function productImagesUpload(req: Request, res: Response, next: NextFunction): void {
  upload(req, res, (err: unknown) => {
    if (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') res.status(400).json({ error: 'File too large (max 5MB)' });
        else if (err.code === 'LIMIT_FILE_COUNT') res.status(400).json({ error: 'Too many files (max 10)' });
        else res.status(400).json({ error: message });
      } else {
        res.status(400).json({ error: message });
      }
      return;
    }
    next();
  });
}

/** Multer middleware for a single image file (field: image). */
export function singleImageUpload(req: Request, res: Response, next: NextFunction): void {
  singleUpload(req, res, (err: unknown) => {
    if (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') res.status(400).json({ error: 'File too large (max 5MB)' });
        else res.status(400).json({ error: message });
      } else {
        res.status(400).json({ error: message });
      }
      return;
    }
    next();
  });
}
