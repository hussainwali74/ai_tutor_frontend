import { Schema, model, models } from "mongoose";
import { TopicInterface } from "./topic";
import { SubjectInterface } from "./subject";
import { LessonInterface } from "./lesson";

export interface QuestionInterface {
  _id?: string;
  text: string;
  correctAnswer: string;
  topic:TopicInterface;
  lesson?: LessonInterface;
  date?: Date;
}

export const questionSchema = new Schema<QuestionInterface>({
  text: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
  topic: {
    type:Schema.Types.ObjectId,
    ref:'Topic'
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref:'Topic'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const QuestionModel = models.Question || model<QuestionInterface>('Question',questionSchema)
export default QuestionModel 

