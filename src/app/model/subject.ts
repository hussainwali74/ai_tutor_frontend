import { Schema, model, models } from "mongoose";
import { LessonInterface } from "./lesson";

export interface SubjectInterface {
  _id?: string;
  // filter_type: string;
  title: string;
  lessons?:string[]

}

export const subjectSchema = new Schema<SubjectInterface>({
  title: {
    type: String,
    required:true,
    
  },
  lessons: [
    {
      type:Schema.Types.ObjectId,
      ref:'Lesson'
    }
  ],
  
});

const SubjectModel = models.Subject || model<SubjectInterface>('Subject',subjectSchema)
export default SubjectModel 