import * as React from "react";
import { useNavigate } from "react-router-dom";
//==========

import HeaderStatus from "../HeaderStatus/HeaderStatus";
import { Title } from "@mantine/core";


const pages = [];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  //    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  


  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true); // Zustand auf true setzen
      } else {
        setIsScrolled(false); // Zustand auf false setzen
      }
    };

    window.addEventListener("scroll", handleScroll); // Scroll-Ereignis hinzufügen

    // console.log({ isScrolled, setIsScrolled });

    return () => {
      window.removeEventListener("scroll", handleScroll); // Event-Listener entfernen
    };
  }, []);

  

  //    const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  //   };


  //   const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  //   };


  
  

  return (
    <> 
    <Title style={{fontSize: "100px"}}>Hi</Title> 
    </>
  );
}
