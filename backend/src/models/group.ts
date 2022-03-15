import mongoose from 'mongoose';

interface Group extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  experience: mongoose.Types.ObjectId;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  registrationEndDate: Date;
  dateText: string;
  price: number;
  thriveCartScriptId: string;
  capacity: number;
  description: string;
  groupLead: mongoose.Types.ObjectId;
  goingUsers: any;
  interestedUsers: any;
}

const groupSchema = new mongoose.Schema<Group>(
  {
    experience: { type: mongoose.Types.ObjectId, ref: 'Experience' },
    isActive: { type: Boolean },
    startDate: { type: Date },
    endDate: { type: Date },
    registrationEndDate: { type: Date },
    dateText: { type: String },
    price: { type: Number },
    thriveCartScriptId: { type: String },
    capacity: { type: Number },
    description: { type: String },
    groupLead: { type: mongoose.Types.ObjectId, ref: 'User' },
    goingUsers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    interestedUsers: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
);

const Group = mongoose.model<Group>('Group', groupSchema);

export default Group;
