const logger = require('../utilities/logger')('hello');

module.exports = async payload => {
	logger.info(`Hello from ${payload.from}`);
};
