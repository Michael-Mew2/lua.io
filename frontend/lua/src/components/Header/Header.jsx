import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
// import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItemIcon from "@mui/material/ListItemIcon";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const pages = [];
const settingsOutside = [
  { label: "Log In", icon: <LoginIcon /> },
  { label: "Register", icon: <AccountCircleIcon /> },
];
const settingsInside = [
  { label: "Profile", icon: <AccountCircleIcon /> },
  { label: "Account", icon: <AccountCircleIcon /> },
  { label: "Dashboard", icon: <DashboardIcon /> },
  { label: "Logout", icon: <ExitToAppIcon /> },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  //    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true); // Zustand auf true setzen
      } else {
        setIsScrolled(false); // Zustand auf false setzen
      }
    };

    window.addEventListener("scroll", handleScroll); // Scroll-Ereignis hinzufügen

    console.log({ isScrolled, setIsScrolled });

    return () => {
      window.removeEventListener("scroll", handleScroll); // Event-Listener entfernen
    };
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("members/dash");
    }
  }, [isLoggedIn, navigate]);

  //    const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  //   };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  //   const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  //   };

  const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);
  
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
  
        /* More for status logged in: */
        default:
          console.log("Undefined target", setting.label);
          break;
      }
    },
    [navigate]
  );

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: isScrolled ? "#6a3093" : "transparent",
        transition: "background-color 0.3s ease",
        boxShadow: "none",
        padding: 20,
        zIndex: "3",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DarkModeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={isLoggedIn ? "members/dash" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            lua.io
          </Typography>
          {/* Mobile Navigation */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <DarkModeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            lua.io
          </Typography>
          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* User Dropdown Icon */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Get Startet">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {!isLoggedIn ? (
                  /* If NOT Logged In: */
                  <>
                    <Typography
                      // variant="h5"
                      noWrap
                      sx={{
                        mr: 1,
                        display: { xs: "flex", md: "flex" },
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,

                        // letterSpacing: ".3rem",
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      Get inside
                    </Typography>
                    <LoginIcon sx={{ color: "white" }} />
                  </>
                ) : (
                  /* If Logged In: */
                  <Avatar
                    alt="Getting Started"
                    sx={{ width: 54, height: 54, bgcolor: "white" }}
                  ></Avatar>
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
              {(isLoggedIn ? settingsInside : settingsOutside).map(
                (setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => handleMenuItemClick(setting)}
                  >
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
