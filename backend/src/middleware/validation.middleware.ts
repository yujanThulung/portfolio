import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { Logger } from '../utils/logger.utils';


export const validateRequest = <T>(
    schema: z.ZodSchema<T>,
    source: 'body' | 'params' | 'query' = 'body'
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const result = schema.parse(req[source]);

            // Attach validated data to request object for type safety
            (req as any).validatedData = result;

            next();

        } catch (error: any) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));


                Logger.warn('Validation failed', {
                    path: req.path,
                    errors: errorMessages
                });

                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errorMessages
                });
                return;
            }

            // Handle unexpected errors
            Logger.error('Unexpected error during validation:', { error });
            res.status(500).json({
                success: false,
                message: 'Unexpected error during validation'
            });
        }
    };
};

//Convenience functions for common validation sources 
export const validateBody = <T>(schema: z.ZodSchema<T>) =>
    validateRequest(schema, 'body');

export const validateQuery = <T>(schema: z.ZodSchema<T>) =>
    validateRequest(schema, 'query');

export const validateParams = <T>(schema: z.ZodSchema<T>) =>
    validateRequest(schema, 'params');


//Type helper for inferred request types
export type ValidatedRequest<T> = Request & { validatedData: T };

//Alternative approach: Combined validation for multiple sources

export const validateMultiple = (schemas: {
    body?: z.ZodSchema<any>;
    query?: z.ZodSchema<any>;
    params?: z.ZodSchema<any>;
}) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const validateData: any = {};

            if (schemas.body) {
                validateData.body = schemas.body.parse(req.body);
                (req as any).validateBody = validateData.body;
            }

            if (schemas.query) {
                validateData.query = schemas.query.parse(req.query);
                (req as any).validateQuery = validateData.query;
            }

            if (schemas.params) {
                validateData.params = schemas.params.parse(req.params);
                (req as any).validatedParams = validateData.params;
            }

            next();
        } catch (error: any) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map(
                    err => ({
                        field: err.path.join('.'),
                        message: err.message,
                        code: err.code
                    })
                );

                Logger.warn('Validation failed', {
                    path: req.path,
                    errors: errorMessages
                });

                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errorMessages
                });
                return;
            }
            Logger.error('Unexpected error during validation:', { error });

            res.status(500).json({
                success: false,
                message: 'Unexpected error during validation'
            });
        }
    }
}