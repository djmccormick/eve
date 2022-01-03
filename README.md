# eve

eve is a starter project featuring Node, Postgres, PostGraphile / Graphile Worker / Graphile Migrate, Next.js, Apollo Client, and Material UI.

## Installation

Copy `sample.env` to `.env` and add database passwords throughout.

## Usage

Start the local development environment with Docker Compose:

```bash
docker compose up
```

## Services

More information coming soon.

### database

This service runs [Postgres](https://www.postgresql.org/), a powerful, open source object-relational database system. It uses the [official Postgres Docker image based on Alpine Linux](https://hub.docker.com/_/postgres), [initialized](database/initialize.sh) with sensible roles, databases, and permissions.

### migrate

This service runs [graphile-migrate](https://github.com/graphile/migrate), an opinionated SQL-powered productive roll-forward migration tool for Postgres. It uses the [official Node.js Docker image based on Alpine Linux](https://hub.docker.com/_/node), [configured](migrate/.gmrc) to work with the database service.

When started using `docker compose up`, this service runs graphile-migrate in watch mode which runs any un-executed committed migrations and then runs and watches the current migration, re-running it on any change.

### worker

This service runs [graphile-worker](https://github.com/graphile/worker), a job queue for Postgres. It uses the [official Node.js Docker image based on Alpine Linux](https://hub.docker.com/_/node), configured to work with the database service.

When started using `docker compose up`, this service runs graphile-worker in watch mode which watches task files for changes, automatically reloading the task code without restarting worker.

### graphql

This service runs [PostGraphile](https://github.com/graphile/postgraphile), an instant lightning-fast GraphQL API backed primarily by the Postgres database. It uses the [official Node.js Docker image based on Alpine Linux](https://hub.docker.com/_/node), configured to work with the database service and with [recommended plugins](graphql/Dockerfile).

When started using `docker compose up`, this service runs PostGraphile in watch mode which automatically updates your GraphQL schema when your database schema changes.

### client

This service runs [Next.js](https://github.com/vercel/next.js), a production-ready [React](https://github.com/facebook/react) framework. It uses [Apollo Client](https://github.com/apollographql/apollo-client) to interact with the graphql service and leverages the [Material UI](https://github.com/mui-org/material-ui) component library.

The `/graphql` and `/graphiql` endpoints are proxied from this service to the `graphql` service.

When started using `docker compose up`, this service runs Next.js in development mode with hot-code reloading, error reporting, and more.

## Scripts

- `scripts/migrate.sh` allows you to easily run commands in a "migrate" container. For example: `./scripts/migrate.sh graphile-migrate commit`
- `scripts/reset.sh` allows you to reset your development environment (delete volumes with the `-v` option). For example: `./scripts/reset.sh -v`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE.txt)
