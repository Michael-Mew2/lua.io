import * as React from "react";
import axiosInstance from "../api/axiosInstance";
import { notifications } from "@mantine/notifications";
import { IconMoodSadDizzy, IconMoodSmile, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const ReceiveSongContext = React.createContext();

export const ReceiveSongProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasEnoughTokens, setHasEnoughTokens] = React.useState(false);
  const [song, setSong] = React.useState(null);
  const navigate = useNavigate();

  const submitSongComment = async (songId, formValues, onSuccess) => {
    try {
      // Validierung von Pflichtfeldern:
      if (!formValues.rating || formValues.rating === 0) {
        notifications.show({
          title: "Haven't you forgot something?",
          message: "You need to give a rating",
          color: "red",
          icon: <IconX size={20} />,
        });
        return false;
      }

      if (!formValues.comment || formValues.comment.trim() === "") {
        notifications.show({
          title: "Haven't you forgot something?",
          message: "You need to give a a feedback.",
          color: "red",
          icon: <IconX size={20} />,
        });
        return false;
      }

      const response = await axiosInstance.put(
        `/song/${songId}/comment`,
        formValues,
        { withCredentials: true },
      );

      notifications.show({
        title: "Success!",
        message: "Thank you!",
        color: "green",
        icon: <IconMoodSmile size={20} />,
      });

      // Song unmounten:
      await axiosInstance.delete("/user/currentSong", {
        withCredentials: true,
      });

      // State Aktualisieren:
      setSong(null);
      console.log("Das wurde un-mounted:", response);
      navigate(`/members/${response.data.data}`);
      if (onSuccess) onSuccess();
      return true;
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.msg || "Failed to submit",
        color: "red",
        icon: <IconMoodSadDizzy size={20} />,
      });
      return false;
    }
  };

  React.useEffect(() => {
    const checkIfEnoughTokens = async () => {
      try {
        const response = await axiosInstance.get("user/checkEnoughTokens", {
          withCredentials: true,
        });
        console.log("User has enough token:", response.data.sufficientTokens);

        setHasEnoughTokens(response.data.sufficientTokens);

        if (response.data.song) {
          setSong(response.data.song);
        }

        console.log("Empfangene Daten:", response.data.song);
      } catch (error) {
        console.error("Error checking tokens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkIfEnoughTokens();
  }, [hasEnoughTokens]);

  return (
    <ReceiveSongContext.Provider
      value={{ isLoading, hasEnoughTokens, song, submitSongComment }}
    >
      {children}
    </ReceiveSongContext.Provider>
  );
};
