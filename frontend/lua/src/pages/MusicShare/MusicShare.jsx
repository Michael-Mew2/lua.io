import * as React from "react";
import { SimpleGrid, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import SongShareInator from "../../components/SongSharingComponents/SongShareInator/SongShareInator";
import SongShareInatorInstructions from "../../components/SongSharingComponents/SongShareInatorInstructions/SongShareInatorInstructions";
import SharedSongPreview from "../../components/SongSharingComponents/SharedSongPreview/SharedSongPreview";
import SharedSongComment from "../../components/SongSharingComponents/SharedSongComment/SharedSongComment";

export default function MusicShare() {
  const [sharedSong, setSharedSong] = React.useState(null);

  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {sharedSong ? (
          <SharedSongPreview song={sharedSong} />
        ) : (
          <SongShareInator onSongShared={setSharedSong} />
        )}
        {sharedSong ? (
          <SharedSongComment song={sharedSong} />
        ) : (
          <SongShareInatorInstructions />
        )}
      </SimpleGrid>
    </>
  );
}
