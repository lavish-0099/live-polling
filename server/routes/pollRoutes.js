const express = require("express");

const {
  createPoll,
  getPollById,
  votePoll,
} = require("../controllers/pollController");

const router = express.Router();

router.post("/", createPoll);

router.get("/:id", getPollById);

router.post("/:id/vote", votePoll);
optionIndex >= 0
optionIndex < poll.options.length

module.exports = router;