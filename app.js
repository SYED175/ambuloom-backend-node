import express from "express";
import { connectDB } from "./data/database.js";
import studentRouter from "./routes/student.js";
import { config } from "dotenv";
import cors from "cors";
import adminRouter from "./routes/admin.js";
import cookieParser from "cookie-parser";

const app = express();

config({
  path: "./data/config.env",
});

connectDB();

//Using Middlewares
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URI_FORM,
      process.env.FRONTEND_URI_DASHBOARD,
      process.env.FRONTEND_URI_DASHBOARD2,
      process.env.FRONTEND_URI_DASHBOARD3,
      process.env.FRONTEND_URI_DASHBOARD4,
      process.env.FRONTEND_URI_DASHBOARD5,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//Using Routes
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.end("Heloo");
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} started server`);
});

app.use((err, req, res, next) => {
  return res.json({
    success: false,
    message: err,
  });
});
