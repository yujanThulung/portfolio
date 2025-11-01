import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { IUser } from "../models/auth.model";
import { Logger } from "../utils/logger.utils";
import { IUserPayload } from "../types/express";
import { success } from "zod";
import { required } from "zod/v4/core/util.cjs";



export interface AuthRequest extends Request {
    user?: IUserPayload
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {

        let token: string | undefined;

        // Check for token in header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check for token in cookies
        if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
            return;
        }


        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUserPayload;
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            }
            next();
        } catch (jwtError) {
            res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
            return;
        }
    } catch (error: any) {
        Logger.error('Authentication failed:', { error });
        res.status(401).json({
            success: false,
            message: 'Authentication failed'
        });
    }
}

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No user found'
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            Logger.warn('Unauthorized access attempt', {
                userId: req.user.id,
                role: req.user.role,
                attemptedRole: req.user.role,
                requiredRoles: roles.join(', ')
            });

            res.status(403).json({
                success: false,
                message: 'Access denied. You are not authorized to perform this action.'
            });
            return;
        }
        next();
    }
}


// Optional authentication (doesn't throw error if no token)
export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            };
        } catch (error) {
            // Token is invalid, but we don't throw error for optional auth
        }
    }

    next();
};