import { createLogger as createWinstonLogger, format, transports } from 'winston';

export default function createLogger(service, label = 'main') {
	return createWinstonLogger({
		defaultMeta: { service },
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
}
