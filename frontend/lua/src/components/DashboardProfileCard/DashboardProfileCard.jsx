import * as React from "react";
import {
  Container,
  Group,
  Title,
  Stack,
  Text,
  Badge,
  Divider,
  Rating,
} from "@mantine/core";
import classes from "./DashboardProfileCard.module.css";
import UserProfilePicture from "../UserProfilePicture/UserProfilePicture";
import { AuthContext } from "../../contextx/AuthContext";
import DashboardProfileCardTasteRating from "../DashboardProfileCardTasteRating/DashboardProfileCardTasteRating";
import DashboardProfileCardFeedbackRating from "../DashboardProfileCardFeedbackRating/DashboardProfileCardFeedbackRating";

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
            <Stack gap="xs" className={classes.generalInfo}>
              <Title order={2} className={classes.username}>
                {user?.username}
              </Title>
              {user?.badges && (
                <Group className={classes.badges}>
                  {user?.badges.map((badge, index) => (
                    <Badge key={index} size="xs" color="#4a5167">
                      {badge}
                    </Badge>
                  ))}
                </Group>
              )}
              <Group className={classes.birthdateAndReferral} mt={2} gap="xs">
                <Text className={classes.birthdate}>
                  Birthday: {user?.birthdate}
                </Text>
                {user?.referral && (
                  <Text className={classes.referral}>
                    Joined thanks to <Text fw={700} span> {user?.referral}</Text>
                  </Text>
                )}
              </Group>
            </Stack>
          </Group>
          <Group wrap="no-wrap">
            <DashboardProfileCardTasteRating />
            <Divider size="sm" orientation="vertical" />
            <DashboardProfileCardFeedbackRating/>
          </Group>
        </Group>
      </Container>
    </div>
  );
}
