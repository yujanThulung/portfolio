import { Request, Response } from "express";
import Project, { IProject } from '../models/project.model';
import { BaseController } from "../controllers/base.controller";
import { Logger } from "../utils/logger.utils";
import { APIFeatures } from "../utils/apiFeatures.utils";

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
