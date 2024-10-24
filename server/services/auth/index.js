"use strict";
const express = require("express");
const { pool } = require("../../dbconfig");
const nodemailer = require("nodemailer");
require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  findEmail,
  generateToken,
  findToken,
  verifyToken,
  updateUserPassword,
  removeToken,
} = require("../../utility/auth");

const app = express();

const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
};

router.post("/login", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const { email, password } = req.body;

    // Check if email and password are present
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }

    // Check if email exists
    const emailQuery = `
      SELECT * FROM users
      WHERE email = ?
    `;
    const [emailResult] = await connection.query(emailQuery, [email]); // Use connection.query

    if (emailResult.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email does not exist" });
    }

    // Get the stored password
    const storedPassword = emailResult[0].password;

    // Compare the provided password with the stored password
    const isValidPassword = await bcrypt.compare(password, storedPassword);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password" });
    }

    // Generate a token using the existing generateToken function
    const token = await generateToken(emailResult[0]);

    res.status(200).json({ success: true, token });
  } catch (ex) {
    console.error("Login error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.post("/register", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const { fullname, email, password, cpassword, roleId } = req.body;

    // Check if all fields are present
    if (!fullname || !email || !password || !cpassword || !roleId) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Check if password and confirm password match
    if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        error: "Password and confirm password do not match",
      });
    }

    // Check if email already exists
    const emailQuery = `
      SELECT * FROM users
      WHERE email = ?
    `;
    const [emailResult] = await connection.query(emailQuery, [email]); // Use connection.query

    if (emailResult.length > 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const query = `
      INSERT INTO users (fullname, email, password, roleId, createdAt)
      VALUES (?, ?, ?, ?, NOW())
    `;
    await connection.query(query, [fullname, email, hashedPassword, roleId]); // Use connection.query

    res.status(201).json({ success: true, message: "User added successfully" });
  } catch (ex) {
    console.error("Registration error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.post("/forgot_password", async (req, res) => {
  const { email } = req.body;

  // Check if email is present
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    // Check if email exists
    const emailQuery = `
      SELECT * FROM users
      WHERE email = ?
    `;
    const [emailResult] = await connection.query(emailQuery, [email]); // Use connection.query

    if (emailResult.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email does not exist" });
    }

    const foundUser = emailResult[0];

    // Generate a secure token
    const token = await generateToken(foundUser); // Ensure this function is defined

    // Send email with reset link
    const transporter = nodemailer.createTransport(emailConfig);
    const emailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: process.env.EMAIL_SUBJECT,
      html: `<p>You requested to change your password. If this request was not made by you, please contact us. Access <a href='${process.env.APP_URL_CLIENT}/auth/cover-update?token=${token}&email=${email}'>this link</a> to reset your password.</p>`,
    };

    await transporter.sendMail(emailOptions);
    console.log("Email sent");

    // Store the token in the database
    await connection.query(
      `
      INSERT INTO password_resets (email, token, updatedAt)
      VALUES (?, ?, NOW())
    `,
      [foundUser.email, token]
    ); // Use connection.query

    // Respond with a success message
    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
      attributes: {
        redirect_url: `${process.env.APP_URL_API}/password-reset`,
        email: email,
      },
    });
  } catch (error) {
    console.error("Error:", error); // Log the error
    return res.status(500).json({
      success: false,
      error: "An error occurred. Please try again later.",
    });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.post("/reset_password/:token/:email", async (req, res) => {
  const { token, email } = req.params;
  const { password, cpassword } = req.body;

  // Check if all required fields are present
  if (!password || !cpassword) {
    return res.status(400).json({
      success: false,
      error: "Password and confirm password are required",
    });
  }

  // Check if passwords match
  if (password !== cpassword) {
    return res
      .status(400)
      .json({ success: false, error: "Passwords do not match" });
  }

  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    // Verify the token and email
    const tokenQuery = `
      SELECT * FROM password_resets
      WHERE email = ? AND token = ?
    `;
    const [tokenResult] = await connection.query(tokenQuery, [email, token]); // Use connection.query

    if (tokenResult.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid token or email" });
    }

    // Update the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await connection.query(
      `
      UPDATE users
      SET password = ?, token = NULL, updatedAt = NOW()
      WHERE email = ?
    `,
      [hashedPassword, email]
    ); // Use connection.query

    // Respond with a success message
    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Error:", error); // Log the error
    return res.status(500).json({
      success: false,
      error: "An error occurred. Please try again later.",
    });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.put("/update_password", async (req, res) => {
  const { password, cpassword } = req.body;
  const email = req.user.email; // Assuming you store the email in the request object after authentication
  const token = req.user.token; // Assuming you store the token in the request object after authentication

  // Check if password and confirm password match
  if (password !== cpassword) {
    return res
      .status(400)
      .json({ success: false, error: "Passwords do not match" });
  }

  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    // Verify the token (you need to implement this logic)
    const isValidToken = verifyToken(token); // Ensure this function is defined

    if (!isValidToken) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    // Check if the email exists in the database
    const emailQuery = `
      SELECT * FROM users
      WHERE email = ?
    `;
    const [emailResult] = await connection.query(emailQuery, [email]); // Use connection.query

    if (emailResult.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email not found in the database" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user's password in the database
    const updateQuery = `
      UPDATE users
      SET password = ?, token = NULL, updatedAt = NOW()
      WHERE email = ?
    `;
    await connection.query(updateQuery, [hashedPassword, email]); // Use connection.query

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (ex) {
    console.error("Error:", ex); // Log the error
    return res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.get("/users", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const query = `
      SELECT 
        a.userId,
        a.fullname, 
        a.email, 
        a.phone, 
        a.address, 
        e.roleName AS role
      FROM 
        users a
      INNER JOIN 
        roles e ON a.roleId = e.roleId
    `;

    const [result] = await connection.query(query); // Use connection.query
    const users = result; // Directly use the result from the query

    res.status(200).json({ success: true, data: users });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.get("/users/:email", async (req, res) => {
  const email = req.params.email;

  // Validate the email parameter
  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: "Email parameter is required." });
  }

  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const query = "SELECT * FROM users WHERE email = ?";
    const [result] = await connection.query(query, [email]); // Use connection.query with parameter binding

    const user = result[0]; // Get the first user from the result

    if (user) {
      return res.status(200).json({ success: true, data: user });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "User  not found." });
    }
  } catch (ex) {
    console.error("Error:", ex); // Log the error
    return res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.put("/update_user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { fullname, email, roleId } = req.body;

  // Check if at least one field is present
  if (!fullname && !email && !roleId) {
    return res.status(400).json({
      success: false,
      error: "At least one field is required to update",
    });
  }

  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    // Check if email already exists for another user
    if (email) {
      const emailQuery = `
        SELECT * FROM users
        WHERE email = ? AND userId != ?
      `;
      const [emailResult] = await connection.query(emailQuery, [email, userId]);

      if (emailResult.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: "Email already exists" });
      }
    }

    // Prepare the update query
    let updateFields = [];
    let queryParams = [];

    if (fullname) {
      updateFields.push("fullname = ?");
      queryParams.push(fullname);
    }
    if (email) {
      updateFields.push("email = ?");
      queryParams.push(email);
    }
    if (roleId) {
      updateFields.push("roleId = ?");
      queryParams.push(roleId);
    }

    // Construct the final update query
    const query = `
      UPDATE users
      SET ${updateFields.join(", ")}
      WHERE userId = ?
    `;
    queryParams.push(userId);

    // Execute the update query
    const [result] = await connection.query(query, queryParams);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "User  not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User  updated successfully" });
  } catch (ex) {
    console.error("Error:", ex); // Log the error
    return res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.put("/update_profile", async (req, res) => {
  const { fullname, email: newEmail } = req.body;
  const currentEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  // Verify the token (you need to implement this logic)
  const isValidToken = verifyToken(token);

  if (!isValidToken) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }

  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    // Check if the current email exists in the database
    const emailQuery = `
      SELECT * FROM users
      WHERE email = ?
    `;
    const [emailResult] = await connection.query(emailQuery, [currentEmail]);

    if (emailResult.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email not found in the database" });
    }

    // Prepare the update query dynamically
    let updateQuery = `UPDATE users SET `;
    const updates = [];
    const params = [];

    // Check for each field and add to the query if it exists
    if (fullname) {
      updates.push("fullname = ?");
      params.push(fullname);
    }
    if (newEmail) {
      // Check if the new email is already in use
      const emailCheckQuery = `
        SELECT * FROM users
        WHERE email = ? AND email != ?
      `;
      const [emailCheckResult] = await connection.query(emailCheckQuery, [
        newEmail,
        currentEmail,
      ]);

      if (emailCheckResult.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: "Email is already in use" });
      }

      updates.push("email = ?");
      params.push(newEmail);
    }

    // If no fields to update, return an error
    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    // Construct the final update query
    updateQuery += updates.join(", ") + " WHERE email = ?";
    params.push(currentEmail);

    // Execute the update query
    await connection.query(updateQuery, params);

    // If the email was updated, update the local storage
    if (newEmail) {
      localStorage.setItem("email", newEmail);
    }

    return res.status(200).json({
      success: true,
      message: "User  information updated successfully",
    });
  } catch (ex) {
    console.error("Error:", ex); // Log the error
    return res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.post("/create_user", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const { fullname, email, address, phone, roleId } = req.body;

    // Check if all fields are present
    if (!fullname || !email || !address || !phone || !roleId) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Check if email already exists
    const emailQuery = `
      SELECT * FROM users
      WHERE email = ?
    `;
    const [emailResult] = await connection.query(emailQuery, [email]);

    if (emailResult.length > 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    // Create the user
    const query = `
      INSERT INTO users (fullname, email, address, phone, roleId, createdAt)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    await connection.query(query, [fullname, email, address, phone, roleId]);

    res
      .status(201)
      .json({ success: true, message: "User  added successfully" });
  } catch (ex) {
    console.error("Registration error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.get("/users/:userId", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  const userId = req.params.userId; // Extract userId from request parameters

  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const query = `
      SELECT 
        a.userId,
        a.fullname, 
        a.email, 
        a.phone, 
        a.address, 
        e.roleName AS role
      FROM 
        users a
      INNER JOIN 
        roles e ON a.roleId = e.roleId
      WHERE 
        a.userId = ?;  // Use parameterized query to avoid SQL injection
    `;

    const [result] = await connection.query(query, [userId]); // Execute the query with parameter binding
    const user = result[0]; // Get the first record from the result

    if (user) {
      res.status(200).json({ success: true, data: user }); // Return the user data
    } else {
      res.status(404).json({ success: false, message: "User  not found" }); // User not found
    }
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

router.put("/update_user/:userId", async (req, res) => {
  let connection; // Declare a variable to hold the connection instance
  try {
    const userId = parseInt(req.params.userId); // Extract and parse userId from request parameters
    const { fullname, email, address, phone, roleId } = req.body;

    const updates = [];
    const inputs = { userId }; // Initialize inputs with userId

    // Check which fields to update
    if (fullname) {
      updates.push("fullname = ?");
      inputs.fullname = fullname;
    }
    if (email) {
      updates.push("email = ?");
      inputs.email = email;
    }
    if (address) {
      updates.push("address = ?");
      inputs.address = address;
    }
    if (phone) {
      updates.push("phone = ?");
      inputs.phone = phone;
    }
    if (roleId) {
      updates.push("roleId = ?");
      inputs.roleId = roleId;
    }

    // If no fields to update, return an error
    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    connection = await pool.getConnection(); // Get a connection from the pool

    // Construct the update query
    const query = `
      UPDATE users SET ${updates.join(
        ", "
      )}, updatedAt = NOW() WHERE userId = ?;
    `;

    // Execute the update query with parameter binding
    const [result] = await connection.query(query, [
      ...Object.values(inputs),
      userId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "User  not found" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "User  updated successfully" });
    }
  } catch (ex) {
    console.error("Error updating user:", ex);
    return res.status(500).json({ success: false, error: ex.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

module.exports = router;
