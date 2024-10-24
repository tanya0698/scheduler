"use strict";
const express = require("express");
const { pool } = require("../../dbconfig");
const router = express.Router();

const app = express();

router.post("/create_appointment", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

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
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    // Execute the query using the connection instance
    await connection.query(query, [
      appointmentName,
      appointmentDescription,
      appointmentLocation,
      appointmentFrom,
      appointmentTo,
      eventId,
      statusId,
    ]);

    res
      .status(201)
      .json({ success: true, message: "Appointment created successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.put("/update_appointment/:appointmentId", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
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
      updates.push("appointmentName = ?");
      inputs.appointmentName = appointmentName;
    }
    if (appointmentDescription) {
      updates.push("appointmentDescription = ?");
      inputs.appointmentDescription = appointmentDescription;
    }
    if (appointmentLocation) {
      updates.push("appointmentLocation = ?");
      inputs.appointmentLocation = appointmentLocation;
    }
    if (appointmentFrom) {
      updates.push("appointmentFrom = ?");
      inputs.appointmentFrom = appointmentFrom;
    }
    if (appointmentTo) {
      updates.push("appointmentTo = ?");
      inputs.appointmentTo = appointmentTo;
    }
    if (eventId) {
      updates.push("eventId = ?");
      inputs.eventId = eventId;
    }
    if (statusId) {
      updates.push("statusId = ?");
      inputs.statusId = statusId;
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    connection = await pool.getConnection(); // Get a connection from the pool

    const result = await connection.query(
      `UPDATE appointments SET ${updates.join(
        ", "
      )}, updatedAt = NOW() WHERE appointmentId = ?`,
      [...Object.values(inputs), appointmentId] // Pass the values in order
    );

    if (result[0].affectedRows === 0) {
      res.status(404).json({ success: false, error: "Appointment not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Appointment updated successfully" });
    }
  } catch (ex) {
    console.error("Error updating appointment:", ex);
    res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.get("/appointments", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

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

    const [appointments] = await connection.query(query); // Execute the query to fetch appointments

    res.status(200).json({ success: true, data: appointments }); // Return the appointments data
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.get("/appointments/:appointmentId", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  const appointmentId = parseInt(req.params.appointmentId); // Extract appointmentId from the request parameters

  try {
    connection = await pool.getConnection(); // Get a connection from the pool

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
        a.appointmentId = ?
    `;

    // Execute the query and pass the appointmentId as a parameter to prevent SQL injection
    const [result] = await connection.query(query, [appointmentId]); // Use parameterized query

    const appointment = result[0]; // Get the first record

    if (appointment) {
      res.status(200).json({ success: true, data: appointment });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

module.exports = router;
