const moment = require("moment");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

const dd = () => moment().format("DD/MM/YYYY-HH:mm:ss");

module.exports = {
  getRandomInt,
  isNumeric,
  dd,
};
