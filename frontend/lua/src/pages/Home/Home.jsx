import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>


      {/* Der Rest des Inhalts */}
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          alignContent:"flex-end",
          zIndex: 1,
          color: "white",
          paddingLeft: "10vw",
        //   paddingBottom: "10vh",
        //   border: "2px solid green",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            marginTop: "50vh",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "monospace",
              marginBottom: "2rem",
              fontWeight:"600",
            }}
          >
            Discover new tracks with lua.io
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "purple",
                fontSize: "1.3rem",
                fontWeight: 600,
                fontFamily: "monospace",
                letterSpacing: "0.2rem",
              }}
            >
              Join Us for free
            </Button>

            <Button
              variant="outlined"
              color="white"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 600,
                fontFamily: "monospace",
                letterSpacing: "0.2rem",
                border: "2px solid",
              }}
              onClick={()=> navigate("/sign-in")}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
