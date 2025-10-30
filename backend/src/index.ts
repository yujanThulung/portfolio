import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import connectDB from './config/db';

import { time, timeStamp } from 'console';
import { uptime } from 'process';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(helmet());
app.use(compression());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    statusCode: 429
});

app.use(limiter);

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
))

// Body Parsing Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


//Static Files
app.use('/uploads', express.static('uploads'));



//Routes
// app.use('/api/users',)


//Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// 404 Handler (catch-all)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});



//Error Handling Middleware
app.use((
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    console.error('Error:', error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        ...(process.env.NODE_ENV === 'development' && {
            error: error.message
        })
    })
})


const startServer = async (): Promise<void> => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}|| 'development'`)
    })
};

startServer().catch(console.error);  

