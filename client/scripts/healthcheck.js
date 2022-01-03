#!/usr/bin/env node

var http = require('http');

var options = {
	host: 'localhost',
	path: '/api/healthcheck',
	port: '3000',
	timeout: 2000
};

var request = http.request(options, res => {
	process.exit(res.statusCode === 200 ? 0 : 1);
});

request.on('error', function () {
	process.exit(1);
});

request.end();
