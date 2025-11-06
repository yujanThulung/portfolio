import mongoose from 'mongoose';
import { Schema, Document, Model, Types } from 'mongoose';

export interface IProjectImage {
    src: string;
    alt?: string;
    caption?: string;
}


export interface IProject extends Document {
    slug: string;
    title: string;
    description: string;
    shortDescription?: string;
    images: IProjectImage[];
    technologies: string[];
    github: string;
    liveLink?: string;
    status: 'Completed' | 'Ongoing' | 'Planned';
    features: string[];
    goal?: string;
    category?: string[];
    priority: number;
    startDate?: Date;
    endDate?: Date;
    isActive: boolean;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProjectModel extends Model<IProject> {
    findBySlug(slug: string): Promise<IProject | null>;
    findByStatus(status: string): Promise<IProject[]>;
    findByTechnology(tech: string): Promise<IProject[]>;
}


const projectImageSchema = new Schema<IProjectImage>({
    src: {
        type: String,
        required: [true, 'Image source is required'],
        trim: true
    },
    alt: {
        type: String,
        trim: true
    },
    caption: {
        type: String,
        trim: true
    }
});


const projectSchema = new Schema<IProject, IProjectModel>({
    slug: {
        type: String,
        required: [true, 'Project slug is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        maxLength: [2000, 'Project description cannot exceed 1000 characters']
    },
    shortDescription: {
        type: String,
        trim: true,
        maxLength: [500, 'Short description cannot exceed 500 characters']
    },
    images: [projectImageSchema],
    technologies: [{
        type: String,
        trim: true,
        required: true
    }],
    github: {
        type: String,
        required: [true, 'GitHub link is required'],
        trim: true,
        match: [/^https?:\/\/github\.com\/[^\s]+$/, 'Please enter a valid GitHub URL']
    },
    liveLink: {
        type: String,
        trim: true,
        match: [/^https?:\/\/[^\s]+$/, 'Please enter a valid URL']
    },
    status: {
        type: String,
        enum: ['Completed', 'Ongoing', 'Planned'],
        default: 'Planned'
    },
    features: [
        {
            type: String,
            trim: true,
            required: true
        }
    ],
    goal: {
        type: String,
        trim: true,
        maxLength: [1000, 'Goal cannot exceed 1000 characters']
    },
    category: [
        {
            type: String,
            trim: true,
            required: true
        }
    ],
    priority: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
        validate: {
            validator: function (this: IProject, value: Date) {
                return !this.startDate || !value || value >= this.startDate;
            },
            message: 'End date must be after start date'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});


//Indexes for better query performance
projectSchema.index({ slug: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ technologies: 1 });
projectSchema.index({ priority: 1 });
projectSchema.index({ isActive: 1 });
projectSchema.index({ createdBy: 1 });
projectSchema.index({ updatedBy: 1 });



//Static method to find project by slug

projectSchema.statics.findBySlug = function (slug: string): Promise<IProject[]> {
    return this.find({
        slug,
        isActive: true
    });
}


//Static method to find projects by status
projectSchema.statics.findByStatus = function (status: string): Promise<IProject[]> {
    return this.find({
        status,
        isActive: true
    }).sort({ priority: -1, createdAt: -1 });
}


// Static method to find projects by technology
projectSchema.statics.findByTechnology = function (tech: string): Promise<IProject[]> {
    return this.find({
        technologies: {
            $in: [tech]
        },
        isActive: true
    }).sort({ priority: -1, createdAt: -1 });
}


// Pre-save middleware to generate short description if not provided
projectSchema.pre('save', function (next) {
    if (!this.shortDescription && this.description.length) {
        this.shortDescription = this.description.slice(0, 500) + '...';
    }
    next();
});

//Transform output
projectSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    }
});


export const Project = mongoose.model<IProject, IProjectModel>('Project', projectSchema);
export default Project;