import express from "express";
import { connectDB } from "./data/database.js";
import studentRouter from "./routes/student.js";
import adminRouter from "./routes/admin.js";
import confirmedStudentRouter from "./routes/confirmedStudent.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";

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
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//Using Routes
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/confirmedstudent", confirmedStudentRouter);

app.get("/", (req, res) => {
  res.end("Helloo, welcome to Ambaa ul uloom backend!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `started server on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

app.use(errorMiddleware);
