import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing/Routing";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import "./App.css";
import { AuthProvider } from "./contextx/AuthContext";
import { SongProvider } from "./contextx/SongContext";

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <AuthProvider>
            <SongProvider>
              <Routing />
            </SongProvider>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
