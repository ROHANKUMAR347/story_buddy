// // config/auth.js
// const jwt = require("jsonwebtoken");
// require("dotenv").config(); // Load environment variables
// // Function to generate a JWT token
// const generateToken = (user) => {
//   return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Adjust expiration as needed
// };

// // Function to verify a JWT token
// const verifyToken = (token) => {
//   return jwt.verify(token, process.env.JWT_SECRET);
// };

// module.exports = { generateToken, verifyToken };
