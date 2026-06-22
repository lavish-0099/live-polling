require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Poll = require("./models/Poll");
const Vote = require("./models/Vote");
const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
  res.send("API Running");
});

app.get("/test", async (req, res) => {
  const poll = await Poll.create({
    question: "Favorite Language?",
    options: [
      { text: "JavaScript" },
      { text: "Python" },
      { text: "Java" },
    ],
  });

  res.json(poll);
});

app.get("/vote-test", async (req, res) => {
  try {
    const vote = await Vote.create({
      pollId: "686000000000000000000000",
      voterId: "user123",
    });

    res.json(vote);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
console.log("URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });
app.listen(5000);