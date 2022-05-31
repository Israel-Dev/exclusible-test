import { Grid, Paper, TextField, InputLabel } from '@mui/material';
import { useState } from 'react';
import { SpreadBox } from '../';
import { StyledTotal, StyledTotalTitle, TotalContainer } from './Overview.styled';

const Overview = () => {
  const [customSpread, setCustomSpread] = useState(0);

  const [spreadValue, setSpreadValue] = useState(0);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <InputLabel>Insert a number you want to add to the current spread value</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id={'custom-spread'}
            label="Custom Spread"
            name={'custom-spread'}
            value={customSpread}
            type="number"
            onChange={(e) => {
              setCustomSpread(parseFloat(e.target.value));
            }}
          />
          <TotalContainer>
            <StyledTotalTitle>Total:</StyledTotalTitle>
            {customSpread ? (
              <StyledTotal>
                {isNaN(customSpread + spreadValue) ? '-' : (customSpread + spreadValue).toFixed(2)}$
              </StyledTotal>
            ) : null}
          </TotalContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <SpreadBox spreadChangeCallback={setSpreadValue} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Overview;
