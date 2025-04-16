const { ensureHeader, appendToCSV } = require("./csvUtils");

// Handle adding data to any CSV file dynamically
const addDataToCSV = (req, res, csvFilePath, header) => {
  ensureHeader(csvFilePath, header); 

  const { name, email, inquiry } = req.body;

  // Validate incoming data
  if (!name || !email || !inquiry) {
    console.error("Validation error: Missing fields");
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log("Incoming data:", req.body);

  // Append the data to the specified CSV file
  try {
    const newRow = `${name},${email},${inquiry}`;
    appendToCSV(csvFilePath, newRow);
    res.status(200).json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to save data." });
  }
};

module.exports = { addDataToCSV };
