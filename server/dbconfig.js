const mysql = require("mysql2/promise"); // Use promise-based API
require("dotenv").config();

const config = {
  host: process.env.DB_SERVER, // Use 'host' instead of 'server'
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3306, // Default MySQL port is 3306
};

// Create a connection pool and connect to the database
const poolPromise = mysql
  .createPool(config)
  .then((pool) => {
    console.log("Connected to MySQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the application if the connection fails
  });

module.exports = { pool: poolPromise };
