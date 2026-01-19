import { Router } from "express";
import {getRandomSong, processSongLink} from "../controllers/songController.js";
import { authenticate } from "../middleware/jwt.js";

const songRouter = Router();

// POST /songs: Neue Songs hinzufügen
songRouter
    .post("/input", authenticate, processSongLink)
    .get("/output", authenticate, getRandomSong)

export default songRouter;
