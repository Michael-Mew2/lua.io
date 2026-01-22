import { Schema, model } from "mongoose";

const songSchema = new Schema ({
    // Song-Infos:
    title: {type: String, required: true},
    artists: [{type: String}],
    genres: [{type: String}],
    album: { type: String },
    releaseDate: { type: String },
    duration: { type: Number },
    cover: {type: String},
    // Access-Info:
    spotifyLink: { type: String },
    deezerLink: { type: String },
    spotifyPreviewUrl: { type: String },
    deezerPreviewUrl: { type: String },
    // User interaction:
    addedBy: String,
    suggestionCount: {type: Number, default: 0},
    listenedBy: String,
    listenedTo: {type: Boolean, default: false}
}, {timestamps: true})

export const Song = model("Song", songSchema) 