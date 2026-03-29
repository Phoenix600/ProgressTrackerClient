"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Course_1 = require("../models/Course");
const router = (0, express_1.Router)();
// GET /api/courses
router.get('/', async (req, res, next) => {
    try {
        const courses = await Course_1.Course.find({});
        res.json({ data: courses });
    }
    catch (err) {
        next(err);
    }
});
// GET /api/courses/:id
router.get('/:id', async (req, res, next) => {
    try {
        const course = await Course_1.Course.findById(req.params.id);
        if (!course)
            return res.status(404).json({ message: 'Course not found' });
        res.json({ data: course });
    }
    catch (err) {
        next(err);
    }
});
// POST /api/courses
router.post('/', async (req, res, next) => {
    try {
        const course = new Course_1.Course(req.body);
        const savedCourse = await course.save();
        res.status(201).json({ message: 'Course created successfully', data: savedCourse });
    }
    catch (err) {
        next(err);
    }
});
// PUT /api/courses/:id
router.put('/:id', async (req, res, next) => {
    try {
        const updatedCourse = await Course_1.Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCourse)
            return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course updated successfully', data: updatedCourse });
    }
    catch (err) {
        next(err);
    }
});
// DELETE /api/courses/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedCourse = await Course_1.Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse)
            return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
