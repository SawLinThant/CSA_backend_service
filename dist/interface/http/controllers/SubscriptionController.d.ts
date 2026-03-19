import type { Request, Response } from 'express';
export declare class SubscriptionController {
    customerListMySubscriptions(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerGetSubscription(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerCreateSubscription(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerPauseSubscription(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerCancelSubscription(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=SubscriptionController.d.ts.map