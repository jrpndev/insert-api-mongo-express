import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
    },
    publisher: { type: String, required: true },
    numPages: { type: Number },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageUrl: { type: String }
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
