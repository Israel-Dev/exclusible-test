import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { default as MuiBox } from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Copyright } from '../Copyright';

interface Props {
  children?: any;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  headingTitle: string;
}

const Box = ({ handleSubmit, headingTitle, children }: Props) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="sign-in-container"
      style={{ backgroundColor: 'white', borderRadius: '10px' }}
    >
      <CssBaseline />
      <MuiBox
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {headingTitle}
        </Typography>
        <MuiBox component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {children}
        </MuiBox>
      </MuiBox>
      <Copyright />
    </Container>
  );
};

export default Box;
