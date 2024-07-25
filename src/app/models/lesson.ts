import { Schema, model, models } from "mongoose";
import {  questionSchema } from "./question";

export interface LessonInterface {
  id?: number;
  title: string;
  summary: string;
  context: string;
  subject?: string;
  topic?: string;
  date?: Date;
  questions?:string[]
}

export const lessonSchema = new Schema<LessonInterface>({
  title: {
    type: String,
  },
  summary: {
    type: String,
  },
  context: {
    type: String,
    required:true
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref:'Subject'
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref:'Topic'
  },
  questions:[questionSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const LessonModel = models.Lesson1 || model<LessonInterface>('Lesson1',lessonSchema)
export default LessonModel 
