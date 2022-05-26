import express from 'express';
import { UserRoute } from './api/routes';

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the Backed of the Exclusible tech test');
});

app.use('/user', UserRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
