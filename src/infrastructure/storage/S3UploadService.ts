import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env, isS3Configured } from '../../config/env';

function getClient(): S3Client {
  if (!isS3Configured()) {
    throw new Error('S3 is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET.');
  }
  return new S3Client({
    region: env.AWS_REGION!,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
};

export function getImageExtension(mimeType: string): string {
  return MIME_TO_EXT[mimeType] ?? '.jpg';
}

/**
 * Uploads a buffer to S3 and returns the public URL of the object.
 * Bucket must allow public read (e.g. bucket policy or ACL public-read).
 */
export async function uploadToS3(params: {
  buffer: Buffer;
  key: string;
  contentType: string;
}): Promise<string> {
  const client = getClient();
  const bucket = env.AWS_S3_BUCKET!;
  const region = env.AWS_REGION!;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: params.key,
      Body: params.buffer,
      ContentType: params.contentType,
      ACL: 'public-read',
    }),
  );

  return `https://${bucket}.s3.${region}.amazonaws.com/${params.key}`;
}
