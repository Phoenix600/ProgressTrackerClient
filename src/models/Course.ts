import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
  title: string;
}

export interface IChapter extends Document {
  title: string;
  durationDays: number;
  topics: ITopic[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  chapters: IChapter[];
}

const topicSchema = new Schema<ITopic>({
  title: { type: String, required: true }
});

const chapterSchema = new Schema<IChapter>({
  title: { type: String, required: true },
  durationDays: { type: Number, required: true, min: 1 },
  topics: [topicSchema]
});

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String },
  chapters: [chapterSchema]
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

// Virtual ID injections for subdocuments too
chapterSchema.set('toJSON', { virtuals: true, transform: (_, ret: any) => { delete ret._id; delete ret.__v; } });
topicSchema.set('toJSON', { virtuals: true, transform: (_, ret: any) => { delete ret._id; delete ret.__v; } });

export const Course = mongoose.model<ICourse>('Course', courseSchema);
