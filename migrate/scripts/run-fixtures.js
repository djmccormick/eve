#!/usr/bin/env node

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const logger = require('eve-common')('migrate', 'run-fixtures');

const exec = util.promisify(child_process.exec);

(async () => {
	try {
		logger.info('Running fixtures');
		const paths = ['columns', 'functions', 'policies', 'triggers', 'views'];

		for (const p of paths) {
			const files = await fs.promises.readdir(path.join('.', 'fixtures', p));
			const sqlFiles = files.filter(f => f.endsWith('.sql')).map(f => path.join('fixtures', p, f));

			for (const f of sqlFiles) {
				logger.info(`Running ${f}`);
				await exec(`graphile-migrate run ${f}`);
			}
		}

		process.exit(0);
	} catch (e) {
		logger.error(e);
		process.exit(1);
	}
})();
