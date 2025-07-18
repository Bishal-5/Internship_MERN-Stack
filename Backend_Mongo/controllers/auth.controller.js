const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const winston = require('winston');

// New User Registration
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already registered');
        }

        user = new User({ name, email, password });
        await user.save();

        return res
            .status(201)
            .send({
                message: 'User registered successfully',
                _id: user._id,
                name: user.name,
                email: user.email
            });
        // winston.info(`User registered: ${user.email}`); 

    } catch (error) {
        winston.error('Error during registration:', error);
        return res.status(500).send('Internal Server Error');

    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send('Incorrect Password!');
        }

        const token = user.generateAuthToken();
        // winston.info(`User logged in: ${user.email}`);
        return res
            .status(200)
            .header('x-auth-token', token)
            .send({
                message: 'Welcome...! ' + user.name,
                token: token
            });

    } catch (error) {
        winston.error('Error during login:', error);
        return res.status(500).send('Internal Server Error');

    }
};

// Get Current User
const getCurrent = async (req, res) => {

};

module.exports = {
    register,
    login,
    getCurrent,
}