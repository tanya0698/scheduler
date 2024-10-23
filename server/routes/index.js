"use strict";
const express = require("express");
const router = express.Router();
const path = require("path");

//router.get('/*', (req, res, next) => {

//res.sendFile(path.join(__dirname, '../client/build/index.html'));
//});
/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", {
    title: "Site Under Maintenance, Please try again later !",
  });
});

module.exports = router;
