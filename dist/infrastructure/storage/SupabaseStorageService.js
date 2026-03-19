"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseStorageService = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("../../config/env");
function getClient() {
    if (!(0, env_1.isSupabaseConfigured)()) {
        throw new Error('Supabase Storage is not configured. Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_STORAGE_BUCKET.');
    }
    return (0, supabase_js_1.createClient)(env_1.env.SUPABASE_URL, env_1.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}
class SupabaseStorageService {
    async uploadImage(params) {
        const client = getClient();
        const bucket = env_1.env.SUPABASE_STORAGE_BUCKET;
        const uploadRes = await client.storage.from(bucket).upload(params.key, params.buffer, {
            contentType: params.contentType,
            upsert: false,
        });
        if (uploadRes.error) {
            throw new Error(`Supabase upload failed: ${uploadRes.error.message}`);
        }
        const publicUrlRes = client.storage.from(bucket).getPublicUrl(params.key);
        const publicUrl = publicUrlRes.data.publicUrl;
        if (!publicUrl)
            throw new Error('Supabase public URL missing');
        return publicUrl;
    }
}
exports.SupabaseStorageService = SupabaseStorageService;
//# sourceMappingURL=SupabaseStorageService.js.map