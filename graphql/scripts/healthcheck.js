#!/usr/bin/env node

const http = require('http');

const postData =
	'{"query":"query Healthcheck { __typename }", "variables": null, "operationName": "Healthcheck" }';
const options = {
	host: 'graphql',
	path: '/graphql',
	port: '5433',
	method: 'POST',
	timeout: 2000,
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Content-Length': postData.length
	}
};

var req = http.request(options, res => {
	process.exit(res.statusCode === 200 ? 0 : 1);
});

req.on('error', () => {
	process.exit(1);
});
req.on('timeout', () => {
	process.exit(1);
});

req.write(postData);
req.end();
