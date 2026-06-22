const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },

    options: {
      type: [optionSchema],
      validate: {
        validator: function (options) {
          return options.length >= 2 && options.length <= 6;
        },
        message: "Poll must have between 2 and 6 options",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Poll", pollSchema);