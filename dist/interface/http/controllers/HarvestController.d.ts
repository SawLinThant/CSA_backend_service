import type { Request, Response } from 'express';
export declare class HarvestController {
    farmerListMyHarvests(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerGetHarvest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerCreateHarvest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerUpdateHarvest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminListHarvests(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminGetHarvest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminApproveHarvest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminRejectHarvest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=HarvestController.d.ts.map