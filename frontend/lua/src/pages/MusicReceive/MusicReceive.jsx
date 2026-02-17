import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { SimpleGrid } from "@mantine/core";
import YouGotMusic from "../../components/SongReceivingComponents/YouGotMusic/YouGotMusic";
import ReceivedSongComment from "../../components/SongReceivingComponents/ReceivedSongComment/ReceivedSongComment";
import NiceTry from "../../components/SongReceivingComponents/NiceTry/NiceTry";
import { ReceiveSongContext } from "../../contextx/ReceiveSongContext";


export default function MusicReceive() {
  const {isLoading, hasEnoughTokens, song, fetchNewSong} = React.useContext(ReceiveSongContext)

  React.useEffect(() => {
    if(hasEnoughTokens && !song && !isLoading) {
      fetchNewSong();
    }
  }, [hasEnoughTokens, song, isLoading])

  console.log("Site got:", song);
  

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : hasEnoughTokens ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <YouGotMusic song={song} />
          <ReceivedSongComment song={song} />
        </SimpleGrid>
      ) : (
        <NiceTry />
      )}
    </>
  );
}
