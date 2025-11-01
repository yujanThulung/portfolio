import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { database } from './config/db';
import userRoutes from './routes/user.route';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    statusCode: 429
});
app.use(limiter);

// CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Logger for requests
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/users', userRoutes);
console.log('✅ Routes registered: /api/users');

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// Root
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running 🚀" });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

// Error handler
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
    });
});

const startServer = async (): Promise<void> => {
    await database.connect();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
};

startServer().catch(console.error);
