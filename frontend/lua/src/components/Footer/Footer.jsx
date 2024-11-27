import React from 'react'
import {Box, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const links = [
    "https://www.youtube.com/watch?v=zD7ZsVMCeyY",
    "https://www.youtube.com/watch?v=0-B4ZbVUtcE"
]

export default function Footer() {
    const [isHovered, setIsHovered] = React.useState(false)
    const openRandomLink = () => {
        const randomLink = links[Math.floor(Math.random() * links.length)]
        window.open(randomLink, "_blank")
    }
  return (
    <Box 
    sx={{
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
      backgroundColor: '#f1f1f1',
      padding: '10px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Typography variant="body2" color="text.secondary">
      Made with <FavoriteIcon sx={{ verticalAlign: 'middle', fontSize: '1.2rem' }} /> in{' '}
      <span 
        style={{ cursor: 'pointer', color: isHovered ? '#a044ff' : '#6a3093', transition: "color 0.3s ease"}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openRandomLink}
      >
        Bremerhaven
      </span>.
    </Typography>
  </Box>
  )
}
