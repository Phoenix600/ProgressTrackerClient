"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const batchRoutes_1 = __importDefault(require("./routes/batchRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/courses', courseRoutes_1.default);
app.use('/api/batches', batchRoutes_1.default);
// --- STATIC FRONTEND DEPLOYMENT ---
// Serve the compiled React UI out of the backend's static pipeline.
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Any uncaught wildcard routing elegantly passes to React Router Dom natively.
app.use((req, res, next) => {
    if (req.method !== 'GET')
        return next();
    if (req.path.startsWith('/api/'))
        return next();
    res.sendFile(path_1.default.resolve(__dirname, '../public', 'index.html'));
});
// ----------------------------------
// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});
const PORT = 5005;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
