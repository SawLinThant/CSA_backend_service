import { createClient } from '@supabase/supabase-js';
import { env, isSupabaseConfigured } from '../../config/env';
import type { StorageService, UploadImageParams } from './StorageService';

function getClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase Storage is not configured. Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_STORAGE_BUCKET.',
    );
  }
  return createClient(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export class SupabaseStorageService implements StorageService {
  async uploadImage(params: UploadImageParams): Promise<string> {
    const client = getClient();
    const bucket = env.SUPABASE_STORAGE_BUCKET!;

    const uploadRes = await client.storage.from(bucket).upload(params.key, params.buffer, {
      contentType: params.contentType,
      upsert: false,
    });

    if (uploadRes.error) {
      throw new Error(`Supabase upload failed: ${uploadRes.error.message}`);
    }

    const publicUrlRes = client.storage.from(bucket).getPublicUrl(params.key);
    const publicUrl = publicUrlRes.data.publicUrl;
    if (!publicUrl) throw new Error('Supabase public URL missing');
    return publicUrl;
  }
}

