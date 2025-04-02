import * as React from "react";

const BASE_URL =  /* process.env.REACT_APP_API_BASE_URL  ||  */"http://localhost:3000"

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);


// Authentifizierungs-Endpunkte:

// Log in:
const loginApi = async (email, password) => {
  try {
    
    const response = await fetch(BASE_URL+"/user/log", {
      method:"POST",
      body: JSON.stringify({email, password}),
      headers: {
        "Content-Type":"application/json"
      },
      credentials: "include"
    });

    const userData = await response.json();
    console.log("UserData:",userData);
    
    if (response.status === 200){
      setUser(userData.user)
      console.log("Anmeldung erfolgreich!");
      return userData
    }

    throw new Error("Anmeldung fehlgeschlagen!")
  } catch (error) {
    console.log(error);
    
  }
}

  // Check Auth Status:
  const checkAuthStatus = async () => {
    console.log("check Auth:", `${BASE_URL}/user/check`);
    
    try {
      const response = await fetch(`${BASE_URL}/user/check`, {
        method: "GET",
        credentials: "include",
      });

      console.log(response);
      

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Fehler beim Überprüfen der Authentifizierung:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Authentifizierungsstatus bei der Initialisierung prüfen
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
  )
}