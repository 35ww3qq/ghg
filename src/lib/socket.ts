import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "wss://api.example.com";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

export const connectSocket = (userId: string) => {
  socket.auth = { userId };
  socket.connect();

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("notification", (data) => {
    // Bildirim gösterme işlemi
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(data.title, {
        body: data.message,
        icon: "/logo.png",
      });
    }
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};
