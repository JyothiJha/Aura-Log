const express = require("express");
const authRoutes = require("./auth");
const Routes = require("./routes");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});


// Mount the routes
app.use("/api/auth", authRoutes);
app.use("/api", Routes);
app.get('/dashboard', (req, res) => {
  res.send("Dashboard Page");
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
