import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing/Routing";

import "./App.css";
import { AuthProvider } from "./contextx/AuthContext";
import { SongProvider } from "./contextx/SongContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SongProvider>
          <Routing />
          </SongProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
