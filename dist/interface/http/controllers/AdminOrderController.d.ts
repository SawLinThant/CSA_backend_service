import type { Request, Response } from 'express';
export declare class AdminOrderController {
    adminListOrders(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminGetOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpdateOrderStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpsertDelivery(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=AdminOrderController.d.ts.map