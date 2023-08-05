import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/menu.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.get("/", (req, res) => {
  res.send("hello first request");
});

//middlewares
// app.use(cors());
const allowedOrigins = [
  "http://192.168.1.152:3000",
  "http://localhost:3000",
  // Eklemek istediğiniz diğer orijinler buraya eklenebilir
];
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // istek başarı durumu
    credentials: true, // kimlik bilgilerinin paylaşılmasını sağlar
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/menu", router);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMesage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMesage,
    stack: err.stack,
  });
});

app.listen(1003, () => {
  connect();
  console.log("Connected to backend.");
});

