import { body } from 'express-validator';
import { z } from 'zod';

// Base schemas for reusability
const imageSchema = z.object({
  src: z.string().url('Image source must be a valid URL'),
  alt: z.string().optional(),
  caption: z.string().optional()
});

const technologySchema = z.string()
  .min(1, 'Technology cannot be empty')
  .max(50, 'Technology name too long')
  .trim();

const featureSchema = z.string()
  .min(1, 'Feature cannot be empty')
  .max(200, 'Feature description too long')
  .trim();

// Main project schemas
export const createProjectSchema = z.object({
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug cannot exceed 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .trim(),

  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title cannot exceed 200 characters')
    .trim(),

  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim(),

  shortDescription: z.string()
    .max(500, 'Short description cannot exceed 500 characters')
    .trim()
    .optional(),

  images: z.array(imageSchema)
    .min(1, 'At least one image is required'),

  technologies: z.array(technologySchema)
    .min(1, 'At least one technology is required'),

  github: z.string()
    .url('GitHub must be a valid URL')
    .regex(/^https?:\/\/github\.com\/.+/, 'Must be a valid GitHub repository URL'),

  liveLink: z.string()
    .url('Live link must be a valid URL')
    .optional()
    .or(z.literal('')),

  status: z.enum(['Completed', 'Ongoing', 'Planned'])
    .optional(),

  features: z.array(featureSchema)
    .min(1, 'At least one feature is required'),

  goal: z.string()
    .max(1000, 'Goal cannot exceed 1000 characters')
    .trim()
    .optional(),

  category: z.array(z.string().trim())
    .optional(),

  priority: z.number()
    .int('Priority must be an integer')
    .min(0, 'Priority must be at least 0')
    .max(10, 'Priority cannot exceed 10')
    .optional()
    .default(0),

  startDate: z.string()
    .datetime('Start date must be a valid ISO 8601 date')
    .optional()
    .or(z.literal('')),

  endDate: z.string()
    .datetime('End date must be a valid ISO 8601 date')
    .optional()
    .or(z.literal(''))
}).refine((data) => {
  // Custom validation: endDate must be after startDate if both provided
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) > new Date(data.startDate);
  }
  return true;
}, {
  message: 'End date must be after start date',
  path: ['endDate']
});

export const updateProjectSchema = z.object({
  body: z.object({
    slug: z.string()
      .min(3, 'Slug must be at least 3 characters')
      .max(100, 'Slug cannot exceed 100 characters')
      .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
      .trim()
      .optional(),

    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title cannot exceed 200 characters')
      .trim()
      .optional(),

    description: z.string()
      .min(10, 'Description must be at least 10 characters')
      .max(2000, 'Description cannot exceed 2000 characters')
      .trim()
      .optional(),

    shortDescription: z.string()
      .max(500, 'Short description cannot exceed 500 characters')
      .trim()
      .optional(),

    images: z.array(imageSchema)
      .optional(),

    technologies: z.array(technologySchema)
      .optional(),

    github: z.string()
      .url('GitHub must be a valid URL')
      .regex(/^https?:\/\/github\.com\/.+/, 'Must be a valid GitHub repository URL')
      .optional(),

    liveLink: z.string()
      .url('Live link must be a valid URL')
      .optional()
      .or(z.literal('')),

    status: z.enum(['Completed', 'Ongoing', 'Planned']).optional(),

    features: z.array(featureSchema)
      .optional(),

    goal: z.string()
      .max(1000, 'Goal cannot exceed 1000 characters')
      .trim()
      .optional(),

    category: z.array(z.string().trim())
      .optional(),

    priority: z.number()
      .int('Priority must be an integer')
      .min(0, 'Priority must be at least 0')
      .max(10, 'Priority cannot exceed 10')
      .optional(),

    startDate: z.string()
      .datetime('Start date must be a valid ISO 8601 date')
      .optional()
      .or(z.literal('')),

    endDate: z.string()
      .datetime('End date must be a valid ISO 8601 date')
      .optional()
      .or(z.literal(''))
  }).refine((data) => {
    // Custom validation: endDate must be after startDate if both provided
    if (data.startDate && data.endDate) {
      return new Date(data.endDate) > new Date(data.startDate);
    }
    return true;
  }, {
    message: 'End date must be after start date',
    path: ['endDate']
  })
});

// Param validation schemas
export const slugParamSchema = z.object({
  params: z.object({
    slug: z.string()
      .regex(/^[a-z0-9-]+$/, 'Invalid slug format')
  })
});

export const statusParamSchema = z.object({
  params: z.object({
    status: z.enum(['Completed', 'Ongoing', 'Planned'])
      .optional()
  })
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid project ID format')
  })
});

export const technologyParamSchema = z.object({
  params: z.object({
    technology: z.string()
      .min(1, 'Technology parameter is required')
  })
});

// Bulk update schema
export const bulkUpdateSchema = z.object({
  body: z.object({
    ids: z.array(
      z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid project ID format')
    )
      .min(1, 'At least one project ID is required'),

    updateData: z.object({})
      .refine(data => Object.keys(data).length > 0, 'Update data cannot be empty')
  })
});

// Query validation schema
export const querySchema = z.object({
  query: z.object({
    page: z.string()
      .regex(/^\d+$/, 'Page must be a positive integer')
      .transform(Number)
      .refine(n => n >= 1, 'Page must be at least 1')
      .optional(),

    limit: z.string()
      .regex(/^\d+$/, 'Limit must be a positive integer')
      .transform(Number)
      .refine(n => n >= 1 && n <= 100, 'Limit must be between 1 and 100')
      .optional(),

    sort: z.string()
      .optional(),

    status: z.enum(['Completed', 'Ongoing', 'Planned'])
      .optional(),

    technology: z.string()
      .optional(),

    search: z.string()
      .optional(),

    fields: z.string()
      .optional()
  })
});

//Upload image schema 
export const uploadImageSchema = z.object({
  body: z.object({}),
  files: z.any()//Multer auto handle file validataion
});

export const updateImagesSchema = z.object({
  params: z.object({
    id: z.string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid project ID format')
  })
});

export const deleteImagesSchema = z.object({
  params: z.object({
    id: z.string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid project ID format')
  }),
  body: z.object({
    publicIds: z.array(z.string()).min(1, 'At least one public ID is required')
  })
})

// Export types for TypeScript
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>['body'];
export type BulkUpdateInput = z.infer<typeof bulkUpdateSchema>['body'];
export type QueryParams = z.infer<typeof querySchema>['query'];
export type UploadImageInput = z.infer<typeof uploadImageSchema>;
export type UpdateImagesInput = z.infer<typeof updateImagesSchema>;
export type DeleteImagesInput = z.infer<typeof deleteImagesSchema>;