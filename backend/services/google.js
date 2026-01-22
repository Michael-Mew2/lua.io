import { google } from "googleapis";

const apiKey = process.env.GOOGLE;
const youtube = google.youtube({
    version: "v3",
    auth: apiKey
});

export default async function getYoutubeVideoDetails(url) {
  try {
    const response = await youtube.videos.list({
        part: "snippet",
        id: url
    });

    const video = response.data.item[0];
    if(!video) {
        throw new Error ("Video not found!")
    }

    const snippet = video.snippet;
    return {
        title: snippet.title,
        desc: snippet.description,
    }

  } catch (error) {
    console.log("Error:", error);
  }
}
