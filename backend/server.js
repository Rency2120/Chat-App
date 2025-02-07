import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../backend/routes/auth.js";
import messages from "../backend/routes/messageroutes.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import userRoutes from "../backend/routes/userRoutes.js";
import { app, server } from "./socket/Socket.js";

dotenv.config();

const frontendUrl= process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL || "http://localhost:3000"

app.use(express.json());
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3005;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messages);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on PORT ${PORT}`);
});
