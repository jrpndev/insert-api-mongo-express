import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, required: true },
    recoveryCode: { type: String },
    recoveryCodeExpiry: { type: Date },
    refreshToken: { type: String },
    biography: { type: String },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    website: { type: String },
    socialMedia: {
      twitter: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },
  },
  {
    versionKey: false
  }
);

const Authors = mongoose.model("Authors", AuthorSchema);

export default Authors;
