import { IUser } from '../../models/User';


declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            requestId?: string;
        }
    }
}


export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface PaginationQuery {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
}

export interface JwtPayload {
    id: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}


export interface IUserPayload {
    id: string;
    email: string;
    role: 'user' | 'admin';
}