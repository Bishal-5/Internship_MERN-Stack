const app = require("./app");
const winston = require('winston');
const config = require('config');

// Open server
const port = process.env.PORT || config.get('port');
const server = app.listen(port, ()=>{
    winston.info(`Listening on port ${port}...`);
});

module.exports = server;