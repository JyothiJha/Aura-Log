const express = require("express");
const { addDataToCSV } = require("./controller");
const path = require("path");

const router = express.Router();

console.log("Routes file loaded");

router.post("/add-data", (req, res) => {
    console.log("Request body:", req.body); 
    const csvFileName = "user_req"; 
    const csvFilePath = path.join(__dirname, `${csvFileName}.csv`); 
    const header = "name,email,inquiry"; 
    console.log("Working on route");
    addDataToCSV(req, res, csvFilePath, header); 
});

module.exports = router;
