import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { IUser } from "../models/auth.model";
import { Logger } from "../utils/logger.utils";
import { success } from "zod";


export interface IUserPayload {
    id: string;
    email: string;
    role: 'user' | 'admin';
}

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