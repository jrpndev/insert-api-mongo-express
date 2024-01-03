import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    publicationYear: { type: Date },
    language: { type: String },
    numPages: { type: Number },
    imageUrl: { type: String },
    ISBN: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId },
    format: { type: Array },
    file: { type: String },
    price: { type: Number },
    availability: { type: Boolean, default: true },
    ratings: [{ type: Number }],
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients' },
        text: { type: String },
      }
    ],
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    versionKey: false
  }
);

const Book = mongoose.model('Books', bookSchema);

export default Book;
