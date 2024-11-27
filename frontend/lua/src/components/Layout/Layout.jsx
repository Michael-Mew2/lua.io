import * as React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Box } from '@mui/material'

export default function Layout() {
  const videoRef = React.useRef();

  React.useEffect(() => {
    // console.log("Video Ref:", videoRef);

    // // Funktion zum Laden und Abspielen des Videos
    // const loadAndPlayVideo = () => {
    //   if (videoRef.current && videoRef.current.readyState > 0) {
    //     videoRef.current.play().catch((error) => {
    //       console.error("Error playing video:", error);
    //     });
    //   } else {
    //     console.log("Video not ready yet");
    //     setTimeout(loadAndPlayVideo, 1000); // Wiederholen Sie dies alle Sekunde
    //   }
    // };

    // loadAndPlayVideo();
  }, []);
  
  return (
    <>
    <Header />
    <main>
      {/* Video als Hintergrund */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1, // Video hinter dem Rest der Inhalte
          overflow: "hidden", // Verhindert, dass Video aus dem Container herausragt
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectFit: "cover", // Video skaliert, um den gesamten Bildschirm zu füllen
            width: "100%",
            height: "100%",
          }}
        >
          <source
            src="/backgrounds/AdobeStock_410948388.mp4"
            type="video/mp4"
          />
          {/* Alternativ kann hier noch eine WebM-Datei als Fallback angegeben werden */}
          <source src="/Backgrounds/video.webm" type="video/webm" />
          Dein Browser unterstützt das Video-Tag nicht.
        </video>
      </Box>
      <Outlet />
    </main>
    <Footer />
    </>
  )
}
