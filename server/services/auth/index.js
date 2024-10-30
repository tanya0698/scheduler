"use strict";
const express = require("express");
const { connectToMongoDB } = require("../../dbconfig");
const nodemailer = require("nodemailer");
require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../../utility/auth");

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
  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    const { email, password } = req.body;

    // Check if email and password are present
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }

    // Check if email exists
    const user = await db.collection("manager").findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Email does not exist" });
    }

    // Get the stored password and roleId
    const storedPassword = user.password;
    const roleId = user.roleId; // Assuming roleId is stored in the user record

    // Compare the provided password with the stored password
    const isValidPassword = await bcrypt.compare(password, storedPassword);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password" });
    }

    // Generate a token using the existing generateToken function
    const token = await generateToken({
      email: user.email,
      managerId: user.managerId, // Assuming the user ID is stored in the user record
      roleId: roleId,
    });

    res.status(200).json({ success: true, token, roleId }); // Include roleId in the response
  } catch (ex) {
    console.error("Login error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

router.post("/register", async (req, res) => {
  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    const { fullname, email, password, cpassword, roleId, phone, address } =
      req.body;

    // Check if all fields are present
    if (
      !fullname ||
      !email ||
      !password ||
      !cpassword ||
      !roleId ||
      !phone ||
      !address
    ) {
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
    const existingUser = await db.collection("manager").findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newUser = {
      fullname,
      email,
      password: hashedPassword,
      roleId,
      phone,
      address,
      createdAt: new Date(), // Use the current date and time
    };

    await db.collection("manager").insertOne(newUser);

    res
      .status(201)
      .json({ success: true, message: "User  added successfully" });
  } catch (ex) {
    console.error("Registration error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

router.post("/forgot_password", async (req, res) => {
  const { email } = req.body;

  // Check if email is present
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Check if email exists
    const foundUser = await db.collection("manager").findOne({ email });

    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email does not exist" });
    }

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
    await db.collection("password_resets").insertOne({
      email: foundUser.email,
      token: token,
      updatedAt: new Date(), // Use the current date and time
    });

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
  // No need to close the connection here; it should remain open for future requests
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

  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Verify the token and email
    const resetRequest = await db
      .collection("password_resets")
      .findOne({ email, token });

    if (!resetRequest) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid token or email" });
    }

    // Update the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.collection("manager").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          token: null, // Clear the token after use
          updatedAt: new Date(), // Use the current date and time
        },
      }
    );

    // Optionally, you can also remove the token from the password_resets collection
    await db.collection("password_resets").deleteOne({ email });

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
  // No need to close the connection here; it should remain open for future requests
});

router.put("/update_password", async (req, res) => {
  const { password, cpassword, email, token } = req.body; // Get email and token from request body

  // Check if password and confirm password match
  if (password !== cpassword) {
    return res
      .status(400)
      .json({ success: false, error: "Passwords do not match" });
  }

  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Verify the token
    const isValidToken = verifyToken(token); // Ensure this function is defined

    if (!isValidToken) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    // Check if the email exists in the database
    const user = await db.collection("manager").findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Email not found in the database" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user's password in the database
    await db.collection("manager").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          token: null, // Clear the token if applicable
          updatedAt: new Date(), // Use the current date and time
        },
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (ex) {
    console.error("Error:", ex); // Log the error
    return res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

router.get("/users", async (req, res) => {
  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Retrieve users with their roles
    const users = await db
      .collection("manager")
      .aggregate([
        {
          $lookup: {
            from: "roles", // The collection to join
            localField: "roleId", // Field from the input documents
            foreignField: "roleId", // Field from the documents of the "from" collection
            as: "roleInfo", // Output array field
          },
        },
        {
          $unwind: {
            // Deconstructs the array field from the lookup stage
            path: "$roleInfo",
            preserveNullAndEmptyArrays: true, // Keep users without roles
          },
        },
        {
          $project: {
            // Specify the fields to include in the output
            managerId: "$managerId",
            fullname: "$fullname",
            email: "$email",
            phone: "$phone",
            address: "$address",
            role: "$roleInfo.roleName", // Get the role name from the joined collection
          },
        },
      ])
      .toArray(); // Convert the aggregation cursor to an array

    res.status(200).json({ success: true, data: users });
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

router.get("/users/:email", async (req, res) => {
  const email = req.params.email;

  // Validate the email parameter
  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: "Email parameter is required." });
  }

  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Find the user by email
    const user = await db.collection("manager").findOne({ email });

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
  // No need to close the connection here; it should remain open for future requests
});

router.put("/update_user/:managerId", async (req, res) => {
  const managerId = req.params.managerId; // Assuming managerId is a string in MongoDB
  const { fullname, email, roleId, phone, address } = req.body;

  // Check if at least one field is present
  if (!fullname && !email && !roleId && !phone && !address) {
    return res.status(400).json({
      success: false,
      error: "At least one field is required to update",
    });
  }

  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Check if email already exists for another user
    if (email) {
      const existingUser = await db.collection("manager").findOne({
        email: email,
        managerId: { $ne: managerId }, // Ensure that the userId is not the same
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, error: "Email already exists" });
      }
    }

    // Prepare the update object
    const updateFields = {};
    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (roleId) updateFields.roleId = roleId;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;

    // Execute the update query
    const result = await db.collection("manager").updateOne(
      { managerId: managerId }, // Filter by userId
      { $set: updateFields } // Update the fields
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: "User  not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User  updated successfully" });
  } catch (ex) {
    console.error("Error:", ex); // Log the error
    return res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

router.put("/update_profile", async (req, res) => {
  const { fullname, email: newEmail } = req.body;
  const currentEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  // Verify the token
  const isValidToken = verifyToken(token);

  if (!isValidToken) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }

  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    // Check if the current email exists in the database
    const user = await db
      .collection("manager")
      .findOne({ email: currentEmail });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Email not found in the database" });
    }

    // Prepare the update object
    const updateFields = {};
    if (fullname) updateFields.fullname = fullname;
    if (newEmail) {
      // Check if the new email is already in use
      const existingUser = await db.collection("manager").findOne({
        email: newEmail,
        email: { $ne: currentEmail }, // Ensure the new email is not the current email
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, error: "Email is already in use" });
      }

      updateFields.email = newEmail;
    }

    // If no fields to update, return an error
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    // Execute the update query
    await db.collection("manager").updateOne(
      { email: currentEmail }, // Filter by current email
      { $set: updateFields } // Update the fields
    );

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
  // No need to close the connection here; it should remain open for future requests
});

router.post("/create_user", async (req, res) => {
  let db;
  try {
    // Connect to MongoDB
    db = await connectToMongoDB();

    const { fullname, email, address, phone, roleId } = req.body;

    // Check if all fields are present
    if (!fullname || !email || !address || !phone || !roleId) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await db
      .collection("manager")
      .findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    // Create the user
    const newUser = {
      fullname,
      email,
      address,
      phone,
      roleId,
      createdAt: new Date(), // Use the current date
    };

    await db.collection("manager").insertOne(newUser);

    res
      .status(201)
      .json({ success: true, message: "User  added successfully" });
  } catch (ex) {
    console.error("Registration error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
  // No need to close the connection here; it should remain open for future requests
});

router.put("/update_user/:managerId", async (req, res) => {
  const managerId = parseInt(req.params.managerId);
  try {
    // Assuming userId is a string or ObjectId in MongoDB
    const { fullname, email, address, phone, roleId } = req.body;

    // Prepare the update object
    const updateFields = {};
    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (address) updateFields.address = address;
    if (phone) updateFields.phone = phone;
    if (roleId) updateFields.roleId = roleId;

    // If no fields to update, return an error
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No fields to update" });
    }

    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Execute the update query
    const result = await db.collection("manager").updateOne(
      { managerId: managerId }, // Filter by userId
      { $set: { ...updateFields, updatedAt: new Date() } } // Update the fields
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: "User  not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User  updated successfully" });
  } catch (ex) {
    console.error("Error updating user:", ex);
    return res.status(500).json({ success: false, error: ex.message });
  }
});

router.get("/editing/:managerId", async (req, res) => {
  const managerId = parseInt(req.params.managerId); // Extract managerId from the request parameters

  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Fetch the user by managerId
    const user = await db
      .collection("manager")
      .findOne({ managerId: managerId });

    if (user) {
      // Assuming roles are stored in a separate collection
      const role = await db
        .collection("roles")
        .findOne({ roleId: user.roleId });

      // Construct the response data
      const responseData = {
        managerId: user.managerId,
        fullname: user.fullname,
        address: user.address,
        email: user.email,
        phone: user.phone,
        role: role ? role.roleName : null, // Get the role name if it exists
      };

      res.status(200).json({ success: true, data: responseData });
    } else {
      res.status(404).json({ success: false, message: "User  was not found" });
    }
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.delete("/editing/:managerId", async (req, res) => {
  const managerId = parseInt(req.params.managerId); // Extract managerId from the request parameters

  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Execute the delete operation
    const result = await db
      .collection("manager")
      .deleteOne({ managerId: managerId });

    // Check if any documents were deleted
    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "User  deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "User  not found" });
    }
  } catch (ex) {
    console.error("Database query error:", ex); // Log the error for debugging
    res.status(500).json({ success: false, error: ex.message });
  }
});

module.exports = router;
