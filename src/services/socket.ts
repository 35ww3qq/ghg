import { io, Socket } from "socket.io-client";
import { toast } from "@/components/ui/use-toast";

let socket: Socket;

export const initializeSocket = (userId: string) => {
  const SOCKET_URL =
    import.meta.env.VITE_SOCKET_URL ||
    "wss://competent-wilbur2-b65vf.dev.tempolabs.ai";

  if (!SOCKET_URL) {
    console.error("Socket URL not configured");
    return;
  }

  socket = io(SOCKET_URL, {
    auth: { userId },
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  // Backlink durumu değiştiğinde
  socket.on("backlink:status", (data) => {
    toast({
      title: "Backlink Durumu",
      description: data.message,
    });
  });

  // İndexleme durumu değiştiğinde
  socket.on("indexing:status", (data) => {
    toast({
      title: "İndexleme Durumu",
      description: data.message,
    });
  });

  // Kredi işlemleri
  socket.on("credits:update", (data) => {
    toast({
      title: "Kredi Güncelleme",
      description: data.message,
    });
  });

  // Sistem bildirimleri
  socket.on("system:notification", (data) => {
    toast({
      title: data.title,
      description: data.message,
      variant: data.type === "error" ? "destructive" : "default",
    });
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;

export const emitEvent = (event: string, data: any) => {
  if (socket && socket.connected) {
    socket.emit(event, data);
  } else {
    console.error("Socket not connected");
  }
};
