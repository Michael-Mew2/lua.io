import { Song } from "../models/Song.js";
import {
  getSpotifySongData,
  searchSpotifySong,
} from "../services/spotifyService.js";
import {
  getDeezerSongData,
  searchDeezerSong,
} from "../services/deezerService.js";

import User from "../models/User.js";

export const processSongLink = async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({ msg: "Please enter a valid Link" });
    }

    let songData = {};

    switch (true) {
      case link.includes("open.spotify.com"):
        songData = await getSpotifySongData(link);

        try {
          const deezerData = await searchDeezerSong(
            songData.title,
            songData.artists
          );
          // console.log(deezerData);
          
          songData = {
            ...songData,
            deezerLink: deezerData.deezerLink,
            deezerPreviewUrl: deezerData.deezerPreviewUrl,
          };
        } catch (error) {
          console.warn("Deezer-data couldn't be added!");
        }
        break;

      case link.includes("deezer.com") || link.includes("deezer.page.link"):
        const deezerResult = await getDeezerSongData(link);

        if (deezerResult.error) {
          return res.status(400).json({ msg: deezerResult.error });
        }

        songData = deezerResult;
        try {
          const spotifyData = await searchSpotifySong(
            songData.title,
            songData.artists
          );
          songData = {
            ...songData,
            spotifyLink: spotifyData.spotifyLink,
            spotifyPreviewUrl: spotifyData.spotifyPreviewUrl,
          };
        } catch (error) {
          console.warn("Spotify-data couldn't be added!");
        }
        break;
      default:
        return res.status(400).json({
          msg: "Only Spotify and Deezer are currently supported!",
        });
    }

    const existingSong = await Song.findOneAndUpdate(
      {
        title: songData.title,
        artists: songData.artists,
      },
      { $inc: { suggestionCount: 1 } },
      { new: true, runValidators: true }
    );

    if (existingSong) {
      return res.status(400).json({ msg: "This song was already uploaded" });
    }

    const userId = req.user.id; // req.user from authenticate-Middleware
    
    const newSong = new Song(songData);
    await newSong.save();

    await Song.findByIdAndUpdate(newSong._id, {$set: {addedBy: userId}}, {new: true});

    await User.findByIdAndUpdate(userId, {$inc: {tokens: 1}, $push: {suggestedSongs: newSong._id}}, {new: true}) // Song zum User hinzufügen

    res
      .status(201)
      .json({ msg: "Song was successfully added!", song: newSong });
  } catch (error) {
    console.error("Error while processing the Link", error);
    res.status(500).json({ msg: "An error occured, please try again" });
  }
};

export const getRandomSong = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
    // console.log(user.tokens);

    if(user.tokens < 1) {
      return res.status(402).json({msg: "You need to suggest a Song first!"})
    } 

    console.log("number of token are sufficient!");

    await User.findByIdAndUpdate(userId, {$inc: {tokens: -1}}, {new: true})

    // console.log(user.tokens);
    

    const [randomSong] = await Song.aggregate([
      {$match: {listenedTo: false}},
      {$sample: {size: 1}}
    ]);

    if (!randomSong) {
      return res.status(404).json({msg: "Keine ungespielten Songs gefunden."})
    } else {
      await Song.updateOne({_id: randomSong._id}, {$set: {listenedTo: true, listenedBy: userId}})
      await User.findByIdAndUpdate(userId, {$push: {listenedSongs: {songId:randomSong._id}}})
    }


    res.status(200).json(randomSong)
  } catch (error) {
    res.status(500).json({msg: "Ein Fehler beim Finden eines Songs ist aufgetreten!"})
  }
}