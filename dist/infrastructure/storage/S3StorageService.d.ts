import { getImageExtension } from './S3UploadService';
import type { StorageService, UploadImageParams } from './StorageService';
export { getImageExtension };
export declare class S3StorageService implements StorageService {
    uploadImage(params: UploadImageParams): Promise<string>;
}
//# sourceMappingURL=S3StorageService.d.ts.map