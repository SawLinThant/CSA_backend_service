import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { PrismaUserRepository } from '../../../infrastructure/db/repositories/PrismaUserRepository';
import { PrismaCustomerRepository } from '../../../infrastructure/db/repositories/PrismaCustomerRepository';
import { PrismaFarmerRepository } from '../../../infrastructure/db/repositories/PrismaFarmerRepository';
import { PrismaAddressRepository } from '../../../infrastructure/db/repositories/PrismaAddressRepository';
import { RegisterCustomerUseCase } from '../../../application/auth/useCases/customer/RegisterCustomerUseCase';
import { RegisterFarmerUseCase } from '../../../application/auth/useCases/farmer/RegisterFarmerUseCase';
import { LoginUseCase } from '../../../application/auth/useCases/login/LoginUseCase';
import { RefreshTokenUseCase } from '../../../application/auth/useCases/refresh/RefreshTokenUseCase';
import { UpdateCustomerProfileUseCase } from '../../../application/users/useCases/customer/profile/UpdateCustomerProfileUseCase';
import { GetCustomerProfileUseCase } from '../../../application/users/useCases/customer/profile/GetCustomerProfileUseCase';
import { UpdateFarmerProfileUseCase } from '../../../application/users/useCases/farmer/profile/UpdateFarmerProfileUseCase';
import { GetFarmerProfileUseCase } from '../../../application/users/useCases/farmer/profile/GetFarmerProfileUseCase';
import { AdminListCustomersUseCase } from '../../../application/users/useCases/admin/customer/AdminListCustomersUseCase';
import { AdminGetCustomerUseCase } from '../../../application/users/useCases/admin/customer/AdminGetCustomerUseCase';
import { AdminCreateCustomerUseCase } from '../../../application/users/useCases/admin/customer/AdminCreateCustomerUseCase';
import { AdminUpdateCustomerUseCase } from '../../../application/users/useCases/admin/customer/AdminUpdateCustomerUseCase';
import { AdminDeleteCustomerUseCase } from '../../../application/users/useCases/admin/customer/AdminDeleteCustomerUseCase';
import { AdminListFarmersUseCase } from '../../../application/users/useCases/admin/farmer/AdminListFarmersUseCase';
import { AdminToggleUserStatusUseCase } from '../../../application/users/useCases/admin/user/AdminToggleUserStatusUseCase';
import { ListCustomerAddressesUseCase } from '../../../application/users/useCases/customer/address/ListCustomerAddressesUseCase';
import { GetCustomerAddressUseCase } from '../../../application/users/useCases/customer/address/GetCustomerAddressUseCase';
import { CreateCustomerAddressUseCase } from '../../../application/users/useCases/customer/address/CreateCustomerAddressUseCase';
import { UpdateCustomerAddressUseCase } from '../../../application/users/useCases/customer/address/UpdateCustomerAddressUseCase';
import { DeleteCustomerAddressUseCase } from '../../../application/users/useCases/customer/address/DeleteCustomerAddressUseCase';
import { authValidators } from '../validators/authValidators';
import { userValidators } from '../validators/userValidators';
import { getImageExtension } from '../../../infrastructure/storage/S3StorageService';
import { getStorageService } from '../../../infrastructure/storage/storageFactory';
import { clearRefreshTokenSessionsForUser, revokeRefreshTokenFamily } from '../../../core/security/refreshTokenSession';
import { verifyRefreshToken } from '../../../core/security/jwt';

const userRepository = new PrismaUserRepository();
const customerRepository = new PrismaCustomerRepository();
const farmerRepository = new PrismaFarmerRepository();
const addressRepository = new PrismaAddressRepository();

const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository);
const registerFarmerUseCase = new RegisterFarmerUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository);
const updateCustomerProfileUseCase = new UpdateCustomerProfileUseCase(userRepository);
const getCustomerProfileUseCase = new GetCustomerProfileUseCase(userRepository);
const updateFarmerProfileUseCase = new UpdateFarmerProfileUseCase(userRepository, farmerRepository);
const getFarmerProfileUseCase = new GetFarmerProfileUseCase(userRepository, farmerRepository);
const adminListCustomersUseCase = new AdminListCustomersUseCase(customerRepository);
const adminGetCustomerUseCase = new AdminGetCustomerUseCase(customerRepository);
const adminCreateCustomerUseCase = new AdminCreateCustomerUseCase(userRepository, customerRepository);
const adminUpdateCustomerUseCase = new AdminUpdateCustomerUseCase(userRepository, customerRepository);
const adminDeleteCustomerUseCase = new AdminDeleteCustomerUseCase(customerRepository, userRepository);
const adminListFarmersUseCase = new AdminListFarmersUseCase(farmerRepository);
const adminToggleUserStatusUseCase = new AdminToggleUserStatusUseCase(userRepository);
const listCustomerAddressesUseCase = new ListCustomerAddressesUseCase(addressRepository);
const getCustomerAddressUseCase = new GetCustomerAddressUseCase(addressRepository);
const createCustomerAddressUseCase = new CreateCustomerAddressUseCase(addressRepository);
const updateCustomerAddressUseCase = new UpdateCustomerAddressUseCase(addressRepository);
const deleteCustomerAddressUseCase = new DeleteCustomerAddressUseCase(addressRepository);
const storage = getStorageService();

function nullableString(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  const text = String(value).trim();
  if (text === '') return null;
  return text;
}

export class AuthController {
  async customerRegister(req: Request, res: Response) {
    const parseResult = authValidators.registerCustomer.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    try {
      const result = await registerCustomerUseCase.execute(parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
    }
  }

  async farmerRegister(req: Request, res: Response) {
    const parseResult = authValidators.registerFarmer.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    try {
      const result = await registerFarmerUseCase.execute(parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
    }
  }

  /**
   * Beta OTP flow: records intent to verify phone. SMS is not sent yet; clients may use any 6-digit OTP at register.
   */
  async customerSendOtp(req: Request, res: Response) {
    const parseResult = authValidators.sendOtp.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    return res.status(200).json({
      message: 'OTP process started (beta: SMS not sent; enter any 6 digits when registering)',
      expiresInSeconds: 300,
    });
  }

  async farmerSendOtp(req: Request, res: Response) {
    const parseResult = authValidators.sendOtp.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    return res.status(200).json({
      message: 'OTP process started (beta: SMS not sent; enter any 6 digits when registering)',
      expiresInSeconds: 300,
    });
  }

  async loginAdmin(req: Request, res: Response) {
    const parseResult = authValidators.login.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    try {
      const result = await loginUseCase.execute(parseResult.data, 'admin');
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
    }
  }

  async loginCustomer(req: Request, res: Response) {
    const parseResult = authValidators.login.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    try {
      const result = await loginUseCase.execute(parseResult.data, 'customer');
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
    }
  }

  async loginFarmer(req: Request, res: Response) {
    const parseResult = authValidators.login.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    try {
      const result = await loginUseCase.execute(parseResult.data, 'farmer');
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
    }
  }

  async refreshToken(req: Request, res: Response) {
    const parseResult = authValidators.refreshToken.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }

    try {
      const result = await refreshTokenUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error instanceof Error ? error.message : 'Refresh failed' });
    }
  }

  async logout(req: Request, res: Response) {
    const refreshToken = typeof req.body?.refreshToken === 'string' ? req.body.refreshToken : null;
    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken);
        if (payload.type === 'refresh') {
          revokeRefreshTokenFamily(payload.familyId);
          clearRefreshTokenSessionsForUser(payload.sub);
        }
      } catch {
        // Best effort logout: ignore invalid token and still return success.
      }
    }
    return res.status(200).json({ message: 'Logged out' });
  }

  async updateCustomerProfile(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = userValidators.updateCustomerProfile.safeParse({
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
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
    }
  }

  async getCustomerProfile(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const result = await getCustomerProfileUseCase.execute(req.user.id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message === 'Forbidden') return res.status(403).json({ error: message });
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async updateCustomerProfileWithUpload(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const file = (req as Request & { file?: Express.Multer.File }).file;
    const parseResult = userValidators.updateCustomerProfile.safeParse({
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
        const ext = getImageExtension(file.mimetype);
        const key = `users/${req.user.id}/profile/${Date.now()}-${randomUUID()}${ext}`;
        imageUrl = await storage.uploadImage({ buffer: file.buffer, key, contentType: file.mimetype });
      }
      const result = await updateCustomerProfileUseCase.execute(req.user.id, {
        ...parseResult.data,
        ...(imageUrl !== undefined && { imageUrl }),
      });
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('configured') || message.includes('upload failed')) return res.status(503).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async customerListAddresses(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const items = await listCustomerAddressesUseCase.execute(req.user.id);
      return res.status(200).json({ items });
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async customerGetAddress(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Address id required' });
    try {
      const item = await getCustomerAddressUseCase.execute(req.user.id, id);
      return res.status(200).json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async customerCreateAddress(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = userValidators.createAddress.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const item = await createCustomerAddressUseCase.execute(req.user.id, parseResult.data);
      return res.status(201).json(item);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Create failed' });
    }
  }

  async customerUpdateAddress(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Address id required' });
    const parseResult = userValidators.updateAddress.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const item = await updateCustomerAddressUseCase.execute(req.user.id, id, parseResult.data);
      return res.status(200).json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async customerDeleteAddress(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Address id required' });
    try {
      await deleteCustomerAddressUseCase.execute(req.user.id, id);
      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async getFarmerProfile(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const result = await getFarmerProfileUseCase.execute(req.user.id);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message === 'Forbidden') return res.status(403).json({ error: message });
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async updateFarmerProfile(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = userValidators.updateFarmerProfile.safeParse({
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
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
    }
  }

  async updateFarmerProfileWithUpload(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const file = (req as Request & { file?: Express.Multer.File }).file;
    const parseResult = userValidators.updateFarmerProfile.safeParse({
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
        const ext = getImageExtension(file.mimetype);
        const key = `users/${req.user.id}/profile/${Date.now()}-${randomUUID()}${ext}`;
        imageUrl = await storage.uploadImage({ buffer: file.buffer, key, contentType: file.mimetype });
      }
      const result = await updateFarmerProfileUseCase.execute(req.user.id, {
        ...parseResult.data,
        ...(imageUrl !== undefined && { imageUrl }),
      });
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      if (message.includes('configured') || message.includes('upload failed')) return res.status(503).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }

  async adminListCustomers(req: Request, res: Response) {
    const parseResult = userValidators.listCustomersQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListCustomersUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async adminListFarmers(req: Request, res: Response) {
    const parseResult = userValidators.listFarmersQuery.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid query', details: parseResult.error.format() });
    }
    try {
      const result = await adminListFarmersUseCase.execute(parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
  }

  async adminGetCustomer(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Customer id required' });
    try {
      const result = await adminGetCustomerUseCase.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async adminCreateCustomer(req: Request, res: Response) {
    const parseResult = userValidators.adminCreateCustomer.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminCreateCustomerUseCase.execute(parseResult.data);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Create failed' });
    }
  }

  async adminUpdateCustomer(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Customer id required' });
    const parseResult = userValidators.adminUpdateCustomer.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.format() });
    }
    try {
      const result = await adminUpdateCustomerUseCase.execute(id, parseResult.data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
    }
  }

  async adminDeleteCustomer(req: Request, res: Response) {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'Customer id required' });
    try {
      await adminDeleteCustomerUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error instanceof Error ? error.message : 'Not found' });
    }
  }

  async adminToggleUserStatus(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) return res.status(400).json({ error: 'User id required' });
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed';
      if (message.includes('not found')) return res.status(404).json({ error: message });
      return res.status(400).json({ error: message });
    }
  }
}

