const express = require("express");
const path = require("path");
const { addData } = require("./csvUtils"); // Import the utility functions

const router = express.Router();

console.log("Routes file loaded");

// Route to handle adding data to the CSV
router.post("/add-data", (req, res) => {
  console.log("Request body:", req.body);

  const csvFilePath = path.join(__dirname, "./user_req.csv"); // Path to the CSV file
  const { name, email, inquiry } = req.body; // Extract data from request body

  try {
    const newRow = `${name},${email},${inquiry}`; // Format the data as a CSV row
    addData(csvFilePath, newRow); // Use the utility function to add the data
    res.status(200).json({ message: "Data saved successfully!" }); // Respond on success
  } catch (err) {
    console.error("Error in /add-data route:", err.message);
    res.status(500).json({ message: "Failed to save data." }); // Respond with error
  }
});

module.exports = router;
