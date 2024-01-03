import mongoose from "mongoose";

const PublisherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, required: true },
    recoveryCode: { type: String },
    recoveryCodeExpiry: { type: Date },
    refreshToken: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String }
    },
    phoneNumber: { type: String },
    website: { type: String },
    foundingYear: { type: Number },
  },
  {
    versionKey: false
  }
);

const Publisher = mongoose.model("Publishers", PublisherSchema);

export default Publisher;
