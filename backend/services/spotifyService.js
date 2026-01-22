import { spotifyConfig } from "../config/spotifyConfig.js";

let spotifyAccessToken = null;

async function getSpotifyAccessToken() {
  // console.log(spotifyAccessToken);
  if (spotifyAccessToken) return spotifyAccessToken;

  const credentials = Buffer.from(
    `${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`
  ).toString("base64");
  // console.log(credentials);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": `application/x-www-form-urlencoded`,
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();

  // console.log(data);

  if (!response.ok) throw new Error("Error accessing Spotify-Token");

  // console.log(data);

  spotifyAccessToken = data.access_token;
  setTimeout(() => (spotifyAccessToken = null), data.expires_in * 1000);
  return spotifyAccessToken;
}

export async function getSpotifySongData(link) {
  if(!link.includes("track")) throw new Error("Not a link for a song, make sure it contains 'track' in it!")

  const songId = link.split("/track/")[1]?.split("?")[0];
  if (!songId) throw new Error("Invalid Spotify-Link!");

  const accessToken = await getSpotifyAccessToken();
  const response = await fetch(
    `${spotifyConfig.spotifyApiBaseUrl}/tracks/${songId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const song = await response.json();
  if (!response.ok) throw new Error("Error finding Song on Spotify");

//   console.log(song);

  return {
    title: song.name,
    artists: song.artists.map((artist) => artist.name),
    album: song.album.name,
    releaseDate: song.album.release_date,
    duration: song.duration_ms,
    cover: song.album.images[0].url,
    spotifyLink: song.external_urls.spotify,
    spotifyPreviewUrl: song.preview_url,
  };
}

export async function searchSpotifySong(title, artist) {
  try {
    const artistsQuery = Array.isArray(artist) ? artist.join(", ") : artist;
    const query = `track:${title} artist:${artistsQuery}`;
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=1`;

    const accessToken = await getSpotifyAccessToken();

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok || !data.tracks.items.length) {
      throw new Error("Song not available on Spotify");
    }

    const song = data.tracks.items[0];

    return {
      spotifyLink: song.external_urls.spotify,
      spotifyPreviewUrl: song.preview_url,
    };
  } catch (error) {
    throw new Error("Error while completing the deezer Data with the Spotify-URL");
    
  }
}
