import { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAuthToken(): string;
    generateRefreshToken(): string;
}

export interface IUserModel extends Model<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, IUserModel>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password!, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate auth token
userSchema.methods.generateAuthToken = function (): string {
    const secret: Secret = process.env.JWT_SECRET ?? "fallback_secret";
    const expiresIn: string | number = process.env.JWT_EXPIRE ?? "7d";

    const payload = {
        id: this._id,
        email: this.email,
        role: this.role
    };

    return jwt.sign(
        payload,
        secret,
        { expiresIn } as SignOptions
    );
};


// Metthod to generate refresh token
userSchema.methods.generateRefreshToken = function (): string {
    const secret: Secret = process.env.JWT_REFRESH_SECRET ?? "fallback_refresh_secret";
    const expiresIn: string | number = process.env.JWT_REFRESH_EXPIRE ?? "30d";

    const payload = { id: this._id };

    return jwt.sign(
        payload, 
        secret, 
        { expiresIn } as SignOptions);
};






// Static method to find user by email
userSchema.statics.findByEmail = function (email: string): Promise<IUser | null> {
    return this.findOne({ email, isActive: true });
};

// Transform output
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        return ret;
    }
});

import mongoose from 'mongoose';

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;