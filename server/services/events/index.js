"use strict";
const express = require("express");
const { connectToMongoDB } = require("../../dbconfig");
const router = express.Router();

router.post("/create_event", async (req, res) => {
  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    const { eventName } = req.body;

    // Validate required fields
    if (!eventName) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Create a new event object
    const newEvent = {
      eventName,
      createdAt: new Date(), // Use the current date and time
    };

    // Insert the new event into the "events" collection
    await db.collection("events").insertOne(newEvent);

    res
      .status(201)
      .json({ success: true, message: "Event added successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});
router.get("/events", async (req, res) => {
  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Query the "events" collection
    const events = await db.collection("events").find({}).toArray();

    res.status(200).json({ success: true, data: events });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

module.exports = router;
