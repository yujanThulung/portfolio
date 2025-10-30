import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';
import { error } from 'node:console';
import { cachedDataVersionTag } from 'node:v8';

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };

}

export class BaseController<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    protected sendSuccess(
        res: Response,
        data: any,
        message: string = 'Success',
        statusCode: number = 200): Response {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    protected sendError(
        res: Response,
        message: string = 'Error',
        statusCode: number = 500,
        error?: any
    ): Response {
        return res.status(statusCode).json({
            success: false,
            message,
            error
        });
    }


    // CRUD Operations
    public create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = new this.model(req.body);
            const savedData = await data.save();
            return this.sendSuccess(
                res,
                savedData,
                "Data created successfully",
                201)
        } catch (error: any) {
            return this.sendError(
                res,
                error.message,
                500,
                error
            )
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
}

