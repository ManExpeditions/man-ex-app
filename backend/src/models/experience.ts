import mongoose from 'mongoose';

interface experience {
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
  images: string[];
  itinerary: object;
  accomodations: object;
  activities: object;
  whatsIncluded: object;
  terms: string;
  groups: [
    {
      label: string;
      isActive: boolean;
      name: string;
      date: string;
      registrationEndDate: Date;
      price: number;
      capacity: number;
      description: string;
      leadName: string;
      leadProfilepic: string;
      goingUsers: [{ userId: string }];
      interestedUsers: [{ userId: string }];
    }
  ];
}

const experienceSchema = new mongoose.Schema<experience>(
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
    images: { type: [Object] },
    itinerary: { type: Object },
    accomodations: { type: Object },
    activities: { type: Object },
    whatsIncluded: { type: Object },
    terms: { type: String },
    groups: [
      {
        label: { type: String },
        isActive: { type: Boolean },
        name: { type: String },
        date: { type: String },
        registrationEndDate: { type: Date },
        price: { type: Number },
        capacity: { type: Number },
        description: { type: String },
        leadName: { type: String },
        leadProfilepic: { type: String },
        goingUsers: [{ userId: String }],
        interestedUsers: [{ userId: String }]
      }
    ]
  },
  {
    timestamps: true
  }
);

const experience = mongoose.model<experience>(
  'experience',
  experienceSchema,
  'manex_experience'
);

export default experience;
