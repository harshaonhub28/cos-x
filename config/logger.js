const bunyan = require('bunyan');
const logger = bunyan.createLogger({
  name: 'surveryApp',
  level: "info"
});

module.exports = logger;
