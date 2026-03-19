import type { Request, Response } from 'express';
export declare class SubscriptionPlanController {
    adminListSubscriptionPlans(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminGetSubscriptionPlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminCreateSubscriptionPlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpdateSubscriptionPlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminDeleteSubscriptionPlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    publicListSubscriptionPlans(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    publicGetSubscriptionPlan(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=SubscriptionPlanController.d.ts.map