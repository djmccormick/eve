# eve

eve is a starter project featuring Postgres, Postgraphile / Graphile Worker / Graphile Migrate, Next.js, Apollo, and Material UI.

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

When started using `docker compose up`, this service watches the "current" migration for changes and applies them automatically.

### worker

This service runs [graphile-worker](https://github.com/graphile/worker), a job queue for Postgres. It uses the [official Node.js Docker image based on Alpine Linux](https://hub.docker.com/_/node), configured to work with the database service.

When started using `docker compose up`, this service watches task files for changes and applies them automatically.

### graphql

This service runs [Postgraphile](https://github.com/graphile/postgraphile), an instant lightning-fast GraphQL API backed primarily by the Postgres database. It uses the [official Node.js Docker image based on Alpine Linux](https://hub.docker.com/_/node), configured to work with the database service and with [recommended plugins](graphql/Dockerfile).

When started using `docker compose up`, this service watches the database for changes and applies them automatically.

### client

This service runs [Next.js](https://github.com/vercel/next.js), a production-ready [React](https://github.com/facebook/react) framework. It uses [Apollo Client](https://github.com/apollographql/apollo-client) to interact with the graphql service and leverages the [Material UI](https://github.com/mui-org/material-ui) component library.

## Development

More information coming soon.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE.txt)
