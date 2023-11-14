const express = require("express");
const router = express.Router();
const validator = require('validator')
const jwtUtil = require('../JWT')
const bcrypt = require('bcrypt')
require('dotenv').config();

// Handle POST request to '/login'
router.post("/login", async (request, response) => {
    // Get the username and password from the request body
    const { username, password } = request.body;

    // Sanitize the username to prevent XSS attacks
    const sanitizedUsername = validator.escape(username);

    // Prepare the SQL query to select the user with the given username
    const query = `SELECT * FROM users WHERE username = $1`;

    // Execute the SQL query with the sanitized username as a parameter
    const executedQuery = await process.postgresql.query(query, [sanitizedUsername]);

    // Get the first row (the user) from the result
    const user = executedQuery[0];

    // Compare the provided password with the user's password hash
    const validPassword = await bcrypt.compare(password, user.password);

    // If the password is invalid, send a 400 response with an error message
    if (!validPassword) {
        response.status(400).json({ message: "Invalid Username or password" });
    } else {
        // If the password is valid, generate a token and set it as a cookie
        const secretKey = Buffer.from(process.env.SECRET_KEY256, 'hex');
        const token = await jwtUtil.createEncryptedJWT("user_login", { "user": username }, secretKey);
        response.cookie('token', token, { httpOnly: true })

        // Send a 200 response with a success message
        response.status(200).json({ msg: "Login Successful" });
    }
});


// This route updates the password of a user
// Route: PUT /userUpdate
// Request body: { username: string, oldPassword: string, newPassword: string }
router.put("/userUpdate", async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        const checkQuery = `SELECT * FROM users WHERE username = $1`;
        const checkResult = await process.postgresql.query(checkQuery, [username]);
        const user = checkResult[0];

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if the old password provided is valid
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Update the user's password in the database
        const updateQuery = `UPDATE users SET password = $1 WHERE username = $2`;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await process.postgresql.query(updateQuery, [hashedPassword, username]);

        // Return success message
        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        // Return error message if any error occurs
        res.status(400).json({ message: error });
    }
});

router.post("/logout", async (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    res.end();
})


module.exports = router