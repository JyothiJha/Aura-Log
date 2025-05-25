const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const saveMoodToCSV = require("./moodTracking");

app.post("/saveMoodAndText", async (req, res) => {
  console.log("Session Data:", req.session);

  if (!req.session || !req.session.userEmail) {
    console.log("Returning..");
    return res.status(401).json({ message: "User not logged in" });
  }

  const { mood, text } = req.body;
  console.log("mood", mood, "text", text);

  if (!mood) {
    console.log("returning no mood found");
    return res.status(400).json({ message: "Mood is required" });
  }

  if (!text) {
    console.log("Returning: no text found");
    return res.status(400).json({ message: "Text is required" });
  }
  console.log("Saving mood for:", req.session.userEmail, mood, text);
  const timestamp = new Date().toISOString();

  try {
    console.log("Route execution reached. Request Body:", req.body);
    const result = saveMoodToCSV(req.session.userEmail, mood, text, timestamp);
    res.json({
      message: "Mood recorded successfully!",
      success: result.success,
    });
  } catch (err) {
    console.error("Error saving mood:", err);
    res.status(500).json({ message: "Failed to save mood" });
  }
});

app.get("/getSharedData", (req, res) => {
  try {
    const filePath = path.join(__dirname, "track.csv");

    if (!fs.existsSync(filePath)) {
      console.error("file not found:", filePath);
      return res.status(404).json({ message: "file not found" });
    }
    const requestedDate = req.query.date; // Example: "2025-05-12"
    if (!requestedDate) {
      console.error("No date provided in query parameters");
      return res
        .status(400)
        .json({ message: "Date query parameter is required" });
    }

    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const timestamp = new Date(data.timestamp);
        const date = isNaN(timestamp.getTime())
          ? null
          : timestamp.toISOString().split("T")[0];

        // Add the normalized data to the results
        results.push({
          email: data.email,
          mood: data.mood,
          text: data.text,
          timestamp: data.timestamp,
          date: date,
        });
      })
      .on("end", () => {
        console.log("CSV-file read successfully");
        // Get the requested date from the query parameters
        const requestedDate = req.query.date; // Example: "2025-05-12"
        console.log("Requested Date:", requestedDate);

        // Filter the results based on the requested date
        const filteredData = results.filter(
          (entry) => entry.date === requestedDate
        );

        if (filteredData.length > 0) {
          res.json(filteredData);
        } else {
          res
            .status(404)
            .json({ message: `No data found for ${requestedDate}` });
        }
      })
      .on("error", (err) => {
        console.error("Error reading CSV file:", err);
        res.status(500).json({ message: "Failed to read shared data" });
      });
  } catch (err) {
    console.error("Error reading Csv file:", err);
    res.status(500).json({ message: "Failed to read shared data " });
  }
});


app.get("/getSharedDataForUser", (req, res) => {
  if (!req.session || !req.session.userEmail) {
    return res.status(401).json({ message: "User not logged in" });
  }
  try {
    const filePath = path.join(__dirname, "track.csv");
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "file not found" });
    }
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (data.email === req.session.userEmail) {
          results.push(data);
        }
      })
      .on("end", () => {
        res.json(results);
      })
      .on("error", (err) => {
        res.status(500).json({ message: "Failed to read shared data" });
      });
  } catch (err) {
    res.status(500).json({ message: "Failed to read shared data " });
  }
});

module.exports = app;
