import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Zum Weiterleiten auf eine andere Seite

export default function Dashboard() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/members/music"); // Weiterleitung zur MusicShare-Seite
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        color="white"
        onClick={startGame}
        sx={{ fontSize: 20, fontFamily: "monospace", fontWeight: 600 }}
      >
        Play the music game
      </Button>
    </Box>
  );
}
