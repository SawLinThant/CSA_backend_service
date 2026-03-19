import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        test: "test";
        production: "production";
    }>>;
    PORT: z.ZodOptional<z.ZodString>;
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    REFRESH_TOKEN_SECRET: z.ZodString;
    REFRESH_TOKEN_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    STORAGE_PROVIDER: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        s3: "s3";
        supabase: "supabase";
    }>>>;
    AWS_ACCESS_KEY_ID: z.ZodOptional<z.ZodString>;
    AWS_SECRET_ACCESS_KEY: z.ZodOptional<z.ZodString>;
    AWS_REGION: z.ZodOptional<z.ZodString>;
    AWS_S3_BUCKET: z.ZodOptional<z.ZodString>;
    SUPABASE_URL: z.ZodOptional<z.ZodString>;
    SUPABASE_SERVICE_ROLE_KEY: z.ZodOptional<z.ZodString>;
    SUPABASE_STORAGE_BUCKET: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
export declare const env: Env;
export declare function isS3Configured(): boolean;
export declare function isSupabaseConfigured(): boolean;
export {};
//# sourceMappingURL=env.d.ts.map