require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const pollRoutes = require("./routes/pollRoutes");

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});