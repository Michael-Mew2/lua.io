import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
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
  MenuItem,
  Select,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const planets = [
  "Earth",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "It will always be Pluto",
  "I love them all",
  "I hate them all",
];

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [favoritePlanet, setFavoritePlanet] = React.useState("");
  const [favoriteColor, setFavoriteColor] = React.useState("#000000");

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleFavoritePlanetChange = (event) =>
    setFavoritePlanet(event.target.value);

  const handleColorChange = (event) => setFavoriteColor(event.target.value);

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert(
      `Sign up with: 
      Username: ${data.get("username")},
      Email: ${data.get("email")},
      Password: ${data.get("password")},
      Favorite Planet: ${data.get("favoritePlanet")},
      Favorite Color: ${data.get("favoriteColor")},
      Birthdate: ${data.get("birthdate")}`
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // bgcolor: "rgba(0,0,0,0)",
        pt:{xs: 17, md:0},
        pb: {xs:20, md: 0}
      }}
    >
      <Card sx={{width: 400, padding: 3, boxShadow: 3 }}>
        {/* Überschrift */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: ".2rem",
          }}
        >
          Sign Up
        </Typography>

        {/* Info-Banner */}
        <Alert severity="info" sx={{ mb: 2 }}>
          Join us and disco-ver new songs from around the world!
        </Alert>

        {/* Formular */}
        <form onSubmit={handleSignUp}>
          {/* Benutzername */}
          <TextField
            id="username"
            name="username"
            label="Username"
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />

          {/* E-Mail-Feld */}
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />

          {/* Passwort-Field */}
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

          {/* Lieblingsplanet */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="favoritePlanet-label">Favorite Planet</InputLabel>
            <Select
              labelId="favoritePlanet-label"
              id="favoritePlanet"
              name="favoritePlanet"
              value={favoritePlanet}
              onChange={handleFavoritePlanetChange}
              required
            >
              {planets.map((planet) => (
                <MenuItem key={planet} value={planet}>
                  {planet}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Lieblingsfarbe */}
          <TextField
            id="favoriteColor"
            name="favoriteColor"
            label="Favorite Color"
            type="color"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
            onChange={handleColorChange}
          />

          {/* Geburtsdatum */}
          <TextField
            id="birthdate"
            name="birthdate"
            label="Birthdate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
            required
          />

          {/* Registrieren-Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1 }}
          >
            Sign Up
          </Button>
        </form>

        {/* Links */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/sign-in")}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
