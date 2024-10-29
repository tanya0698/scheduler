"use strict";
const express = require("express");
const { pool } = require("../../dbconfig");
const router = express.Router();

const app = express();

router.post("/create_status", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const { statusName } = req.body;

    // Validate required fields
    if (!statusName) {
      return res
        .status(400)
        .json({ success: false, error: "Status name is required" });
    }

    const query = `
      INSERT INTO status (statusName, createdAt)
      VALUES (?, NOW())
    `;

    // Execute the query using the connection instance
    await connection.query(query, [statusName]);

    res
      .status(201)
      .json({ success: true, message: "Status added successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.get("/status", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const [status] = await connection.query("SELECT * FROM status"); // Execute the query to fetch status records

    res.status(200).json({ success: true, data: status }); // Return the status data
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

module.exports = router;
