const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware 
app.use(bodyParser.json());
app.use(cors());


const csvFilePath = path.join(__dirname, "user_req.csv");

// Function to ensure the header exists
const ensureHeader = () => {
  try {
    if (!fs.existsSync(csvFilePath)) {
      fs.writeFileSync(csvFilePath, "name,email,inquiry\n");
    }
  } catch (err) {
    console.error("Error ensuring header in CSV file:", err);
  }
};

// POST route to handle form submissions
app.post("/api/add-data", (req, res) => {
  ensureHeader();

  const { name, email, inquiry } = req.body;

  // Validate incoming data
  if (!name || !email || !inquiry) {
    console.error("Validation error: Missing fields");
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log("Incoming data:", req.body); 

  // Append data to the CSV file
  const newRow = `${name},${email},${inquiry}\n`;
  fs.appendFile(csvFilePath, newRow, (err) => {
    if (err) {
      console.error("Error writing to CSV file:", err);
      return res.status(500).json({ message: "Failed to save data." });
    }
    res.status(200).json({ message: "Data saved successfully!" });
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
