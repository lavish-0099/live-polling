import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_SOCKET_URL
);

socket.on("connect", () => {
  console.log(
    "SOCKET CONNECTED:",
    socket.id
  );
});

socket.on("connect_error", (err) => {
  console.log(
    "SOCKET ERROR:",
    err.message
  );
});