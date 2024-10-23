"use strict";
const express = require("express");
const { pool } = require("../../dbconfig");
const router = express.Router();

const app = express();

router.post("/create_appointment", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    const {
      appointmentName,
      appointmentDescription,
      appointmentLocation,
      appointmentFrom,
      appointmentTo,
      eventId,
      statusId,
    } = req.body;

    // Validate required fields
    if (
      !appointmentName ||
      !appointmentDescription ||
      !appointmentLocation ||
      !appointmentFrom ||
      !appointmentTo ||
      !eventId ||
      !statusId
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const query = `
      INSERT INTO appointments (appointmentName, appointmentDescription, appointmentLocation, appointmentFrom, appointmentTo, eventId, statusId, createdAt)
      VALUES (@appointmentName, @appointmentDescription, @appointmentLocation, @appointmentFrom, @appointmentTo, @eventId, @statusId, GETDATE())
    `;

    // Execute the query using the connected pool instance
    await poolInstance
      .request()
      .input("appointmentName", appointmentName)
      .input("appointmentDescription", appointmentDescription)
      .input("appointmentLocation", appointmentLocation)
      .input("appointmentFrom", appointmentFrom)
      .input("appointmentTo", appointmentTo)
      .input("eventId", eventId)
      .input("statusId", statusId)
      .query(query);

    res
      .status(201)
      .json({ success: true, message: "Appointment created successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.put("/update_appointment/:appointmentId", async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId);
    const {
      appointmentName,
      appointmentDescription,
      appointmentLocation,
      appointmentFrom,
      appointmentTo,
      eventId,
      statusId,
    } = req.body;

    const updates = [];
    const inputs = { appointmentId };

    if (appointmentName) {
      updates.push("appointmentName = @appointmentName");
      inputs.appointmentName = appointmentName;
    }
    if (appointmentDescription) {
      updates.push("appointmentDescription = @appointmentDescription");
      inputs.appointmentDescription = appointmentDescription;
    }
    if (appointmentLocation) {
      updates.push("appointmentLocation = @appointmentLocation");
      inputs.appointmentLocation = appointmentLocation;
    }
    if (appointmentFrom) {
      updates.push("appointmentFrom = @appointmentFrom");
      inputs.appointmentFrom = appointmentFrom;
    }
    if (appointmentTo) {
      updates.push("appointmentTo = @appointmentTo");
      inputs.appointmentTo = appointmentTo;
    }
    if (eventId) {
      updates.push("eventId = @eventId");
      inputs.eventId = eventId;
    }
    if (statusId) {
      updates.push("statusId = @statusId");
      inputs.statusId = statusId;
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    const poolInstance = await pool; // Wait for the pool promise to resolve

    const result = await poolInstance
      .request()
      .input("appointmentId", appointmentId)
      .input("appointmentName", inputs.appointmentName)
      .input("appointmentDescription", inputs.appointmentDescription)
      .input("appointmentLocation", inputs.appointmentLocation)
      .input("appointmentFrom", inputs.appointmentFrom)
      .input("appointmentTo", inputs.appointmentTo)
      .input("eventId", inputs.eventId)
      .input("statusId", inputs.statusId)
      .query(
        `UPDATE appointments SET ${updates.join(
          ", "
        )}, updatedAt = GETDATE() WHERE appointmentId = @appointmentId`
      );

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ success: false, error: "Appointment not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Appointment updated successfully" });
    }
  } catch (ex) {
    console.error("Error updating appointment:", ex);
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/appointments", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    const query = `
      SELECT 
        a.appointmentId,
        a.appointmentName, 
        a.appointmentDescription, 
        a.appointmentLocation, 
        a.appointmentFrom, 
        a.appointmentTo, 
        e.eventName AS event, 
        s.statusName AS status
      FROM 
        appointments a
      INNER JOIN 
        events e ON a.eventId = e.eventId
      INNER JOIN 
        status s ON a.statusId = s.statusId
    `;

    const result = await poolInstance.request().query(query); // Use the connected pool instance
    const appointments = result.recordset;

    res.status(200).json({ success: true, data: appointments });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.get("/appointments/:appointmentId", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  const appointmentId = parseInt(req.params.appointmentId); // Extract appointmentId from the request parameters

  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    // SQL query to fetch the appointment by appointmentId
    const query = `
      SELECT 
        a.appointmentId,
        a.appointmentName, 
        a.appointmentDescription, 
        a.appointmentLocation, 
        a.appointmentFrom, 
        a.appointmentTo, 
        e.eventName AS event, 
        s.statusName AS status
      FROM 
        appointments a
      INNER JOIN 
        events e ON a.eventId = e.eventId
      INNER JOIN 
        status s ON a.statusId = s.statusId
      WHERE 
        a.appointmentId = @appointmentId
    `;

    // Create a request and add the parameter to prevent SQL injection
    const request = poolInstance.request();
    request.input("appointmentId", appointmentId); // Assuming appointmentId is an integer

    const result = await request.query(query); // Execute the query
    const appointment = result.recordset[0]; // Get the first record

    if (appointment) {
      res.status(200).json({ success: true, data: appointment });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

module.exports = router;
