import * as React from 'react';
import { MenuItem, ListItemIcon, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const loggedOutOptions = [
  { label: 'Log In', icon: <LoginIcon /> },
  { label: 'Register', icon: <AccountCircleIcon /> },
];

const LoggedOutMenu = ({ handleMenuItemClick }) => {
  return (
    <>
      {loggedOutOptions.map((setting) => (
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

export default LoggedOutMenu;
