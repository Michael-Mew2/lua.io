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
          alignItems: "flex-start",
          alignContent:"flex-end",
          zIndex: 1,
          color: "white",
          paddingLeft: {md:20, xs:4},
          paddingBottom: "10vh",
        //   border: "2px solid green",
          boxSizing: "border-box",
        }}
        >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            marginTop: "50vh",
            pt:{s: 10, sm:0},
            pb: {s:15, sm: 0}
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "monospace",
            
              marginBottom: {md:2, xs:1},
              fontWeight:"600",
              // fontSize:{xs:30,}
             fontSize:{xs: 
               40, md:90}
            

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
                fontWeight: 600,
                fontFamily: "monospace",
                fontSize: {md:"1.3rem", xs: 20},
                letterSpacing: {md: "0.2rem",xs: 2}
              }}
              onClick={() => navigate("/sign-up")}
            >
              Join Us for free
            </Button>

            <Button
              variant="outlined"
              color="white"
              sx={{
                fontWeight: 600,
                fontFamily: "monospace",
                letterSpacing: "0.2rem",
                border: "2px solid",
                fontSize: {md:"1.3rem", xs: 20},
                letterSpacing: {md: "0.2rem",xs: 2}
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
