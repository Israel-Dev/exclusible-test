import { createClient } from 'redis';

const { REDIS_DB_USERNAME, REDIS_DB_PASSWORD, REDIS_DB_HOST, REDIS_DB_PORT } = process.env;

const REDIS_URL = `redis://${REDIS_DB_USERNAME}:${REDIS_DB_PASSWORD}@${REDIS_DB_HOST}:${REDIS_DB_PORT}`;

const client = createClient({
  url: REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  try {
    await client.connect();
    console.log(`**** Connection estabilshed to Redis DB ****`);
  } catch (e) {
    console.error('Error in connectRedis', e);
  }
};

connectRedis();

export default client;
