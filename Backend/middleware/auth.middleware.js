const jwt = require("jsonwebtoken");
const { generateResponse } = require("../utils/helper");

//Configuration file
const dotenv = require('dotenv');
const config = require("config");
dotenv.config();

// Middleware to authenticate or verify JWT tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json(generateResponse(false, "Access token required", null, 401));
    }

    jwt.verify(
        token,
        (process.env.JWT_SECRET || config.get("auth.jwt_secret") || "87b4539bddbfc5e6a1a62c87acba28187224"),      
        (err, user) => {
            if (err) {
                return res
                    .status(403)
                    .json(generateResponse(false, "Invalid or expired token", null, 403));
            }
            req.userInfo = user;
            next();
        }
    );
};

// Generate Token and handle login
const login = (req, res) => {
    const { email, password } = req.body;

    // Simple mock authentication
    if (email === "admin@example.com" && password === "admin123") {
        const payload = {
            id: 1,
            email: email,
            role: "admin",
        };

        const token = jwt.sign(
            payload,
            (process.env.JWT_SECRET || config.get("auth.jwt_secret") || "87b4539bddbfc5e6a1a62c87acba28187224"),
            { expiresIn: process.env.JWT_EXPIRES_IN || config.get("auth.jwt_expires_in") || "15m" }
        );

        res.json(generateResponse(true, "Login successful", { token }));
    } else {
        res
            .status(401)
            .json(generateResponse(false, "Invalid credentials", null, 401));
    }
};

module.exports = {
    authenticateToken,
    login,
};