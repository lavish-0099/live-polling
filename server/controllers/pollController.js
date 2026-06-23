const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

const createPoll = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { question, options } = req.body;

    const poll = await Poll.create({
      question,
      options: options.map((option) => ({
        text: option,
      })),
    });

    res.status(201).json(poll);

  } catch (error) {
    console.error("CREATE POLL ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
 
const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    res.json(poll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const votePoll = async (req, res) => {
  try {
    const { optionIndex, voterId } = req.body;

    const existingVote = await Vote.findOne({
      pollId: req.params.id,
      voterId,
    });

    if (existingVote) {
      return res.status(400).json({
        message: "You have already voted",
      });
    }

    await Vote.create({
      pollId: req.params.id,
      voterId,
    });

    const poll = await Poll.findById(req.params.id);

    poll.options[optionIndex].votes += 1;

   await poll.save();

const io = req.app.get("io");

console.log(
  "EMITTING UPDATE TO:",
  req.params.id
);

io.to(req.params.id).emit(
  "pollUpdated",
  poll
);

res.json(poll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPoll,
  getPollById,
  votePoll,
};
// console.log(
//   "EMITTING UPDATE TO:",
//   req.params.id
// );

// io.to(req.params.id).emit(
//   "pollUpdated",
//   poll
// );