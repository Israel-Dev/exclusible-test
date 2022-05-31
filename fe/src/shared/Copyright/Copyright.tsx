import { Link, Typography } from '@mui/material';

const Copyright = () => (
  <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    sx={{ mt: 8, mb: 4 }}
    style={{ paddingBottom: '20px' }}
  >
    {'Copyright © '}
    <Link color="inherit" href="https://exclusible.com" target="_blank">
      Exclusible test
    </Link>{' '}
    {new Date().getFullYear()}
  </Typography>
);
export default Copyright;
