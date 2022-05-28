import { Schema, Types } from 'mongoose';
import { MongooseClient } from '../../db';

interface Team extends MongooseClient.Document {
  members: Types.Array<string>;
  teamRef: string;
}

const teamSchema = new Schema<Team>(
  {
    members: [String],
    teamRef: { type: String, unique: true }
  },
  {
    collection: 'teams'
  }
);

const model = MongooseClient.model<Team>('Team', teamSchema);

export default model;
