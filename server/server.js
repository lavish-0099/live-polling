const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
  res.send("API Running");
});
mongoose.connect(process.env.MONGO_URI)
app.listen(5000);