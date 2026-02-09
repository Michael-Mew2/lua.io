import { Router } from "express";
import {addMotivation, getRandomSong, processSongLink, addComment} from "../controllers/songController.js";
import { authenticate } from "../middleware/jwt.js";

const songRouter = Router();

// POST /songs: Neue Songs hinzufügen
songRouter
    .post("/input", authenticate, processSongLink)
    .put("/:songId/motivation", authenticate, addMotivation)
    .get("/output", authenticate, getRandomSong)
    .put(`/:songId/comment`, authenticate, addComment)

export default songRouter;
