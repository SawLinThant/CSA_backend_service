import { env } from '../../config/env';
import type { StorageService } from './StorageService';
import { S3StorageService } from './S3StorageService';
import { SupabaseStorageService } from './SupabaseStorageService';

export function getStorageService(): StorageService {
  if (env.STORAGE_PROVIDER === 'supabase') return new SupabaseStorageService();
  return new S3StorageService();
}

