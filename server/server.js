require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const pollRoutes = require("./routes/pollRoutes");
const http = require("http");
const { Server } = require("socket.io");
const registerPollSocket = require("./socket/pollSocket");
const aiRoutes =
  require("./routes/aiRoutes");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.json());

app.use("/api/polls", pollRoutes);

app.use("/api/ai", aiRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ Mongo Error");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("API Running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

registerPollSocket(io);

app.set("io", io);

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
