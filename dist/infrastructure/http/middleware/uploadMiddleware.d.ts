import type { NextFunction, Request, Response } from 'express';
/** Multer middleware that sends 400 on upload errors (file type, size, etc.). */
export declare function productImagesUpload(req: Request, res: Response, next: NextFunction): void;
/** Multer middleware for a single image file (field: image). */
export declare function singleImageUpload(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=uploadMiddleware.d.ts.map