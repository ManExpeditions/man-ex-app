import mongoose from 'mongoose';

interface Experience {
  _id: mongoose.Types.ObjectId;
  isActive: boolean;
  name: string;
  description: string;
  numberOfDays: string;
  location: string;
  continent: string;
  season: string;
  pricing: number;
  deposit: number;
  videoThumbnailImage: string;
  video: string;
  heroImage: string;
  images: string;
  itinerary: string; // string because it is sent as string on requests
  accomodations: string;
  activities: string;
  reviews: string;
  whatsIncluded: string;
  terms: string;
  groups: [mongoose.Types.ObjectId];
}

const experienceSchema = new mongoose.Schema<Experience>(
  {
    isActive: { type: Boolean, default: true },
    name: { type: String },
    description: { type: String },
    numberOfDays: { type: String },
    location: { type: String },
    continent: { type: String },
    season: { type: String },
    pricing: { type: Number },
    deposit: { type: Number },
    videoThumbnailImage: { type: String },
    video: { type: String },
    heroImage: { type: String },
    images: { type: [String] },
    itinerary: { type: Array },
    accomodations: { type: Array },
    activities: { type: Array },
    reviews: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        stars: { type: Number },
        description: { type: String }
      }
    ],

    whatsIncluded: { type: String },
    terms: { type: String },
    groups: [{ type: mongoose.Types.ObjectId, ref: 'Group' }]
  },
  {
    timestamps: true
  }
);

const Experience = mongoose.model<Experience>('Experience', experienceSchema);

export default Experience;
