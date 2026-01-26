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

function App() {
  return (
    <>
      <MantineProvider>
        <Notifications />
        <BrowserRouter>
          <AuthProvider>
            <RegProvider>
              <SongProvider>
                <Routing />
              </SongProvider>
            </RegProvider>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
