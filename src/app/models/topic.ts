import { Schema, model, models } from "mongoose";

export interface TopicInterface {
  _id?: string;
  title: string;
  subject_id?: string;
  subject?: string;
  detail?: string;
  lessons?: string[];
  date?: Date;
}

export const topicSchema = new Schema<TopicInterface>({
  title: {
    type: String,
  },
  detail: {
    type: String,
    required:false
  },
  lessons: [{
    type: Schema.Types.ObjectId,
    ref:'Lesson'
  }],
  subject_id: {
    type: Schema.Types.ObjectId,
    ref:'Subject'
  },
  subject: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TopicModel = models.Topic || model<TopicInterface>('Topic',topicSchema)
export default TopicModel 
