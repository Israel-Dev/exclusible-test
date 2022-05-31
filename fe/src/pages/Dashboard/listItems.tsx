import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhoneLockedIcon from '@mui/icons-material/PhoneLocked';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes';
import { UserService } from '../../api/services';

export const MainListItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate(RoutePaths.myTeams)}>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Teams" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await UserService.logoutEverywhere();

      navigate(RoutePaths.home);
    } catch (e) {
      console.error('Error in handleClick of SecondaryListItems', e);
    }
  };

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <PhoneLockedIcon />
      </ListItemIcon>
      <ListItemText primary="Logout in all devices" />
    </ListItemButton>
  );
};
