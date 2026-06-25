import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import User from "../models/user.model.js";

// Create ONE express app
const app = express();

// Create HTTP server from that app
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Store online users
const userSocketMap = {};

// Apply auth middleware
io.use(socketAuthMiddleware);

// Helper function
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket connection handler
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.user?.username);

  const userId = socket.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Send online users to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", async () => {
    try {
      if (userId) {
        delete userSocketMap[userId];

        await User.findByIdAndUpdate(userId, {
          lastSeen: new Date(),
        });
      }

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  });
});

export { app, io, server };
