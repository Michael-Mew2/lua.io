import * as React from "react";
import { Flex, Group, Stack } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom"; // Zum Weiterleiten auf eine andere Seite
import DashboardProfileCard from "../../components/DashboardProfileCard/DashboardProfileCard";
import DashboardMainRanking from "../../components/DashboardMainComponents/DashboardMainRanking/DashboardMainRanking";
import DashboardMainFriendsList from "../../components/DashboardMainComponents/DashboardMainFriends/DashboardMainFriendsList";
import DashboardMainStartButton from "../../components/DashboardMainComponents/DashboardMainStartButton/DashboardMainStartButton";
import DashboardMainFeed from "../../components/DashboardMainComponents/DashboardMainFeed/DashboardMainFeed";
import {useAuth} from "../../contextx/useAuth"

export default function Dashboard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const {user} = useAuth();



  const startGame = () => {
    navigate("/members/music"); // Weiterleitung zur MusicShare-Seite
  };

  return (
    <>
      <Stack>
        <DashboardProfileCard />

        {/* ----- Start DashboardMain */}
        <Group align="flex-start" spacing="md">
          {/* -- Left side -- */}
          <DashboardMainRanking sx={{flex: 1}} />

          {/* -- Right Side -- */}
          <Stack sx={{flex: 3}}>
            {/* - Right side top - */}
            <Group>
              <DashboardMainFriendsList sx={{ flex: 3, width: "75%" }} />
              <DashboardMainStartButton sx={{flex: 1}} />
            </Group>

            {/* - Right Side Bottom - */}
            <DashboardMainFeed />
          </Stack>
        </Group>
      </Stack>
    </>
  );
}
