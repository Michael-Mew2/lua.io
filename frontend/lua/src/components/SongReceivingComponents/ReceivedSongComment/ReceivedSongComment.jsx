import { Button } from '@mantine/core'
import React from 'react'
import axiosInstance from '../../../api/axiosInstance'
import { notifications } from '@mantine/notifications';
import { IconTrash, IconX } from '@tabler/icons-react';

export default function ReceivedSongComment() {
  const handleDeleteSong = async () => {
    try {
      const response = await axiosInstance.delete("/user/currentSong", {withCredentials: true});
      notifications.show({
        title: "SOng deleted",
        "message": response.data.msg,
        color: "green",
        icon: <IconTrash size={20} />
      })
      window.location.reload();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.msg || "Failed to unmount Song",
        color: "red",
        icon: <IconX size={20} />
      })
    }
  }
  return (
    <div><Button onClick={handleDeleteSong}>
      Unmount Song</Button></div>
  )
}
