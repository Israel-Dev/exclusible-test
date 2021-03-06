import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems, SecondaryListItems } from './listItems';
import { Copyright } from '../../shared';
import { AppBar, CreateMember, Drawer, MyTeam, MyTeams, Overview } from './components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RoutePaths } from '../../routes';

export const drawerWidth = 240;

const mdTheme = createTheme();

const Dashboard = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');

  if (!token || !token.trim() || token === undefined) navigate(RoutePaths.signIn);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [teamRef, setTeamRef] = useState('');

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar open={open} toggleDrawer={toggleDrawer} />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path={'/my-team'} element={<MyTeam saveTeamRef={setTeamRef} />} />
              <Route path={'/my-teams'} element={<MyTeams />} />
              <Route path={'/edit-member'} element={<CreateMember teamRef={teamRef} />} />
              <Route path={'/create-member'} element={<CreateMember teamRef={teamRef} />} />
              <Route path={'/'} element={<Overview />} />
            </Routes>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
