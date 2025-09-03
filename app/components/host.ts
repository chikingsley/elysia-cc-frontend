"use client";

// Use environment variable for backend URL, fallback to localhost for development
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const host = BACKEND_URL;

export const public_path = "/";

export const getWebsocketHost = () => {
  // Parse the backend URL to get the WebSocket URL
  try {
    const url = new URL(BACKEND_URL);
    const wsProtocol = url.protocol === "https:" ? "wss:" : "ws:";
    return `${wsProtocol}//${url.host}/ws/`;
  } catch {
    // Fallback for development
    return `ws://localhost:8000/ws/`;
  }
};
