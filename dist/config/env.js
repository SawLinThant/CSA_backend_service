"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.isS3Configured = isS3Configured;
exports.isSupabaseConfigured = isSupabaseConfigured;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.string().optional(),
    DATABASE_URL: zod_1.z.string().url(),
    JWT_SECRET: zod_1.z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: zod_1.z.string().default('15m'),
    REFRESH_TOKEN_SECRET: zod_1.z.string().min(32, 'REFRESH_TOKEN_SECRET must be at least 32 characters'),
    REFRESH_TOKEN_EXPIRES_IN: zod_1.z.string().default('7d'),
    STORAGE_PROVIDER: zod_1.z.enum(['s3', 'supabase']).optional().default('s3'),
    AWS_ACCESS_KEY_ID: zod_1.z.string().optional(),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string().optional(),
    AWS_REGION: zod_1.z.string().optional(),
    AWS_S3_BUCKET: zod_1.z.string().optional(),
    SUPABASE_URL: zod_1.z.string().optional(),
    SUPABASE_SERVICE_ROLE_KEY: zod_1.z.string().optional(),
    SUPABASE_STORAGE_BUCKET: zod_1.z.string().optional(),
});
exports.env = envSchema.parse(process.env);
function isS3Configured() {
    return !!(exports.env.AWS_ACCESS_KEY_ID && exports.env.AWS_SECRET_ACCESS_KEY && exports.env.AWS_REGION && exports.env.AWS_S3_BUCKET);
}
function isSupabaseConfigured() {
    return !!(exports.env.SUPABASE_URL && exports.env.SUPABASE_SERVICE_ROLE_KEY && exports.env.SUPABASE_STORAGE_BUCKET);
}
//# sourceMappingURL=env.js.map