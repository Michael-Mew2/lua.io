import * as React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Background from "../Background/Background";
import { Box, ScrollArea } from "@mantine/core";

export default function Layout() {
  return (
    <>
      <Box
        component="main"
        style={{
          position: "relative",
          zIndex: 1,
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Background />
        <Header style={{ position: "relative", zIndex: 10 }} />
        <ScrollArea
          style={{
            flex: 1, // Nimmt den restlichen Platz ein
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            // Der Transparenz-Übergang oben und unten:
            /*  WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 2%, black 98%, transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 2%, black 98%, transparent)", */
            /* border: "2px solid green", */
          }}
          styles={{
            viewport: { display: "flex", flexDirection: "column" },
            content: {
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
            },
          }}
          /* viewportProps={{ style: { paddingBottom: "40px" } }} */ // Optional: Extra Platz unten im Scrollbereich
          mr="lg"
          ml="lg"
          type="scroll"
          scrollbars="y"
          offsetScrollbars
        >
          <Outlet />
        </ScrollArea>
        <Footer style={{ zIndex: 10 }} />
      </Box>
    </>
  );
}
