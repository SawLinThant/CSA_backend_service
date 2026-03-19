import type { Request, Response } from 'express';
export declare class ProductController {
    publicListProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    publicGetProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerListMyProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerGetProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerCreateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerCreateProductWithUpload(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerUpdateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerUpdateProductWithUpload(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerDeleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=ProductController.d.ts.map