import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    dateOfBirth: { type: Date },
    imageUrl: { type: String },
  },
  {
    versionKey: false
  }
);

const User = mongoose.model("Clients", userSchema);

export default User;
