"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageExtension = getImageExtension;
exports.uploadToS3 = uploadToS3;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("../../config/env");
function getClient() {
    if (!(0, env_1.isS3Configured)()) {
        throw new Error('S3 is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET.');
    }
    return new client_s3_1.S3Client({
        region: env_1.env.AWS_REGION,
        credentials: {
            accessKeyId: env_1.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env_1.env.AWS_SECRET_ACCESS_KEY,
        },
    });
}
const MIME_TO_EXT = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
};
function getImageExtension(mimeType) {
    return MIME_TO_EXT[mimeType] ?? '.jpg';
}
/**
 * Uploads a buffer to S3 and returns the public URL of the object.
 * Bucket must allow public read (e.g. bucket policy or ACL public-read).
 */
async function uploadToS3(params) {
    const client = getClient();
    const bucket = env_1.env.AWS_S3_BUCKET;
    const region = env_1.env.AWS_REGION;
    await client.send(new client_s3_1.PutObjectCommand({
        Bucket: bucket,
        Key: params.key,
        Body: params.buffer,
        ContentType: params.contentType,
        ACL: 'public-read',
    }));
    return `https://${bucket}.s3.${region}.amazonaws.com/${params.key}`;
}
//# sourceMappingURL=S3UploadService.js.map