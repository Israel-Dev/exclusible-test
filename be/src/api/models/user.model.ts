import { MongooseClient } from '../../db';

import { ObjectId, Schema, Types } from 'mongoose';

interface User extends MongooseClient.Document {
  username: string;
  email: string;
  password: string;
  teams: Types.Array<string>;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    teams: [String]
  },
  { collection: 'users' }
);

const model = MongooseClient.model<User>('User', userSchema);

export default model;
