import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing/Routing";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./App.css";
import { AuthProvider } from "./contextx/AuthContext";
import { RegProvider } from "./contextx/RegContext";
import { SongProvider } from "./contextx/SongContext";
import { ShareSongProvider } from "./contextx/ShareSongContext";
import { ReceiveSongProvider } from "./contextx/ReceiveSongContext";

function App() {
  return (
    <>
      <MantineProvider>
        <Notifications />
        <BrowserRouter>
          <AuthProvider>
            <RegProvider>
              <ShareSongProvider>
                <ReceiveSongProvider>
                  <SongProvider>
                    <Routing />
                  </SongProvider>
                </ReceiveSongProvider>
              </ShareSongProvider>
            </RegProvider>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
