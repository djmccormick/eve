#!/usr/bin/env node

const child_process = require('child_process');
const gaze = require('gaze');
const util = require('util');

const logger = require('../utilities/logger')('watch-fixtures');

const exec = util.promisify(child_process.exec);

async function run(filename) {
	logger.info(`Running ${filename}`);

	const { stdout, stderr } = await exec(`npx graphile-migrate run ${filename}`);

	if (stdout) {
		logger.info(stdout);
	}

	if (stderr) {
		logger.error(stderr);
	}
}

logger.info('Watching fixtures');
gaze('fixtures/**/*.sql', (e, watcher) => {
	if (e) {
		logger.error(e);
		process.exit(1);
	}

	watcher.on('changed', run);
	watcher.on('added', run);
});