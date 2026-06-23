import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

// Create ONE express app
export const app = express();

// Create HTTP server from that app
export const server = http.createServer(app);

// Create Socket.IO server
export const io = new Server(server, {
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
  console.log("A user connected:", socket.user?.fullName);

  const userId = socket.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Send online users to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.user?.fullName);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
