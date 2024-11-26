import { Router } from "express";
import * as user from "../controllers/userController.js"

const userRouter = Router();

userRouter
    .post("/reg", user.createUser)
    .post("/log", user.loginUser)
    .get("/verify/:token", user.verifyEmail)


export default userRouter;