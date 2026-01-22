import React, { useState } from "react";
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
    <>hi</>
  );
}
