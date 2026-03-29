"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Batch_1 = require("../models/Batch");
const Course_1 = require("../models/Course");
const mongoose_1 = __importDefault(require("mongoose"));
function calculateTopicSchedule(course, startDate, endDate) {
    const totalBatchDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    // Collect all topics with their chapter information
    const allTopics = [];
    course.chapters.forEach((chapter, chapterIndex) => {
        chapter.topics.forEach((topic, topicIndex) => {
            allTopics.push({
                topicId: topic._id,
                chapterIndex,
                topicIndex
            });
        });
    });
    const totalTopics = allTopics.length;
    const schedule = [];
    // Distribute topics evenly across the entire batch duration
    // Skip weekends for a more realistic schedule (optional)
    const workingDays = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        // Skip weekends (0 = Sunday, 6 = Saturday)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workingDays.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    // If no working days, fall back to all days
    const availableDays = workingDays.length > 0 ? workingDays : [];
    if (availableDays.length === 0) {
        currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            availableDays.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    // Distribute topics across available days
    const topicsPerDay = Math.max(1, Math.floor(totalTopics / availableDays.length));
    let remainingTopics = totalTopics;
    let dayIndex = 0;
    for (let i = 0; i < totalTopics && dayIndex < availableDays.length; i++) {
        const topicsForThisDay = Math.min(topicsPerDay, remainingTopics);
        for (let j = 0; j < topicsForThisDay && i + j < totalTopics; j++) {
            const topic = allTopics[i + j];
            schedule.push({
                topicId: topic.topicId,
                expectedDate: availableDays[dayIndex]
            });
        }
        i += topicsForThisDay - 1; // -1 because the loop will increment i
        remainingTopics -= topicsForThisDay;
        dayIndex++;
    }
    // If there are remaining topics, add them to the last available day
    if (remainingTopics > 0 && availableDays.length > 0) {
        const lastDay = availableDays[availableDays.length - 1];
        for (let i = totalTopics - remainingTopics; i < totalTopics; i++) {
            const topic = allTopics[i];
            schedule.push({
                topicId: topic.topicId,
                expectedDate: lastDay
            });
        }
    }
    return schedule;
}
const router = (0, express_1.Router)();
// GET /api/batches
router.get('/', async (req, res, next) => {
    try {
        const batches = await Batch_1.Batch.find({});
        res.json({ data: batches });
    }
    catch (err) {
        next(err);
    }
});
// POST /api/batches
router.post('/', async (req, res, next) => {
    try {
        const { courseId, startDate, plannedEndDate } = req.body;
        // Fetch the course to get topic structure
        const course = await Course_1.Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        // Calculate topic schedule
        const topicSchedule = calculateTopicSchedule(course, new Date(startDate), new Date(plannedEndDate));
        const batch = new Batch_1.Batch({
            ...req.body,
            progress: [],
            topicSchedule
        });
        const savedBatch = await batch.save();
        res.status(201).json({ message: 'Batch created successfully', data: savedBatch });
    }
    catch (err) {
        next(err);
    }
});
// GET /api/batches/:batchId/progress
router.get('/:batchId/progress', async (req, res, next) => {
    try {
        const batch = await Batch_1.Batch.findById(req.params.batchId);
        if (!batch)
            return res.status(404).json({ message: 'Batch not found' });
        res.json({
            batchId: batch.id,
            completedTopics: batch.progress.map(p => ({ topicId: p.topicId.toString(), completedAt: p.completedAt }))
        });
    }
    catch (err) {
        next(err);
    }
});
// PATCH /api/batches/:batchId/progress/toggle
router.patch('/:batchId/progress/toggle', async (req, res, next) => {
    try {
        const { topicId, completedAt } = req.body;
        if (!topicId)
            return res.status(400).json({ message: 'topicId is required' });
        const batch = await Batch_1.Batch.findById(req.params.batchId);
        if (!batch)
            return res.status(404).json({ message: 'Batch not found' });
        const objTopicId = new mongoose_1.default.Types.ObjectId(topicId);
        const existingIndex = batch.progress.findIndex(p => p.topicId.toString() === topicId);
        let status = 'added';
        if (existingIndex > -1) {
            batch.progress.splice(existingIndex, 1);
            status = 'removed';
        }
        else {
            const completionDate = completedAt ? new Date(completedAt) : new Date();
            batch.progress.push({ topicId: objTopicId, completedAt: completionDate });
        }
        await batch.save();
        res.json({
            message: 'Progress recorded successfully',
            status,
            completedTopics: batch.progress.map(p => ({ topicId: p.topicId.toString(), completedAt: p.completedAt }))
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
