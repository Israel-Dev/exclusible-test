import { Schema } from 'mongoose';
import { MongooseClient } from '../../db';

export interface Member extends MongooseClient.Document {
  name: string;
  email: string;
  dob: Date;
  isMale: boolean;
  about: string;
}

const memberSchema = new Schema<Member>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    isMale: { type: Boolean, required: true },
    dob: Date,
    about: { type: String, required: true }
  },
  { collection: 'members' }
);

const model = MongooseClient.model<Member>('Member', memberSchema);

export default model;
