import express from 'express';
import cors from 'cors';
import { MemberRoute, TeamRoute, UserRoute } from './api/routes';
import { createServer } from 'http';
import { createMainWebSocketConnection } from './websocket/connections';

const { PORT } = process.env;

const app = express();
const httpServer = createServer(app);
createMainWebSocketConnection(httpServer);

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/user', UserRoute);
app.use('/team', TeamRoute);
app.use('/member', MemberRoute);

app.get('/', (req, res) => {
  res.send('This is the Backed of the Exclusible tech test');
});

httpServer.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
