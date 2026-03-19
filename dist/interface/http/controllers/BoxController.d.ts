import type { Request, Response } from 'express';
export declare class BoxController {
    adminListBoxes(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminGetBox(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminCreateBox(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminCreateBoxWithUpload(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpdateBox(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpdateBoxWithUpload(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminDeleteBox(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminListBoxVersions(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminGetBoxVersion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminCreateBoxVersion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpdateBoxVersion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminDeleteBoxVersion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminListBoxVersionItems(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminGetBoxItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminCreateBoxItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpdateBoxItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminDeleteBoxItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    publicListBoxes(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    publicGetBox(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    publicListBoxVersions(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    publicGetBoxVersion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    publicListBoxVersionItems(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=BoxController.d.ts.map