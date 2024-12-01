import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Erstelle den SongContext
export const SongContext = createContext();

// SongProvider-Komponente
export const SongProvider = ({ children }) => {
  const [songTokens, setSongTokens] = useState(0); // Token-Anzahl des Nutzers
  const [claimedSong, setClaimedSong] = useState(null); // Der aktuell geclaimte Song
  const [loading, setLoading] = useState(false); // Ladezustand
  const [error, setError] = useState(""); // Fehlerzustand

  const BASE_URL = "http://localhost:3000";

  // Funktion zum Vorschlagen eines Songs
  const suggestSong = async (songLink) => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/song/input`, { link: songLink }, { withCredentials: true });

      if (response.status === 201) {
        setSongTokens((prev) => prev + 1); // Erhöhe Tokens, wenn ein Song hinzugefügt wurde
      }
      return response.data.msg;
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Ein Fehler ist aufgetreten";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Funktion zum Clamen eines Songs
  const claimSong = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/song/output`, { withCredentials: true });

      if (response.status === 200) {
        setClaimedSong(response.data); // Setze den geclaimten Song
        setSongTokens((prev) => prev - 1); // Verringere Tokens
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Ein Fehler ist aufgetreten";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SongContext.Provider
      value={{
        songTokens,
        claimedSong,
        loading,
        error,
        suggestSong,
        claimSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

// Custom Hook für SongContext
export const useSongContext = () => {
  return useContext(SongContext);
};
