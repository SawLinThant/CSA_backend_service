"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const PrismaUserRepository_1 = require("../../../infrastructure/db/repositories/PrismaUserRepository");
const RegisterCustomerUseCase_1 = require("../../../application/auth/useCases/RegisterCustomerUseCase");
const RegisterFarmerUseCase_1 = require("../../../application/auth/useCases/RegisterFarmerUseCase");
const LoginUseCase_1 = require("../../../application/auth/useCases/LoginUseCase");
const RefreshTokenUseCase_1 = require("../../../application/auth/useCases/RefreshTokenUseCase");
const authValidators_1 = require("../validators/authValidators");
const userRepository = new PrismaUserRepository_1.PrismaUserRepository();
const registerCustomerUseCase = new RegisterCustomerUseCase_1.RegisterCustomerUseCase(userRepository);
const registerFarmerUseCase = new RegisterFarmerUseCase_1.RegisterFarmerUseCase(userRepository);
const loginUseCase = new LoginUseCase_1.LoginUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase_1.RefreshTokenUseCase();
class AuthController {
    async customerRegister(req, res) {
        const parseResult = authValidators_1.authValidators.registerCustomer.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await registerCustomerUseCase.execute(parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
        }
    }
    async farmerRegister(req, res) {
        const parseResult = authValidators_1.authValidators.registerFarmer.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await registerFarmerUseCase.execute(parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
        }
    }
    async loginAdmin(req, res) {
        const parseResult = authValidators_1.authValidators.login.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await loginUseCase.execute(parseResult.data, 'admin');
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
        }
    }
    async loginCustomer(req, res) {
        const parseResult = authValidators_1.authValidators.login.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await loginUseCase.execute(parseResult.data, 'customer');
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
        }
    }
    async loginFarmer(req, res) {
        const parseResult = authValidators_1.authValidators.login.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await loginUseCase.execute(parseResult.data, 'farmer');
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
        }
    }
    async refreshToken(req, res) {
        const parseResult = authValidators_1.authValidators.refreshToken.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await refreshTokenUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({ error: error instanceof Error ? error.message : 'Refresh failed' });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map