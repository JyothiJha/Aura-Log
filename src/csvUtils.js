const fs = require("fs");
const path = require("path");

const csvFilePath = path.join(__dirname, "./users.csv");
const filePath = path.join(__dirname, "./user_req.csv");

const headerCSV = (filePath, headers) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `${headers.join(",")}\n`, "utf8");
    console.log("Headers added to the file.");
  }
};

const addData = (filePath, row) => {
  const headers = ["name", "email", "inquiry"]; 
  headerCSV(filePath, headers);
  fs.appendFileSync(filePath, `${row}\n`, "utf8");
};

// Ensure header exists in the CSV file
const ensureHeader = (header) => {
  try {
    if (!fs.existsSync(csvFilePath)) {
      fs.writeFileSync(csvFilePath, `${header}\n`, "utf8");
    }
  } catch (err) {
    console.error("Error ensuring header in CSV file:", err);
  }
};

// Append a row of data to the CSV file
const appendToCSV = (data, callback) => {
  try {
    ensureHeader("username,email,password,created_at");
    fs.appendFile(csvFilePath, `${data}\n`, callback);
  } catch (err) {
    console.error("Unexpected error while appending data to CSV file:", err);
    if (callback) callback(err);
  }
};

// Read data from the CSV file
const readCSVFile = (callback) => {
  fs.readFile(csvFilePath, "utf8", (err, data) => {
    if (err) return callback(err);

    const lines = data.trim().split("\n");
    lines.shift(); // Remove the header row

    const users = lines.map((line) => {
      const [username, email, hashedPassword, createdAt] = line.split(",");
      return { username, email, hashedPassword, createdAt };
    });

    callback(null, users);
  });
};

module.exports = { appendToCSV, readCSVFile, headerCSV, addData };
