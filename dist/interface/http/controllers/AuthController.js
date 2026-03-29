"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const crypto_1 = require("crypto");
const PrismaUserRepository_1 = require("../../../infrastructure/db/repositories/PrismaUserRepository");
const PrismaCustomerRepository_1 = require("../../../infrastructure/db/repositories/PrismaCustomerRepository");
const PrismaFarmerRepository_1 = require("../../../infrastructure/db/repositories/PrismaFarmerRepository");
const PrismaAddressRepository_1 = require("../../../infrastructure/db/repositories/PrismaAddressRepository");
const RegisterCustomerUseCase_1 = require("../../../application/auth/useCases/customer/RegisterCustomerUseCase");
const RegisterFarmerUseCase_1 = require("../../../application/auth/useCases/farmer/RegisterFarmerUseCase");
const LoginUseCase_1 = require("../../../application/auth/useCases/login/LoginUseCase");
const RefreshTokenUseCase_1 = require("../../../application/auth/useCases/refresh/RefreshTokenUseCase");
const UpdateCustomerProfileUseCase_1 = require("../../../application/users/useCases/customer/profile/UpdateCustomerProfileUseCase");
const GetCustomerProfileUseCase_1 = require("../../../application/users/useCases/customer/profile/GetCustomerProfileUseCase");
const UpdateFarmerProfileUseCase_1 = require("../../../application/users/useCases/farmer/profile/UpdateFarmerProfileUseCase");
const GetFarmerProfileUseCase_1 = require("../../../application/users/useCases/farmer/profile/GetFarmerProfileUseCase");
const AdminListCustomersUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminListCustomersUseCase");
const AdminGetCustomerUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminGetCustomerUseCase");
const AdminCreateCustomerUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminCreateCustomerUseCase");
const AdminUpdateCustomerUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminUpdateCustomerUseCase");
const AdminDeleteCustomerUseCase_1 = require("../../../application/users/useCases/admin/customer/AdminDeleteCustomerUseCase");
const AdminListFarmersUseCase_1 = require("../../../application/users/useCases/admin/farmer/AdminListFarmersUseCase");
const AdminToggleUserStatusUseCase_1 = require("../../../application/users/useCases/admin/user/AdminToggleUserStatusUseCase");
const ListCustomerAddressesUseCase_1 = require("../../../application/users/useCases/customer/address/ListCustomerAddressesUseCase");
const GetCustomerAddressUseCase_1 = require("../../../application/users/useCases/customer/address/GetCustomerAddressUseCase");
const CreateCustomerAddressUseCase_1 = require("../../../application/users/useCases/customer/address/CreateCustomerAddressUseCase");
const UpdateCustomerAddressUseCase_1 = require("../../../application/users/useCases/customer/address/UpdateCustomerAddressUseCase");
const DeleteCustomerAddressUseCase_1 = require("../../../application/users/useCases/customer/address/DeleteCustomerAddressUseCase");
const authValidators_1 = require("../validators/authValidators");
const userValidators_1 = require("../validators/userValidators");
const S3StorageService_1 = require("../../../infrastructure/storage/S3StorageService");
const storageFactory_1 = require("../../../infrastructure/storage/storageFactory");
const userRepository = new PrismaUserRepository_1.PrismaUserRepository();
const customerRepository = new PrismaCustomerRepository_1.PrismaCustomerRepository();
const farmerRepository = new PrismaFarmerRepository_1.PrismaFarmerRepository();
const addressRepository = new PrismaAddressRepository_1.PrismaAddressRepository();
const registerCustomerUseCase = new RegisterCustomerUseCase_1.RegisterCustomerUseCase(userRepository);
const registerFarmerUseCase = new RegisterFarmerUseCase_1.RegisterFarmerUseCase(userRepository);
const loginUseCase = new LoginUseCase_1.LoginUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase_1.RefreshTokenUseCase();
const updateCustomerProfileUseCase = new UpdateCustomerProfileUseCase_1.UpdateCustomerProfileUseCase(userRepository);
const getCustomerProfileUseCase = new GetCustomerProfileUseCase_1.GetCustomerProfileUseCase(userRepository);
const updateFarmerProfileUseCase = new UpdateFarmerProfileUseCase_1.UpdateFarmerProfileUseCase(userRepository, farmerRepository);
const getFarmerProfileUseCase = new GetFarmerProfileUseCase_1.GetFarmerProfileUseCase(userRepository, farmerRepository);
const adminListCustomersUseCase = new AdminListCustomersUseCase_1.AdminListCustomersUseCase(customerRepository);
const adminGetCustomerUseCase = new AdminGetCustomerUseCase_1.AdminGetCustomerUseCase(customerRepository);
const adminCreateCustomerUseCase = new AdminCreateCustomerUseCase_1.AdminCreateCustomerUseCase(userRepository, customerRepository);
const adminUpdateCustomerUseCase = new AdminUpdateCustomerUseCase_1.AdminUpdateCustomerUseCase(userRepository, customerRepository);
const adminDeleteCustomerUseCase = new AdminDeleteCustomerUseCase_1.AdminDeleteCustomerUseCase(customerRepository, userRepository);
const adminListFarmersUseCase = new AdminListFarmersUseCase_1.AdminListFarmersUseCase(farmerRepository);
const adminToggleUserStatusUseCase = new AdminToggleUserStatusUseCase_1.AdminToggleUserStatusUseCase(userRepository);
const listCustomerAddressesUseCase = new ListCustomerAddressesUseCase_1.ListCustomerAddressesUseCase(addressRepository);
const getCustomerAddressUseCase = new GetCustomerAddressUseCase_1.GetCustomerAddressUseCase(addressRepository);
const createCustomerAddressUseCase = new CreateCustomerAddressUseCase_1.CreateCustomerAddressUseCase(addressRepository);
const updateCustomerAddressUseCase = new UpdateCustomerAddressUseCase_1.UpdateCustomerAddressUseCase(addressRepository);
const deleteCustomerAddressUseCase = new DeleteCustomerAddressUseCase_1.DeleteCustomerAddressUseCase(addressRepository);
const storage = (0, storageFactory_1.getStorageService)();
function nullableString(value) {
    if (value === undefined)
        return undefined;
    const text = String(value).trim();
    if (text === '')
        return null;
    return text;
}
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
    /**
     * Beta OTP flow: records intent to verify phone. SMS is not sent yet; clients may use any 6-digit OTP at register.
     */
    async customerSendOtp(req, res) {
        const parseResult = authValidators_1.authValidators.sendOtp.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        return res.status(200).json({
            message: 'OTP process started (beta: SMS not sent; enter any 6 digits when registering)',
            expiresInSeconds: 300,
        });
    }
    async farmerSendOtp(req, res) {
        const parseResult = authValidators_1.authValidators.sendOtp.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        return res.status(200).json({
            message: 'OTP process started (beta: SMS not sent; enter any 6 digits when registering)',
            expiresInSeconds: 300,
        });
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
        const parseResult = userValidators_1.userValidators.updateCustomerProfile.safeParse({
            name: req.body?.name,
            phone: req.body?.phone,
            email: nullableString(req.body?.email),
            imageUrl: nullableString(req.body?.imageUrl),
        });
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
    async getCustomerProfile(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const result = await getCustomerProfileUseCase.execute(req.user.id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message === 'Forbidden')
                return res.status(403).json({ error: message });
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async updateCustomerProfileWithUpload(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const file = req.file;
        const parseResult = userValidators_1.userValidators.updateCustomerProfile.safeParse({
            name: req.body?.name,
            phone: req.body?.phone,
            email: nullableString(req.body?.email),
            imageUrl: nullableString(req.body?.imageUrl),
        });
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            let imageUrl = parseResult.data.imageUrl;
            if (file) {
                const ext = (0, S3StorageService_1.getImageExtension)(file.mimetype);
                const key = `users/${req.user.id}/profile/${Date.now()}-${(0, crypto_1.randomUUID)()}${ext}`;
                imageUrl = await storage.uploadImage({ buffer: file.buffer, key, contentType: file.mimetype });
            }
            const result = await updateCustomerProfileUseCase.execute(req.user.id, {
                ...parseResult.data,
                ...(imageUrl !== undefined && { imageUrl }),
            });
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('configured') || message.includes('upload failed'))
                return res.status(503).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async customerListAddresses(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const items = await listCustomerAddressesUseCase.execute(req.user.id);
            return res.status(200).json({ items });
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Failed' });
        }
    }
    async customerGetAddress(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Address id required' });
        try {
            const item = await getCustomerAddressUseCase.execute(req.user.id, id);
            return res.status(200).json(item);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async customerCreateAddress(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = userValidators_1.userValidators.createAddress.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const item = await createCustomerAddressUseCase.execute(req.user.id, parseResult.data);
            return res.status(201).json(item);
        }
        catch (error) {
            return res.status(400).json({ error: error instanceof Error ? error.message : 'Create failed' });
        }
    }
    async customerUpdateAddress(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Address id required' });
        const parseResult = userValidators_1.userValidators.updateAddress.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            const item = await updateCustomerAddressUseCase.execute(req.user.id, id, parseResult.data);
            return res.status(200).json(item);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async customerDeleteAddress(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
        if (!id)
            return res.status(400).json({ error: 'Address id required' });
        try {
            await deleteCustomerAddressUseCase.execute(req.user.id, id);
            return res.status(204).send();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Delete failed';
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async getFarmerProfile(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const result = await getFarmerProfileUseCase.execute(req.user.id);
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed';
            if (message === 'Forbidden')
                return res.status(403).json({ error: message });
            if (message.includes('not found'))
                return res.status(404).json({ error: message });
            return res.status(400).json({ error: message });
        }
    }
    async updateFarmerProfile(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const parseResult = userValidators_1.userValidators.updateFarmerProfile.safeParse({
            name: req.body?.name,
            phone: req.body?.phone,
            email: nullableString(req.body?.email),
            imageUrl: nullableString(req.body?.imageUrl),
            farmName: req.body?.farmName,
            farmLocation: req.body?.farmLocation,
            farmDescription: nullableString(req.body?.farmDescription),
        });
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
    async updateFarmerProfileWithUpload(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        const file = req.file;
        const parseResult = userValidators_1.userValidators.updateFarmerProfile.safeParse({
            name: req.body?.name,
            phone: req.body?.phone,
            email: nullableString(req.body?.email),
            imageUrl: nullableString(req.body?.imageUrl),
            farmName: req.body?.farmName,
            farmLocation: req.body?.farmLocation,
            farmDescription: nullableString(req.body?.farmDescription),
        });
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
        }
        try {
            let imageUrl = parseResult.data.imageUrl;
            if (file) {
                const ext = (0, S3StorageService_1.getImageExtension)(file.mimetype);
                const key = `users/${req.user.id}/profile/${Date.now()}-${(0, crypto_1.randomUUID)()}${ext}`;
                imageUrl = await storage.uploadImage({ buffer: file.buffer, key, contentType: file.mimetype });
            }
            const result = await updateFarmerProfileUseCase.execute(req.user.id, {
                ...parseResult.data,
                ...(imageUrl !== undefined && { imageUrl }),
            });
            return res.status(200).json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Update failed';
            if (message.includes('configured') || message.includes('upload failed'))
                return res.status(503).json({ error: message });
            return res.status(400).json({ error: message });
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