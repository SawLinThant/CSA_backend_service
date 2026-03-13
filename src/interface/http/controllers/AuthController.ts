import type { Request, Response } from 'express';
import { PrismaUserRepository } from '../../../infrastructure/db/repositories/PrismaUserRepository';
import { RegisterCustomerUseCase } from '../../../application/auth/useCases/RegisterCustomerUseCase';
import { RegisterFarmerUseCase } from '../../../application/auth/useCases/RegisterFarmerUseCase';
import { LoginUseCase } from '../../../application/auth/useCases/LoginUseCase';
import { RefreshTokenUseCase } from '../../../application/auth/useCases/RefreshTokenUseCase';
import { authValidators } from '../validators/authValidators';

const userRepository = new PrismaUserRepository();
const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository);
const registerFarmerUseCase = new RegisterFarmerUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase();

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
}

