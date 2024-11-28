import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link,
  Alert,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

export default function signInPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert(
      `Logging in!`
    )
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Vollbild-Höhe
        // bgcolor: '#f4f4f4', // Hintergrundfarbe der Seite
      }}
    >
      <Card
        sx={{
          width: 400,
          padding: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <DarkModeIcon sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "block",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".2rem",
            }}
          >
            lua.io
          </Typography>
        </CardContent>

        <CardContent>

          {/* Title */}
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", marginBottom: 3, fontFamily:"monospace", fontWeight:600, letterSpacing:".2rem" }}
          >
            Login
          </Typography>

          {/* Info */}
          <Alert severity="info" sx={{ mb: 2 }}>
          Currently not able, but we are investigating this ongoing issue.
        </Alert>

        {/* Form */}
        <form onSubmit={handleSignIn}>

          {/* Eingabefeld für E-Mail */}
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            slotProps={{startAdornment: (
              <InputAdornment position="start">
                <AccountCircle/>
              </InputAdornment>
            )}}
            />

          {/* Eingabefeld für Passwort */}
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {/* Login-Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ py: 1, mt:2 }}
            >
            Sign In
          </Button>
          </form>

          {/* Links: */}
          <Box sx={{ textAlign: "center", mt: 2 }}>

            {/* Forgot Password: */}
          <Link href="#" variant="body2" sx={{ display: "block", mt:2, mb: 2 }}>
            Forgot your password?
          </Link>

          {/* No account: */}
          <Typography variant="body2">
            Don&apos;t have an account?{" "}
            <Link component="button" variant="body2" onClick={() => navigate("/sign-up")}>
              Sign up
            </Link>
          </Typography>
        </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
