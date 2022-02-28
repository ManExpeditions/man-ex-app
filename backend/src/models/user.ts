import mongoose from 'mongoose';

interface User {
  _id: mongoose.Types.ObjectId;
  isActive: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  gender: string;
  language: string;
  interests: [string];
  continents: [string];
  city: string;
  state: string;
  country: string;
  profilepic: string;
  profilepicVerified: boolean;
  verificationProfilepic: string;
  bio: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  authType: string;
  completedOnboarding: boolean;
  adminUser: boolean;
}

const userSchema = new mongoose.Schema<User>(
  {
    isActive: { type: Boolean, default: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
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
    bio: { type: String },
    socials: {
      facebook: { type: String },
      instagram: { type: String },
      linkedin: { type: String }
    },
    authType: { type: String, default: 'email' },
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
