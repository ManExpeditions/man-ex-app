import mongoose from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  gender: string;
  language: string;
  interests: string;
  continents: string;
  city: string;
  state: string;
  country: string;
  profilepic: string;
  profilepicVerified: boolean;
  verificationProfilepic: string;
  socials: string;
  authType: string;
  completedOnboarding: boolean;
  adminUser: boolean;
}

const userSchema = new mongoose.Schema<User>(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    gender: { type: String, default: 'male' },
    language: { type: String, default: 'english' },
    interests: { type: [String] },
    continents: { type: [String] },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    profilepic: { type: String },
    profilepicVerified: { type: Boolean, default: false },
    verificationProfilepic: { type: Boolean },
    socials: { type: [String] },
    authType: { type: String },
    completedOnboarding: { type: Boolean, default: false },
    adminUser: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<User>('User', userSchema);

export default User;
