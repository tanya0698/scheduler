"use strict";
const express = require("express");
const { pool } = require("../../dbconfig");
const router = express.Router();

const app = express();

router.post("/create_role", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    const { roleName } = req.body;

    // Validate required fields
    if (!roleName) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const query = `
      INSERT INTO roles (roleName, createdAt)
      VALUES (@roleName, GETDATE())
    `;

    // Execute the query using the connected pool instance
    await poolInstance.request().input("roleName", roleName).query(query);

    res.status(201).json({ success: true, message: "Role added successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.get("/roles", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    const result = await poolInstance.request().query("SELECT * FROM roles");
    const roles = result.recordset;

    res.status(200).json({ success: true, data: roles });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

module.exports = router;
