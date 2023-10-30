import { Schema, model, models } from "mongoose";

export interface ImageInterface {
  _id?: string;
  question_id?: string;
  prompt: string;
  image_url?: string;
  date?: Date;
}

export const imageSchema = new Schema<ImageInterface>({
  question_id: {
    type: String,
  },
  prompt: {
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

const ImageModel = models.Image2 || model<ImageInterface>('Image2',imageSchema)
export default ImageModel 