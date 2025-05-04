const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const csvFilePath = path.join(__dirname, "./users.csv");

// CSV utility functions
const ensureHeader = (header) => {
  try {
    if (!fs.existsSync(csvFilePath)) {
      fs.writeFileSync(csvFilePath, `${header}\n`, "utf8");
    }
  } catch (err) {
    console.error("Error ensuring header in CSV file:", err);
  }
};

const appendToCSV = (data, callback) => {
  try {
    ensureHeader("username,email,password,created_at");
    fs.appendFile(csvFilePath, `${data}\n`, callback);
  } catch (err) {
    console.error("Unexpected error while appending data to CSV file:", err);
    if (callback) callback(err);
  }
};

const readCSVFile = (callback) => {
  fs.readFile(csvFilePath, "utf8", (err, data) => {
    if (err) return callback(err);

    const lines = data.trim().split("\n");
    lines.shift(); // Remove header

    const users = lines.map((line) => {
      const [username, email, hashedPassword, createdAt] = line.split(",");
      return { username, email, hashedPassword, createdAt };
    });

    callback(null, users);
  });
};

// Signup controller
router.post("/signup", async (req, res) => {
  const { name: username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    // Read the CSV file to check for existing users
    readCSVFile((err, users) => {
      if (err) {
        console.error("Error reading CSV file:", err);
        return res.status(500).send({ message: "Internal server error." });
      }

      // Check if the email already exists
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        return res.status(409).send({ message: "Email already in use." });
      }

      // Proceed with signup
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const createdAt = new Date().toISOString();

          const newUserRow = `${username},${email},${hashedPassword},${createdAt}`;

          appendToCSV(newUserRow, (err) => {
            if (err) {
              console.error("Error appending data:", err);
              return res
                .status(500)
                .send({ message: "Failed to save user data." });
            }
            res.status(201).send({ message: "User signed up successfully!" });
          });
        })
        .catch((err) => {
          console.error("Error hashing password:", err);
          res.status(500).send({ message: "Internal server error." });
        });
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send({ message: "Internal server error." });
  }
});

// Login controller
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  readCSVFile((err, users) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      return res.status(500).send({ message: "Internal server error." });
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).send({ message: "Invalid credentials." });
      }

      req.session.userEmail = email;
      console.log("Session Data in /saveMood:", req.session);
      // Send success message only
      res.status(200).send({
        message: `Welcome back, ${user.username}!`,
        sessionId: req.sessionID,
      });
    });
  });
});

module.exports = router;
