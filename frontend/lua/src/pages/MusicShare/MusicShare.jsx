import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MusicShare() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3000";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    // console.log(url);
    
    try {
      const response = await fetch(`${BASE_URL}/song/input`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: url }),
        credentials: "include", // Session-Cookie senden
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/members/claim`); // Weiterleitung zur Song-Seite mit der ID des Songs
      } else {
        setMessage(data.msg); // Fehlermeldung anzeigen
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <Typography variant="h4" mb={3} textAlign={"center"} sx={{fontFamily:"monospace", fontWeight:600, letterSpacing:".2rem"}}>Share Your Music</Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }} mb={3}>
            Share the link of your favorite song. Make it as unique as possible, because we only take evey song once!
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
          We currently only can process links from Spotify and Deezer, but we are working on expanding our possibilities as fast as we can!
        </Alert>

          {message && <Alert severity="error">{message}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Song URL"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ py: 1 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Paper>
    </Box>
  );
}
