const generateOptions = async (req, res) => {
  const { topic } = req.body;

  const lower = topic.toLowerCase();

  if (
    lower.includes("program") ||
    lower.includes("language")
  ) {
    return res.json({
      options: [
        "JavaScript",
        "Python",
        "Java",
        "Go",
        "Rust",
      ],
      source: "smart-engine",
    });
  }

  if (lower.includes("movie")) {
    return res.json({
      options: [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Sci-Fi",
      ],
      source: "smart-engine",
    });
  }

  if (lower.includes("sport")) {
    return res.json({
      options: [
        "Cricket",
        "Football",
        "Basketball",
        "Tennis",
        "Badminton",
      ],
      source: "smart-engine",
    });
  }

  if (lower.includes("food")) {
    return res.json({
      options: [
        "Pizza",
        "Burger",
        "Pasta",
        "Biryani",
        "Momos",
      ],
      source: "smart-engine",
    });
  }

  return res.json({
    options: [
      "Option A",
      "Option B",
      "Option C",
      "Option D",
      "Option E",
    ],
    source: "smart-engine",
  });
};

module.exports = {
  generateOptions,
};