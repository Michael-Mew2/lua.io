import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { SimpleGrid } from "@mantine/core";
import YouGotMusic from "../../components/SongReceivingComponents/YouGotMusic/YouGotMusic";
import ReceivedSongComment from "../../components/SongReceivingComponents/ReceivedSongComment/ReceivedSongComment";
import NiceTry from "../../components/SongReceivingComponents/NiceTry/NiceTry";


export default function MusicReceive() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasEnoughTokens, setHasEnoughTokens] = React.useState(false);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : hasEnoughTokens ? (
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <YouGotMusic />
          <ReceivedSongComment />
        </SimpleGrid>
      ) : (
        <NiceTry />
      )}
    </>
  );
}
