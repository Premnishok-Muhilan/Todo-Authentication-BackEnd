// Import the User model from the specified file path.
const User = require("../models/user");

// Import the bcrypt library for hashing and comparing passwords.
const bcrypt = require("bcrypt");

// Import the jsonwebtoken library for creating and verifying tokens.
const jwt = require("jsonwebtoken");

// Destructure JWT_SECRET from the config file for use in token generation.
const { JWT_SECRET } = require("../utils/config");

// Define the userController object which contains methods for user operations.
const userController = {
  // The register method handles user registration.
  register: async (request, response) => {
    try {
      // Extract username, password, and name from the request body.
      const { username, password, name } = request.body;

      // Check if a user with the given username already exists in the database.
      const user = await User.findOne({ username });

      // If the user exists, send a 400 status with an error message.
      if (user) {
        return response.status(400).json({ message: "User already exists" });
      }

      // Hash the password using bcrypt with a salt rounds value of 10.
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new User instance with the hashed password and other user details.
      const newUser = new User({ username, password: hashedPassword, name });

      // Save the newly created user to the database.
      await newUser.save();

      // Respond with a 201 status indicating successful user creation.
      response.status(201).json({ message: "User created successfully" });
    } catch (error) {
      // Catch any errors that occur and respond with a 500 status and error message.
      response.status(500).json({ message: error.message });
    }
  },

  // The login method handles user authentication and token generation.
  login: async (request, response) => {
    // Extract username and password from the request body.
    const { username, password } = request.body;

    // Find a user with the given username in the database.
    const user = await User.findOne({ username });

    // If no user is found, send a 400 status with an error message.
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database.
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect, send a 400 status with an error message.
    if (!isPasswordCorrect) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    // If the password is correct, generate a JWT token with user information.
    const token = jwt.sign(
      { id: user._id, username: user.username, name: user.name },
      JWT_SECRET
    );

    // Set a cookie with the token, configuring it for secure, HTTP-only access.
    response.cookie("token", token, {
      httpOnly: true, // Ensure the cookie is accessible only through HTTP(S) requests.
      sameSite: "none", // Allow the cookie to be sent with cross-site requests.
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Set cookie expiration to 24 hours from now.
      secure: true, // Ensure the cookie is only sent over HTTPS.
    });

    // Respond with a 200 status indicating successful login and include the token in the response.
    response.status(200).json({ message: "Login successful", token });
  },

  // The logout method handles user logout and cookie clearance.
  logout: async (request, response) => {
    try {
      // Clear the token cookie to effectively log out the user.
      response.clearCookie("token");

      // Respond with a 200 status indicating successful logout.
      response.status(200).json({ message: "Logout successful" });
    } catch (error) {
      // Catch any errors that occur and respond with a 500 status and error message.
      response.status(500).json({ message: error.message });
    }
  },

  // The me method retrieves and returns the currently authenticated user's data.
  me: async (request, response) => {
    try {
      // Extract the user ID from the request object (assuming userId is set by middleware).
      const userId = request.userId;

      // Find the user by ID, excluding the password, version, and _id fields from the response.
      const user = await User.findById(userId).select("-password -__v -_id");

      // If the user does not exist, send a 404 status with an error message.
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      // If the user exists, respond with a 200 status and include the user data in the response.
      response.status(200).json({ message: "User found", user });
    } catch (error) {
      // Catch any errors that occur and respond with a 500 status and error message.
      response.status(500).json({ message: error.message });
    }
  },

  getAllUsers: async (request, response) => {
    try {
        // get all the users from the database
        const users = await User.find().select('-password -__v -_id');

        // return the users
        response.status(200).json({ message: 'All users', users });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
};

// Export the userController object to make it available for import in other modules.
module.exports = userController;
