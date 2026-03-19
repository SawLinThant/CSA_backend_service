"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageService = getStorageService;
const env_1 = require("../../config/env");
const S3StorageService_1 = require("./S3StorageService");
const SupabaseStorageService_1 = require("./SupabaseStorageService");
function getStorageService() {
    if (env_1.env.STORAGE_PROVIDER === 'supabase')
        return new SupabaseStorageService_1.SupabaseStorageService();
    return new S3StorageService_1.S3StorageService();
}
//# sourceMappingURL=storageFactory.js.map