"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productImagesUpload = productImagesUpload;
exports.singleImageUpload = singleImageUpload;
const multer_1 = __importDefault(require("multer"));
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;
const memoryStorage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: memoryStorage,
    limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
    fileFilter(_req, file, cb) {
        if (file.mimetype && ALLOWED_MIMES.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error(`Invalid file type. Allowed: ${ALLOWED_MIMES.join(', ')}`));
        }
    },
}).array('images', MAX_FILES);
const singleUpload = (0, multer_1.default)({
    storage: memoryStorage,
    limits: { fileSize: MAX_FILE_SIZE, files: 1 },
    fileFilter(_req, file, cb) {
        if (file.mimetype && ALLOWED_MIMES.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error(`Invalid file type. Allowed: ${ALLOWED_MIMES.join(', ')}`));
        }
    },
}).single('image');
/** Multer middleware that sends 400 on upload errors (file type, size, etc.). */
function productImagesUpload(req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            const message = err instanceof Error ? err.message : 'Upload failed';
            if (err instanceof multer_1.default.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE')
                    res.status(400).json({ error: 'File too large (max 5MB)' });
                else if (err.code === 'LIMIT_FILE_COUNT')
                    res.status(400).json({ error: 'Too many files (max 10)' });
                else
                    res.status(400).json({ error: message });
            }
            else {
                res.status(400).json({ error: message });
            }
            return;
        }
        next();
    });
}
/** Multer middleware for a single image file (field: image). */
function singleImageUpload(req, res, next) {
    singleUpload(req, res, (err) => {
        if (err) {
            const message = err instanceof Error ? err.message : 'Upload failed';
            if (err instanceof multer_1.default.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE')
                    res.status(400).json({ error: 'File too large (max 5MB)' });
                else
                    res.status(400).json({ error: message });
            }
            else {
                res.status(400).json({ error: message });
            }
            return;
        }
        next();
    });
}
//# sourceMappingURL=uploadMiddleware.js.map