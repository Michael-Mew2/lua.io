export async function getDeezerSongData(link) {
    if(link.includes("deezer.page.link")) {
        return {error: "Open link first!"}
    } 

    if(!link.includes("track")) throw new Error("Not a link for a song, make sure it contains 'track' in it!")
        
    const songId = link.split("/track/")[1]?.split("?")[0]
    if(!songId) throw new Error("Invalid Deezer-Link!")

    const response = await fetch(`https://api.deezer.com/track/${songId}`);
    const song = await response.json()

    if(!response.ok) throw new Error ("Error finding Song on Deezer!")
    
    // console.log(song);
    
    return {
        title: song.title,
        artists: song.contributors.map((artist) => artist.name),
        album: song.album.title,
        releaseDate: song.release_date,
        duration: song.duration,
        cover: song.album.cover_xl,
        deezerLink: song.link,
        deezerPreviewUrl: song.preview
    }
}

export async function searchDeezerSong(title, artist) {
    try {
        // console.log(artist);
        const artistsQuery = Array.isArray(artist) ? artist.join(", ") : artist;
        const query = `track:"${title}" artist:"${artistsQuery}`
        const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&type=track&limit=1`;
        // console.log("url:", url);
        

        const response = await fetch(url);
        // console.log("resp:", {response});
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error("Song not available on Deezer");
        }
        // console.log({data});
        
        const song = data.data[0]
        
        // console.log(song);
        return {
            deezerLink: song.link,
            deezerPreviewUrl: song.preview
        }
    } catch (error) {
        throw new Error("Error while completing the deezer Data with the Spotify-URL");
    
    }
}