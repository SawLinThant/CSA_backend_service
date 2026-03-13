import argon2 from 'argon2';

export const passwordHasher = {
  hash: (plain: string): Promise<string> => argon2.hash(plain),
  verify: (hash: string, plain: string): Promise<boolean> => argon2.verify(hash, plain),
};

