import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { SimpleGrid } from "@mantine/core";
import YouGotMusic from "../../components/SongReceivingComponents/YouGotMusic/YouGotMusic";
import ReceivedSongComment from "../../components/SongReceivingComponents/ReceivedSongComment/ReceivedSongComment";
import NiceTry from "../../components/SongReceivingComponents/NiceTry/NiceTry";
import { ReceiveSongContext } from "../../contextx/ReceiveSongContext";


export default function MusicReceive() {
  const {isLoading, hasEnoughTokens, song} = React.useContext(ReceiveSongContext)



  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : hasEnoughTokens ? (
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <YouGotMusic song={song} />
          <ReceivedSongComment song={song} />
        </SimpleGrid>
      ) : (
        <NiceTry />
      )}
    </>
  );
}
