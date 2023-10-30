import { Schema, model, models } from "mongoose";

export interface FilterInterface {
  _id?: string;
  // filter_type: string;
  topic: string;
  sub_topic: string;
  subject: string;
  date?: Date;
}

export const filterSchema = new Schema<FilterInterface>({
  // filter_type: {
  //   type: String,
  // },
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

const FilterModel = models.Filter || model<FilterInterface>('Filter',filterSchema)
export default FilterModel 