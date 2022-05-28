import { Server as HttpServer } from 'http';
import { WebSocket } from 'ws';
import { handleEvents } from '../events/main.event';

const createMainWebSocketConnection = (httpServer: HttpServer) => {
  const wss = new WebSocket.Server({ server: httpServer });
  handleEvents(wss);
};

export default createMainWebSocketConnection;
