import * as React from "react";
import { Flex, Stack } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom"; // Zum Weiterleiten auf eine andere Seite
import DashboardProfileCard from "../../components/DashboardProfileCard/DashboardProfileCard";

export default function Dashboard() {
  const {username} = useParams();
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/members/music"); // Weiterleitung zur MusicShare-Seite
  };

  return (
    <>
    <Stack>
      <DashboardProfileCard />
    </Stack>
    </>
  );
}
