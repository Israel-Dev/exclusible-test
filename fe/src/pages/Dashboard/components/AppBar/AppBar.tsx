import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useCallback } from 'react';
import { UserService } from '../../../../api/services';
import Cookies from 'js-cookie';
import { RoutePaths } from '../../../../routes';
import { useNavigate } from 'react-router-dom';
import { drawerWidth } from '../../Dashboard';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarElem = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const AppBar = ({ open, toggleDrawer }: Props) => {
  const navigate = useNavigate();

  const handleLogoutClick = useCallback(async () => {
    try {
      await UserService.logout();
      Cookies.remove('token');
      navigate(RoutePaths.home);
    } catch (e) {
      console.error('Error in handleLogouClick', e);
    }
  }, []);

  return (
    <AppBarElem position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate(RoutePaths.dashboard)}
        >
          Dashboard
        </Typography>

        <IconButton color="inherit" onClick={handleLogoutClick}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBarElem>
  );
};

export default AppBar;
