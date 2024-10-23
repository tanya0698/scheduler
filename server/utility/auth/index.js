"use strict";
const jwt = require("jsonwebtoken");
const rn = require("random-number");
const { pool } = require("../../dbconfig");

const findEmail = async (email) => {
  const result = await pool
    .request()
    .input("Email", email)
    .query("SELECT * FROM users WHERE email = @Email");
  return result.recordset[0];
};

const findUser = async (email, password) => {
  const result = await pool
    .request()
    .input("Email", email)
    .input("Password", password)
    .query("SELECT * FROM users WHERE email = @Email AND password = @Password");
  return result.recordset[0];
};

const findAllUsers = async (fullname, email, roleId) => {
  const result = await pool
    .request()
    .input("FullName", fullname)
    .input("Email", email)
    .input("RoleId", roleId)
    .query(
      `SELECT * FROM users WHERE email = @Email, fullname = @Fullname AND roleId = @RoleId`
    );
  return result.recordset[0];
};

// Generate a JWT token
const generateToken = (user) => {
  const payload = {
    email: user.email,
    userId: user.userId,
  };

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const secretKey = process.env.SECRET_KEY;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

const generateOTP = async () => {
  const gen = rn.generator({
    min: 100000,
    max: 999999,
    integer: true,
  });

  return gen();
};

const findToken = async (token, email) => {
  const result = await pool
    .request()
    .input("Token", token)
    .input("Email", email)
    .query("SELECT * FROM users WHERE token = @Token AND email = @Email");
  return result.recordset[0];
};

const updateUserPassword = async (email, password) => {
  await pool
    .request()
    .input("Email", email)
    .input("Password", password)
    .query("UPDATE users SET password = @Password WHERE email = @Email");
};

const removeToken = async (token, email) => {
  await pool
    .request()
    .input("Token", token)
    .input("Email", email)
    .query("DELETE FROM users WHERE token = @Token AND email = @Email");
};

module.exports = {
  findEmail,
  findUser,
  findAllUsers,
  verifyToken,
  generateToken,
  findToken,
  updateUserPassword,
  removeToken,
  generateOTP,
};
