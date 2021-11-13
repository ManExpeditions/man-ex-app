import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false, required: true },
    phoneVerified: { type: Boolean, default: false, required: true },
    gender: { type: String, required: true },
    language: { type: String, required: true },
    interests: { type: [String], required: true },
    continents: { type: [String], required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    profilepic: { type: String, required: true },
    profilepicVerified: { type: Boolean, required: true },
    verificationProfilepic: { type: Boolean, required: true },
    socials: { type: [String], required: true },
    authType: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
