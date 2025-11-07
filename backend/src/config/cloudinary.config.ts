import { v2 as cloudinary } from 'cloudinary';
import { Logger } from '../utils/logger.utils';


class CloudinaryService {
    private static instace: CloudinaryService;

    private isConfigred = false;

    private constructor() { }

    public static getInstance(): CloudinaryService {
        if (!CloudinaryService.instace) {
            CloudinaryService.instace = new CloudinaryService();
        }

        return CloudinaryService.instace;
    }


    public configure(): void {
        if (this.isConfigred) return;

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
            api_key: process.env.CLOUDINARY_API_KEY as string,
            api_secret: process.env.CLOUDINARY_API_SECRET as string,
            secure: true
        });

        this.isConfigred = true;
        Logger.info('Cloudinary configured successfully');
    }


    public async uploadImage(
        fileBuffer: Buffer,
        folder: string = 'projects',
        transformation: any = {}
    ): Promise<{ url: string; public_id: string }> {
        try {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder,
                        resource_type: 'image',
                        transformation: {
                            quality: 'auto',
                            fetch_format: 'auto',
                            ...transformation
                        }
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else if (result) {
                            resolve({
                                url: result.secure_url,
                                public_id: result.public_id
                            });
                        } else {
                            reject(new Error('Upload failed: No result returned'));
                        }
                    });
                uploadStream.end(fileBuffer);
            })

        } catch (error: any) {
            Logger.error(
                'Error uploading image to Cloudinary:',
                error
            )
            throw error;
        }
    }

    public async uploadMultipleImages(
        files: Express.Multer.File[],
        folder: string = 'projects',
    ): Promise<Array<{ src: string; public_id: string; alt?: string }>> {
        try {
            const uploadPromises = files.map(async (file) => {
                const result = await this.uploadImage(file.buffer, folder);
                return {
                    src: result.url,
                    public_id: result.public_id,
                    alt: file.originalname
                };
            });
            return Promise.all(uploadPromises);
        } catch (error: any) {
            Logger.error(
                'Multiple image upload error: ',
                error
            );
            throw error;
        }
    }


    public async deleteImage(publicId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(publicId);
            Logger.info('Image deleted from Cloudinary', { publicId });
        } catch (error) {
            Logger.error('Cloudinary delete error:', error);
            throw error;
        }
    }

    public async deleteMultipleImages(publicIds: string[]): Promise<void> {
        try {
            const deletePromises = publicIds.map(publicId => this.deleteImage(publicId));
            await Promise.all(deletePromises);
        } catch (error) {
            Logger.error('Multiple images delete error:', error);
            throw error;
        }
    }
}


export const cloudinaryService = CloudinaryService.getInstance();