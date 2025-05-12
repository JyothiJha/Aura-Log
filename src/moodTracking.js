const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "track.csv");

const saveMoodToCSV = async (email, mood, text, timestamp) => {
  const formattedTimestamp = new Date(timestamp).toISOString().split("T")[0];
  const csvData = `${email},${mood},${text},${timestamp}\n`;
  console.log("Attempting to write:", csvData);
  try {
    fs.appendFileSync(filePath, csvData, "utf8");
    console.log("Mood recorded successfully!");
    return { success: true };
  } catch (err) {
    console.error("Error writing to CSV:", err);
    return { success: false, message: "Failed to record mood" };
  }
};

module.exports = saveMoodToCSV;
