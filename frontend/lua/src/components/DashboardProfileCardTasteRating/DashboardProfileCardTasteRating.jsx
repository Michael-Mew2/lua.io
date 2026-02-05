import * as React from "react";
import { Stack, Title, Rating, Text } from "@mantine/core";
import { AuthContext } from "../../contextx/AuthContext";

export default function DashboardProfileCardTasteRating() {
    const {user} = React.useContext(AuthContext)


  return (
    <Stack gap={1}>
      <Title order={5}>Music taste </Title>
      <Rating value={3.5} fractions={4} readOnly size="md" />
      <Text>
        <Text fw={700} span>
          3.5
        </Text>
        - dummy rating
      </Text>
    </Stack>
  );
}
