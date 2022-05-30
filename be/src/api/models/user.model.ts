import { MongooseClient } from '../../db';

import { Schema, Types } from 'mongoose';

export interface User extends MongooseClient.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  teams: Types.Array<string>;
}

const userSchema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teams: [String]
  },
  { collection: 'users' }
);

const model = MongooseClient.model<User>('User', userSchema);

export default model;
