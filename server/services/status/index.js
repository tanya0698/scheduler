"use strict";
const express = require("express");
const { pool } = require("../../dbconfig");
const router = express.Router();

const app = express();

router.post("/create_status", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    const { statusName } = req.body;

    // Validate required fields
    if (!statusName) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const query = `
      INSERT INTO status (statusName, createdAt)
      VALUES (@statusName, GETDATE())
    `;

    // Execute the query using the connected pool instance
    await poolInstance.request().input("statusName", statusName).query(query);

    res
      .status(201)
      .json({ success: true, message: "Status added successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.get("/status", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    const result = await poolInstance.request().query("SELECT * FROM status");
    const status = result.recordset;

    res.status(200).json({ success: true, data: status });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

module.exports = router;
