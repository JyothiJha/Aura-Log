const fs = require("fs");
const path = require("path");

// Ensure header exists in a specified CSV file
const ensureHeader = (csvFilePath, header) => {
  try {
    if (!fs.existsSync(csvFilePath)) {
      fs.writeFileSync(csvFilePath, `${header}\n`);
    }
  } catch (err) {
    console.error("Error ensuring header in CSV file:", err);
  }
};

// Append a row of data to a CSV file
const appendToCSV = (csvFilePath, data) => {
  fs.appendFile(csvFilePath, `${data}\n`, (err) => {
    if (err) {
      throw new Error(`Error writing to CSV file: ${err}`);
    }
  });
};

module.exports = { ensureHeader, appendToCSV };
