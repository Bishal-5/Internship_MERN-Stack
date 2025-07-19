const jwt = require('jsonwebtoken');
const config = require('config');
const winston = require('winston');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  // Check if token is provided
  if (!token) return res.status(401).send('Access denied. No token provided');

  try {
    const decoded = jwt.verify(
      token,
      (process.env.JWT_PRIVATE_KEY || config.get('jwtPrivateKey'))
    );

    // Attach user information to the request object
    req.userInfo = decoded;
    next();

  } catch (ex) {
    winston.error('Invalid token', ex);
    res.status(400).send('Invalid token');
  }
};