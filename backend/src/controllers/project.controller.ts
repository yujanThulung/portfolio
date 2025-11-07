import { Request, Response } from "express";
import Project, { IProject } from '../models/project.model';
import { BaseController } from "../controllers/base.controller";
import { Logger } from "../utils/logger.utils";
import { APIFeatures } from "../utils/apiFeatures.utils";
import { cloudinaryService } from "../config/cloudinary.config";

export class ProjectController extends BaseController<IProject> {
    protected model = Project;
    protected searchFields = ['title', 'description', 'technologies', 'category'];

    constructor() {
        super();
    }

    // Get project by slug
    public getBySlug = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { slug } = req.params;

            if (!slug) {
                return this.sendError(res, 'Slug parameter is missing', 400);
            }

            const project = await Project.findBySlug(slug);
            if (!project) {
                return this.sendError(res, 'Project not found', 404);
            }

            return this.sendSuccess(res, project, 'Project retrieved successfully');
        } catch (error: any) {
            Logger.error('Error fetching project by slug:', error);
            return this.sendError(res, error.message, 500);
        }
    }



    //Upload project images 
    public uploadImages = async (req: Request, res: Response): Promise<Response> => {
        try {
            if (!req.files || !(req.files as any).images) {
                return this.sendError(
                    res,
                    'No images provided',
                    400
                );
            }

            const files = (req.files as any).images as Express.Multer.File[];


            //Upload to Cloudinary
            const uploadedImages = await cloudinaryService.uploadMultipleImages(files, 'projects');

            //Transform to project images format
            const projectImages = uploadedImages.map(img => ({
                src: img.src,
                public_id: img.public_id,
                alt: img.alt
            }));

            return this.sendSuccess(
                res,
                projectImages,
                'Images uploaded successfully',
                201
            )
        } catch (error: any) {
            Logger.error('Error uploading images:', error);
            return this.sendError(
                res,
                'Failed to upload images',
                500
            );

        }
    }


    //Create project with image upload
    public createWithImages = async (req: Request, res: Response): Promise<Response> => {
        try {
            const projectData = req.body;

            //Handle image upload if files are present
            if (req.files && (req.files as any).images) {
                const files = (req.files as any).images as Express.Multer.File[];

                //Upload to Cloudinary

                if (files && files.length > 0) {
                    const updatedImages = await cloudinaryService.uploadMultipleImages(files, 'projects');

                    projectData.images = updatedImages.map(img => ({
                        src: img.src,
                        public_id: img.public_id,
                        alt: img.alt
                    }));
                }
            }


            //Add createdBy if user is authenticated
            if (req.user) {
                projectData.createdBy = req.user.id;
            }

            const data = new this.model(projectData);
            const savedData = await data.save();

            Logger.info(
                'Project created with images',
                {
                    id: savedData._id,
                    slug: savedData.slug,
                    imageCount: savedData.images.length
                }
            )

            return this.sendSuccess(
                res,
                savedData,
                'Project created with images successfully',
                201
            );
        } catch (error: any) {
            Logger.error('Error creating project with images:', error);

            //Cleanup uploaded images if project creation fails
            if (req.files && (req.files as any).images) {
                const files = (req.files as any).images as Express.Multer.File[];

                Logger.warn('Project creation failed. Cleaning up uploaded images.');
            }

            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map((err: any) => err.message);
                return this.sendError(
                    res,
                    'Validation failed',
                    400,
                    errors
                )
            }

            if (error.code === 11000) {
                return this.sendError(
                    res,
                    'Project with this slug already esists',
                    400
                )
            }

            return this.sendError(
                res,
                'Failed to create project',
                500
            );
        }
    }


    //Update project images
    public updateImages = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;


            //Find existing project 
            const project = await this.model.findById(id);
            if (!project) {
                return this.sendError(
                    res,
                    'Project not found',
                    404
                )
            }

            //Handle new image uploads
            if (req.files && (req.files as any).images) {
                const files = (req.files as any).images as Express.Multer.File[];



                const uploadedImages = await cloudinaryService.uploadMultipleImages(files, 'projects');


                const newImages = uploadedImages.map(img => ({
                    src: img.src,
                    public_id: img.public_id,
                    alt: img.alt ?? ''
                }));


                //Add new images to existing ones 
                project.images = [...project.images, ...newImages];
            }


            //Handle image deletion if specified
            if (req.body.imagesToDelete) {
                const imagesToDetele = JSON.parse(req.body.imagesToDelete);
                project.images = project.images.filter(img => !imagesToDetele.includes(img.public_id));
            }

            //Update updatedBy if user is authenticated
            if (req.user) {
                project.updatedBy = req.user.id;
            }


            const updatedProject = await project.save();

            Logger.info('Project imgaes updated', {
                id: updatedProject._id,
                newImageCount: updatedProject.images.length
            })
            return this.sendSuccess(
                res,
                updatedProject,
                'Project images updated successfully',
                200
            )
        } catch (error: any) {
            Logger.error('Error updating project images:', error);
            return this.sendError(
                res,
                'Failed to update project images',
                500
            )
        }
    }


    //Delete specific project images
    public deleteImages = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {

            const { id } = req.params;
            const { publicIds } = req.body;

            if (!publicIds || !Array.isArray(publicIds)) {
                return this.sendError(
                    res,
                    'Invalid public IDs',
                    400
                )
            }

            //Find project
            const project = await this.model.findById(id);
            if (!project) {
                return this.sendError(
                    res,
                    'Project not found',
                    404
                );
            }

            //Delete from Cloudinary
            await cloudinaryService.deleteMultipleImages(publicIds);


            //Remove form project 
            project.images = project.images.filter(
                (img: any) => !publicIds.includes(img.public_id)
            );

            // Update updatedBy if user is authenticated
            if (req.user) {
                project.updatedBy = req.user.id;
            }

            await project.save();

            Logger.info('Project images deleted', {
                id: project._id,
                deleteCount: project.images.length
            })

            return this.sendSuccess(
                res,
                { deletedCount: publicIds.length },
                'Image deleted successfully',
                200
            )

        } catch (error: any) {
            Logger.error('Error deleting project images:', error);
            return this.sendError(
                res,
                error.message,
                500
            )
        }



        // Set cover image
    public setCoverImage = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { publicId } = req.body;

            if (!publicId) {
                return this.sendError(res, 'Image public ID is required', 400);
            }

            const project = await this.model.findById(id);
            if (!project) {
                return this.sendError(res, 'Project not found', 404);
            }

            // Reset all images to not be cover
            project.images.forEach((img: any) => {
                img.isCover = false;
            });

            // Set the specified image as cover
            const coverImage = project.images.find((img: any) => img.public_id === publicId);
            if (!coverImage) {
                return this.sendError(res, 'Image not found in project', 404);
            }

            coverImage.isCover = true;

            // Update updatedBy if user is authenticated
            if (req.user) {
                project.updatedBy = req.user.id;
            }

            const updatedProject = await project.save();

            Logger.info('Cover image set', {
                id,
                coverImage: publicId
            });

            return this.sendSuccess(
                res,
                updatedProject,
                'Cover image set successfully'
            );
        } catch (error: any) {
            Logger.error('Error setting cover image:', error);
            return this.sendError(res, error.message, 500);
        }
    }
    //Override create to handle slug generation and user tracking 
    public create = async (req: Request, res: Response): Promise<Response> => {
        try {
            if (req.user) {
                req.body.user = req.user.id;
            }

            const data = new this.model(req.body);
            const savedData = await data.save();

            Logger.info(
                'Project created successfully',
                {
                    id: savedData._id,
                    slug: savedData.slug
                }
            );

            return this.sendSuccess(
                res,
                savedData,
                'Project created successfully',
                201
            );
        } catch (error: any) {
            Logger.error('Error creating project:', error);

            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map((err: any) => err.message);
                return this.sendError(
                    res,
                    'Validation failed',
                    400,
                    errors
                );
            }

            if (error.code === 11000) {
                return this.sendError(
                    res,
                    'Duplicate field value entered',
                    400
                );
            }

            return this.sendError(
                res,
                error.message,
                400
            );
        }
    }


    //Bulk update projects
    public bulkUpdate = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { ids, updateData } = req.body;

            if (!Array.isArray(ids) || ids.length === 0) {
                return this.sendError(
                    res,
                    'Invalid project IDs',
                    400,
                )
            }

            //Add updateBy if user is authenticated
            if (req.user) {
                updateData.updateBy = req.user.id;
            }

            const result = await this.model.updateMany(
                {
                    _id: {
                        $in: ids
                    },
                    isActive: true
                },
                {
                    $set: updateData
                }
            );

            if (result.modifiedCount === 0) {
                return this.sendError(
                    res,
                    'No projects were updated',
                    404
                )
            }

            Logger.info(
                'Projects updated successfully',
                {
                    count: result.modifiedCount
                }
            );

            return this.sendSuccess(
                res,
                { modifiedCount: result.modifiedCount },
                `${result.modifiedCount} projects updated successfully`
            );
        } catch (error: any) {
            Logger.error(
                'Error in bulk update:', error
            );
            return this.sendError(
                res,
                error.message,
                500
            )
        }
    }

}

export default new ProjectController();
