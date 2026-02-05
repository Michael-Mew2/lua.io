import React from "react";
import { useNavigate } from "react-router-dom"; // Zum Weiterleiten auf eine andere Seite

export default function Dashboard() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/members/music"); // Weiterleitung zur MusicShare-Seite
  };

  return (
    <>
    Try to create a Dashboard, which is build up by components
    </>
  );
}
