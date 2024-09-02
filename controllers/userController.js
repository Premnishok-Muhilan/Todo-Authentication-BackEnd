const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const userController = {
    register: async (request, response) => {
        try {
            // get the user data from the request body
            const { username, password, name } = request.body;

            // check if the user already exists in the database
            const user = await User.findOne({ username });

            // if the user already exists, return an error
            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user
            const newUser = new User({ username, password: hashedPassword, name });

            // save the user to the database
            await newUser.save();

            // return a success message
            response.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    login: async (request, response) => {
        // get the username and password from the request body
        const { username, password } = request.body;

        // check if the user exists in the database
        const user = await User.findOne({ username });

        // if the user does not exist, return an error
        if (!user) {
            return response.status(400).json({ message: 'User not found' });
        }

        // if the user exists, check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // if the password is incorrect, return an error
        if (!isPasswordCorrect) {
            return response.status(400).json({ message: 'Invalid credentials' });
        }

        // if the password is correct, generate a token for the user
        const token = jwt.sign({ id: user._id, username: user.username, name: user.name }, JWT_SECRET);

        // set a cookie with the token
        response.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            epires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 24 hours
            secure: true
        })

        // return the token
        response.status(200).json({ message: 'Login successful', token });
    },
    logout: async (request, response) => {
        try {
            // clear the token cookie
            response.clearCookie('token');

            // return a success message
            response.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    me: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user in the database
            const user = await User.findById(userId).select('-password -__v -_id');

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // if the user exists, return the user data
            response.status(200).json({ message: 'User found', user });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;