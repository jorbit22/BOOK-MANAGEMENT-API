import { Schema, model, Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  publishedDate: Date;
  ISBN: string;
  coverImage?: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  ISBN: { type: String, required: true },
  coverImage: { type: String },
});

export default model<IBook>("Book", bookSchema);
