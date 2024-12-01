import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";

const BASE_URL = "http://localhost:3000";

export default function SongDetails() {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomSong = async () => {
      try {
        const response = await fetch(`${BASE_URL}/song/output`, {
          method: "GET",
          credentials: "include", // Session-Cookie senden
        });

        const data = await response.json();

        if (response.ok) {
          setSong(data);
          localStorage.setItem("lastFetchedSong", JSON.stringify(data)); // Song speichern
        } else {
          console.error(data.msg);
        }
      } catch (error) {
        console.error("Error fetching random song:", error);
      } finally {
        setLoading(false);
      }
    };

    // Prüfen, ob bereits ein Song im lokalen Speicher vorhanden ist
    const storedSong = localStorage.getItem("lastFetchedSong");
    if (storedSong) {
      setSong(JSON.parse(storedSong));
      setLoading(false);
    } else {
      fetchRandomSong();
    }

    // Event-Listener hinzufügen, um den Song bei Verlassen der Seite zu löschen
    const handleUnload = () => {
      localStorage.removeItem("lastFetchedSong");
    };
    window.addEventListener("unload", handleUnload);

    // Cleanup-Funktion: Event-Listener entfernen
    return () => {
      window.removeEventListener("unload", handleUnload);
    };
    
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!song) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>No song found. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Paper sx={{ width: 500, padding: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            mb={3}
            textAlign={"center"}
            sx={{
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".2rem",
            }}
          >
            {song.addedBy
              ? `${song.addedBy} wants you to check this out:`
              : "This song was suggested for you:"}
          </Typography>
          <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
            "{song.title}" by {song.artists.join(", ")}
          </Typography>
          {song.cover && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <img
                src={song.cover}
                alt={`${song.title} cover`}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {song.spotifyLink && (
              <Button
                variant="contained"
                color="primary"
                href={song.spotifyLink}
                target="_blank"
                fullWidth
              >
                Add it to your Spotify Playlist!
              </Button>
            )}
            {song.deezerLink && (
              <Button
                variant="contained"
                color="secondary"
                href={song.deezerLink}
                target="_blank"
                fullWidth
              >
                Add it to your Deezer Playlist!
              </Button>
            )}
          </Box>
        </CardContent>
      </Paper>
    </Box>
  );
}
