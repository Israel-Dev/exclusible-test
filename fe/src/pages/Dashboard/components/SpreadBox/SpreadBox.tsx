import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Title } from '../../../../shared';
import { WebSocketService } from '../../../../api/services';

interface Props {
  spreadChangeCallback: (value: number) => void;
}

const SpreadBox = ({ spreadChangeCallback }: Props) => {
  useEffect(() => {
    WebSocketService.connectToWebSocket(spreadChangeCallback);
  }, []);

  return (
    <React.Fragment>
      <Title>Current Spread (BTC/USD)</Title>
      <Typography
        component="p"
        variant="h4"
        className="typography-container"
        id="spread-value-element"
        onChange={() => console.log('Changed!')}
        onChangeCapture={() => console.log('Changed!')}
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
