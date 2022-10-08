#!/usr/bin/env node

import { exec as childProcessExec } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import { createLogger } from 'eve-common';

const exec = promisify(childProcessExec);
const logger = createLogger('migrate', 'run-fixtures');

(async () => {
	try {
		logger.info('Running fixtures');
		const paths = ['columns', 'functions', 'policies', 'triggers', 'views'];

		for (const p of paths) {
			const files = await fs.readdir(join('.', 'fixtures', p));
			const sqlFiles = files.filter(f => f.endsWith('.sql')).map(f => join('fixtures', p, f));

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
