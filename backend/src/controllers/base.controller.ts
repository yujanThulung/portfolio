import { Request, Response } from 'express';
import { Model, Document, FilterQuery } from 'mongoose';
import { APIFeatures } from '../utils/apiFeatures.utils';
import { Logger } from '../utils/logger.utils';
import { ApiResponse } from '../types/express';



export abstract class BaseController<T extends Document> {
    protected abstract model: Model<T>;
    protected abstract searchFields: string[];


    protected sendSuccess(
        res: Response,
        data: any,
        message: string = 'Success',
        statusCode: number = 200
    ): Response {
        const response: ApiResponse = {
            success: true,
            message,
            data
        };
        return res.status(statusCode).json(response);
    }

    protected sendError(
        res: Response,
        message: string = 'Internal server error',
        statusCode: number = 500,
        errors?: any[]
    ): Response {
        const response: ApiResponse = {
            success: false,
            message,
        };
        if (errors) {
            response.data = { errors };
        }
        return res.status(statusCode).json(response);
    }


    // CRUD Operations
    public create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = new this.model(req.body);
            const savedData = await data.save();
            Logger.info(`${this.model.modelName} created successfully, {id: ${savedData._id}`)
            return this.sendSuccess(
                res,
                savedData,
                `${this.model.modelName} created successfully`,
                201)
        } catch (error: any) {
            Logger.error(`Error creating ${this.model.modelName}:`, error);

            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map((err: any) => err.message);
                return this.sendError(res, 'Validation failed', 400, errors);
            }

            if (error.code === 11000) {
                return this.sendError(res, 'Duplicate field value entered', 400);
            }

            return this.sendError(res, error.message, 400);
        }
    }

    public getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;


            const [data, total] = await (Promise.all([
                this.model.find({ isActive: true }).skip(skip).limit(limit),
                this.model.countDocuments({
                    isActive: true
                })
            ]));

            return this.sendSuccess(res, {
                items: data,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }

            }, "Data fetched successfully")
        } catch (error: any) {
            return this.sendError(
                res,
                error.message,
                500,
                error
            )
        }
    }

    public getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await this.model.findOne({
                _id: req.params.id,
                isActive: true,
            });

            if (!data) {
                return this.sendError(
                    res,
                    "Data not found",
                    404
                );
            }

            return this.sendSuccess(
                res,
                data,
                "Data retrived successfully"
            );
        } catch (error: any) {
            return this.sendError(
                res,
                error.message,
                500,
                error
            )
        }
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await this.model.findOneAndUpdate(
                {
                    _id: req.params.id,
                    isActive: true,
                },
                { $set: req.body },
                {
                    new: true, runValidators: true
                }
            );

            if (!data) {
                return this.sendError(
                    res,
                    "Data not found",
                    404
                )
            }

            return this.sendSuccess(
                res,
                data,
                "Data updated successfully"
            )
        } catch (error: any) {
            return this.sendError(
                res,
                error.message,
                500,
                error
            )
        }
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await this.model.findOneAndUpdate(
                {
                    _id: req.params.id,
                    isActive: true,
                },
                { $set: { isActive: false } },
                { new: true }
            );

            if (!data) {
                return this.sendError(
                    res,
                    "Data not found",
                    404
                )
            }

            return this.sendSuccess(
                res,
                data,
                "Data deleted successfully"
            )
        } catch (error: any) {
            return this.sendError(
                res,
                error.message,
                500,
                error
            )
        }
    }
}
