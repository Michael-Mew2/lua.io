import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Rating,
  ScrollArea,
  Stack,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import * as React from "react";
import axiosInstance from "../../../api/axiosInstance";
import { notifications } from "@mantine/notifications";
import {
  IconDiscFilled,
  IconLanguage,
  IconMoodSmile,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { Form, useForm } from "@mantine/form";
import { ReceiveSongContext } from "../../../contextx/ReceiveSongContext";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../../contextx/useAuth"

export default function ReceivedSongComment({ song }) {
  const { submitSongComment } = React.useContext(ReceiveSongContext);
  const navigate = useNavigate();
  const {user} = useAuth();

  const form = useForm({
    initialValues: {
      rating: 0,
      comment: "",
      language: song.language || [],
      genres: song.genres || [],
    },
    validate: {
      rating: (value) =>
        value === 0 ? "You need to at least select one star." : null,
      comment: (value) =>
        value.trim() === "" ? "Ha. You need to give a comment!" : null,
    },
  });

  const handleSubmit = async () => {
    if (!form.validate().hasErrors) {
      const success = await submitSongComment(song._id, form.values, () => {
        navigate(targetPage);
      });

      if (success) {
        notifications.show({
          title: "Thank you!",
          message:
            "I know you didn't had any other option, but I appreciate that you gave this song a rating and comment.",
          color: "green",
          icon: <IconMoodSmile size={20} />,
        });
      }
    }
  };

  const targetPage = `/members/${user.username}`;

  return (
    <Box h="100%" style={{ maxHeight: "100%" }}>
      <ScrollArea>
        <Title order={1} size="lg">
          Rate and comment the song you got!
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Stack gap={3}>
              <Text size="sm" fw={500}>
                Rate the song you got!
              </Text>
              <Rating
                color="pink"
                size="lg"
                {...form.getInputProps("rating")}
              />
              {form.errors.rating && (
                <Text c="red" size="xs">
                  {form.errors.rating}
                </Text>
              )}
            </Stack>
            <Textarea
              label="Share your thoughts"
              description="Did you liked this song What did it remind you? Tell the person who gifted you this song what you thought about it."
              placeholder="Don't let this empty. Don't be a goofy Goober, this is part of the fun! And don't be insulting!"
              radius="sm"
              leftSection={<IconPencil size={16} />}
              {...form.getInputProps("comment")}
              error={form.errors.comment}
            />
            {(!song.language || song.language.length <= 0) && (
              <TagsInput
                label="Language(s)"
                description="Looks like the person that shared this song forgot to tell you what language(s) this song is in."
                placeholder='Enter up to 5 languages. Press ",", ".", "|", Space or Enter after every word to confirm '
                splitChars={[",", " ", "|", "."]}
                maxTags={5}
                radius="sm"
                leftSection={<IconLanguage size={16} />}
                {...form.getInputProps("language")}
              />
            )}
            {(!song.genres || song.genres.length <= 0) && (
              <TagsInput
                label="Genres"
                description="Looks like the genres are missing, could you add them"
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
              />
            )}
            <ButtonGroup>
              <Button type="submit" color="pink">
                Submit your feedback
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </ScrollArea>
    </Box>
  );
}
