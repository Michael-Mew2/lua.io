import * as React from 'react'
import { Avatar } from '@mantine/core'
import styles from "./UserProfilePicture.module.css"
import { AuthContext } from '../../contextx/AuthContext'
import { IconWorld, IconPlanet, IconSun, IconMoon, IconUniverse, IconGalaxy, IconAlien } from '@tabler/icons-react';

export default function UserProfilePicture() {
const {user} = React.useContext(AuthContext);

const getContrastColor = (hexColor) => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b *114) / 1000;
  return brightness >= 128 ? "black" : "white"
}

const getUserIcon = (selectedIcon, iconColor) => {
  switch (selectedIcon) {
    case "Earth":
      return <IconWorld size={40} color={iconColor} />;

    case "Saturn":
      return <IconPlanet size={40} color={iconColor} />;

    case "Sun (It's not a planet)":
      return <IconSun size={40} color={iconColor} />;

    case "Moon (Also not a planet)":
      return <IconMoon size={40} color={iconColor} />;

    case "I love them all": 
      return <IconUniverse size={40} color={iconColor} />;

    case "I hate them all":
      return <IconGalaxy size={40} color={iconColor} />;
  
    default:
      return <IconAlien size={40} color={iconColor} />;
  }
};

  return (
    <Avatar bg={user?.color} size={80} radius={80} mx="auto" className={styles.avatar} >
      {getUserIcon(user?.profilePic, getContrastColor(user?.color))}
    </Avatar>
  )
}
