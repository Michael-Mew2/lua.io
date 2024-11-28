import * as React from "react";
import {api} from "../api/api"
import { signUp, signIn, signOut } from "../api/api";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/user/log");
      if (response.data.success) {
        setIsLoggedIn(true);
        setUser(response.data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error.message);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const signUpHandler = async (
    username,
    email,
    password,
    profilePic,
    color,
    birthdate
  ) => {
    try {
      const response = await signUp(
        username,
        email,
        password,
        profilePic,
        color,
        birthdate
      );
      if (response.success) {
        // Hier sollten Sie die Anmeldung durchführen
        await signIn(email, password);
        redirectToDashboard();
      }
    } catch (error) {
      console.error("Error Create user:", error.message);
    }
  };

  const signInHandler = async (email, password) => {
    try {
      const response = await signIn(email, password);
      if (response.success) {
        redirectToDashboard();
      }
    } catch (error) {
      console.error("Error logging in::", error.message);
    }
  };

  const signOutHandler = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
      setUser(null);
      navigate("/sign-in");
    } catch (error) {
      console.log("Error logging out", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, signUpHandler, signInHandler, signOutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
