import { WebSocket, Server } from 'ws';
import { createKrakenWebSocketConnection } from '../connections';

export enum MainEvents {
  CONNECTION = 'connection',
  MESSAGE = 'message'
}

export const handleEvents = (wss: Server<WebSocket>) => {
  return wss.on(MainEvents.CONNECTION, (ws) => {
    createKrakenWebSocketConnection(ws);
  });
};
