require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const pollRoutes = require("./routes/pollRoutes");
const http = require("http");
const { Server } = require("socket.io");
const registerPollSocket = require("./socket/pollSocket");
const app = express();

app.use(express.json());

app.use("/api/polls", pollRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("API Running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

registerPollSocket(io);

app.set("io", io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
