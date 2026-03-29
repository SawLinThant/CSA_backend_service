import type { Request, Response } from 'express';
export declare class AuthController {
    customerRegister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerRegister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Beta OTP flow: records intent to verify phone. SMS is not sent yet; clients may use any 6-digit OTP at register.
     */
    customerSendOtp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    farmerSendOtp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginCustomer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginFarmer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCustomerProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getCustomerProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCustomerProfileWithUpload(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerListAddresses(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerGetAddress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerCreateAddress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerUpdateAddress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    customerDeleteAddress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getFarmerProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateFarmerProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateFarmerProfileWithUpload(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminListCustomers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminListFarmers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminGetCustomer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminCreateCustomer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminUpdateCustomer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminDeleteCustomer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminToggleUserStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=AuthController.d.ts.map