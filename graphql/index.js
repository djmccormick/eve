import compression from 'compression';
import express from 'express';
import pgConnectionFilter from 'postgraphile-plugin-connection-filter';
import pgNestedMutations from 'postgraphile-plugin-nested-mutations';
import pgOrderByRelated from '@graphile-contrib/pg-order-by-related';
import pgSimplifyInflector from '@graphile-contrib/pg-simplify-inflector';
import { postgraphile } from 'postgraphile';

import { createLogger } from 'eve-common';
const logger = createLogger('graphql');

const { DATABASE_URL: databaseUrl, SUPERUSER_APPLICATION_DATABASE_URL: superuserDatabaseUrl } =
	process.env;

// Create an Express app
const app = express();

// Do some logging
app.use(({ method, url, statusCode }, res, next) => {
	logger.info(`${method}: ${url} ${statusCode}`);
	next();
});

// Enable compression
app.use(compression());

// Add Postgraphile
app.use(
	postgraphile(databaseUrl || 'postgres:///', 'public', {
		ownerConnectionString: superuserDatabaseUrl,
		subscriptions: true,
		watchPg: true,
		dynamicJson: true,
		setofFunctionsContainNulls: false,
		ignoreRBAC: false,
		showErrorStack: 'json',
		extendedErrors: ['hint', 'detail', 'errcode'],
		exportGqlSchemaPath: 'schema.graphql',
		graphiql: true,
		graphiqlRoute: '/',
		enhanceGraphiql: true,
		enableQueryBatching: true,
		legacyRelations: 'omit',
		allowExplain: true,
		appendPlugins: [pgOrderByRelated, pgSimplifyInflector, pgConnectionFilter, pgNestedMutations]
	})
);

// Start serving
app.listen(5433);
