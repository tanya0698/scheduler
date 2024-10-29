"use strict";
const express = require("express");
const { connectToMongoDB } = require("../../dbconfig");
const router = express.Router();

router.post("/create_role", async (req, res) => {
  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    const { roleName } = req.body;

    // Validate required fields
    if (!roleName) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Create a new role object
    const newRole = {
      roleName,
      createdAt: new Date(), // Use the current date and time
    };

    // Insert the new role into the "roles" collection
    await db.collection("roles").insertOne(newRole);

    res.status(201).json({ success: true, message: "Role added successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

router.get("/roles", async (req, res) => {
  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Query the "roles" collection
    const roles = await db.collection("roles").find({}).toArray();

    res.status(200).json({ success: true, data: roles });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

module.exports = router;
