import express from "express";
import connectDB from "./config/dbConnect.js";
import songRouter from "./routes/songRouter.js"
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; 

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "backend/public")));

app.use(cors({
  origin:"http://localhost:5173", // Frontend-URL
  credentials: true, // Allows sending Cookies
}));

app.use(cookieParser());

app.use(express.json());

// Preflight-Request beantworten
app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/user", userRouter)

app.use("/song", songRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});
