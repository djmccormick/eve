const logger = require('eve-common')('hello');

module.exports = async payload => {
	logger.info(`Hello from ${payload.from}`);
};
