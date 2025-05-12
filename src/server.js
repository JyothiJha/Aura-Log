const express = require("express");
const session = require("express-session");
const authRoutes = require("./auth");
const Routes = require("./routes");
const moodRoute = require ("./moodRoute");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  if (req.url.includes("hot-update")) {
    return next(); // Skip logging for hot-update requests
  }
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Mount the routes
app.use("/api/auth", authRoutes);
app.use("/api", Routes);
app.use("/", moodRoute);
app.get('/dashboard', (req, res) => {
  res.send("Dashboard Page");
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
