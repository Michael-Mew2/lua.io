import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import * as React from "react";
import { AuthContext } from "../../../contextx/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NiceTry() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleDirectToDash = () => {
    navigate(`/members/${user.username}`);
  };
  const handleDirectToShare = () => {
    navigate(`/members/${user.username}/share`);
  };

  return (
    <Stack h="100%">
      <Container>
        <Title order={1} ta="center">
          You shall not pass!
        </Title>
        <Text ta="center">
          Looks like you need to share a new song first before you can get one.
        </Text>
      </Container>
      <SimpleGrid cols={{ base: 1, md: 2 }} h="100%">
        <Box h="100%" w="100%" radius="lg">
          <Stack>
            <Title order={2}>Back to business?</Title>
            <Text>
              No idea what you could share? No problemo! Go back to your profile
              page and have a look around, maybe you'll find something in the
              mean time.
            </Text>
            <ButtonGroup>
              <Button
                variant="filled"
                size="sm"
                color="pink"
                radius="md"
                onClick={handleDirectToDash}
              >
                Bing me back!
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
        <Box h="100%" w="100%" radius="lg">
          <Stack>
            <Title order={2}>Share a song!</Title>
            <Text>
              Do you already have a song in mind you want to share? Go ahead
              lets see what you have in mind.
            </Text>
            <ButtonGroup>
              <Button
                variant="filled"
                size="sm"
                color="lime"
                radius="md"
                onClick={handleDirectToShare}
                
              >
                Lets have some fun!
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </SimpleGrid>
    </Stack>
  );
}
