"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const PrismaUserRepository_1 = require("../../../infrastructure/db/repositories/PrismaUserRepository");
const PrismaCustomerRepository_1 = require("../../../infrastructure/db/repositories/PrismaCustomerRepository");
const PrismaFarmerRepository_1 = require("../../../infrastructure/db/repositories/PrismaFarmerRepository");
const RegisterCustomerUseCase_1 = require("../../../application/auth/useCases/customer/RegisterCustomerUseCase");
const RegisterFarmerUseCase_1 = require("../../../application/auth/useCases/farmer/RegisterFarmerUseCase");
const LoginUseCase_1 = require("../../../application/auth/useCases/login/LoginUseCase");
const RefreshTokenUseCase_1 = require("../../../application/auth/useCases/refresh/RefreshTokenUseCase");
const UpdateCustomerProfileUseCase_1 = require("../../../application/users/useCases/customer/profile/UpdateCustomerProfileUseCase");
const UpdateFarmerProfileUseCase_1 = require("../../../application/users/useCases/farmer/profile/UpdateFarmerProfileUseCase");
const AdminListCustomersUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminListCustomersUseCase");
const AdminGetCustomerUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminGetCustomerUseCase");
const AdminCreateCustomerUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminCreateCustomerUseCase");
const AdminUpdateCustomerUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminUpdateCustomerUseCase");
const AdminDeleteCustomerUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminDeleteCustomerUseCase");
const AdminListFarmersUseCase_1 = require("../../../application/users/useCases/admin/farmer/AdminListFarmersUseCase");
const AdminToggleUserStatusUseCase_1 = require("../../../application/users/useCases/admin/user/AdminToggleUserStatusUseCase");
const authValidators_1 = require("../validators/authValidators");
const userValidators_1 = require("../validators/userValidators");
const userRepository = new PrismaUserRepository_1.PrismaUserRepository();
const customerRepository = new PrismaCustomerRepository_1.PrismaCustomerRepository();
const farmerRepository = new PrismaFarmerRepository_1.PrismaFarmerRepository();
const registerCustomerUseCase = new RegisterCustomerUseCase_1.RegisterCustomerUseCase(userRepository);
const registerFarmerUseCase = new RegisterFarmerUseCase_1.RegisterFarmerUseCase(userRepository);
const loginUseCase = new LoginUseCase_1.LoginUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase_1.RefreshTokenUseCase();
const updateCustomerProfileUseCase = new UpdateCustomerProfileUseCase_1.UpdateCustomerProfileUseCase(userRepository);
const updateFarmerProfileUseCase = new UpdateFarmerProfileUseCase_1.UpdateFarmerProfileUseCase(userRepository, farmerRepository);
const adminListCustomersUseCase = new AdminListCustomersUseCase_1.AdminListCustomersUseCase(customerRepository);
const adminGetCustomerUseCase = new AdminGetCustomerUseCase_1.AdminGetCustomerUseCase(customerRepository);
const adminCreateCustomerUseCase = new AdminCreateCustomerUseCase_1.AdminCreateCustomerUseCase(userRepository, customerRepository);
const adminUpdateCustomerUseCase = new AdminUpdateCustomerUseCase_1.AdminUpdateCustomerUseCase(userRepository, customerRepository);
const adminDeleteCustomerUseCase = new AdminDeleteCustomerUseCase_1.AdminDeleteCustomerUseCase(customerRepository, userRepository);
const adminListFarmersUseCase = new AdminListFarmersUseCase_1.AdminListFarmersUseCase(farmerRepository);
const adminToggleUserStatusUseCase = new AdminToggleUserStatusUseCase_1.AdminToggleUserStatusUseCase(userRepository);
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
    async logout(_req, res) {
        // Tokens are stateless JWTs; logout is handled client-side by discarding tokens.
        // This endpoint exists so clients have a consistent API to call.
        return res.status(200).json({ message: 'Logged out' });
    }
    async updateCustomerProfile(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = userValidators_1.userValidators.updateCustomerProfile.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await updateCustomerProfileUseCase.execute(req.user.id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
        }
    }
    async updateFarmerProfile(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = userValidators_1.userValidators.updateFarmerProfile.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await updateFarmerProfileUseCase.execute(req.user.id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
        }
    }
    async adminListCustomers(req, res) {
        const parseResult = userValidators_1.userValidators.listCustomersQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListCustomersUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async adminListFarmers(req, res) {
        const parseResult = userValidators_1.userValidators.listFarmersQuery.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
        }
        try {
            const result = await adminListFarmersUseCase.execute(parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async adminGetCustomer(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Customer id required' });
        try {
            const result = await adminGetCustomerUseCase.execute(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async adminCreateCustomer(req, res) {
        const parseResult = userValidators_1.userValidators.adminCreateCustomer.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminCreateCustomerUseCase.execute(parseResult.data);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Create failed' });
        }
    }
    async adminUpdateCustomer(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Customer id required' });
        const parseResult = userValidators_1.userValidators.adminUpdateCustomer.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const result = await adminUpdateCustomerUseCase.execute(id, parseResult.data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
        }
    }
    async adminDeleteCustomer(req, res) {
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Customer id required' });
        try {
            await adminDeleteCustomerUseCase.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
        }
    }
    async adminToggleUserStatus(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'User id required' });
        try {
            const user = await adminToggleUserStatusUseCase.execute(id, req.user.id);
            return res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status,
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map