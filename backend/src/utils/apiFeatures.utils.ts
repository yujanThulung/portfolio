import { FilterQuery } from "mongoose";

export class APIFeatures<T> {
    private query: any;
    private queryString: any;


    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }


    filter(): this {
        const queryObj = { ...this.queryString };
        const excludeedFields = ['page', 'sort', 'limit', 'fiedls', 'search'];
        excludeedFields.forEach(field => delete queryObj[field]);

        //advanced filtering 
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }


    sort(): this {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(): this {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }


    search(searchFields: string[]): this {
        if (this.queryString.serach) {
            const searchRegex = new RegExp(this.queryString.search, 'i');
            const searchQuery = {
                $or: searchFields.map(field => ({
                    [field]: searchRegex
                }))
            };
            this.query = this.query.find(searchQuery);
        }
        return this
    }

    pagination(): this {
        const page = parseInt(this.queryString.page, 10) || 1;
        const limit = parseInt(this.queryString.limit, 10) || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    async getResults(): Promise<{
        results: T[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }> {
        // Execute query
        const results = await this.query;

        // Get total count for pagination
        const total = await this.query.model.countDocuments(this.query.getFilter());
        const page = parseInt(this.queryString.page, 10) || 1;
        const limit = parseInt(this.queryString.limit, 10) || 10;
        const pages = Math.ceil(total / limit);

        // Return results and pagination info
        return {
            results,
            pagination: {
                total,
                page,
                limit,
                pages
            }
        };
    }
}