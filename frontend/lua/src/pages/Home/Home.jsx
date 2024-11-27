import { Box, Button } from '@mui/material'
import * as React from 'react'

export default function Home() {
    const videoRef = React.useRef();

    React.useEffect(() => {
        console.log('Video Ref:', videoRef);

        // Funktion zum Laden und Abspielen des Videos
        const loadAndPlayVideo = () => {
            if (videoRef.current && videoRef.current.readyState > 0) {
                videoRef.current.play().catch(error => {
                    console.error('Error playing video:', error);
                });
            } else {
                console.log('Video not ready yet');
                setTimeout(loadAndPlayVideo, 1000); // Wiederholen Sie dies alle Sekunde
            }
        };

        loadAndPlayVideo();
    }, []);

    return (
        <>
            {/* Video als Hintergrund */}
            <Box 
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: -1,  // Video hinter dem Rest der Inhalte
                    overflow: 'hidden',  // Verhindert, dass Video aus dem Container herausragt
                }}
            >
                <video 
                    ref={videoRef} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    style={{
                        objectFit: 'cover', // Video skaliert, um den gesamten Bildschirm zu füllen
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <source src="/backgrounds/AdobeStock_410948388.mp4" type="video/mp4" />
                    {/* Alternativ kann hier noch eine WebM-Datei als Fallback angegeben werden */}
                    <source src="/Backgrounds/video.webm" type="video/webm" />
                    Dein Browser unterstützt das Video-Tag nicht.
                </video>
            </Box>

            {/* Der Rest des Inhalts */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,  // Der Inhalt bleibt über dem Video
                    textAlign: 'left',
                    color: 'white',
                    paddingLeft: "10vw",
                    paddingTop: '60vh',  // Hier kannst du den Abstand zum oberen Rand anpassen
                }}
            >
                <div display="flex" style={{alignItems: 'flex-end'}}>

                <h1 style={{fontFamily: 'monospace'}}>Discover new tracks with <br/> <span style={{fontWeight: "800"}}>lua.io</span></h1>
                <Button variant='contained' color='deepPurple'>Sign In</Button>
                <Button variant='outlined' color='white' style={{marginLeft: "2rem"}}>Log In</Button>
                </div>
            </Box>
        </>
    );
}
