#!/usr/bin/env node

import chokidar from 'chokidar';
import { exec as childProcessExec } from 'child_process';
import { promisify } from 'util';

import { createLogger } from 'eve-common';

const exec = promisify(childProcessExec);
const logger = createLogger('migrate', 'watch-fixtures');

async function run(filename) {
	logger.info(`Running ${filename}`);

	try {
		const { stdout, stderr } = await exec(`graphile-migrate run ${filename}`);

		if (stdout) {
			logger.info(stdout);
		}

		if (stderr) {
			logger.error(stderr);
		}
	} catch (error) {
		logger.error(error);
	}
}

logger.info('Watching fixtures');

chokidar.watch('fixtures/**/*.sql').on('add', run).on('change', run).on('error', logger.error);
