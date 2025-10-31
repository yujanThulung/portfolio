// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   try {
//     const uri = process.env.MONGODB_URI;
//     if (!uri) throw new Error("Missing MongoDB URI in .env");

//     const conn = await mongoose.connect(uri);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ Database connection error:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";
import { Logger } from '../utils/logger.utils';


class Database {
    private static instance: Database;
    private isConnected: boolean = false;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        if (this.isConnected) {
            Logger.info('Database already connected');
            return;
        }


        try {
            const uri = process.env.MONGODB_URI;
            if (!uri) throw new Error("Missing MongoDB URI in .env");

            const conn = await mongoose.connect(uri);

            this.isConnected = true;
            Logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);

            mongoose.connection.on('error', (error) => {
                Logger.error('Database connection error:', error);
            });

            mongoose.connection.on('disConnecteded', () => {
                Logger.info('Database disConnecteded');
                this.isConnected = false;
            });

            process.on('SIGINT', async () => {
                await mongoose.connection.close();
                Logger.info('MongoDB connection closed through app termination');
                process.exit(0);
            });


        } catch (error) {
            Logger.error('Database connection failed: ', error);
            process.exit(1);
        }
    }

    public async disConnected(): Promise<void> {
        if (!this.isConnected) return;

        await mongoose.connection.close();
        this.isConnected = false;
        Logger.info('Database disConnecteded');
    }

    public getConnectionStatus(): boolean {
        return this.isConnected;
    }
}

export const database = Database.getInstance();