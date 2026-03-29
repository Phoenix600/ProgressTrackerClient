import mongoose, { Document, Schema } from 'mongoose';

export interface IBatch extends Document {
  name: string;
  courseId: mongoose.Types.ObjectId;
  startDate: Date;
  plannedEndDate: Date;
  progress: { topicId: mongoose.Types.ObjectId; completedAt: Date }[];
  topicSchedule: { topicId: mongoose.Types.ObjectId; expectedDate: Date }[];
}

const batchSchema = new Schema<IBatch>({
  name: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  startDate: { type: Date, required: true },
  plannedEndDate: { type: Date, required: true },
  progress: [{
    topicId: { type: Schema.Types.ObjectId, required: true },
    completedAt: { type: Date, required: true }
  }],
  topicSchedule: [{
    topicId: { type: Schema.Types.ObjectId, required: true },
    expectedDate: { type: Date, required: true }
  }]
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret: any) => {
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const Batch = mongoose.model<IBatch>('Batch', batchSchema);
