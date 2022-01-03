const { createLogger, format, transports } = require('winston');

module.exports = label =>
	createLogger({
		defaultMeta: { service: 'migrate' },
		format: format.combine(
			format.errors({ stack: true }),
			format.label({ label }),
			format.timestamp(),
			format.printf(({ label, level, message, timestamp }) => {
				return `[${timestamp}][${label}][${level}]: ${message}`;
			})
		),
		transports: [new transports.Console()]
	});
