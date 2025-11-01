import { Request, Response } from "express";
import User, { IUser } from '../models/user.model';
import { BaseController } from "./base.controller";
import { Logger } from '../utils/logger.utils';

export class UserController extends BaseController<IUser> {
    protected model = User;
    protected searchFields = ['name', 'email'];

    constructor() {
        super();
    }

    public register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name, email, password, role } = req.body;
            const existingUser = await User.findByEmail(email);

            if (existingUser) {
                return this.sendError(res, 'User already exists with this email', 400);
            }

            const user = new User({ name, email, password, role });
            await user.save();

            const token = user.generateAuthToken();
            const userResponse = user.toJSON();

            Logger.info('User registered successfully', { userId: user._id });

            return this.sendSuccess(res, { user: userResponse, token }, 'User registered successfully', 201);
        } catch (error: any) {
            Logger.error('Error registering user:', error);
            return this.sendError(res, error.message, 500);
        }
    }
}

export default new UserController();
