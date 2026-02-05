import * as React from "react";
import { Container, Group, Title, Stack, Text, Badge } from "@mantine/core";
import classes from "./DashboardProfileCard.module.css";
import UserProfilePicture from "../UserProfilePicture/UserProfilePicture";
import { AuthContext } from "../../contextx/AuthContext";

export default function DashboardProfileCard() {
  const { user } = React.useContext(AuthContext);

  return (
    <div className={classes.profileCardOuter}>
      <Container className={classes.profileCardInner}>
        <Group
          className={classes.profileCardContent}
          justify="space-between"
          size="md"
        >
          <Group className={classes.userProfile}>
            <UserProfilePicture />
            <Stack gap="xs">
              <Title order={2} className={classes.username}>{user?.username}</Title>
              {user?.badges && (
                <Group className={classes.badges}>
                  {user?.badges.map((badge, index) => (
                    <Badge key={index} size="xs" color="#4a5167">{badge}</Badge>
                  ))}
                </Group>
              )}
              <Text className={classes.birthdate}>
                Birthday: {user?.birthdate}
              </Text>
            </Stack>
          </Group>
          <Title order={1}>Hi there!</Title>
        </Group>
      </Container>
    </div>
  );
}
