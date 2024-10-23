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
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

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
      WHERE email = @email
    `;
    const emailResult = await poolInstance
      .request()
      .input("email", email)
      .query(emailQuery);

    if (emailResult.recordset.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email does not exist" });
    }

    // Get the stored password
    const storedPassword = emailResult.recordset[0].password;

    // Compare the provided password with the stored password
    const isValidPassword = await bcrypt.compare(password, storedPassword);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password" });
    }

    // Generate a token using the existing generateToken function
    const token = await generateToken(emailResult.recordset[0]);

    res.status(200).json({ success: true, token });
  } catch (ex) {
    console.error("Login error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.post("/register", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

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
      WHERE email = @email
    `;
    const emailResult = await poolInstance
      .request()
      .input("email", email)
      .query(emailQuery);

    if (emailResult.recordset.length > 0) {
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
      VALUES (@fullname, @email, @password, @roleId, GETDATE())
    `;
    await poolInstance
      .request()
      .input("fullname", fullname)
      .input("email", email)
      .input("password", hashedPassword)
      .input("roleId", roleId)
      .query(query);

    res
      .status(201)
      .json({ success: true, message: "User  added successfully" });
  } catch (ex) {
    console.error("Registration error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.post("/forgot_password", async (req, res) => {
  const { email } = req.body;

  // Check if email is present
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    // Check if email exists
    const emailQuery = `
      SELECT * FROM users
      WHERE email = @Email
    `;
    const emailResult = await poolInstance
      .request()
      .input("Email", email)
      .query(emailQuery);

    if (emailResult.recordset.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email does not exist" });
    }

    const foundUser = emailResult.recordset[0];

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
    await poolInstance
      .request()
      .input("Email", foundUser.email)
      .input("Token", token).query(`
        INSERT INTO password_resets (email, token, updatedAt)
        VALUES (@Email, @Token, GETDATE())
      `);

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
  }
  // No need to close the pool here; it should remain open for future requests
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

  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    // Verify the token and email
    const tokenQuery = `
      SELECT * FROM users
      WHERE email = @Email AND token = @Token
    `;
    const tokenResult = await poolInstance
      .request()
      .input("Email", email)
      .input("Token", token)
      .query(tokenQuery);

    if (tokenResult.recordset.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid token or email" });
    }

    // Update the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await poolInstance
      .request()
      .input("Email", email)
      .input("Password", hashedPassword).query(`
        UPDATE users
        SET password = @Password, token = NULL, updatedAt = GETDATE()
        WHERE email = @Email
      `);

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
  }
  // No need to close the pool here; it should remain open for future requests
});

router.put("/update_password", async (req, res) => {
  const { password, cpassword } = req.body;
  const email = localStorage.getItem("email"); // Note: localStorage is not available on the server side
  const token = localStorage.getItem("token"); // Note: localStorage is not available on the server side

  // Check if password and confirm password match
  if (password !== cpassword) {
    return res
      .status(400)
      .json({ success: false, error: "Passwords do not match" });
  }

  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    // Verify the token (you need to implement this logic)
    const isValidToken = verifyToken(token); // Ensure this function is defined

    if (!isValidToken) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    // Check if the email exists in the database
    const emailQuery = `
      SELECT * FROM users
      WHERE email = @Email
    `;
    const emailResult = await poolInstance
      .request()
      .input("Email", email)
      .query(emailQuery);

    if (emailResult.recordset.length === 0) {
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
      SET password = @Password, token = NULL, updatedAt = GETDATE()
      WHERE email = @Email
    `;
    await poolInstance
      .request()
      .input("Password", hashedPassword)
      .input("Email", email)
      .query(updateQuery);

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (ex) {
    console.error("Error:", ex); // Log the error
    return res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.get("/users", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

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

    const result = await poolInstance.request().query(query); // Use the connected pool instance
    const users = result.recordset;

    res.status(200).json({ success: true, data: users });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.get("/users/:email", async (req, res) => {
  const email = req.params.email;

  // Validate the email parameter
  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: "Email parameter is required." });
  }

  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance
    const result = await poolInstance
      .request()
      .input("Email", email)
      .query("SELECT * FROM users WHERE email = @Email");

    const user = result.recordset[0];

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
  }
  // No need to close the pool here; it should remain open for future requests
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

  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    // Check if email already exists for another user
    if (email) {
      const emailQuery = `
        SELECT * FROM users
        WHERE email = @Email AND userId != @User Id
      `;
      const emailResult = await poolInstance
        .request()
        .input("Email", email)
        .input("User Id", userId)
        .query(emailQuery);

      if (emailResult.recordset.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: "Email already exists" });
      }
    }

    // Prepare the update query
    let updateFields = [];
    let queryParams = poolInstance.request();

    if (fullname) {
      updateFields.push("fullname = @Fullname");
      queryParams.input("Fullname", fullname);
    }
    if (email) {
      updateFields.push("email = @Email");
      queryParams.input("Email", email);
    }
    if (roleId) {
      updateFields.push("roleId = @RoleId");
      queryParams.input("RoleId", roleId);
    }

    // Construct the final update query
    const query = `
      UPDATE users
      SET ${updateFields.join(", ")}
      WHERE userId = @User Id
    `;
    queryParams.input("User Id", userId);

    // Execute the update query
    const result = await queryParams.query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, error: "User  not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User  updated successfully" });
  } catch (ex) {
    console.error("Error:", ex); // Log the error
    return res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
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

  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

    // Check if the current email exists in the database
    const emailQuery = `
      SELECT * FROM users
      WHERE email = @currentEmail
    `;
    const emailResult = await poolInstance
      .request()
      .input("currentEmail", currentEmail)
      .query(emailQuery);

    if (emailResult.recordset.length === 0) {
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
      updates.push("fullname = @fullname");
      params.push({ name: "fullname", value: fullname });
    }
    if (newEmail) {
      // Check if the new email is already in use
      const emailCheckQuery = `
        SELECT * FROM users
        WHERE email = @newEmail AND email != @currentEmail
      `;
      const emailCheckResult = await poolInstance
        .request()
        .input("newEmail", newEmail)
        .input("currentEmail", currentEmail)
        .query(emailCheckQuery);

      if (emailCheckResult.recordset.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: "Email is already in use" });
      }

      updates.push("email = @newEmail");
      params.push({ name: "newEmail", value: newEmail });
    }

    // If no fields to update, return an error
    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    // Construct the final update query
    updateQuery += updates.join(", ") + " WHERE email = @currentEmail";
    params.push({ name: "currentEmail", value: currentEmail });

    // Execute the update query
    const request = poolInstance.request();
    params.forEach((param) => {
      request.input(param.name, param.value);
    });
    await request.query(updateQuery);

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
  }
  // No need to close the pool here; it should remain open for future requests
});

router.post("/create_user", async (req, res) => {
  let poolInstance; // Declare a variable to hold the pool instance
  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

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
      WHERE email = @email
    `;
    const emailResult = await poolInstance
      .request()
      .input("email", email)
      .query(emailQuery);

    if (emailResult.recordset.length > 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    // Create the user
    const query = `
      INSERT INTO users (fullname, email, address, phone, roleId, createdAt)
      VALUES (@fullname, @email, @address, @phone, @roleId, GETDATE())
    `;
    await poolInstance
      .request()
      .input("fullname", fullname)
      .input("email", email)
      .input("address", address)
      .input("phone", phone)
      .input("roleId", roleId)
      .query(query);

    res
      .status(201)
      .json({ success: true, message: "User  added successfully" });
  } catch (ex) {
    console.error("Registration error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the pool here; it should remain open for future requests
});

router.get("/users/:userId", async (req, res) => {
  let poolInstance;
  const userId = req.params.userId; // Extract userId from request parameters

  try {
    poolInstance = await pool; // Await the pool promise to get the connected instance

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
        a.userId = @userId;  // Use parameterized query to avoid SQL injection
    `;

    const request = poolInstance.request();
    request.input("userId", userId); // Set the userId parameter

    const result = await request.query(query); // Execute the query
    const user = result.recordset[0]; // Get the first record from the result

    if (user) {
      res.status(200).json({ success: true, data: user }); // Return the user data
    } else {
      res.status(404).json({ success: false, message: "User  not found" }); // User not found
    }
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message }); // Return error response
  }
});

router.put("/update_user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { fullname, email, address, phone, roleId } = req.body;

    const updates = [];
    const inputs = { appointmentId };

    if (fullname) {
      updates.push("fullname = @fullname");
      inputs.fullname = fullname;
    }
    if (email) {
      updates.push("email = @email");
      inputs.email = email;
    }
    if (address) {
      updates.push("address = @address");
      inputs.address = address;
    }
    if (phone) {
      updates.push("phone = @phone");
      inputs.phone = phone;
    }

    if (roleId) {
      updates.push("roleId = @roleId");
      inputs.roleId = roleId;
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    const poolInstance = await pool; // Wait for the pool promise to resolve

    const result = await poolInstance
      .request()
      .input("userId", userId)
      .input("fullname", inputs.fullname)
      .input("email", inputs.email)
      .input("address", inputs.address)
      .input("phone", inputs.phone)
      .input("roleId", inputs.roleId)
      .query(
        `UPDATE users SET ${updates.join(
          ", "
        )}, updatedAt = GETDATE() WHERE userId = @userId`
      );

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ success: false, error: "User not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "User updated successfully" });
    }
  } catch (ex) {
    console.error("Error updating user:", ex);
    res.status(500).json({ success: false, error: ex.message });
  }
});

module.exports = router;
