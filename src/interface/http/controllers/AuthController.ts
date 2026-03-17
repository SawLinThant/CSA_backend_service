import type { Request, Response } from 'express';
import { PrismaUserRepository } from '../../../infrastructure/db/repositories/PrismaUserRepository';
import { PrismaCustomerRepository } from '../../../infrastructure/db/repositories/PrismaCustomerRepository';
import { PrismaFarmerRepository } from '../../../infrastructure/db/repositories/PrismaFarmerRepository';
import { RegisterCustomerUseCase } from '../../../application/auth/useCases/customer/RegisterCustomerUseCase';
import { RegisterFarmerUseCase } from '../../../application/auth/useCases/farmer/RegisterFarmerUseCase';
import { LoginUseCase } from '../../../application/auth/useCases/login/LoginUseCase';
import { RefreshTokenUseCase } from '../../../application/auth/useCases/refresh/RefreshTokenUseCase';
import { UpdateCustomerProfileUseCase } from '../../../application/users/useCases/customer/profile/UpdateCustomerProfileUseCase';
import { UpdateFarmerProfileUseCase } from '../../../application/users/useCases/farmer/profile/UpdateFarmerProfileUseCase';
import { AdminListCustomersUseCase } from '../../../application/users/useCases/admin/customer/AdminListCustomersUseCase';
import { AdminGetCustomerUseCase } from '../../../application/users/useCases/admin/customer/AdminGetCustomerUseCase';
import { AdminCreateCustomerUseCase } from '../../../application/users/useCases/admin/customer/AdminCreateCustomerUseCase';
import { AdminUpdateCustomerUseCase } from '../../../application/users/useCases/admin/customer/AdminUpdateCustomerUseCase';
import { AdminDeleteCustomerUseCase } from '../../../application/users/useCases/admin/customer/AdminDeleteCustomerUseCase';
import { AdminListFarmersUseCase } from '../../../application/users/useCases/admin/farmer/AdminListFarmersUseCase';
import { AdminToggleUserStatusUseCase } from '../../../application/users/useCases/admin/user/AdminToggleUserStatusUseCase';
import { authValidators } from '../validators/authValidators';
import { userValidators } from '../validators/userValidators';

const userRepository = new PrismaUserRepository();
const customerRepository = new PrismaCustomerRepository();
const farmerRepository = new PrismaFarmerRepository();

const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository);
const registerFarmerUseCase = new RegisterFarmerUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase();
const updateCustomerProfileUseCase = new UpdateCustomerProfileUseCase(userRepository);
const updateFarmerProfileUseCase = new UpdateFarmerProfileUseCase(userRepository, farmerRepository);
const adminListCustomersUseCase = new AdminListCustomersUseCase(customerRepository);
const adminGetCustomerUseCase = new AdminGetCustomerUseCase(customerRepository);
const adminCreateCustomerUseCase = new AdminCreateCustomerUseCase(userRepository, customerRepository);
const adminUpdateCustomerUseCase = new AdminUpdateCustomerUseCase(userRepository, customerRepository);
const adminDeleteCustomerUseCase = new AdminDeleteCustomerUseCase(customerRepository, userRepository);
const adminListFarmersUseCase = new AdminListFarmersUseCase(farmerRepository);
const adminToggleUserStatusUseCase = new AdminToggleUserStatusUseCase(userRepository);

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

  async logout(_req: Request, res: Response) {
    // Tokens are stateless JWTs; logout is handled client-side by discarding tokens.
    // This endpoint exists so clients have a consistent API to call.
    return res.status(200).json({ message: 'Logged out' });
  }

  async updateCustomerProfile(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = userValidators.updateCustomerProfile.safeParse(req.body);
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

  async updateFarmerProfile(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const parseResult = userValidators.updateFarmerProfile.safeParse(req.body);
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

