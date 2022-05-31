import { WebSocketEndpoints } from '../endpoints/websocket.endpoint';

const service = {
  connectToWebSocket: (callback: (value: number) => void) => {
    if (WebSocketEndpoints.websocket) {
      const ws = new WebSocket(WebSocketEndpoints.websocket);

      ws.onopen = () => {
        console.log('Connection to WebSocket established');
      };

      ws.onmessage = (event) => {
        if (event && event.data) {
          const parsed = JSON.parse(event.data);

          if (parsed.spread) {
            const spreadValueElem = document.getElementById('spread-value-element');
            const spreadTimeElem = document.getElementById('spread-time-element');

            if (spreadValueElem && spreadTimeElem) {
              spreadValueElem.innerText = `${parsed.spread} ${parsed.currency}`;
              const now = `${new Date().getHours()}:${new Date().getMinutes()}`;
              spreadTimeElem.innerText = now;
              callback(parseFloat(parsed.spread));
            }
          }
        }
      };
    }
  },
};

export default service;
