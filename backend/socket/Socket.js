import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

let io;
const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

try {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: "true",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    try {
      const userId = socket.handshake.query.userId;
      console.log("User ID:", userId);

      if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      } else {
        console.warn("No userId provided");
      }
    } catch (error) {
      console.error("Error processing user ID:", error);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
        for (const userId in userSocketMap) {
          if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
            break;
          }
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
    });
  });
} catch (error) {
  console.error("Error initializing Socket.IO:", error);
}

export { app, server, getReceiverSocketId, io };
