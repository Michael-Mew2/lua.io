import * as React from 'react';
import { AuthContext } from "../../contextx/AuthContext";
import { useNavigate } from 'react-router-dom';
// ----------
import LoggedInMenu from './LoggedInHeaderMenu';
import LoggedOutMenu from './LoggedOutHeaderMenu';  // Import der neuen Komponenten
// ----------
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// ----------
import LoginIcon from '@mui/icons-material/Login';
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function HeaderStatus() {
  const { isLoggedIn, setIsLoggedIn, user, setUser} = React.useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  // Menü öffnen:
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Menü schließen:
  const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);

  // Menüpunkt-Auswahl:
  const handleMenuItemClick = React.useCallback(
    (setting) => {
      handleCloseUserMenu();
      switch (setting.label) {
        /* Status logged out: */
        case "Log In":
          navigate("/sign-in");
          break;

        case "Register":
          navigate("/sign-up");
          break;

        /* Status logged in: */
        case "Logout":
          setIsLoggedIn(false);
          setUser(null);
          console.log("You logged out!");
          navigate("/")
          break;
        case "Dashboard":
            navigate("/members/dash")
        break;
        default:
          console.log("Undefined target", setting.label);
          break;
      }
    },
    [navigate, handleCloseUserMenu]
  );

  // React.useEffect(() => {
  //   console.log({isLoggedIn});
  // }, [isLoggedIn])

  return (
    <>
      {/* User Dropdown Icon */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Get Started">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {!isLoggedIn ? (
              <>
                <Typography
                  noWrap
                  sx={{
                    mr: 1,
                    display: { xs: "flex", md: "flex" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Get inside
                </Typography>
                <LoginIcon sx={{ color: "white" }} />
              </>
            ) : (
                <>
                <Typography
                  noWrap
                  sx={{
                    mr: 1,
                    display: { xs: "flex", md: "flex" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Moin {user?.username}
                </Typography>
              <Avatar
                alt="Getting Started"
                sx={{ width: 54, height: 54, bgcolor: "white" }}
                ></Avatar>
                </>
            )}
          </IconButton>
        </Tooltip>

        {/* Menu: */}
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          disableScrollLock
        >
          {isLoggedIn ? (
            <LoggedInMenu handleMenuItemClick={handleMenuItemClick} />
          ) : (
            <LoggedOutMenu handleMenuItemClick={handleMenuItemClick} />
          )}
        </Menu>
      </Box>
    </>
  );
}
