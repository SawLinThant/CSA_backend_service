export type StorageProvider = 's3' | 'supabase';

export interface UploadImageParams {
  buffer: Buffer;
  key: string;
  contentType: string;
}

export interface StorageService {
  uploadImage(params: UploadImageParams): Promise<string>;
}

