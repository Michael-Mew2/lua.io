import { Schema, model } from "mongoose";

const songSchema = new Schema ({
    // Song-Infos:
    title: {type: String, required: true},
    artists: [{type: String}],
    genres:{ type: [String], default: [] },
    album: { type: String },
    releaseDate: { type: String },
    duration: { type: Number },
    cover: {type: String},
    language:{type: [String], default: []},
    // Access-Info:
    spotifyLink: { type: String },
    deezerLink: { type: String },
    spotifyPreviewUrl: { type: String },
    deezerPreviewUrl: { type: String },
    // User interaction:
    addedBy: String,
    suggestionCount: {type: Number, default: 0},
    listenedBy: String,
    motivation: {type: String, default: ""},
    comment: {type: String, default: ""},
    rating: {type: Number, default: 0},
    ranking: {type: Number},
    listenedTo: {type: Boolean, default: false},
}, {timestamps: true})

export const Song = model("Song", songSchema) 