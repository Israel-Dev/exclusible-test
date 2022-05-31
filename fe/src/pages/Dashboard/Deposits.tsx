import React, { useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { WebSocketService } from '../../api/services';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const Deposits = () => {
  useEffect(() => {
    WebSocketService.connectToWebSocket();
  }, []);

  return (
    <React.Fragment>
      <Title>Current Spread (BTC/USD)</Title>
      <Typography
        component="p"
        variant="h4"
        className="typography-container"
        id="spread-value-element"
      >
        -
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ flex: 1 }}
        className="spread-time"
        id="spread-time-element"
      >
        -
      </Typography>
      <div>{new Date().toLocaleDateString('en-uk')}</div>
    </React.Fragment>
  );
};

export default Deposits;
