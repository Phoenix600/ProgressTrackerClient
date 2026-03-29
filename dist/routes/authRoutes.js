"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// Registration Endpoint
router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const existingUser = await User_1.User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        const newUser = new User_1.User({
            username,
            passwordHash,
            role: 'instructor',
        });
        const savedUser = await newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: savedUser.id, username: savedUser.username, role: savedUser.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
        res.status(201).json({
            message: 'Account created successfully',
            user: savedUser,
            token
        });
    }
    catch (err) {
        next(err);
    }
});
// Login Endpoint
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const user = await User_1.User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
        res.json({
            message: 'Logged in successfully',
            user,
            token
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
