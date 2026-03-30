import { Router, Request, Response, NextFunction } from 'express';
import { Batch } from '../models/Batch';
import { Course } from '../models/Course';
import mongoose from 'mongoose';

function calculateTopicSchedule(course: any, startDate: Date, endDate: Date) {
  const totalBatchDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Collect all topics with their chapter information
  const allTopics: { topicId: mongoose.Types.ObjectId; chapterIndex: number; topicIndex: number }[] = [];
  
  course.chapters.forEach((chapter: any, chapterIndex: number) => {
    chapter.topics.forEach((topic: any, topicIndex: number) => {
      allTopics.push({
        topicId: topic._id,
        chapterIndex,
        topicIndex
      });
    });
  });

  const totalTopics = allTopics.length;
  const schedule: { topicId: mongoose.Types.ObjectId; expectedDate: Date }[] = [];

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

const router = Router();

// GET /api/batches
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const batches = await Batch.find({});
    res.json({ data: batches });
  } catch (err) {
    next(err);
  }
});

// POST /api/batches
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId, startDate, plannedEndDate } = req.body;

    // Fetch the course to get topic structure
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Calculate topic schedule
    const topicSchedule = calculateTopicSchedule(course, new Date(startDate), new Date(plannedEndDate));

    const batch = new Batch({
      ...req.body,
      progress: [],
      topicSchedule
    });
    const savedBatch = await batch.save();
    res.status(201).json({ message: 'Batch created successfully', data: savedBatch });
  } catch (err) {
    next(err);
  }
});

// GET /api/batches/:batchId/progress
router.get('/:batchId/progress', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const batch = await Batch.findById(req.params.batchId);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    res.json({
      batchId: batch.id,
      completedTopics: batch.progress.map(p => ({ topicId: p.topicId.toString(), completedAt: p.completedAt }))
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/batches/:batchId/progress/toggle
router.patch('/:batchId/progress/toggle', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topicId, completedAt } = req.body;
    if (!topicId) return res.status(400).json({ message: 'topicId is required' });

    const batch = await Batch.findById(req.params.batchId);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });

    const objTopicId = new mongoose.Types.ObjectId(topicId as string);
    const existingIndex = batch.progress.findIndex(p => p.topicId.toString() === topicId);

    let status = 'added';
    if (existingIndex > -1) {
      batch.progress.splice(existingIndex, 1);
      status = 'removed';
    } else {
      const completionDate = completedAt ? new Date(completedAt) : new Date();
      batch.progress.push({ topicId: objTopicId, completedAt: completionDate });
    }

    await batch.save();

    res.json({
      message: 'Progress recorded successfully',
      status,
      completedTopics: batch.progress.map(p => ({ topicId: p.topicId.toString(), completedAt: p.completedAt }))
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/batches/:id
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, startDate, plannedEndDate } = req.body;
    const batchId = req.params.id;

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Check if dates have changed
    const dateChanged = (startDate && new Date(startDate).getTime() !== batch.startDate.getTime()) ||
                       (plannedEndDate && new Date(plannedEndDate).getTime() !== batch.plannedEndDate.getTime());

    // Update batch details
    if (name) batch.name = name;
    if (startDate) batch.startDate = new Date(startDate);
    if (plannedEndDate) batch.plannedEndDate = new Date(plannedEndDate);

    // If dates changed, recalculate topic schedule
    if (dateChanged) {
      const course = await Course.findById(batch.courseId);
      if (!course) {
        return res.status(404).json({ message: 'Associated course not found' });
      }

      // Recalculate topic schedule with new dates
      const newTopicSchedule = calculateTopicSchedule(course, batch.startDate, batch.plannedEndDate);
      
      // Preserve existing overdue reasons
      newTopicSchedule.forEach(newItem => {
        const existingItem = batch.topicSchedule.find(ts => ts.topicId.toString() === newItem.topicId.toString());
        if (existingItem && (existingItem as any).overdueReason) {
          (newItem as any).overdueReason = (existingItem as any).overdueReason;
        }
      });
      
      batch.topicSchedule = newTopicSchedule;

      // Update progress deviations based on new schedule
      // Remove progress entries for topics that are no longer in the schedule
      const validTopicIds = newTopicSchedule.map(ts => ts.topicId.toString());
      batch.progress = batch.progress.filter(p => p.topicId && validTopicIds.includes(p.topicId.toString()));
    }

    const updatedBatch = await batch.save();

    res.json({
      message: 'Batch updated successfully',
      data: updatedBatch,
      recalculated: dateChanged
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/batches/:id/deviations
router.get('/:id/deviations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    const deviations = batch.topicSchedule.map(schedule => {
      const progress = batch.progress.find(p => p.topicId.toString() === schedule.topicId.toString());
      const expectedDate = new Date(schedule.expectedDate);
      const completedAt = progress ? new Date(progress.completedAt) : null;

      let deviation = 0;
      let status = 'pending';

      if (completedAt) {
        deviation = Math.ceil((completedAt.getTime() - expectedDate.getTime()) / (1000 * 60 * 60 * 24));
        status = deviation <= 0 ? 'on-time' : 'delayed';
      } else if (expectedDate < new Date()) {
        deviation = Math.ceil((new Date().getTime() - expectedDate.getTime()) / (1000 * 60 * 60 * 24));
        status = 'overdue';
      }

      return {
        topicId: schedule.topicId.toString(),
        expectedDate: schedule.expectedDate,
        completedAt: completedAt,
        deviation,
        status
      };
    });

    res.json({
      batchId: batch.id,
      deviations,
      summary: {
        totalTopics: deviations.length,
        completed: deviations.filter(d => d.status === 'on-time' || d.status === 'delayed').length,
        onTime: deviations.filter(d => d.status === 'on-time').length,
        delayed: deviations.filter(d => d.status === 'delayed').length,
        overdue: deviations.filter(d => d.status === 'overdue').length,
        pending: deviations.filter(d => d.status === 'pending').length
      }
    });
  } catch (err) {
    next(err);
  }
});
 
// PATCH /api/batches/:batchId/topics/:topicId/overdue-reason
router.patch('/:batchId/topics/:topicId/overdue-reason', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { overdueReason } = req.body;
    const { batchId, topicId } = req.params;

    const batch = await Batch.findById(batchId);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });

    const scheduleItem = batch.topicSchedule.find(ts => ts.topicId.toString() === topicId);
    if (!scheduleItem) return res.status(404).json({ message: 'Topic not found in schedule' });

    scheduleItem.overdueReason = overdueReason;
    await batch.save();

    res.json({ message: 'Overdue reason updated', data: batch });
  } catch (err) {
    next(err);
  }
});
 
export default router;
