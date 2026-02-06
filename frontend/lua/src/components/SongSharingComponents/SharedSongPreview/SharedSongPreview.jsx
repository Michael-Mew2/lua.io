import { Image } from '@mantine/core'
import * as React from 'react'

export default function SharedSongPreview({song}) {
  return (
    <div>
        <Image src={song.cover} height={160} alt={song.title} />
    </div>
  )
}
