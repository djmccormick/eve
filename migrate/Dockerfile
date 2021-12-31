FROM node:alpine
LABEL description="Opinionated SQL-powered productive roll-forward migration tool for PostgreSQL https://github.com/graphile/migrate"

# Install Postgres client
RUN apk --update add postgresql-client

# Install Graphile Migrate
RUN npm install -g graphile-migrate

WORKDIR /migrate
ENTRYPOINT ["graphile-migrate"]
