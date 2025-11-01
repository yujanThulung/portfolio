import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger.utils';

export interface CustomError extends Error {
    statusCode?: number;
    code?: number;
}


export const errorHandler = (
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';


    // Mongoose duplicate key error
    if (error.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
    }

    // Mongoose cast error (invalid ObjectId)
    if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Resource not found';
    }


    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }


    if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }


    Logger.error('Error handler:', {
        message: error.message,
        stack: error.stack,
        statusCode,
        path: req.path,
        method: req.method,
    });

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && {
            error: error.stack,
        })
    });
}


export const notFound = (req: Request, res: Response, next: NextFunction): void => {
    const error = new Error(`Not found - ${req.originalUrl}`) as CustomError;
    error.statusCode = 404;
    next(error);
};