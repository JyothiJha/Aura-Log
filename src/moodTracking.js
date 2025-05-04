const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "track.csv");


const saveMoodToCSV = async (email, mood) => {
  const timestamp = new Date().toISOString();
  const csvData = `${email},${mood},${timestamp}\n`;
  console.log("Attempting to write:", csvData);
  try {
    await fs.promises.appendFile(filePath, csvData);
    console.log("Mood recorded successfully!");
    return { success: true };
  } catch (err) {
    console.error("Error writing to CSV:", err);
    return { success: false, message: "Failed to record mood" };
  }
};

module.exports = saveMoodToCSV;
