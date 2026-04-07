import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  TagsInput,
  Textarea,
  Title,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import {
  IconDiscFilled,
  IconLanguage,
  IconMoodLookDown,
  IconMoodSmileBeam,
  IconPencil,
} from "@tabler/icons-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ShareSongContext } from "../../../contextx/ShareSongContext";
import { notifications } from "@mantine/notifications";
import { AuthContext } from "../../../contextx/AuthContext";
import { ReceiveSongContext } from "../../../contextx/ReceiveSongContext";

export default function SharedSongComment({ song }) {
  const navigate = useNavigate();
  const { addMotivationApi } = React.useContext(ShareSongContext);
  const { user, refreshUser } = React.useContext(AuthContext);
  const {refreshTokenStatus} = React.useContext(ReceiveSongContext)

  const form = useForm({
    mode: "controlled",
    initialValues: {
      motivation: "",
      language: [],
      genres: [],
    },
    validate: {
      motivation: (value) =>
        value.length > 0 ? null : "Please tell me, why you shared this song",
      language: (value) =>
        value.length > 0
          ? null
          : "I know some songs don't need words to be fully understood, if so, type 'none' ;)",
      genres: (value) =>
        value.length > 0
          ? null
          : "Every song is unique, but even is uniqueness can be categorized :)",
    },
  });

  const targetPage = `/members/${user.username}/claim`;

  const handleSubmit = async () => {
    try {
      if (!form.validate().hasErrors) {
        const response = await addMotivationApi(
          song.song._id,
          form.values.motivation,
          form.values.language,
          form.values.genres,
        );
        await refreshUser();
        await refreshTokenStatus();

        //console.log("ShareSongComment-handelSubmit:", response);
        
        notifications.show({
          title: `Thank you!.`,
          message: `Your message has been added to the song.`,
          color: "green",
          icon: <IconMoodSmileBeam size={20} />,
        });
        navigate(targetPage);
      }
    } catch (error) {
      const errorMessage =
        error.message || "Not possible to add your message to the song :(";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <IconMoodLookDown size={20} />,
      });
    }
  };

  const handleSkip = async () => {
    // await refreshUser();
    await refreshTokenStatus();
    navigate(targetPage);
  };

  return (
    <Center>
      <Box>
        <Title order={2}>Tell me more about the song.</Title>
        <Box>
          <Stack gap="md">
            <Textarea
              label="Why did you shared this song?"
              description="This is what the other persone will se, once your song is picked, so don't be mean."
              placeholder="Don't just say 'this was the first song available'. This song has a meaning to you, otherwise you would pick another one."
              radius="sm"
              leftSection={<IconPencil size={16} />}
              {...form.getInputProps("motivation")}
              error={form.errors.motivation}
            />
            <TagsInput
              label="Language(s)"
              description="What language(s) is this song in? (Choose up to 5 languages)"
              placeholder='Enter a language, than either press ",", ".", "|", Space or Enter to confirm.'
              splitChars={[",", " ", "|", "."]}
              maxTags={5}
              radius="sm"
              leftSection={<IconLanguage size={16} />}
              {...form.getInputProps("language")}
              onChange={(value) => form.setFieldValue("language", value)}
              error={form.errors.language}
            />
            <TagsInput
              label="Genres"
              description="What would you say are the genres of this song? (Choose up to 3 genres)"
              placeholder='Enter a genre, than either press ",", ".", "|", Space or Enter to confirm.'
              splitChars={[",", " ", "|", "."]}
              data={[
                "Afrobeats & Global Fusion",
                "Country",
                "Electronic Dance Music (EDM)",
                "Hip-Hop",
                "K-Pop",
                "Latin Music",
                "Phonk",
                "Pop",
                "Rock",
                "Trap",
              ]}
              maxTags={3}
              radius="sm"
              leftSection={<IconDiscFilled size={16} />}
              {...form.getInputProps("genres")}
              onChange={(value) => form.setFieldValue("genres", value)}
              error={form.errors.genres}
            />
            <Flex
              direction="row-reverse"
              align="center"
              justify="space-between"
              mt="lg"
            >
              <Button onClick={handleSubmit}>Send</Button>
              <Button variant="outline" onClick={handleSkip}>
                Skip
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
