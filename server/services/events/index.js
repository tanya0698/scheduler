"use strict";
const express = require("express");
const { pool } = require("../../dbconfig");
const router = express.Router();

const app = express();

router.post("/create_event", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const { eventName } = req.body;

    // Validate required fields
    if (!eventName) {
      return res
        .status(400)
        .json({ success: false, error: "Event name is required" });
    }

    const query = `
      INSERT INTO events (eventName, createdAt)
      VALUES (?, NOW())
    `;

    // Execute the query using the connection instance
    await connection.query(query, [eventName]);

    res
      .status(201)
      .json({ success: true, message: "Event added successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.get("/events", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const [events] = await connection.query("SELECT * FROM events"); // Execute the query to fetch events

    res.status(200).json({ success: true, data: events }); // Return the events data
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

module.exports = router;
