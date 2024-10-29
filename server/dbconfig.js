const mssql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  driver: "tedious",
  options: {
    trustServerCertificate: true,
    port: 1433,
    connectionTimeout: 30000,
  },
};

// Create a connection pool and connect to the database
const poolPromise = new mssql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the application if the connection fails
  });

module.exports = { pool: poolPromise };
