import * as React from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export const ShareSongContext = React.createContext();

export const ShareSongProvider = ({ children }) => {
  const [songTokens, setSongTokens] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const shareSong = async (songLink) => {
    try {
      console.log("gesendeter link:", songLink);

      setError("");
      setLoading(true);
      const response = await axiosInstance.post(
        "/song/input",
        { link: songLink },
        { withCredentials: true },
      );

      if (response.status === 201) {
        setSongTokens((prev) => prev + 1);
      }

      console.log(response.data);

      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "Ein Fehler ist aufgetreten";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const addMotivationApi = async (songId, motivation, language, genres) => {
    try {
      setError("");
      setLoading(true);
      const response = await axiosInstance.put(
        `/song/${songId}/motivation`,
        { motivation, language, genres },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "Oh no. Bremerhaven, we have a problem";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(False);
    }
  };

  return (
    <ShareSongContext.Provider
      value={{ shareSong, addMotivationApi, songTokens, loading, error }}
    >
      {children}
    </ShareSongContext.Provider>
  );
};
