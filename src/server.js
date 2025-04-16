const express = require("express");
const Routes = require("./routes");

const app = express();
const port = 3000;


// Use routes for the API
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next(); // Pass control to the next middleware/route handler
  });
console.log("Routes mounted at /api");
app.use("/api", Routes);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
