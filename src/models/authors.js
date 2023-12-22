import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nationality: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    versionKey: false
  }
);

const Author = mongoose.model('Author', authorSchema);

export default Author;
