const logger = require('eve-common')('worker', 'hello');

module.exports = async payload => {
	logger.info(`Hello from ${payload.from}`);
};
