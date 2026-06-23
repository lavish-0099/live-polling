const express = require("express");

const {
  generateOptions,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/generate-options",
  generateOptions
);

module.exports = router;