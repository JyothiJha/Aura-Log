const express = require ("express");
const app = express();
const fs = require("fs");
const csv =require("csv-parser");
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
        return res.status(400).json({ message: "Text is required"});
    } 
    console.log("Saving mood for:", req.session.userEmail, mood, text);  
    const timestamp = new Date().toUTCString();

    try {
        console.log("Route execution reached. Request Body:", req.body);
        const result = saveMoodToCSV(req.session.userEmail, mood ,text, timestamp);;
        res.json({ message: "Mood recorded successfully!", success: result.success });
    } catch (err) {
        console.error("Error saving mood:", err);
        res.status(500).json({ message: "Failed to save mood" });
    }
});

app.get("/getSharedData", (req, res) => {
    const filePath = this.path.joiin(__dirname, "track.csv");
    const results = [];

    fstat.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
            results.push(data);
        })
        .on("end", () => {
            res.json(results);
        })
        .on("error", (err) => {
            console.error("Error reading CSV file:", err);
            res.status(500).json({ message: "Failed to read shared data" });
        });
});

module.exports = app;