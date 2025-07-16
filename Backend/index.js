const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const config = require('config');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/user.routes');

// Initialize app
const app = express();
const PORT = process.env.PORT || config.get('server.port') || 3000;
const HOST = process.env.HOST || config.get('server.host') || 'localhost';

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.get('/', (_, res) => {
    res.send('Hello!! Welcome To My Server...');
});
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, HOST, () => {
    console.log(`Server started and running on http://${HOST}:${PORT}`);
});