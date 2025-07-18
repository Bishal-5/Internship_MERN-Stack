const mongoose = require('mongoose');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

// Hash Password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Token generate after login
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        (process.env.JWT_PRIVATE_KEY || config.get("jwtPrivateKey")),
        { expiresIn: process.env.JWT_EXPIRES_IN || config.get("JWT_EXPIRES_IN") || "15m" }
    )
};

module.exports = mongoose.model('User', userSchema);