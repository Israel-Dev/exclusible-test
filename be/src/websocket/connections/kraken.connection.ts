import WebSocket from 'ws';
import { handleEvents } from '../events/kraken.event';

const ENDPOINT = 'wss://ws.kraken.com';

const createKrakenWebSocketConnection = (mws: WebSocket) => {
  const kws = new WebSocket(ENDPOINT, {
    perMessageDeflate: false
  });

  handleEvents(kws, mws);
};

export default createKrakenWebSocketConnection;
