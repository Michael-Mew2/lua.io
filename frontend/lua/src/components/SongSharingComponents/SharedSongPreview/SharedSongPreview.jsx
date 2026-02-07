import * as React from 'react'
import { Image } from '@mantine/core'

export default function SharedSongPreview({song}) {
    React.useEffect(()=> (
        console.log("This is the song you shared:", song)
        
    ), [song])
    
  return (
    <div>
        <Image src={song.song.cover} height={160} alt={song.song.title} />
    </div>
  )
}
