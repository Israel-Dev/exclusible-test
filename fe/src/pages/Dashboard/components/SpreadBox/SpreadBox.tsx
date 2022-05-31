import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Title } from '../../../../shared';
import { WebSocketService } from '../../../../api/services';

const SpreadBox = () => {
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
      <div>{new Date().toLocaleDateString('en-uk')} - Info from Kraken</div>
    </React.Fragment>
  );
};

export default SpreadBox;
