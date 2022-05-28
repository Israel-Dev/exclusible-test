import WebSocket, { Server } from 'ws';
import { handleEvents, KrakenEvents } from '../events/kraken.event';
import { MainEvents } from '../events/main.event';

const ENDPOINT = 'wss://ws.kraken.com';

const createKrakenWebSocketConnection = (mws: WebSocket) => {
  const kws = new WebSocket(ENDPOINT, {
    perMessageDeflate: false
  });

  handleEvents(kws, mws);
};

export default createKrakenWebSocketConnection;
