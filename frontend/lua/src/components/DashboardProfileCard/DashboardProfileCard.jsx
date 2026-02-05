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
            <Stack>
              <Text className={classes.username}>{user?.username}</Text>
              <Group className={classes.badges}>
                <Badge>Badge 1</Badge>
                <Badge>Badge 2</Badge>
                <Badge>Badge 3</Badge>
              </Group>
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
