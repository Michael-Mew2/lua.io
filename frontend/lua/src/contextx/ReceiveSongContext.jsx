import * as React from "react";
import axiosInstance from "../api/axiosInstance";

export const ReceiveSongContext = React.createContext();

export const ReceiveSongProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasEnoughTokens, setHasEnoughTokens] = React.useState(false);
  const [song, setSong] = React.useState(null);

  React.useEffect(() => {
    const checkIfEnoughTokens = async () => {
      try {
        const response = await axiosInstance.get("user/checkEnoughTokens", {
          withCredentials: true,
        });
        console.log("User has enough token:", response.data.data);

        setHasEnoughTokens(response.data.sufficientTokens);

        if (response.data.song) {
          setSong(response.data.song);
        }

        console.log("Empfangene Daten:", response.data);
      } catch (error) {
        console.error("Error checking tokens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkIfEnoughTokens();
  }, []);

  return (
    <ReceiveSongContext.Provider value={{ isLoading, hasEnoughTokens }}>
      {children}
    </ReceiveSongContext.Provider>
  );
};
