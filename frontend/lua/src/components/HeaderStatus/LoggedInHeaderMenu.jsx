import * as React from 'react';
import { MenuItem, ListItemIcon, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const loggedInOptions = [
  { label: 'Profile', icon: <AccountCircleIcon /> },
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'Logout', icon: <ExitToAppIcon /> },
];

const LoggedInMenu = ({ handleMenuItemClick }) => {
  return (
    <>
      {loggedInOptions.map((setting) => (
        <MenuItem key={setting.label} onClick={() => handleMenuItemClick(setting)}>
          <ListItemIcon>{setting.icon}</ListItemIcon>
          <Typography sx={{ textAlign: 'center' }}>
            {setting.label}
          </Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default LoggedInMenu;
