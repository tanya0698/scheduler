const mysql = require("mysql2/promise"); // Use promise-based API
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3306, // Default MySQL port is 3306
  connectTimeout: 30000,
  options: {
    trustServerCertificate: true,
  },
};

// Create a connection pool
const pool = mysql.createPool(config);

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL");
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the application if the connection fails
  });

module.exports = { pool };
