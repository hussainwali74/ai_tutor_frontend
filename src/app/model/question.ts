import { Schema, model, models } from "mongoose";

export interface QuestionInterface {
  _id?: string;
  prompt: string;
  response: string;
  topic: string;
  sub_topic: string;
  grade: string;
  image_url?: string;
  img_gen_prompt_question?: string;
  img_gen_prompt_solution?: string;
  date?: Date;
}
export interface SingleQuestionInterface {
  _id?: string;
  prompt: string;
  question:string;
  correct_answer:string;
  solution:string;
  topic: string;
  sub_topic: string;
  grade: string;
  image_url?: string;
  img_gen_prompt_question?: string;
  img_gen_prompt_solution?: string;
  date?: Date;
}

export const questionSchema = new Schema<QuestionInterface>({
  prompt: {
    type: String,
  },
  response: {
    type: String,
  },
  grade: {
    type: String,
  },
  topic: {
    type: String,
  },
  sub_topic: {
    type: String,
  },
  image_url: {
    type: String,
  },
  img_gen_prompt_question: {
    type: String,
  },
  img_gen_prompt_solution: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export const singleQuestionSchema = new Schema<SingleQuestionInterface>({
  prompt: {
    type: String,
  },
  question: {
    type: String,
  },
  solution: {
    type: String,
  },
  correct_answer: {
    type: String,
  },
  grade: {
    type: String,
  },
  topic: {
    type: String,
  },
  sub_topic: {
    type: String,
  },
  img_gen_prompt_question: {
    type: String,
  },
  img_gen_prompt_solution: {
    type: String,
  },
  image_url: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const QuestionModel = models.Question7 || model<QuestionInterface>('Question7',questionSchema)
export default QuestionModel 
export const SingleQuestionModel = models.SingleQuestion7 || model<SingleQuestionInterface>('SingleQuestion7',singleQuestionSchema)
