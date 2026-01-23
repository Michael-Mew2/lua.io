import * as React from "react";
import axios from "axios";

const BASE_URL =
  /* process.env.REACT_APP_API_BASE_URL  ||  */ "http://localhost:3000";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Authentifizierungs-Endpunkte:

  // Log in:
  const loginApi = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/log`,
        { email, password },
        { withCredentials: true }, // wichtig für die cookies
      );

      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        console.log("Anmeldung erfolgreich!");
        return response.data;
      }
    } catch (error) {
      console.error(
        "Anmeldung fehlgeschlagen:",
        error.response?.data || error.message,
      );
      throw new Error("Anmeldung fehlgeschlagen");
    }
  };

  // Check Auth Status:
  const checkAuthStatus = async () => {
    console.log("check Auth:", `${BASE_URL}/user/check`);
    try {
      const response = await axios.get(`${BASE_URL}/user/check`, {
        withCredentials: true,
      });

      console.log(response);

      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Fehler beim Überprüfen der Authentifizierung:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Authentifizierungsstatus bei Start prüfen
  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loginApi,
        loading, // Kann verwendet werden, um einen Ladezustand anzuzeigen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
