"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageService = exports.getImageExtension = void 0;
const env_1 = require("../../config/env");
const S3UploadService_1 = require("./S3UploadService");
Object.defineProperty(exports, "getImageExtension", { enumerable: true, get: function () { return S3UploadService_1.getImageExtension; } });
class S3StorageService {
    async uploadImage(params) {
        if (!(0, env_1.isS3Configured)()) {
            throw new Error('S3 is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET.');
        }
        // uploadToS3 already checks config; this is just a clearer message path.
        return (0, S3UploadService_1.uploadToS3)(params);
    }
}
exports.S3StorageService = S3StorageService;
//# sourceMappingURL=S3StorageService.js.map