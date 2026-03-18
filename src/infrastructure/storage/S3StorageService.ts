import { env, isS3Configured } from '../../config/env';
import { getImageExtension, uploadToS3 } from './S3UploadService';
import type { StorageService, UploadImageParams } from './StorageService';

export { getImageExtension };

export class S3StorageService implements StorageService {
  async uploadImage(params: UploadImageParams): Promise<string> {
    if (!isS3Configured()) {
      throw new Error(
        'S3 is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET.',
      );
    }
    // uploadToS3 already checks config; this is just a clearer message path.
    return uploadToS3(params);
  }
}

