import * as React from 'react'
import { Avatar } from '@mantine/core'
import styles from "./UserProfilePicture.module.css"

export default function UserProfilePicture() {
  return (
    <Avatar bg="orange" size={80} radius={80} mx="auto" className={styles.avatar} >

    </Avatar>
  )
}
