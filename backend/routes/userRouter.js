import { Router } from "express";
import * as user from "../controllers/userController.js"
import { authenticate } from "../middleware/jwt.js";

const userRouter = Router();

userRouter
    .post("/reg", user.createUser)
    .post("/log", user.loginUser)
    .get("/verify/:token", user.verifyEmail)
    .get("/check", user.checkAuthStatus)
    .get("/checkEnoughTokens", authenticate, user.checkIfEnoughTokens)
    .get("/currentSong", authenticate, user.getCurrentSong)
    .delete("/currentSong", authenticate, user.deleteCurrentSong);


export default userRouter;