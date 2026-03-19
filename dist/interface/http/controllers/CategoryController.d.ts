import type { Request, Response } from 'express';
export declare class CategoryController {
    adminListCategories(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminGetCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminCreateCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpdateCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminDeleteCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=CategoryController.d.ts.map