const express = require("express");
const app = express();
const saveMoodToCSV = require("./moodTracking");

app.post("/saveMood", async (req, res) => {
  console.log("Session Data:", req.session);
  const email = req.session?.userEmail ?? "Unknown";
  console.log("Email from session:", email);

  if (!req.session || !req.session.userEmail) {
    return res.status(401).json({ message: "User not logged in" });
  }

  const { mood } = req.body;
  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  console.log("Saving mood for:", req.session.userEmail, mood);

  try {
    const result = await saveMoodToCSV(req.session.userEmail, mood);
    res.json({
      message: "Mood recorded successfully!",
      success: result.success,
    });
  } catch (err) {
    console.error("Error saving mood:", err);
    res.status(500).json({ message: "Failed to save mood" });
  }
});

module.exports = app;
