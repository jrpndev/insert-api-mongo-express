import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    ownedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    ownedAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }]
  },
  {
    versionKey: false
  }
);

const User = mongoose.model("User", userSchema);

export default User;
