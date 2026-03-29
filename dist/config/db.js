"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/progress-tracker');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`\n❌ Failed to connect to MongoDB!`);
        console.error(`Make sure you have MongoDB running locally on port 27017,`);
        console.error(`OR paste a MONGODB_URI connection string inside progress-tracker-backend/.env!`);
        console.error(`Error details: ${error.message}\n`);
        process.exit(1);
    }
};
exports.default = connectDB;
