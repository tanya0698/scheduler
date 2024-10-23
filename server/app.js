"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const swaggerUi = require("swagger-ui-express");
const swaggerAutogen = require("swagger-autogen")();
const winston = require("winston");

const sf = require("./swagger_output.json");
const { dd } = require("./utility/index");
const { pool } = require("./dbconfig");

const PORT = process.env.PORT;

process.env.jwt_secret = process.env.JWT;
process.env.bcrypt_salt = process.env.BCRYPT;

global.dd = dd;

global.report = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  // defaultMeta: { System: 'LocalyserScrapper'},
  transports: [
    new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
    new winston.transports.File({
      filename: "./logs/audit.trail",
      level: "audit",
    }),
  ],
});

report.add(new winston.transports.Console({ format: winston.format.simple() }));

const routes = require("./routes/index");
const api = require("./routes/api");

const app = express();

app.use(
  compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use(cors());

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(sf));
app.disable("x-powered-by");

app.use(async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "text/*" }));
app.use(express.static(path.join(__dirname, "./public/")));
app.use(express.static(path.join(__dirname, "./documents")));
//app.use(express.static(path.join(__dirname, "../client/build/")));
app.use("/api", api);
app.use("/", routes);

app.use(function (req, res) {
  res.json({
    message: "404: Not found",
    success: false,
  });
});

app.set("port", process.env.PORT);

(async () => {
  try {
    const poolInstance = await pool; // Await the pool promise to get the connected instance
    console.log("Database connection established.");

    console.log("Setting up swagger docs...");
    await swaggerAutogen("./swagger_output.json", ["./routes/api.js"]);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.error("Error establishing database connection:", e);
  }
})();
