"use strict";
const express = require("express");
const { pool } = require("../../dbconfig");
const router = express.Router();

const app = express();

router.post("/create_role", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const { roleName } = req.body;

    // Validate required fields
    if (!roleName) {
      return res
        .status(400)
        .json({ success: false, error: "Role name is required" });
    }

    const query = `
      INSERT INTO roles (roleName, createdAt)
      VALUES (?, NOW())
    `;

    // Execute the query using the connection instance
    await connection.query(query, [roleName]);

    res.status(201).json({ success: true, message: "Role added successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.get("/roles", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const [roles] = await connection.query("SELECT * FROM roles"); // Execute the query to fetch roles

    res.status(200).json({ success: true, data: roles }); // Return the roles data
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

module.exports = router;
