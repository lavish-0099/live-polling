require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Poll = require("./models/Poll");

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