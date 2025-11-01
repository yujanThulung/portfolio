import { Request, Response } from "express";
import User, { IUser } from '../models/auth.model';
import { BaseController } from "./base.controller";
import { Logger } from '../utils/logger.utils';
import jwt from 'jsonwebtoken';
import { LoginInput, RegisterInput } from "../schemas/auth.schemas";

export class UserController extends BaseController<IUser> {
    protected model = User;
    protected searchFields = ['name', 'email'];

    constructor() {
        super();
    }

    public register = async (req: Request, res: Response): Promise<Response> => {
        try {
            // Use validated data instead of req.body
            const { name, email, password, role } = (req as any).validatedData as RegisterInput;

            const existingUser = await User.findByEmail(email);

            if (existingUser) {
                return this.sendError(res, 'User already exists with this email', 400);
            }

            const user = new User({ name, email, password, role });
            await user.save();

            const token = user.generateAuthToken();
            const refreshToken = user.generateRefreshToken();

            // Set refresh token as HttpOnly cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            const userResponse = user.toJSON();

            Logger.info('User registered successfully', { userId: user._id });

            return this.sendSuccess(res, {
                user: userResponse,
                token,
                refreshToken
            }, 'User registered successfully', 201);
        } catch (error: any) {
            Logger.error('Error registering user:', error);
            return this.sendError(res, error.message, 400);
        }
    }

    public login = async (req: Request, res: Response): Promise<Response> => {
        try {
            // Use validated data instead of req.body
            const { email, password } = (req as any).validatedData as LoginInput;

            // Find user and include password 
            const user = await User.findOne({
                email,
                isActive: true
            }).select('+password');

            if (!user) {
                return this.sendError(
                    res,
                    'Invalid email or password',
                    401
                );
            }

            // Check password
            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return this.sendError(
                    res,
                    'Invalid email or password',
                    401
                );
            }

            // Generate token
            const token = user.generateAuthToken();
            const refreshToken = user.generateRefreshToken();

            // Set refresh token as HttpOnly cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            // User response without password
            const userResponse = user.toJSON();

            Logger.info('User logged in successfully', { userId: user._id });

            return this.sendSuccess(
                res,
                {
                    user: userResponse,
                    token,
                    refreshToken
                },
                'User logged in successfully',
            )
        } catch (error: any) {
            Logger.error('Error logging in user:', error);
            return this.sendError(
                res,
                error.message,
                500
            )
        }
    }


    public refreshToken = async (req: Request, res: Response): Promise<Response> => {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                return this.sendError(res, 'Refresh token missing', 401);
            }

            const secret = process.env.JWT_REFRESH_SECRET!;
            const payload: any = jwt.verify(token, secret);

            const user = await User.findById(payload.id);
            if (!user) return this.sendError(res, 'User not found', 404);

            const accessToken = user.generateAuthToken();
            return this.sendSuccess(res, { accessToken }, 'Token refreshed');
        } catch (err: any) {
            return this.sendError(res, 'Invalid or expired refresh token', 401);
        }
    };

}

export default new UserController();
