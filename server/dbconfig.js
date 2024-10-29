const { MongoClient } = require("mongodb");
require("dotenv").config();

// MongoDB connection URI
const uri = process.env.MONGO_URI;

// Create a new MongoClient without deprecated options
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB");

    // Specify the database name
    const db = client.db("scheduler"); // Change "scheduler" to your actual database name if needed

    return db; // Return the database object
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the application if the connection fails
  }
}

// Export the connection function
module.exports = { connectToMongoDB };
