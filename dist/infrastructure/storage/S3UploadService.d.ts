export declare function getImageExtension(mimeType: string): string;
/**
 * Uploads a buffer to S3 and returns the public URL of the object.
 * Bucket must allow public read (e.g. bucket policy or ACL public-read).
 */
export declare function uploadToS3(params: {
    buffer: Buffer;
    key: string;
    contentType: string;
}): Promise<string>;
//# sourceMappingURL=S3UploadService.d.ts.map