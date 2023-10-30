import { Schema, model, models } from "mongoose";

export interface ContextInterface {
  _id?: string;
  // filter_type: string;
  topic: string;
  sub_topic: string;
  subject: string;
  context: string;
  date?: Date;
}

export const contextSchema = new Schema<ContextInterface>({
  context: {
    type: String,
  },
  subject: {
    type: String,
  },
  topic: {
    type: String,
  },
  sub_topic: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ContextModel = models.Context || model<ContextInterface>('Context',contextSchema)
export default ContextModel 