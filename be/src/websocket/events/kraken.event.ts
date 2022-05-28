import { WebSocket } from 'ws';

export enum KrakenEvents {
  OPEN = 'open',
  MESSAGE = 'message',
  ERROR = 'error',
  SUBSCRIBE = 'subscribe'
}

export enum KrakenMessages {
  TICKER = 'ticker',
  OHCL = 'ohcl',
  TRADE = 'trade',
  SPREAD = 'spread',
  BOOK = 'book'
}

export enum KrakenCurrencyPair {
  XBT_USD = 'XBT/USD'
}

const getSpreadValue = (messageArr: (number | string | string[])[]) => {
  const valuesArr = messageArr[1] as string[];
  const values = {
    bidPrice: Number(valuesArr[0]),
    askPrice: Number(valuesArr[1]),
    timeStamp: valuesArr[2],
    bidVolume: Number(valuesArr[3]),
    askVolume: Number(valuesArr[4])
  };
  const spreadValue = (values.askPrice - values.bidPrice).toFixed(2);
  return spreadValue;
};

export const handleEvents = (kws: WebSocket, mws: WebSocket) => {
  kws.on(KrakenEvents.OPEN, () => {
    console.log('**** Connected to KrakenWebSocket ****');

    kws.send(
      JSON.stringify({
        event: KrakenEvents.SUBSCRIBE,
        pair: [KrakenCurrencyPair.XBT_USD],
        subscription: {
          name: KrakenMessages.SPREAD
        }
      })
    );
  });

  kws.on(KrakenEvents.MESSAGE, (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (
      parsedMessage[2] === KrakenMessages.SPREAD &&
      parsedMessage[3] === KrakenCurrencyPair.XBT_USD
    ) {
      const spread = getSpreadValue(parsedMessage);
      mws.send(JSON.stringify({ spread, currency: KrakenCurrencyPair.XBT_USD.split('/')[1] }));
    }
  });

  kws.on(KrakenEvents.ERROR, (error) => {
    console.error(error);
  });
};
