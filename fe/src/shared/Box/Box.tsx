import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { default as MuiBox } from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};

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
      <Copyright sx={{ mt: 8, mb: 4 }} style={{ paddingBottom: '20px' }} />
    </Container>
  );
};

export default Box;
