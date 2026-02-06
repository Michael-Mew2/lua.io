import * as React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
import { ShareSongContext } from "../../../contextx/ShareSongContext";

export default function SongShareInator({onSongShared}) {
  const [songLink, setSongLink] = React.useState("");
  const { shareSong, loading, error } = React.useContext(ShareSongContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shareSong(songLink);
        onSongShared(response); // Übergabe der Antwort an Elternelement
      setSongLink("");
    } catch (error) {
      // Fehler wird im Kontext behandelt
    }
  };

  return (
    <Center>
      <Box>
        <Title order={1}> Share a Song!</Title>
        <Box>
          <form onSubmit={handleSubmit}>
            <Stack gap="sm">
              <TextInput
                label="URL"
                description="Enter the Spotify or Deezer-link of your favorite song."
                withAsterisk
                radius="sm"
                leftSection={<IconWorldWww size={16} />}
                value={songLink}
                 onChange={(e) => setSongLink(e.target.value)}
              />
              {error && <Text color="red">{error}</Text>}
              <Flex
                direction="row-reverse"
                align="center"
                justify="space-between"
                mt="lg"
                gap="sm"
              >
                <Button variant="filled" color="violet" type="submit" loading={loading}>
                  Share my song!
                </Button>
                <Button variant="filled" color="grey" onClick={() => setSongLink("")}>
                  I have nothing to share (cancel)
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Box>
    </Center>
  );
}
