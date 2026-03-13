import type { Request, Response } from 'express';
export declare class AuthController {
    customerRegister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerRegister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginCustomer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginFarmer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=AuthController.d.ts.map