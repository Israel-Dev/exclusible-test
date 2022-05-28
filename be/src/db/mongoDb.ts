import mongoose from 'mongoose';

const { CLUSTER, CLUSTER_USER, CLUSTER_PASSWORD, DB_NAME: dbName } = process.env;

const mongoUri = `mongodb+srv://${CLUSTER_USER}:${CLUSTER_PASSWORD}@${CLUSTER}.dhsf1.mongodb.net/?retryWrites=true&w=majority`;

if (CLUSTER_USER && CLUSTER_PASSWORD && CLUSTER && dbName) {
  mongoose.connect(mongoUri, { dbName });

  const db = mongoose.connection;

  db.on('error', (error) => console.error('**** Error on db connection ****', error));
  db.once('open', () => console.log('**** Connection estabilshed to DB ******'));
}

export default mongoose;
