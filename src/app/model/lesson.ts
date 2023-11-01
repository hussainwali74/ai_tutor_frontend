import { Schema, model, models } from "mongoose";
import { SubjectInterface } from "./subject";
import { TopicInterface } from "./topic";
import { QuestionInterface, questionSchema } from "./question";

export interface LessonInterface {
  _id?: string;
  title: string;
  summary: string;
  context: string;
  context1: string;
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
  context1: {
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
