import mongoose from '../../db/connection';

import { Schema } from 'mongoose';

interface User extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { collection: 'users' }
);

const model = mongoose.model<User>('User', userSchema);

export default model;
