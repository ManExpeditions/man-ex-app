import mongoose from 'mongoose';

interface Group {
  _id: mongoose.Types.ObjectId;
  experience: mongoose.Types.ObjectId;
  iActive: boolean;
  name: string;
  startDate: Date;
  endDate: Date;
  registrationEndDate: Date;
  dateText: string;
  price: number;
  thriveCartScriptId: string;
  capacity: number;
  description: string;
  groupLead: mongoose.Types.ObjectId;
  goingUsers: [mongoose.Types.ObjectId];
  interestedUsers: [mongoose.Types.ObjectId];
}

const groupSchema = new mongoose.Schema<Group>(
  {
    experience: { type: mongoose.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean },
    name: { type: String },
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
