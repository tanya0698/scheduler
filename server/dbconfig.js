const mssql = require("mssql");
require("dotenv").config();

const config = {
  user: "echipuka",
  password: "Starcreed@0698",
  server: "192.168.1.55",
  database: "scheduler",
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
