import test from 'node:test';
import assert from 'node:assert/strict';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';
import { issueRefreshToken, verifyRefreshToken } from '../../../../core/security/jwt';
import { __getRefreshTokenSession } from '../../../../core/security/refreshTokenSession';
import type { UserRepository } from '../../../../domain/users/UserRepository';

function createUserRepository(status: 'active' | 'suspended'): UserRepository {
  return {
    findById: async (id: string) => ({
      id,
      name: 'Test User',
      email: 'test@example.com',
      phone: '099999999',
      imageUrl: null,
      passwordHash: 'hash',
      role: 'customer',
      status,
      createdAt: new Date(),
    }),
    findByEmail: async () => null,
    findByPhone: async () => null,
    create: async () => {
      throw new Error('not implemented');
    },
    update: async () => {
      throw new Error('not implemented');
    },
    delete: async () => undefined,
  };
}

test('refresh rotates refresh token and keeps family', async () => {
  const useCase = new RefreshTokenUseCase(createUserRepository('active'));
  const { refreshToken } = issueRefreshToken({ sub: 'u1', role: 'customer' });

  const result = await useCase.execute({ refreshToken });
  const nextPayload = verifyRefreshToken(result.refreshToken);

  assert.equal(typeof result.accessToken, 'string');
  assert.equal(nextPayload.familyId.length > 0, true);
  assert.equal(nextPayload.tokenId.length > 0, true);
  assert.notEqual(nextPayload.tokenId, verifyRefreshToken(refreshToken).tokenId);
});

test('refresh token reuse is rejected and family gets revoked', async () => {
  const useCase = new RefreshTokenUseCase(createUserRepository('active'));
  const { refreshToken } = issueRefreshToken({ sub: 'u2', role: 'customer' });

  await useCase.execute({ refreshToken });
  await assert.rejects(
    async () => useCase.execute({ refreshToken }),
    /reused|revoked/i,
  );

  const originalPayload = verifyRefreshToken(refreshToken);
  const originalSession = __getRefreshTokenSession(originalPayload.tokenId);
  assert.equal(originalSession?.revoked, true);
});

test('refresh fails when user is not active', async () => {
  const useCase = new RefreshTokenUseCase(createUserRepository('suspended'));
  const { refreshToken } = issueRefreshToken({ sub: 'u3', role: 'customer' });

  await assert.rejects(
    async () => useCase.execute({ refreshToken }),
    /Account is not active/i,
  );
});
