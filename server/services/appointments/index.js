"use strict";
const express = require("express");
const { connectToMongoDB } = require("../../dbconfig");
const router = express.Router();
const { startOfDay, endOfDay } = require("date-fns"); // Make sure to install date-fns

router.post("/create_appointment", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

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

    // Create the appointment object
    const newAppointment = {
      appointmentName,
      appointmentDescription,
      appointmentLocation,
      appointmentFrom,
      appointmentTo,
      eventId,
      statusId,
      createdAt: new Date(), // Use the current date for createdAt
    };

    // Insert the new appointment into the collection
    await db.collection("appointments").insertOne(newAppointment);

    res
      .status(201)
      .json({ success: true, message: "Appointment created successfully" });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.put("/update_appointment/:appointmentId", async (req, res) => {
  const appointmentId = parseInt(req.params.appointmentId);
  try {
    const {
      appointmentName,
      appointmentDescription,
      appointmentLocation,
      appointmentFrom,
      appointmentTo,
      eventId,
      statusId,
    } = req.body;

    // Create an object to hold the updates
    const updates = {};

    if (appointmentName) updates.appointmentName = appointmentName;
    if (appointmentDescription)
      updates.appointmentDescription = appointmentDescription;
    if (appointmentLocation) updates.appointmentLocation = appointmentLocation;
    if (appointmentFrom) updates.appointmentFrom = appointmentFrom;
    if (appointmentTo) updates.appointmentTo = appointmentTo;
    if (eventId) updates.eventId = eventId;
    if (statusId) updates.statusId = statusId;

    // Check if there are no fields to update
    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Update the appointment document
    const result = await db.collection("appointments").updateOne(
      { appointmentId: appointmentId }, // Filter by appointmentId
      { $set: { ...updates, updatedAt: new Date() } } // Set the updates and updatedAt
    );

    // Check if any documents were modified
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Appointment not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Appointment updated successfully" });
  } catch (ex) {
    console.error("Error updating appointment:", ex);
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/appointments", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Find the top 5 appointments, joining with events and status collections
    const appointments = await db
      .collection("appointments")
      .aggregate([
        {
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "eventId",
            as: "eventDetails",
          },
        },
        {
          $lookup: {
            from: "status",
            localField: "statusId",
            foreignField: "statusId",
            as: "statusDetails",
          },
        },
        {
          $unwind: "$eventDetails",
        },
        {
          $unwind: "$statusDetails",
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $project: {
            appointmentId: "$appointmentId",
            appointmentName: "$appointmentName",
            appointmentDescription: "$appointmentDescription",
            appointmentLocation: "$appointmentLocation",
            appointmentFrom: "$appointmentFrom",
            appointmentTo: "$appointmentTo",
            event: "$eventDetails.eventName",
            status: "$statusDetails.statusName",
          },
        },
      ])
      .toArray();

    res.status(200).json({ success: true, data: appointments });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/appointments/:appointmentId", async (req, res) => {
  const appointmentId = parseInt(req.params.appointmentId);

  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Use the aggregate method to join collections based on appointmentId
    const appointmentDetails = await db
      .collection("appointments")
      .aggregate([
        {
          $match: {
            appointmentId: appointmentId, // Match the appointmentId from the URL
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "eventId",
            as: "eventDetails",
          },
        },
        {
          $lookup: {
            from: "status",
            localField: "statusId",
            foreignField: "statusId",
            as: "statusDetails",
          },
        },
        {
          $unwind: "$eventDetails",
        },
        {
          $unwind: "$statusDetails",
        },
        {
          $project: {
            appointmentId: "$appointmentId",
            appointmentName: "$appointmentName",
            appointmentDescription: "$appointmentDescription",
            appointmentLocation: "$appointmentLocation",
            appointmentFrom: "$appointmentFrom",
            appointmentTo: "$appointmentTo",
            event: "$eventDetails.eventName",
            status: "$statusDetails.statusName",
          },
        },
      ])
      .toArray(); // Convert the cursor to an array

    if (appointmentDetails.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, data: appointmentDetails[0] }); // Return the first appointment detail
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.delete("/appointments/:appointmentId", async (req, res) => {
  const appointmentId = parseInt(req.params.appointmentId);

  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Delete the appointment by appointmentId
    const result = await db.collection("appointments").deleteOne({
      appointmentId: appointmentId, // Match by appointmentId
    });

    // Check if any documents were deleted
    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "Appointment deleted successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/current", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Get the start and end of the current day as timestamps
    const startOfCurrentDay = startOfDay(new Date()).getTime(); // Convert to milliseconds
    const endOfCurrentDay = endOfDay(new Date()).getTime(); // Convert to milliseconds

    // Find today's appointments, joining with events and status collections
    const appointments = await db
      .collection("appointments")
      .aggregate([
        {
          $match: {
            appointmentFrom: {
              $gte: new Date(startOfCurrentDay), // Convert back to Date object
              $lte: new Date(endOfCurrentDay), // Convert back to Date object
            },
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "eventId",
            as: "eventDetails",
          },
        },
        {
          $lookup: {
            from: "status",
            localField: "statusId",
            foreignField: "statusId",
            as: "statusDetails",
          },
        },
        {
          $unwind: "$eventDetails",
        },
        {
          $unwind: "$statusDetails",
        },
        {
          $sort: {
            createdAt: 1,
          },
        },
        {
          $project: {
            appointmentId: "$appointmentId",
            appointmentName: "$appointmentName",
            appointmentDescription: "$appointmentDescription",
            appointmentLocation: "$appointmentLocation",
            appointmentFrom: "$appointmentFrom",
            appointmentTo: "$appointmentTo",
            event: "$eventDetails.eventName",
            status: "$statusDetails.statusName",
          },
        },
      ])
      .toArray();

    res.status(200).json({ success: true, data: appointments });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/total/count", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the total number of appointments
    const count = await db.collection("appointments").countDocuments();

    res.status(200).json({ success: true, count: count });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/current/count", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Get the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to midnight to compare only the date part

    // Count the number of appointments for the current date
    const count = await db.collection("appointments").countDocuments({
      appointmentFrom: {
        $gte: currentDate,
        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Next day
      },
    });

    res.status(200).json({ success: true, count: count });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/pending/count", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 1
    const count = await db.collection("appointments").countDocuments({
      statusId: 1,
    });

    res.status(200).json({ success: true, count: count });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/completed/count", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 2
    const count = await db.collection("appointments").countDocuments({
      statusId: 2,
    });

    res.status(200).json({ success: true, count: count });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/cancelled/count", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 3
    const count = await db.collection("appointments").countDocuments({
      statusId: 3,
    });

    res.status(200).json({ success: true, count: count });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/rescheduled/count", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 4
    const count = await db.collection("appointments").countDocuments({
      statusId: 4,
    });

    res.status(200).json({ success: true, count: count });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/progress/count", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 5
    const count = await db.collection("appointments").countDocuments({
      statusId: 5,
    });

    res.status(200).json({ success: true, count: count });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/pending/on-campus", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 1 and eventId equal to 1
    const appointmentCount = await db
      .collection("appointments")
      .countDocuments({
        statusId: 1,
        eventId: 1,
      });

    res.status(200).json({ success: true, count: appointmentCount });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/pending/travel", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 1 and eventId equal to 2
    const appointmentCount = await db
      .collection("appointments")
      .countDocuments({
        statusId: 1,
        eventId: 2,
      });

    res.status(200).json({ success: true, count: appointmentCount });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/pending/off-campus", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 1 and eventId equal to 3
    const appointmentCount = await db
      .collection("appointments")
      .countDocuments({
        statusId: 1,
        eventId: 3,
      });

    res.status(200).json({ success: true, count: appointmentCount });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/completed/on-campus", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 2 and eventId equal to 1
    const appointmentCount = await db
      .collection("appointments")
      .countDocuments({
        statusId: 2,
        eventId: 1,
      });

    res.status(200).json({ success: true, count: appointmentCount });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/completed/travel", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 2 and eventId equal to 2
    const appointmentCount = await db
      .collection("appointments")
      .countDocuments({
        statusId: 2,
        eventId: 2,
      });

    res.status(200).json({ success: true, count: appointmentCount });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/completed/off-campus", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Count the number of appointments with statusId equal to 2 and eventId equal to 3
    const appointmentCount = await db
      .collection("appointments")
      .countDocuments({
        statusId: 2,
        eventId: 3,
      });

    res.status(200).json({ success: true, count: appointmentCount });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/top_appointments", async (req, res) => {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Find the top 5 appointments, joining with events and status collections
    const appointments = await db
      .collection("appointments")
      .aggregate([
        {
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "eventId",
            as: "eventDetails",
          },
        },
        {
          $lookup: {
            from: "status",
            localField: "statusId",
            foreignField: "statusId",
            as: "statusDetails",
          },
        },
        {
          $unwind: "$eventDetails",
        },
        {
          $unwind: "$statusDetails",
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $project: {
            appointmentId: "$appointmentId",
            appointmentName: "$appointmentName",
            appointmentDescription: "$appointmentDescription",
            appointmentLocation: "$appointmentLocation",
            appointmentFrom: "$appointmentFrom",
            appointmentTo: "$appointmentTo",
            event: "$eventDetails.eventName",
            status: "$statusDetails.statusName",
          },
        },
        {
          $limit: 5,
        },
      ])
      .toArray();

    res.status(200).json({ success: true, data: appointments });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

module.exports = router;
