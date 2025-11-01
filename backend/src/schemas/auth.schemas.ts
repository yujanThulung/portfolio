import { z } from 'zod';

// Common reusable schemas
export const nameSchema = z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim();

export const emailSchema = z.string()
    .email('Please enter a valid email')
    .toLowerCase()
    .trim();



export const passwordSchema = z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    );



export const roleSchema = z.enum(['user', 'admin'], {
    message: 'Role must be either user or admin'
});

// Register Validation
export const registerSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema.optional().default('user'),
});

// Login Validation  
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
});

// Refresh Token Validation
export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Update User Validation (for admin updating users)
export const updateUserSchema = z.object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    role: roleSchema.optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
});

// Update Profile Validation (for users updating their own profile)
export const updateProfileSchema = z.object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
});

// Change Password Validation
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
}).refine(data => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword']
});

// Forgot Password Validation
export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

// Reset Password Validation
export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordSchema,
});

// Type inference for TypeScript
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;