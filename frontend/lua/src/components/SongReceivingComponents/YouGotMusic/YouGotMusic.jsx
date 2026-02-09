import {
  Box,
  Button,
  ButtonGroup,
  Center,
  getFloatingPosition,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBrandDeezer, IconBrandSpotifyFilled } from "@tabler/icons-react";
import React from "react";

export default function YouGotMusic({ song }) {
  return (
    <Center h="100%">
      <Box h="100%" ta="center">
        {song.addedByUsername && <Text>This song is presented to you by</Text>}
        {song.addedByUsername && <Text>{song.addedByUsername}</Text>}
        <Stack align="center">
          <Image h={140} w={140} radius="md" src={song.cover} />
          <Text>
            {Array.isArray(song.artists) && song.artists.length > 0
              ? song.artists.map((artist, index) =>
                  index === song.artists.length - 1 ? artist : `${artist}, `,
                )
              : "Unbekannter Künstler"}
          </Text>
          <Text>{song.title}</Text>
          <Text>{song.album}</Text>
          <Text>
            {song.genre > 0
              ? song.genre.map((genre, index) =>
                  index === song.genre.length - 1 ? genre : `${genre},`,
                )
              : ""}
            {song.genre > 0 && song.language > 0 ? " - " : ""}
            {song.language > 0
              ? song.language.map((language, index) =>
                  index === song.language.length - 1
                    ? language
                    : `${language},`,
                )
              : ""}
          </Text>
          <ButtonGroup>
            <Button
              radius="xl"
              leftSection={<IconBrandSpotifyFilled size={20} />}
              color="lime"
              component="a"
              href={song.spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on Spotify
            </Button>
            <Button
              radius="xl"
              leftSection={<IconBrandDeezer size={20} />}
              color="purple"
              component="a"
              href={song.deezerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on Deezer
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Center>
  );
}
