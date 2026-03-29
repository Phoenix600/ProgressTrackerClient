import { Router, Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';

const router = Router();

// GET /api/courses
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find({});
    res.json({ data: courses });
  } catch (err) {
    next(err);
  }
});

// GET /api/courses/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ data: course });
  } catch (err) {
    next(err);
  }
});

// POST /api/courses
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json({ message: 'Course created successfully', data: savedCourse });
  } catch (err) {
    next(err);
  }
});

// PUT /api/courses/:id
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course updated successfully', data: updatedCourse });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/courses/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
