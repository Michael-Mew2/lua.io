import * as React from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../contextx/AuthContext"
import { registerApi } from "../../api/api";

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

  const handleSignUp  = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const profilePic = data.get("favoritePlanet");
    const color = data.get("favoriteColor");
    const birthdate = data.get("birthdate");
    
    await registerApi(username, email, password, profilePic, color, birthdate) 
  }

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleFavoritePlanetChange = (event) =>
    setFavoritePlanet(event.target.value);

  const handleColorChange = (event) => setFavoriteColor(event.target.value);

  return (
    <>
    hi
    </>
  );
}
