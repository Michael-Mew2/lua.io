import express from "express";
import connectDB from "./config/dbConnect.js";
import songRouter from "./routes/songRouter.js"
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/user", userRouter)

app.use("/song", songRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});
