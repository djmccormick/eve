#!/usr/bin/env node

const child_process = require('child_process');
const chokidar = require('chokidar');
const util = require('util');

const logger = require('eve-common')('migrate', 'watch-fixtures');

const exec = util.promisify(child_process.exec);

async function run(filename) {
	logger.info(`Running ${filename}`);

	const { stdout, stderr } = await exec(`graphile-migrate run ${filename}`);

	if (stdout) {
		logger.info(stdout);
	}

	if (stderr) {
		logger.error(stderr);
	}
}

logger.info('Watching fixtures');

chokidar.watch('fixtures/**/*.sql').on('add', run).on('change', run).on('error', logger.error);
