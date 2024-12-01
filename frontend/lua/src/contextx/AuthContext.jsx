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
    // console.log("UserData:",userData);
    
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